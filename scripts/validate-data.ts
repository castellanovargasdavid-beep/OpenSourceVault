/**
 * Valida la integridad del catálogo real (import de src/data/tools.ts, no un
 * re-parseo del texto) — pensado como gate de CI, no como reparador. Sale
 * con código 0 y un resumen en verde si todo pasa, o código 1 con la lista
 * completa de errores encontrados (nunca se detiene en el primero).
 *
 * Las listas de valores válidos (categorías, fossModel, etc.) están
 * duplicadas a mano aquí porque los union types de TypeScript no existen en
 * tiempo de ejecución — si se añade un valor nuevo a esos tipos en
 * src/lib/types.ts, hay que añadirlo también aquí.
 */
import { allTools, tools } from "../src/data/tools";
import { toolsEn } from "../src/data/tools.en";
import { stacks } from "../src/data/stacks";
import { stacksEn } from "../src/data/stacks.en";
import { pairOverrides } from "../src/lib/migration-pair-overrides";
import { catalogStats } from "../src/lib/catalog-stats";
import { saasPricing } from "../src/data/saas-pricing";
import { saasDomains } from "../src/lib/saas-domains";
import { extractDockerImageRefs } from "../src/lib/deployment-audit";
import type { OpenSourceTool } from "../src/lib/types";

const VALID_CATEGORIES = new Set([
  "Productivity",
  "Analytics",
  "DevTools",
  "CRM",
  "AI",
  "Storage",
  "Ecommerce",
  "VideoConferencing",
  "PasswordManagers",
  "AuthIdentity",
  "CloudPaas",
  "MonitoringLogs",
  "MarketingForms",
  "SmartHome",
  "MediaAutomation",
  "PersonalFinance",
]);

const VALID_FOSS_MODELS = new Set(["FOSS", "OpenCore", "FairCode", "SourceAvailable"]);
const VALID_DOCKER_STATUSES = new Set(["VERIFIED_PINNED", "LATEST_ONLY", "ARCHIVED_UPSTREAM", "LEGACY_IMAGE"]);
const VALID_TAGS = new Set(["docker-ready", "1-click-deploy", "permissive-license"]);
const VALID_DIFFICULTIES = new Set(["beginner", "intermediate", "advanced"]);
const VALID_STATUSES = new Set(["published", "coming_soon", "scheduled", undefined]);

const MAX_SANE_RAM_MB = 131072; // 128GB — techo generoso, solo para atrapar valores absurdos (negativos, 0, typos con ceros de más).
const MAX_SANE_STORAGE_GB = 102400; // 100TB — mismo criterio que MAX_SANE_RAM_MB, para storageGb.
const MAX_PORT = 65535;

