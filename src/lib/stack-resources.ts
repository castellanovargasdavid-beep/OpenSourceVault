import type { OpenSourceTool } from "@/lib/types";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { resolveGpuRequirement } from "@/lib/tool-hardware";
import { extractDockerImageRefs, auditToolDeployment, findSuspiciousSecretAssignments, type DeploymentVerificationState } from "@/lib/deployment-audit";
import { isComposeFile, extractEnvPlaceholders } from "@/lib/deploy-guide";
import { hostingProviders } from "@/data/hosting-providers";
import { matchHostingTiers, classifyHostingCategory, type HostingCategory } from "@/lib/hosting-tier";

/**
 * Capa de cálculo de infraestructura del Stack Builder — Fase 2 en adelante
 * del brief "Stack Builder 2.0". Reutiliza deliberadamente lo que ya existe
 * (resolveToolResourceProfile, resolveGpuRequirement, extractDockerImageRefs,
 * auditToolDeployment, matchHostingTiers...) en vez de reimplementarlo: este
 * archivo solo AÑADE lo que faltaba (dependencias, RAM de modelo vs
 * aplicación, volúmenes/backups, chequeo de stack) por encima de esas
 * piezas ya probadas.
 *
 * Se ejecuta en el servidor (page.tsx tiene el `OpenSourceTool` completo,
 * con `dockerCompose`) y produce `StackToolProfile` — una proyección ligera
 * SIN el texto completo del compose, para no repetir el problema que
 * `toToolCardData()` ya evita en tool-card-data.ts (mandar los ~326KB de
 * dockerCompose de las 150 herramientas al cliente solo para calcular 4
 * números). El Stack Builder cliente solo recibe este resumen ya calculado.
 */

// --- Dependencias detectadas por imagen -------------------------------------

export type DependencyKind =
  | "postgresql"
  | "mysql_mariadb"
  | "redis"
  | "object_storage"
  | "reverse_proxy"
  | "authentication"
  | "search_index"
  | "message_queue"
  | "external_api"
  | "other_service";

