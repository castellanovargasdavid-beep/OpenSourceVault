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
import { allTools } from "../src/data/tools";
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

  if (tool.category && !VALID_CATEGORIES.has(tool.category)) {
    push(`\`category\` tiene un valor no reconocido: "${tool.category}"`);
  }

  if (tool.dockerStatus && !VALID_DOCKER_STATUSES.has(tool.dockerStatus)) {
    push(`\`dockerStatus\` tiene un valor no reconocido: "${tool.dockerStatus}"`);
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

  console.log(`Validando ${allTools.length} herramientas del catálogo...\n`);

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
