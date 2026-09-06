import { tools } from "@/data/tools";
import { slugify } from "@/lib/utils";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import type { OpenSourceTool, ToolDifficulty } from "@/lib/types";
import type { Locale } from "@/i18n/config";

export interface SaasAlternativeGroup {
  saasSlug: string;
  saasName: string;
  tools: OpenSourceTool[];
}

function buildGroups(): Map<string, SaasAlternativeGroup> {
  const groups = new Map<string, SaasAlternativeGroup>();

  for (const tool of tools) {
    for (const saasName of tool.replaces) {
      const saasSlug = slugify(saasName);
      const existing = groups.get(saasSlug);
      if (existing) {
        existing.tools.push(tool);
      } else {
        groups.set(saasSlug, { saasSlug, saasName, tools: [tool] });
      }
    }
  }

  return groups;
}

let cachedGroups: Map<string, SaasAlternativeGroup> | null = null;

function getGroups(): Map<string, SaasAlternativeGroup> {
  if (!cachedGroups) {
    cachedGroups = buildGroups();
  }
  return cachedGroups;
}

export function getAllSaasSlugs(): string[] {
  return Array.from(getGroups().keys());
}

export function getSaasAlternatives(saasSlug: string): SaasAlternativeGroup | undefined {
  return getGroups().get(saasSlug);
}

/**
 * URL indexable de la página "alternativas a {saas}", distinta por locale
 * (/alternativas/notion en es, /en/alternatives/notion en en) para no
 * mezclar palabras en español en la URL en inglés.
 */
export function getAlternativeHref(saasName: string, locale: Locale): string {
  const slug = slugify(saasName);
  return locale === "en" ? `/en/alternatives/${slug}` : `/alternativas/${slug}`;
}

/**
 * Etiquetas de la tabla comparativa: todas se calculan a partir de datos ya
 * verificados del catálogo (RAM, licencia, estrellas de GitHub, tags) — nunca
 * una opinión editorial. "mostPopular"/"lightestRam" solo aparecen sobre la
 * herramienta que de verdad tiene el valor más alto/bajo del grupo.
 */
export type AlternativeBadgeCode = "lightestRam" | "pureFoss" | "mostPopular" | "oneClickDeploy";

export interface AlternativeTableRow {
  tool: OpenSourceTool;
  difficulty: ToolDifficulty;
  minRamMb: number;
  dockerReady: boolean;
  badgeCodes: AlternativeBadgeCode[];
}

/**
 * Mismo criterio de orden que usa SaaS Exit para elegir la alternativa
 * "principal": destacadas primero, luego estrellas de GitHub reales como
 * desempate. Ninguno de los dos criterios se inventa aquí.
 */
export function sortAlternativeTools(list: OpenSourceTool[]): OpenSourceTool[] {
  return [...list].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    return (b.starsCount ?? 0) - (a.starsCount ?? 0);
  });
}

export function buildAlternativeTableRows(list: OpenSourceTool[]): AlternativeTableRow[] {
  const sorted = sortAlternativeTools(list);
  const profiles = sorted.map((tool) => ({ tool, ...resolveToolResourceProfile(tool) }));
  const minRam = Math.min(...profiles.map((p) => p.minRamMb));
  const maxStars = Math.max(...sorted.map((tool) => tool.starsCount ?? 0));

  return profiles.map(({ tool, difficulty, minRamMb }) => {
    const badgeCodes: AlternativeBadgeCode[] = [];
    if (minRamMb === minRam) badgeCodes.push("lightestRam");
    if (tool.fossModel === "FOSS") badgeCodes.push("pureFoss");
    if (maxStars > 0 && (tool.starsCount ?? 0) === maxStars) badgeCodes.push("mostPopular");
    if (tool.tags.includes("1-click-deploy")) badgeCodes.push("oneClickDeploy");
    return { tool, difficulty, minRamMb, dockerReady: tool.tags.includes("docker-ready"), badgeCodes };
  });
}