interface ValidationError {
  toolId: string;
  message: string;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidUrl(value: unknown): boolean {
  if (!isNonEmptyString(value)) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** Extrae cada puerto de host declarado en `ports:` (formato corto: "HOST:CONTAINER" o "IP:HOST:CONTAINER"). */
function extractHostPorts(dockerCompose: string): number[] {
  const ports: number[] = [];
  const lines = dockerCompose.split("\n");
  for (const line of lines) {
    const m = line.match(/^\s*-\s*"?(\d{1,6}):(\d{1,6})(?:\/(?:tcp|udp))?"?\s*$/);
    if (m) {
      ports.push(parseInt(m[1], 10), parseInt(m[2], 10));
      continue;
    }
    const m3 = line.match(/^\s*-\s*"?[\d.]+:(\d{1,6}):(\d{1,6})(?:\/(?:tcp|udp))?"?\s*$/);
    if (m3) ports.push(parseInt(m3[1], 10), parseInt(m3[2], 10));
  }
  return ports;
}

/** Marcadores de licencias que, por definición, NO son OSI/open-source real — si aparecen, la herramienta nunca debería estar clasificada como `fossModel: "FOSS"` (ver Fase 3: no asumir Open-Core/Source-available = FOSS). */
const NON_OSI_LICENSE_MARKERS = ["BUSL", "FSL-", "Elastic License", "Source-available", "Sustainable Use", "SSPL", "Commons Clause"];

function validateTool(tool: OpenSourceTool, errors: ValidationError[]): void {
  const push = (message: string) => errors.push({ toolId: tool.id || "(sin id)", message });

  // --- Campos obligatorios (más estricto que el tipo TS: aquí fossModel es
  // obligatorio por decisión de este script, aunque el tipo lo deja opcional
  // para no romper el build mientras se auditaba el catálogo). ---
  if (!isNonEmptyString(tool.id)) push("falta `id` (o está vacío)");
  if (!isNonEmptyString(tool.name)) push("falta `name` (o está vacío)");
  if (!isNonEmptyString(tool.slug)) push("falta `slug` (o está vacío)");
  if (!isNonEmptyString(tool.license)) push("falta `license` (o está vacía)");
  if (!isNonEmptyString(tool.category)) push("falta `category`");
  if (!tool.fossModel) {
    push("falta `fossModel`");
  } else if (!VALID_FOSS_MODELS.has(tool.fossModel)) {
    push(`\`fossModel\` tiene un valor no reconocido: "${tool.fossModel}"`);
  }

  // --- Licencia: ni vacía/placeholder ni contradictoria con fossModel. No
  // asumimos que Open-Core/Fair-code/Source-available "son básicamente
  // FOSS" — si el texto de la licencia lleva un marcador claramente no-OSI
  // pero fossModel dice "FOSS", es una mala clasificación real (Fase 3). ---
  if (isNonEmptyString(tool.license)) {
    const looksLikePlaceholder = /^(unknown|tbd|n\/a|todo|pending)$/i.test(tool.license.trim());
    if (looksLikePlaceholder) push(`\`license\` parece un placeholder, no una licencia real: "${tool.license}"`);

    const looksNonOsi = NON_OSI_LICENSE_MARKERS.some((marker) => tool.license.includes(marker));
    if (looksNonOsi && tool.fossModel === "FOSS") {
      push(`\`fossModel\` es "FOSS" pero \`license\` ("${tool.license}") tiene pinta de licencia no-OSI — revisar clasificación`);
    }
  }

  if (tool.category && !VALID_CATEGORIES.has(tool.category)) {
    push(`\`category\` tiene un valor no reconocido: "${tool.category}"`);
  }

  if (tool.dockerStatus && !VALID_DOCKER_STATUSES.has(tool.dockerStatus)) {
    push(`\`dockerStatus\` tiene un valor no reconocido: "${tool.dockerStatus}"`);
  }

  // --- Imagen Docker mal formada / inconsistente con dockerStatus. Sin
  // "image:" en absoluto es válido (instaladores por script propio, p.ej.
  // Coolify/Dokku/Penpot — ver resolveToolResourceProfile), así que solo se
  // valida el formato de las que SÍ declaran una. Reutiliza el mismo
  // clasificador de tags que la auditoría de despliegue (deployment-audit.ts
  // / `npm run audit:deployment`) — una sola definición de "mutable", no dos. ---
  if (isNonEmptyString(tool.dockerCompose)) {
    for (const { image, tagClass } of extractDockerImageRefs(tool.dockerCompose)) {
      if (!image || /\s/.test(image)) {
        push(`\`dockerCompose\` declara una imagen Docker mal formada: "${image}"`);
        continue;
      }
      if (tool.dockerStatus === "VERIFIED_PINNED" && tagClass === "mutable") {
        push(`\`dockerStatus\` es "VERIFIED_PINNED" pero la imagen "${image}" usa un tag móvil (\`latest\`/\`main\`/sin tag/...) — no está realmente fijada`);
      }
    }
  }

  if (tool.difficulty && !VALID_DIFFICULTIES.has(tool.difficulty)) {
    push(`\`difficulty\` tiene un valor no reconocido: "${tool.difficulty}"`);
  }

  if (tool.status !== undefined && !VALID_STATUSES.has(tool.status)) {
    push(`\`status\` tiene un valor no reconocido: "${tool.status}"`);
  }
  if (tool.status === "scheduled" && !isNonEmptyString(tool.publishDate)) {
    push('`status` es "scheduled" pero falta `publishDate`');
  }
  if (tool.publishDate && Number.isNaN(new Date(tool.publishDate).getTime())) {
    push(`\`publishDate\` no es una fecha válida: "${tool.publishDate}"`);
  }

  for (const tag of tool.tags ?? []) {
    if (!VALID_TAGS.has(tag)) push(`\`tags\` contiene un valor no reconocido: "${tag}"`);
  }

  if (!isValidUrl(tool.websiteUrl)) push(`\`websiteUrl\` no es una URL http(s) válida: "${tool.websiteUrl}"`);
  if (!isValidUrl(tool.githubUrl)) push(`\`githubUrl\` no es una URL http(s) válida: "${tool.githubUrl}"`);

  if (!isNonEmptyString(tool.dockerCompose)) {
    push("falta `dockerCompose` (o está vacío)");
  }

  // --- RAM: solo tiene sentido comprobar el override manual — el valor
  // inferido por resolveToolResourceProfile() ya está acotado por su propio
  // código (256/512/1024/2048/4096) y no puede ser un dato del catálogo. ---
  if (tool.minRamMb !== undefined) {
    if (!Number.isFinite(tool.minRamMb) || tool.minRamMb <= 0) {
      push(`\`minRamMb\` no es un número positivo válido: ${tool.minRamMb}`);
    } else if (tool.minRamMb > MAX_SANE_RAM_MB) {
      push(`\`minRamMb\` es un valor implausible (> ${MAX_SANE_RAM_MB} MB): ${tool.minRamMb}`);
    }
  }

  // --- Puertos declarados en el propio docker-compose.yml. ---
  if (isNonEmptyString(tool.dockerCompose)) {
    for (const port of extractHostPorts(tool.dockerCompose)) {
      if (!Number.isFinite(port) || port <= 0 || port > MAX_PORT) {
        push(`\`dockerCompose\` declara un puerto fuera de rango (1-${MAX_PORT}): ${port}`);
      }
    }
  }

  if (tool.starsCount !== undefined && (!Number.isFinite(tool.starsCount) || tool.starsCount < 0)) {
    push(`\`starsCount\` no es un número válido: ${tool.starsCount}`);
  }

  // --- Campos opcionales del modelo extensible de recursos (Sección 8):
  // nunca obligatorios, pero si están puestos deben tener un valor plausible. ---
  if (tool.storageGb !== undefined) {
    if (!Number.isFinite(tool.storageGb) || tool.storageGb <= 0) {
      push(`\`storageGb\` no es un número positivo válido: ${tool.storageGb}`);
    } else if (tool.storageGb > MAX_SANE_STORAGE_GB) {
      push(`\`storageGb\` es un valor implausible (> ${MAX_SANE_STORAGE_GB} GB): ${tool.storageGb}`);
    }
  }
  if (tool.notes !== undefined && !isNonEmptyString(tool.notes)) {
    push("`notes` está definido pero vacío — quítalo o rellénalo");
  }
}

function main(): void {
  const errors: ValidationError[] = [];

  for (const tool of allTools) {
    validateTool(tool, errors);
  }

  // --- IDs y slugs duplicados (a nivel de todo el catálogo, no por herramienta). ---
  const idCounts = new Map<string, number>();
  const slugCounts = new Map<string, number>();
  for (const tool of allTools) {
    if (isNonEmptyString(tool.id)) idCounts.set(tool.id, (idCounts.get(tool.id) ?? 0) + 1);
    if (isNonEmptyString(tool.slug)) slugCounts.set(tool.slug, (slugCounts.get(tool.slug) ?? 0) + 1);
  }
  for (const [id, count] of idCounts) {
    if (count > 1) errors.push({ toolId: id, message: `\`id\` duplicado: aparece ${count} veces en el catálogo` });
  }
  for (const [slug, count] of slugCounts) {
    if (count > 1) errors.push({ toolId: slug, message: `\`slug\` duplicado: aparece ${count} veces en el catálogo` });
  }

  // --- Referencias rotas hacia el catálogo desde datasets "paralelos"
  // (stacks, traducciones, guías de migración) — cada uno de estos vive en
  // su propio archivo y puede quedar desincronizado si una herramienta se
  // renombra o se elimina sin actualizar quien la referencia. ---
  const allIds = new Set(allTools.map((t) => t.id));
  const publishedIds = new Set(tools.map((t) => t.id));

  for (const stack of stacks) {
    for (const toolId of stack.tools) {
      if (!allIds.has(toolId)) {
        errors.push({ toolId: stack.slug, message: `el stack "${stack.slug}" referencia el id de herramienta "${toolId}", que no existe en el catálogo` });
      } else if (!publishedIds.has(toolId)) {
        errors.push({ toolId: stack.slug, message: `el stack "${stack.slug}" referencia "${toolId}", que existe pero no está publicada (rompería la ficha del stack)` });
      }
    }
  }

  const stackSlugs = new Set(stacks.map((s) => s.slug));
  for (const slug of Object.keys(stacksEn)) {
    if (!stackSlugs.has(slug)) {
      errors.push({ toolId: slug, message: `stacks.en.ts tiene una traducción para "${slug}", que no existe (o ya no existe) en stacks.ts` });
    }
  }

  for (const id of Object.keys(toolsEn)) {
    if (!allIds.has(id)) {
      errors.push({ toolId: id, message: `tools.en.ts tiene una traducción para "${id}", que no existe (o ya no existe) en tools.ts` });
    }
  }

  const allSlugs = new Set(allTools.map((t) => t.slug));
  for (const key of Object.keys(pairOverrides)) {
    const toolSlug = key.slice(key.indexOf("→") + 1);
    if (!allSlugs.has(toolSlug)) {
      errors.push({ toolId: key, message: `migration-pair-overrides.ts tiene la clave "${key}", cuyo slug de destino "${toolSlug}" no existe en el catálogo` });
    }
  }

  // --- saas-pricing.ts / saas-domains.ts: cada entrada debe corresponder a
  // al menos una herramienta real que sustituya ese SaaS (`tool.replaces[]`)
  // — si ninguna herramienta lo referencia, es una entrada huérfana (un
  // precio/dominio que no se muestra en ningún sitio del catálogo). Se
  // comprueba primero contra `allTools` (¿existe la herramienta destino en
  // absoluto?) y luego contra `tools` (¿está publicada?), porque un SaaS
  // solo sustituido por una herramienta "scheduled"/"coming_soon" todavía
  // no tiene ningún efecto visible en el sitio en producción.
  const allReplacesNames = new Set(allTools.flatMap((t) => t.replaces));
  const publishedReplacesNames = new Set(tools.flatMap((t) => t.replaces));

  const saasPricingNameCounts = new Map<string, number>();
  for (const entry of saasPricing) {
    saasPricingNameCounts.set(entry.saasName, (saasPricingNameCounts.get(entry.saasName) ?? 0) + 1);

    if (!isNonEmptyString(entry.saasName)) {
      errors.push({ toolId: "saas-pricing.ts", message: "una entrada de `saasPricing` tiene `saasName` vacío" });
      continue;
    }
    if (!allReplacesNames.has(entry.saasName)) {
      errors.push({
        toolId: entry.saasName,
        message: `saas-pricing.ts tiene precio para "${entry.saasName}", pero ninguna herramienta del catálogo la sustituye (\`replaces\`) — entrada huérfana`,
      });
    } else if (!publishedReplacesNames.has(entry.saasName)) {
      errors.push({
        toolId: entry.saasName,
        message: `saas-pricing.ts tiene precio para "${entry.saasName}", pero solo la sustituye(n) herramienta(s) todavía no publicada(s) — sin efecto visible hoy`,
      });
    }
  }
  for (const [name, count] of saasPricingNameCounts) {
    if (count > 1) errors.push({ toolId: name, message: `saas-pricing.ts tiene ${count} entradas duplicadas para "${name}"` });
  }

  for (const [saasName, domain] of Object.entries(saasDomains)) {
    if (!isNonEmptyString(domain)) {
      errors.push({ toolId: saasName, message: `saas-domains.ts tiene un dominio vacío para "${saasName}"` });
    }
    if (!allReplacesNames.has(saasName)) {
      errors.push({
        toolId: saasName,
        message: `saas-domains.ts tiene un dominio para "${saasName}", pero ninguna herramienta del catálogo la sustituye (\`replaces\`) — entrada huérfana`,
      });
    } else if (!publishedReplacesNames.has(saasName)) {
      errors.push({
        toolId: saasName,
        message: `saas-domains.ts tiene un dominio para "${saasName}", pero solo la sustituye(n) herramienta(s) todavía no publicada(s) — sin efecto visible hoy`,
      });
    }
  }

  // --- Estadísticas inconsistentes: catalogStats es la única fuente de
  // verdad (ver src/lib/catalog-stats.ts) — estos invariantes matemáticos
  // deben cumplirse siempre por construcción; si alguno falla, alguien
  // rompió esa invariante al tocar catalog-stats.ts. ---
  const fossSum =
    catalogStats.totalFoss + catalogStats.totalOpenCore + catalogStats.totalFairCode + catalogStats.totalSourceAvailable + catalogStats.totalUnknownLicenseModel;
  if (fossSum !== catalogStats.totalTools) {
    errors.push({
      toolId: "catalogStats",
      message: `el desglose por fossModel suma ${fossSum} pero totalTools es ${catalogStats.totalTools} — deberían ser iguales`,
    });
  }
  const categorySum = Object.values(catalogStats.toolCountByCategory).reduce((a, b) => a + b, 0);
  if (categorySum !== catalogStats.totalTools) {
    errors.push({
      toolId: "catalogStats",
      message: `la suma de toolCountByCategory es ${categorySum} pero totalTools es ${catalogStats.totalTools} — deberían ser iguales`,
    });
  }
  if (catalogStats.totalTools + catalogStats.totalNotYetPublished !== catalogStats.totalInCatalogFile) {
    errors.push({
      toolId: "catalogStats",
      message: "totalTools + totalNotYetPublished no suma totalInCatalogFile",
    });
  }

  console.log(`Validando ${allTools.length} herramientas del catálogo (${catalogStats.totalTools} publicadas)...\n`);

  if (errors.length === 0) {
    console.log(`\x1b[32m✔ Todo correcto — ${allTools.length}/${allTools.length} herramientas pasan la validación.\x1b[0m`);
    process.exit(0);
  }

  console.error(`\x1b[31m✘ ${errors.length} error(es) encontrado(s):\x1b[0m\n`);
  for (const err of errors) {
    console.error(`  [${err.toolId}] ${err.message}`);
  }
  console.error(`\n\x1b[31m✘ Validación fallida.\x1b[0m`);
  process.exit(1);
}

main();
