import { getAllSaasSlugs, getSaasAlternatives, type SaasAlternativeGroup } from "@/lib/alternatives";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { isPublished, type OpenSourceTool } from "@/lib/types";
import { isSelfHostedEligible, isOpenSourceEligible, getIntentPage, INTENT_TYPES, MIN_ELIGIBLE_TOOLS, type IntentType } from "@/lib/intent-pages";
import { INTENT_PAGE_CONTENT } from "@/data/intent-pages";

/**
 * Backlog de cobertura editorial SaaS × intención — solo lectura, nunca
 * escribe contenido ni promueve nada a `src/data/intent-pages(.en).ts`.
 * Existe para responder "¿qué combinaciones merece la pena que alguien
 * revise?", nunca "¿qué combinaciones hay que publicar?".
 *
 * Separación conceptual, en este orden:
 *   1. Eligibility       -> isSelfHostedEligible/isOpenSourceEligible + MIN_ELIGIBLE_TOOLS (ya existen, reutilizados tal cual)
 *   2. Automated signals  -> ramSpreadMb / cutRatio, calculados aquí
 *   3. Human editorial review -> NUNCA automatizado, ver el aviso en CoverageState
 *   4. Published          -> solo cuando ya existe contenido curado a mano y sigue siendo elegible (getIntentPage)
 */
export type CoverageState =
  /** Ya existe contenido curado a mano en INTENT_PAGE_CONTENT Y sigue siendo elegible hoy — la página está viva. */
  | "published"
  /** Señal automática fuerte (ver COVERAGE_THRESHOLDS) — MERECE revisión humana, NO significa "crear esta página". */
  | "editorial-candidate"
  /** Elegible, pero la señal automática es débil — probablemente no hay ángulo editorial fuerte, pero no se descarta sin más contexto. */
  | "needs-editorial-signal"
  /** Elegible, pero la señal automática es nula (spread/cut = 0) — filtrar por esta intención no cambia nada observable. */
  | "not-worth-a-page"
  /** Menos de MIN_ELIGIBLE_TOOLS herramientas elegibles — no hay base de datos suficiente, punto. */
  | "insufficient-data";

/**
 * Umbrales de PRIORIZACIÓN, no de prueba. Un ramSpread o cutRatio por
 * encima del umbral es una señal de que puede haber un ángulo editorial
 * interesante — nunca demuestra que la página está justificada. La
 * justificación real (¿aporta contenido sustancialmente distinto del de la
 * página base? ¿hay datos verificables para sostenerlo? ¿evita
 * canibalización?) exige siempre revisión humana, y solo se convierte en
 * "published" cuando alguien escribe contenido a mano en
 * src/data/intent-pages(.en).ts — igual que las 6 páginas del piloto.
 *
 * Configurables a propósito: son heurísticas, no un contrato. Si mañana
 * 512MB deja de ser una señal útil, se cambia el número aquí sin rediseñar
 * el sistema ni tocar la lógica de elegibilidad/publicación.
 */
export const COVERAGE_THRESHOLDS = {
  /** RAM spread (max-min, MB) entre herramientas self-hosted-elegibles por encima del cual hay señal de variedad real de infraestructura (ej. Zoom: 256MB→2GB). */
  selfHostedRamSpreadMb: 512,
  /** Fracción (0-1) de herramientas self-hosted-elegibles que el filtro FOSS deja fuera, por encima de la cual hay señal de recorte real (ej. Slack: 4→2, 50%). */
  openSourceCutRatio: 0.3,
};

export interface CoverageRow {
  saasSlug: string;
  saasName: string;
  intent: IntentType;
  eligibleToolCount: number;
  /** Solo se calcula para self-hosted con >=MIN_ELIGIBLE_TOOLS elegibles; null en cualquier otro caso. */
  ramSpreadMb: number | null;
  /** Solo se calcula para open-source con >=MIN_ELIGIBLE_TOOLS elegibles; null en cualquier otro caso. */
  cutRatio: number | null;
  hasCuratedContent: boolean;
  isPublishedPage: boolean;
  state: CoverageState;
}

/**
 * Clasifica solo por el spread de RAM — función pura, exportada para poder
 * fijar con tests exactos los límites (0, justo por debajo del umbral, en
 * el umbral).
 */
