import { getToolBySlug } from "@/data/tools";
import { REPLACE_SAAS_NAMES, replaceMappingContent, type ReplaceFit } from "@/data/replace-mappings";
import { replaceMappingContentEn } from "@/data/replace-mappings.en";
import { slugify } from "@/lib/utils";
import type { OpenSourceTool } from "@/lib/types";
import type { Locale } from "@/i18n/config";

/**
 * Capa de unión de "Reemplaza mi SaaS": junta el contenido curado a mano de
 * src/data/replace-mappings(.en).ts con los datos REALES del catálogo
 * (src/data/tools.ts). Nunca confía ciegamente en el contenido escrito a
 * mano — si una entrada referencia una herramienta que ya no existe o cuyo
 * `replaces[]` ya no incluye ese SaaS (p.ej. tras una edición del catálogo),
 * se descarta en vez de mostrar una relación que dejó de ser cierta. Ver
 * scripts/validate-data.ts para la comprobación equivalente en build/CI.
 */

export interface ReplaceMappingEntry {
  tool: OpenSourceTool;
  fit: ReplaceFit;
  /** Ya en forma "Puede sustituir a {saas} para..." — ver ReplaceMappingContent. */
  useCase: string;
  limitation: string;
  /** true solo si existe de verdad /guias/migrar/{saas}/{tool} — el SaaS debe ser el reemplazo PRIMARIO (replaces[0]) de la herramienta, igual que exige esa página. */
  hasMigrationGuide: boolean;
}

export interface ReplaceMapping {
  saasSlug: string;
  saasName: string;
  entries: ReplaceMappingEntry[];
}

function hasMigrationGuideFor(tool: OpenSourceTool, saasName: string): boolean {
  return tool.replaces.length > 0 && slugify(tool.replaces[0]) === slugify(saasName);
}

function buildMappings(locale: Locale): Map<string, ReplaceMapping> {
  const content = locale === "en" ? replaceMappingContentEn : replaceMappingContent;
  const map = new Map<string, ReplaceMapping>();

  for (const saasName of REPLACE_SAAS_NAMES) {
    const saasSlug = slugify(saasName);
    const entries: ReplaceMappingEntry[] = [];

    for (const [key, value] of Object.entries(content)) {
      const separatorIndex = key.indexOf("→");
      const entrySaasName = key.slice(0, separatorIndex);
      const toolSlug = key.slice(separatorIndex + 1);
      if (entrySaasName !== saasName) continue;

      const tool = getToolBySlug(toolSlug);
      if (!tool) continue; // la herramienta ya no existe o no está publicada
      if (!tool.replaces.includes(saasName)) continue; // el catálogo ya no confirma esta relación

      entries.push({
        tool,
        fit: value.fit,
        useCase: value.useCase,
        limitation: value.limitation,
        hasMigrationGuide: hasMigrationGuideFor(tool, saasName),
      });
    }

    if (entries.length > 0) {
      // 'good' primero, luego 'partial', luego 'specialized' — el usuario ve
      // primero la opción más directa, no el orden en que se escribió el archivo.
      const fitOrder: Record<ReplaceFit, number> = { good: 0, partial: 1, specialized: 2 };
      entries.sort((a, b) => fitOrder[a.fit] - fitOrder[b.fit]);
      map.set(saasSlug, { saasSlug, saasName, entries });
    }
  }

  return map;
}

const cache = new Map<Locale, Map<string, ReplaceMapping>>();

function getMappings(locale: Locale): Map<string, ReplaceMapping> {
  let mappings = cache.get(locale);
  if (!mappings) {
    mappings = buildMappings(locale);
    cache.set(locale, mappings);
  }
  return mappings;
}

/** Slugs con contenido curado suficiente para tener una página /replace/{slug} — nunca todos los `getAllSaasSlugs()` del catálogo, solo los de REPLACE_SAAS_NAMES que de verdad resolvieron al menos una entrada real. */
export function getAllReplaceSlugs(): string[] {
  return Array.from(getMappings("es").keys());
}

export function getReplaceMapping(saasSlug: string, locale: Locale): ReplaceMapping | undefined {
  return getMappings(locale).get(saasSlug);
}

/** Todos los mappings disponibles, en el orden curado de REPLACE_SAAS_NAMES — para el selector del wizard "¿Qué SaaS utilizas?". */
export function getAllReplaceMappings(locale: Locale): ReplaceMapping[] {
  const mappings = getMappings(locale);
  return REPLACE_SAAS_NAMES.map((name) => mappings.get(slugify(name))).filter((m): m is ReplaceMapping => m !== undefined);
}
