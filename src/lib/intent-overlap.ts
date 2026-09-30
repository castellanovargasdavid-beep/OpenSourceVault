import { getAllSaasSlugs, getSaasAlternatives } from "@/lib/alternatives";
import { eligibleToolsFor } from "@/lib/intent-coverage";
import { INTENT_TYPES, MIN_ELIGIBLE_TOOLS, type IntentType } from "@/lib/intent-pages";
import type { OpenSourceTool } from "@/lib/types";

/**
 * Solapamiento de herramientas entre páginas candidatas del backlog —
 * responde una pregunta distinta a intent-coverage.ts: no "¿es esta
 * combinación una señal fuerte?", sino "¿dos candidatas cuentan, sin darnos
 * cuenta, la misma historia porque comparten casi todas sus herramientas?"
 * (ej. New Relic-self-hosted ⊂ Datadog-self-hosted, ambas con SigNoz+Beszel;
 * Zapier-self-hosted y Make-self-hosted con exactamente n8n+Activepieces).
 *
 * IMPORTANTE — esto NUNCA clasifica dos páginas como "duplicadas" ni
 * decide automáticamente cuál publicar. Produce datos estructurales
 * (containment exacto en ambos sentidos, si es el mismo SaaS) para que la
 * decisión de investigar juntas / fusionar / mantener ambas siga siendo
 * editorial — ver OverlapRelation para el porqué de cada etiqueta.
 */

export interface CandidateRef {
  saasSlug: string;
  saasName: string;
  intent: IntentType;
}

export interface CandidateToolSet extends CandidateRef {
  tools: OpenSourceTool[];
}

export type OverlapRelation =
  /** Alguna herramienta compartida, pero no alcanza ninguno de los otros tres casos. */
  | "low-overlap"
  /** Un conjunto está TOTALMENTE contenido en el otro (containment=100% en un lado), o el solapamiento parcial supera OVERLAP_THRESHOLDS.partialStrongSubsetContainment. Nunca significa "borra la más pequeña" — solo que merece revisión conjunta. */
  | "strong-subset"
  /** Mismo conjunto de herramientas elegibles en ambos sentidos (containment=100% en los dos lados). */
  | "near-identical"
  /** Mismo SaaS, distinta intención (self-hosted vs. open-source) — estructuralmente normal en esta arquitectura, ya que open-source suele ser subconjunto de self-hosted por construcción. La decisión de si ambas páginas merecen existir depende del CONTENIDO en prosa, no de este dato — por eso se etiqueta aparte de strong-subset/near-identical en vez de reusar esas etiquetas. */
  | "same-tools-different-intent";

/**
 * Umbral de PRIORIZACIÓN, no de prueba — igual que COVERAGE_THRESHOLDS.
 * Solo entra en juego cuando NINGÚN conjunto está totalmente contenido en
 * el otro (containment=100% en ambos lados ya se clasifica sin necesitar
 * este número). Configurable: si 50% deja de ser útil, se cambia aquí sin
 * tocar la lógica de clasificación.
 */
export const OVERLAP_THRESHOLDS = {
  partialStrongSubsetContainment: 0.5,
};

export interface OverlapPair {
  a: CandidateRef;
  b: CandidateRef;
  /** Nombres de herramienta, para lectura directa en el informe — nunca solo el recuento. */
  sharedTools: string[];
  toolCountA: number;
  toolCountB: number;
  /** Fracción (0-1) de las herramientas de A que también están en B. */
  containmentA: number;
  /** Fracción (0-1) de las herramientas de B que también están en A. */
  containmentB: number;
  sameSaas: boolean;
  relation: OverlapRelation;
}

export interface ToolFanout {
  toolId: string;
  toolName: string;
  candidates: CandidateRef[];
}

/**
 * Clasifica un par ya con los containment calculados — función pura,
 * separada de computeOverlapPair para poder fijar con tests exactos los
 * límites (justo en el umbral, justo por debajo, subconjunto total en cada
 * dirección, mismo SaaS).
 */
export function classifyOverlap(containmentA: number, containmentB: number, sameSaas: boolean): OverlapRelation {
  if (sameSaas) return "same-tools-different-intent";
  if (containmentA === 1 && containmentB === 1) return "near-identical";
  if (containmentA === 1 || containmentB === 1) return "strong-subset";
  if (Math.max(containmentA, containmentB) >= OVERLAP_THRESHOLDS.partialStrongSubsetContainment) return "strong-subset";
  return "low-overlap";
}