export function classifySelfHostedSignal(ramSpreadMb: number): Exclude<CoverageState, "published" | "insufficient-data"> {
  if (ramSpreadMb === 0) return "not-worth-a-page";
  if (ramSpreadMb >= COVERAGE_THRESHOLDS.selfHostedRamSpreadMb) return "editorial-candidate";
  return "needs-editorial-signal";
}

/**
 * Clasifica solo por el cut ratio FOSS — función pura, misma razón que
 * classifySelfHostedSignal.
 */
export function classifyOpenSourceSignal(cutRatio: number): Exclude<CoverageState, "published" | "insufficient-data"> {
  if (cutRatio === 0) return "not-worth-a-page";
  if (cutRatio >= COVERAGE_THRESHOLDS.openSourceCutRatio) return "editorial-candidate";
  return "needs-editorial-signal";
}

function computeRamSpreadMb(eligibleTools: OpenSourceTool[]): number {
  const rams = eligibleTools.map((tool) => resolveToolResourceProfile(tool).minRamMb);
  return Math.max(...rams) - Math.min(...rams);
}

/**
 * Denominador del cut ratio: herramientas self-hosted-elegibles del grupo.
 * Fallback a "publicadas totales" solo en el caso límite en que una
 * herramienta FOSS esté excluida de self-hosted (dockerStatus ==
 * ARCHIVED_UPSTREAM) y por tanto el grupo no tenga ninguna self-hosted-
 * elegible pese a tener alguna open-source-elegible — no ocurre hoy en el
 * catálogo, pero evita una división por cero si llegara a pasar.
 */
function computeCutRatio(group: SaasAlternativeGroup, openSourceEligibleCount: number): number {
  const selfHostedEligibleCount = group.tools.filter(isSelfHostedEligible).length;
  const denominator = selfHostedEligibleCount > 0 ? selfHostedEligibleCount : group.tools.filter((tool) => isPublished(tool)).length;
  return denominator > 0 ? 1 - openSourceEligibleCount / denominator : 0;
}

/**
 * Fila del backlog para un (SaaS, intención). "published" se comprueba
 * contra getIntentPage en locale "es" — content.ts documenta explícitamente
 * que la versión EN debe reflejar las mismas claims, así que una locale
 * basta para saber si la página existe.
 */
export function computeCoverageRow(group: SaasAlternativeGroup, intent: IntentType): CoverageRow {
  const eligibleTools = group.tools.filter(intent === "self-hosted" ? isSelfHostedEligible : isOpenSourceEligible);
  const eligibleToolCount = eligibleTools.length;
  const isPublishedPage = getIntentPage(`${group.saasSlug}-${intent}`, "es") !== undefined;
  const hasCuratedContent = Boolean(INTENT_PAGE_CONTENT[`${group.saasName}→${intent}`]);

  if (eligibleToolCount < MIN_ELIGIBLE_TOOLS) {
    return { saasSlug: group.saasSlug, saasName: group.saasName, intent, eligibleToolCount, ramSpreadMb: null, cutRatio: null, hasCuratedContent, isPublishedPage, state: "insufficient-data" };
  }

  if (intent === "self-hosted") {
    const ramSpreadMb = computeRamSpreadMb(eligibleTools);
    const state = isPublishedPage ? "published" : classifySelfHostedSignal(ramSpreadMb);
    return { saasSlug: group.saasSlug, saasName: group.saasName, intent, eligibleToolCount, ramSpreadMb, cutRatio: null, hasCuratedContent, isPublishedPage, state };
  }

  const cutRatio = computeCutRatio(group, eligibleToolCount);
  const state = isPublishedPage ? "published" : classifyOpenSourceSignal(cutRatio);
  return { saasSlug: group.saasSlug, saasName: group.saasName, intent, eligibleToolCount, ramSpreadMb: null, cutRatio, hasCuratedContent, isPublishedPage, state };
}

/** Las 106 SaaS x 2 intenciones = hasta 212 filas — el backlog completo, nunca solo las candidatas. */
export function computeFullCoverage(): CoverageRow[] {
  const rows: CoverageRow[] = [];
  for (const saasSlug of getAllSaasSlugs()) {
    const group = getSaasAlternatives(saasSlug);
    if (!group) continue;
    for (const intent of INTENT_TYPES) {
      rows.push(computeCoverageRow(group, intent));
    }
  }
  return rows;
}
