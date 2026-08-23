import { tools } from "@/data/tools";
import { slugify } from "@/lib/utils";
import type { OpenSourceTool } from "@/lib/types";

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
