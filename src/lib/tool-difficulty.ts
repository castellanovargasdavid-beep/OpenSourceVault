import type { OpenSourceTool, ToolDifficulty } from "@/lib/types";

/**
 * Cuenta los servicios de nivel superior bajo `services:` en un
 * docker-compose.yml. Deliberadamente ingenuo (basado en indentación, no un
 * parser YAML real) — suficiente para clasificar dificultad, no para validar
 * el compose.
 */
function countComposeServices(dockerCompose: string): number {
  const lines = dockerCompose.split("\n");
  let inServices = false;
  let count = 0;
  for (const line of lines) {
    if (/^services:\s*$/.test(line)) {
      inServices = true;
      continue;
    }
    if (!inServices) continue;
    if (/^\S/.test(line)) {
      // Volvimos a un nivel superior (0 espacios) sin ser un servicio: fin del bloque services.
      inServices = false;
      continue;
    }
    if (/^ {2}[A-Za-z0-9_.-]+:\s*$/.test(line)) count++;
  }
  return count;
}

const HEAVY_DB_PATTERN = /clickhouse|elasticsearch|kafka|rabbitmq/i;
const FILE_BASED_DB_PATTERN = /sqlite|none|embedded|file-based|p2p/i;

/**
 * Resuelve el nivel de dificultad y la RAM mínima recomendada de una
 * herramienta. Usa `difficulty`/`minRamMb` si ya vienen fijados a mano en el
 * catálogo; si no, los infiere de la cantidad de servicios en su
 * docker-compose.yml y de su motor de base de datos — así el catálogo entero
 * queda tipado sin tener que anotar a mano cada una de las ~150 herramientas.
 */
export function resolveToolResourceProfile(
  tool: Pick<OpenSourceTool, "dockerCompose" | "database" | "difficulty" | "minRamMb">
): { difficulty: ToolDifficulty; minRamMb: number } {
  if (tool.difficulty && tool.minRamMb) {
    return { difficulty: tool.difficulty, minRamMb: tool.minRamMb };
  }

  const services = countComposeServices(tool.dockerCompose);
  const heavyDb = HEAVY_DB_PATTERN.test(tool.database ?? "");

  if (services === 0) {
    // Sin docker-compose "simple": instaladores por script propio (Coolify,
    // Dokku, Sentry self-hosted, SigNoz...) que gestionan su propia
    // plataforma Docker/host — siempre la opción más pesada del catálogo.
    return { difficulty: "advanced", minRamMb: 4096 };
  }
  if (heavyDb || services >= 3) {
    return { difficulty: "advanced", minRamMb: 2048 };
  }
  if (services === 2) {
    return { difficulty: "intermediate", minRamMb: 1024 };
  }

  const isFileBasedDb = !tool.database || FILE_BASED_DB_PATTERN.test(tool.database);
  return { difficulty: "beginner", minRamMb: isFileBasedDb ? 256 : 512 };
}

export const difficultyMeta: Record<ToolDifficulty, { emoji: string; badgeClass: string; pillActiveClass: string }> = {
  beginner: {
    emoji: "🟢",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
    pillActiveClass: "border-emerald-600 bg-emerald-600 text-white",
  },
  intermediate: {
    emoji: "🟡",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-800",
    pillActiveClass: "border-amber-500 bg-amber-500 text-white",
  },
  advanced: {
    emoji: "🔴",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
    pillActiveClass: "border-rose-600 bg-rose-600 text-white",
  },
};

/** 256 -> "256MB", 1024 -> "1GB", 1536 -> "1.5GB". */
export function formatMinRam(minRamMb: number): string {
  if (minRamMb < 1024) return `${minRamMb}MB`;
  const gb = minRamMb / 1024;
  return `${Number.isInteger(gb) ? gb : gb.toFixed(1)}GB`;
}
