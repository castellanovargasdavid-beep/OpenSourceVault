import { allTools, tools } from "@/data/tools";
import { categories } from "@/data/categories";
import type { ToolCategory } from "@/lib/types";

/**
 * Única fuente de verdad para cualquier estadística agregada del catálogo
 * (total de herramientas, desglose FOSS/Open-Core/Fair-code/Source-available,
 * Docker Ready, categorías...). Antes de que existiera este archivo, cada
 * página que necesitaba una de estas cifras la recalculaba a mano con su
 * propio `tools.filter(...)` — la homepage usaba una base, la página "Cómo
 * auditamos" otra en teoría idéntica pero duplicada línea por línea (mismo
 * riesgo de que alguien la actualice en un sitio y no en el otro), y
 * `CategoryGrid` calculaba el conteo por categoría a partir de `allTools`
 * (incluye herramientas "scheduled" aún no publicadas) mientras el resto del
 * sitio usaba `tools` (solo publicadas) — dos bases de cálculo distintas en
 * la misma homepage. Esta auditoría lo centraliza aquí: cualquier página o
 * componente que necesite una cifra agregada debe importarla de
 * `getCatalogStats()`/`catalogStats`, nunca recalcularla con su propio
 * `.filter()`.
 *
 * Reglas de negocio explícitas (para no repetir el bug de origen):
 * - `totalTools` cuenta SOLO herramientas publicadas (`tools`, ya filtradas
 *   por `isPublished()` en src/data/tools.ts) — nunca `allTools`. Una
 *   herramienta "scheduled" que todavía no llegó a su `publishDate` no es
 *   una herramienta que un visitante pueda ver hoy, así que no cuenta en
 *   ningún total mostrado como "esto es lo que tenemos ahora".
 * - El desglose por modelo de licencia NUNCA asume una clasificación: una
 *   herramienta sin `fossModel` fijado cae en `unknown`, no en `foss` ni en
 *   `openCore` por defecto. Open-Core y FOSS son categorías distintas y no
 *   se mezclan bajo la misma cifra.
 * - `totalCategories` cuenta categorías con al menos 1 herramienta publicada
 *   — no el total de la taxonomía (`categories.length`, que incluye
 *   categorías ya definidas pero todavía sin ninguna ficha publicada). Se
 *   expone también `totalCategoriesDefined` para quien de verdad necesite el
 *   tamaño completo de la taxonomía (p.ej. selects de formulario).
 */

export interface FossModelBreakdown {
  foss: number;
  openCore: number;
  fairCode: number;
  sourceAvailable: number;
  /** Herramientas sin `fossModel` fijado — nunca se reparten entre las demás por suposición. */
  unknown: number;
}

export interface CatalogStats {
  /** Herramientas publicadas y enlazables hoy — el único número que debería aparecer como "N herramientas" en cualquier página. */
  totalTools: number;
  /** "scheduled"/"coming_soon" que todavía no son visibles — nunca se suma a totalTools. */
  totalNotYetPublished: number;
  /** allTools.length (publicadas + futuras) — solo para uso interno/depuración, nunca como cifra de cara al usuario. */
  totalInCatalogFile: number;
  fossModelBreakdown: FossModelBreakdown;
  totalFoss: number;
  totalOpenCore: number;
  totalFairCode: number;
  totalSourceAvailable: number;
  totalUnknownLicenseModel: number;
  totalDockerReady: number;
  /** Distintas herramientas SaaS que el catálogo cubre (tool.replaces, deduplicado), solo entre herramientas publicadas. */
  totalSaasReplaced: number;
  /** Categorías con >=1 herramienta publicada — ver nota de la cabecera del archivo. */
  totalCategories: number;
  /** Tamaño completo de la taxonomía definida en categories.ts, tenga o no herramientas publicadas todavía. */
  totalCategoriesDefined: number;
  /** Conteo de herramientas PUBLICADAS por categoría — incluye categorías con 0. */
  toolCountByCategory: Record<ToolCategory, number>;
}

function computeCatalogStats(): CatalogStats {
  const fossModelBreakdown: FossModelBreakdown = {
    foss: 0,
    openCore: 0,
    fairCode: 0,
    sourceAvailable: 0,
    unknown: 0,
  };

  for (const tool of tools) {
    switch (tool.fossModel) {
      case "FOSS":
        fossModelBreakdown.foss++;
        break;
      case "OpenCore":
        fossModelBreakdown.openCore++;
        break;
      case "FairCode":
        fossModelBreakdown.fairCode++;
        break;
      case "SourceAvailable":
        fossModelBreakdown.sourceAvailable++;
        break;
      default:
        // Deliberado: sin `fossModel`, no se asume nada — cuenta como
        // "unknown", nunca se reparte hacia foss/openCore por defecto.
        fossModelBreakdown.unknown++;
    }
  }

  const toolCountByCategory = Object.fromEntries(categories.map((c) => [c.id, 0])) as Record<ToolCategory, number>;
  for (const tool of tools) {
    toolCountByCategory[tool.category] = (toolCountByCategory[tool.category] ?? 0) + 1;
  }

  const totalCategories = Object.values(toolCountByCategory).filter((count) => count > 0).length;

  const totalDockerReady = tools.filter((t) => t.tags.includes("docker-ready")).length;
  const totalSaasReplaced = new Set(tools.flatMap((t) => t.replaces)).size;

  return {
    totalTools: tools.length,
    totalNotYetPublished: allTools.length - tools.length,
    totalInCatalogFile: allTools.length,
    fossModelBreakdown,
    totalFoss: fossModelBreakdown.foss,
    totalOpenCore: fossModelBreakdown.openCore,
    totalFairCode: fossModelBreakdown.fairCode,
    totalSourceAvailable: fossModelBreakdown.sourceAvailable,
    totalUnknownLicenseModel: fossModelBreakdown.unknown,
    totalDockerReady,
    totalSaasReplaced,
    totalCategories,
    totalCategoriesDefined: categories.length,
    toolCountByCategory,
  };
}

/**
 * Precomputado una sola vez al importar el módulo (mismo patrón que
 * `export const tools = allTools.filter(isPublished)` en src/data/tools.ts)
 * — el catálogo no cambia dentro de un mismo build, así que no hay motivo
 * para recalcular esto en cada render.
 */
export const catalogStats: CatalogStats = computeCatalogStats();

/** Alias en forma de función para call sites que prefieren `getCatalogStats()` a importar la constante directamente — devuelve el mismo objeto ya calculado, no repite el cálculo. */
export function getCatalogStats(): CatalogStats {
  return catalogStats;
}