const DEPENDENCY_IMAGE_PATTERNS: { kind: DependencyKind; pattern: RegExp }[] = [
  { kind: "postgresql", pattern: /postgres|pgvecto|timescaledb/i },
  { kind: "mysql_mariadb", pattern: /\bmysql\b|mariadb/i },
  { kind: "redis", pattern: /redis|valkey/i },
  { kind: "object_storage", pattern: /minio|seaweedfs|garage/i },
  { kind: "reverse_proxy", pattern: /traefik|caddy|nginx|envoy/i },
  { kind: "authentication", pattern: /keycloak|authentik|authelia|supertokens|zitadel|ory\//i },
  { kind: "search_index", pattern: /elasticsearch|opensearch|meilisearch|typesense/i },
  { kind: "message_queue", pattern: /rabbitmq|kafka|zookeeper/i },
];

/** Nombres de variable de entorno de API externas de terceros bien conocidas — un hallazgo mecánico (el texto literal está en el compose), nunca una suposición sobre qué hace la herramienta. */
const EXTERNAL_API_ENV_PATTERN =
  /\b(OPENAI_API_KEY|ANTHROPIC_API_KEY|GROQ_API_KEY|MISTRAL_API_KEY|COHERE_API_KEY|STRIPE_(SECRET|API)_KEY|SENDGRID_API_KEY|TWILIO_(AUTH_TOKEN|ACCOUNT_SID)|GOOGLE_API_KEY|AWS_ACCESS_KEY_ID)\b/;

function classifyDependencyImage(image: string): DependencyKind | null {
  for (const { kind, pattern } of DEPENDENCY_IMAGE_PATTERNS) {
    if (pattern.test(image)) return kind;
  }
  return null;
}

/**
 * Detecta qué servicios adicionales bundlea el docker-compose de UNA
 * herramienta. Regla: la PRIMERA imagen del compose es la app principal (se
 * ignora — nunca se cuenta como "dependencia de sí misma"); solo se
 * clasifican las imágenes siguientes. Verificado contra el catálogo real:
 * el orden "app primero, servicios de soporte después" es consistente en
 * las ~150 fichas (nocodb→postgres, appwrite→mariadb+redis,
 * dify→postgres+redis...). Herramientas de una sola imagen (Meilisearch,
 * Typesense, Keycloak como HERRAMIENTA elegida, no como dependencia de
 * otra) correctamente no reportan ninguna dependencia.
 */
export function detectBundledDependencies(dockerCompose: string): DependencyKind[] {
  if (!isComposeFile(dockerCompose)) return [];
  const images = extractDockerImageRefs(dockerCompose);
  const found = new Set<DependencyKind>();
  for (const { image } of images.slice(1)) {
    const kind = classifyDependencyImage(image);
    if (kind) found.add(kind);
  }
  if (EXTERNAL_API_ENV_PATTERN.test(dockerCompose)) found.add("external_api");
  return [...found];
}

// --- RAM: aplicación vs modelo -----------------------------------------------

export interface RamBreakdown {
  applicationRamMb: number;
  isApplicationRamEstimated: boolean;
  /**
   * true solo cuando hay evidencia verificable de que el consumo de RAM/VRAM
   * real depende del modelo que el usuario cargue (no se puede sumar un
   * número fijo). Criterio, deliberadamente estricto para no inventar: o
   * bien el compose reserva GPU de verdad (resolveGpuRequirement), o bien
   * `notes` documenta a mano cómo escala con el tamaño del modelo (hoy,
   * solo Ollama). Herramientas de IA que solo ORQUESTAN (Flowise, Dify,
   * Open WebUI...) sin cargar pesos ellas mismas no se marcan aquí — sus
   * propias `notes` dicen explícitamente que no ejecutan el modelo.
   */
  hasVariableModelRam: boolean;
  /** Texto real de `tool.notes` cuando `hasVariableModelRam` es true y hay una nota — nunca una cifra inventada de "RAM de modelo". */
  modelRamNote?: string;
}

function looksLikeModelRamNote(notes: string | undefined): boolean {
  if (!notes) return false;
  return /\bmodelo(s)?\b[\s\S]*\b(ram|vram)\b/i.test(notes) || /\b(ram|vram)\b[\s\S]*\bmodelo(s)?\b/i.test(notes);
}

export function getRamBreakdown(
  tool: Pick<OpenSourceTool, "dockerCompose" | "difficulty" | "minRamMb" | "database" | "notes" | "category" | "gpuRequired">
): RamBreakdown {
  const { minRamMb, isEstimated } = resolveToolResourceProfile(tool);
  const gpuRequired = resolveGpuRequirement(tool);
  const hasVariableModelRam = tool.category === "AI" && (gpuRequired || looksLikeModelRamNote(tool.notes));
  return {
    applicationRamMb: minRamMb,
    isApplicationRamEstimated: isEstimated,
    hasVariableModelRam,
    modelRamNote: hasVariableModelRam ? tool.notes : undefined,
  };
}

// --- GPU: obligatoria vs opcional-pero-beneficiosa --------------------------

export type GpuNeed = "required" | "optional_beneficial" | "none";

export function getGpuNeed(tool: Pick<OpenSourceTool, "dockerCompose" | "gpuRequired" | "notes">): GpuNeed {
  if (resolveGpuRequirement(tool)) return "required";
  if (tool.notes && /\bgpu\b|\bvram\b/i.test(tool.notes)) return "optional_beneficial";
  return "none";
}

// --- Volúmenes / backups -----------------------------------------------------

/** Nombres de volumen top-level declarados en `volumes:` (mismo estilo de parseo ingenuo ya usado en countComposeServices/stack-merge: 2 espacios de indentación, sin valor en la misma línea). */
export function extractVolumeNames(dockerCompose: string): string[] {
  const lines = dockerCompose.split("\n");
  const names: string[] = [];
  let inVolumes = false;
  for (const line of lines) {
    if (/^volumes:\s*$/.test(line)) {
      inVolumes = true;
      continue;
    }
    if (!inVolumes) continue;
    if (/^\S/.test(line) && line.trim() !== "") {
      inVolumes = false;
      continue;
    }
    const m = line.match(/^ {2}([A-Za-z0-9_.-]+):\s*$/);
    if (m) names.push(m[1]);
  }
  return names;
}

// --- Estado de despliegue por herramienta (reexportado desde deployment-audit) --

export type { DeploymentVerificationState };

// --- Perfil ligero por herramienta, listo para mandar al cliente -----------

export interface StackToolProfile {
  slug: string;
  ram: RamBreakdown;
  storageGb?: number;
  gpuNeed: GpuNeed;
  database?: string;
  dependencies: DependencyKind[];
  imageCount: number;
  hasMutableTag: boolean;
  hasUnknownTag: boolean;
  deploymentState: DeploymentVerificationState;
  volumeNames: string[];
  hasSuspiciousSecrets: boolean;
  isComposeFile: boolean;
}

export function toStackToolProfile(tool: OpenSourceTool): StackToolProfile {
  const audit = auditToolDeployment(tool);
  return {
    slug: tool.slug,
    ram: getRamBreakdown(tool),
    storageGb: tool.storageGb,
    gpuNeed: getGpuNeed(tool),
    database: tool.database,
    dependencies: detectBundledDependencies(tool.dockerCompose),
    imageCount: audit.images.length,
    hasMutableTag: audit.hasMutableTag,
    hasUnknownTag: audit.hasUnknownTag,
    deploymentState: audit.state,
    volumeNames: extractVolumeNames(tool.dockerCompose),
    hasSuspiciousSecrets: findSuspiciousSecretAssignments(tool.dockerCompose).length > 0,
    isComposeFile: isComposeFile(tool.dockerCompose),
  };
}

// --- Agregados a nivel de stack ---------------------------------------------

export interface StackAggregate {
  totalApplicationRamMb: number;
  isRamEstimated: boolean;
  aiToolsWithVariableModelRam: string[]; // slugs
  totalStorageGb: number | null; // null = "No disponible" (ninguna herramienta seleccionada documenta storageGb)
  toolsWithUnknownStorage: string[]; // slugs sin storageGb documentado — nunca se cuentan como 0
  gpuRequiredTools: string[];
  gpuOptionalTools: string[];
  /** Por tipo de dependencia, cuántas herramientas seleccionadas la bundlean — "Tu stack necesita N servicios adicionales" viene de aquí. */
  dependencyCounts: Record<DependencyKind, number>;
  totalAdditionalServices: number;
  serviceCount: number;
  hostingCategory: HostingCategory | null;
  cheapestMonthlyUsd: number | null; // null = "Cost unavailable"
  toolsWithMutableTag: string[];
  toolsWithSuspiciousSecrets: string[];
  toolsNotComposeFile: string[]; // instaladores por script — no entran en el docker-compose combinado
  allVolumeNames: { slug: string; volumes: string[] }[];
}

export function aggregateStack(profiles: StackToolProfile[]): StackAggregate {
  const totalApplicationRamMb = profiles.reduce((sum, p) => sum + p.ram.applicationRamMb, 0);
  const isRamEstimated = profiles.some((p) => p.ram.isApplicationRamEstimated);
  const aiToolsWithVariableModelRam = profiles.filter((p) => p.ram.hasVariableModelRam).map((p) => p.slug);

  const storageDocumented = profiles.filter((p) => p.storageGb !== undefined);
  const totalStorageGb = storageDocumented.length > 0 ? storageDocumented.reduce((sum, p) => sum + (p.storageGb ?? 0), 0) : null;
  const toolsWithUnknownStorage = profiles.filter((p) => p.storageGb === undefined).map((p) => p.slug);

  const gpuRequiredTools = profiles.filter((p) => p.gpuNeed === "required").map((p) => p.slug);
  const gpuOptionalTools = profiles.filter((p) => p.gpuNeed === "optional_beneficial").map((p) => p.slug);

  const dependencyCounts: Record<DependencyKind, number> = {
    postgresql: 0,
    mysql_mariadb: 0,
    redis: 0,
    object_storage: 0,
    reverse_proxy: 0,
    authentication: 0,
    search_index: 0,
    message_queue: 0,
    external_api: 0,
    other_service: 0,
  };
  for (const p of profiles) {
    for (const dep of p.dependencies) dependencyCounts[dep]++;
  }
  const totalAdditionalServices = Object.values(dependencyCounts).reduce((a, b) => a + b, 0);

  const serviceCount = profiles.reduce((sum, p) => sum + p.imageCount, 0);

  const hostingCategory = profiles.length > 0 ? classifyHostingCategory(totalApplicationRamMb) : null;
  const matches = matchHostingTiers(hostingProviders, totalApplicationRamMb);
  const cheapestMonthlyUsd =
    profiles.length > 0
      ? matches
          .map((m) => m.tier?.monthlyUsdApprox)
          .filter((price): price is number => price !== undefined)
          .sort((a, b) => a - b)[0] ?? null
      : null;

  return {
    totalApplicationRamMb,
    isRamEstimated,
    aiToolsWithVariableModelRam,
    totalStorageGb,
    toolsWithUnknownStorage,
    gpuRequiredTools,
    gpuOptionalTools,
    dependencyCounts,
    totalAdditionalServices,
    serviceCount,
    hostingCategory,
    cheapestMonthlyUsd,
    toolsWithMutableTag: profiles.filter((p) => p.hasMutableTag).map((p) => p.slug),
    toolsWithSuspiciousSecrets: profiles.filter((p) => p.hasSuspiciousSecrets).map((p) => p.slug),
    toolsNotComposeFile: profiles.filter((p) => !p.isComposeFile).map((p) => p.slug),
    allVolumeNames: profiles.filter((p) => p.volumeNames.length > 0).map((p) => ({ slug: p.slug, volumes: p.volumeNames })),
  };
}

// --- STACK CHECK (Fase 8) ----------------------------------------------------

export type StackCheckSeverity = "ok" | "warning";

export interface StackCheckItem {
  severity: StackCheckSeverity;
  /** Clave para que la UI resuelva el texto localizado — nunca texto libre generado aquí. */
  code:
    | "ram_available"
    | "docker_image_identified"
    | "dependencies_detected"
    | "mutable_tag"
    | "manual_setup_needed"
    | "external_dependency"
    | "backup_not_documented"
    | "suspicious_secret";
  /** Slugs de las herramientas afectadas, para que la UI pueda listarlas. */
  toolSlugs: string[];
}

/** Convierte el agregado del stack en la lista de comprobaciones de la Fase 8 — nunca inventa un ✓ que no esté respaldado por los datos ya calculados arriba. */
export function computeStackCheck(profiles: StackToolProfile[], aggregate: StackAggregate): StackCheckItem[] {
  const items: StackCheckItem[] = [];

  items.push({ severity: "ok", code: "ram_available", toolSlugs: profiles.map((p) => p.slug) });

  const withImages = profiles.filter((p) => p.imageCount > 0).map((p) => p.slug);
  if (withImages.length > 0) items.push({ severity: "ok", code: "docker_image_identified", toolSlugs: withImages });

  if (aggregate.totalAdditionalServices > 0) {
    items.push({ severity: "ok", code: "dependencies_detected", toolSlugs: profiles.filter((p) => p.dependencies.length > 0).map((p) => p.slug) });
  }

  if (aggregate.toolsWithMutableTag.length > 0) {
    items.push({ severity: "warning", code: "mutable_tag", toolSlugs: aggregate.toolsWithMutableTag });
  }

  if (aggregate.toolsNotComposeFile.length > 0) {
    items.push({ severity: "warning", code: "manual_setup_needed", toolSlugs: aggregate.toolsNotComposeFile });
  }

  const externalDepTools = profiles.filter((p) => p.dependencies.includes("external_api")).map((p) => p.slug);
  if (externalDepTools.length > 0) {
    items.push({ severity: "warning", code: "external_dependency", toolSlugs: externalDepTools });
  }

  const withVolumes = profiles.filter((p) => p.volumeNames.length > 0).map((p) => p.slug);
  if (withVolumes.length > 0) {
    items.push({ severity: "warning", code: "backup_not_documented", toolSlugs: withVolumes });
  }

  if (aggregate.toolsWithSuspiciousSecrets.length > 0) {
    items.push({ severity: "warning", code: "suspicious_secret", toolSlugs: aggregate.toolsWithSuspiciousSecrets });
  }

  return items;
}

/** Re-exportado para que la UI liste las variables a configurar en el compose combinado (Fase 10) sin duplicar el regex. */
export { extractEnvPlaceholders };

// --- Solapamiento funcional entre herramientas -------------------------------

export interface FunctionalOverlapGroup {
  saas: string;
  toolNames: string[];
}

/**
 * Detecta herramientas que son alternativas entre sí — nunca una heurística
 * inventada de "compatibilidad": usa exclusivamente `replaces`, el mismo
 * dato curado ya mostrado en cada ficha/badge del catálogo (qué SaaS
 * sustituye cada herramienta). Si 2+ herramientas del conjunto reemplazan
 * al mismo SaaS, es una señal real de que probablemente no hacen falta
 * todas. Genérica en `T` para servir igual a `ToolCardData` (Stack Builder,
 * cliente) que a `OpenSourceTool` (detalle de un Stack curado, servidor) —
 * ambas ya tienen `name`/`replaces`.
 */
export function findFunctionalOverlaps<T extends { name: string; replaces: string[] }>(tools: T[]): FunctionalOverlapGroup[] {
  const toolNamesBySaas = new Map<string, string[]>();
  for (const tool of tools) {
    for (const saas of tool.replaces) {
      const names = toolNamesBySaas.get(saas) ?? [];
      names.push(tool.name);
      toolNamesBySaas.set(saas, names);
    }
  }
  return [...toolNamesBySaas.entries()]
    .filter(([, toolNames]) => toolNames.length > 1)
    .map(([saas, toolNames]) => ({ saas, toolNames }));
}
