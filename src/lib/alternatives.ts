import { tools } from "@/data/tools";
import { slugify } from "@/lib/utils";
import type { OpenSourceTool } from "@/lib/types";
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