function toRef(candidate: CandidateToolSet): CandidateRef {
  return { saasSlug: candidate.saasSlug, saasName: candidate.saasName, intent: candidate.intent };
}

/**
 * Relación de solapamiento entre dos candidatas concretas — null si no
 * comparten ninguna herramienta (no se reporta, no es una relación).
 */
export function computeOverlapPair(a: CandidateToolSet, b: CandidateToolSet): OverlapPair | null {
  const idsB = new Set(b.tools.map((tool) => tool.id));
  const shared = a.tools.filter((tool) => idsB.has(tool.id));
  if (shared.length === 0) return null;

  const containmentA = shared.length / a.tools.length;
  const containmentB = shared.length / b.tools.length;
  const sameSaas = a.saasName === b.saasName;

  return {
    a: toRef(a),
    b: toRef(b),
    sharedTools: shared.map((tool) => tool.name),
    toolCountA: a.tools.length,
    toolCountB: b.tools.length,
    containmentA,
    containmentB,
    sameSaas,
    relation: classifyOverlap(containmentA, containmentB, sameSaas),
  };
}

/**
 * Todas las relaciones de solapamiento dentro de un conjunto de candidatas
 * — función pura sobre datos ya construidos, para poder testear con
 * conjuntos sintéticos pequeños (ver tests/intent-overlap.test.ts) sin
 * depender del catálogo real.
 */
export function pairwiseOverlaps(candidates: CandidateToolSet[]): OverlapPair[] {
  const pairs: OverlapPair[] = [];
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const pair = computeOverlapPair(candidates[i], candidates[j]);
      if (pair) pairs.push(pair);
    }
  }
  return pairs;
}

/**
 * Fan-out por herramienta: en cuántas candidatas (y cuáles) aparece cada
 * herramienta — solo las que aparecen en >=2, que es lo único accionable
 * (una herramienta en una sola candidata no es una señal de solapamiento).
 */
export function toolFanout(candidates: CandidateToolSet[]): ToolFanout[] {
  const byTool = new Map<string, { toolName: string; candidates: CandidateRef[] }>();
  for (const candidate of candidates) {
    for (const tool of candidate.tools) {
      const entry = byTool.get(tool.id) ?? { toolName: tool.name, candidates: [] };
      entry.candidates.push(toRef(candidate));
      byTool.set(tool.id, entry);
    }
  }
  return Array.from(byTool.entries())
    .map(([toolId, { toolName, candidates: refs }]) => ({ toolId, toolName, candidates: refs }))
    .filter((entry) => entry.candidates.length >= 2)
    .sort((a, b) => b.candidates.length - a.candidates.length || a.toolName.localeCompare(b.toolName));
}

/**
 * Universo de candidatas comparables del catálogo real: cualquier (SaaS,
 * intención) que ya cumple MIN_ELIGIBLE_TOOLS — comparar "insufficient-data"
 * no tiene sentido, ahí no hay página real con la que nada pueda solapar.
 * Deliberadamente NO se restringe a un estado concreto del backlog
 * (editorial-candidate, published...): una página ya publicada también
 * puede solapar con una candidata nueva, y eso es información útil.
 */
function buildCandidateUniverse(): CandidateToolSet[] {
  const universe: CandidateToolSet[] = [];
  for (const saasSlug of getAllSaasSlugs()) {
    const group = getSaasAlternatives(saasSlug);
    if (!group) continue;
    for (const intent of INTENT_TYPES) {
      const tools = eligibleToolsFor(group, intent);
      if (tools.length >= MIN_ELIGIBLE_TOOLS) {
        universe.push({ saasSlug: group.saasSlug, saasName: group.saasName, intent, tools });
      }
    }
  }
  return universe;
}

/** Todas las relaciones de solapamiento del catálogo real — para el informe CLI. */
export function computeAllOverlapPairs(): OverlapPair[] {
  return pairwiseOverlaps(buildCandidateUniverse());
}

/** Fan-out de herramientas del catálogo real — para el informe CLI. */
export function computeToolFanout(): ToolFanout[] {
  return toolFanout(buildCandidateUniverse());
}
