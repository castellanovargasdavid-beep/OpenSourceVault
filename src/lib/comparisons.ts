import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import type { OpenSourceTool } from "@/lib/types";

export interface ToolComparison {
  pairSlug: string;
  toolA: OpenSourceTool;
  toolB: OpenSourceTool;
  /** Nombres de SaaS que ambas herramientas reemplazan en común */
  sharedSaas: string[];
}

function buildComparisons(): Map<string, ToolComparison> {
  const map = new Map<string, ToolComparison>();

  for (const saasSlug of getAllSaasSlugs()) {
    const group = getSaasAlternatives(saasSlug);
    if (!group || group.tools.length < 2) continue;

    for (let i = 0; i < group.tools.length; i++) {
      for (let j = i + 1; j < group.tools.length; j++) {
        const [toolA, toolB] = [group.tools[i], group.tools[j]].sort((a, b) =>
          a.slug.localeCompare(b.slug)
        );
        const pairSlug = `${toolA.slug}-vs-${toolB.slug}`;
        const existing = map.get(pairSlug);
        if (existing) {
          if (!existing.sharedSaas.includes(group.saasName)) {
            existing.sharedSaas.push(group.saasName);
          }
        } else {
          map.set(pairSlug, { pairSlug, toolA, toolB, sharedSaas: [group.saasName] });
        }
      }
    }
  }

  return map;
}

let cachedComparisons: Map<string, ToolComparison> | null = null;

function getComparisons(): Map<string, ToolComparison> {
  if (!cachedComparisons) {
    cachedComparisons = buildComparisons();
  }
  return cachedComparisons;
}

export function getAllComparisonSlugs(): string[] {
  return Array.from(getComparisons().keys());
}

export function getComparisonBySlug(pairSlug: string): ToolComparison | undefined {
  return getComparisons().get(pairSlug);
}

export function getComparisonsForTool(toolSlug: string): ToolComparison[] {
  return Array.from(getComparisons().values()).filter(
    (c) => c.toolA.slug === toolSlug || c.toolB.slug === toolSlug
  );
}
