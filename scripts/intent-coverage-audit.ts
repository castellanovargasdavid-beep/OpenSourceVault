/**
 * Backlog de cobertura editorial para las páginas long-tail de intención
 * (/alternativas/{saas}-self-hosted, /alternativas/{saas}-open-source) —
 * `npm run audit:intent-coverage`.
 *
 * Esto es un INFORME para revisión editorial humana, no una lista de
 * páginas a crear. "editorial-candidate" significa "los datos muestran una
 * señal objetiva interesante, revísalo a mano" — nunca "esta página debería
 * existir". Ninguna fila de este informe se convierte en página sola: una
 * página solo nace cuando alguien escribe contenido a mano en
 * src/data/intent-pages(.en).ts, exactamente como las 6 del piloto.
 *
 * Por eso este script:
 *   - Solo lee datos (getAllSaasSlugs, getSaasAlternatives, tools.ts) y
 *     escribe en consola. No toca ningún archivo, no genera rutas, no
 *     modifica el catálogo ni src/data/intent-pages(.en).ts.
 *   - SIEMPRE sale con código 0. No es un gate de CI como validate-data.ts
 *     o deployment-audit.ts — convertirlo en bloqueante empujaría hacia
 *     "hay que resolver todas las filas", que es justo la generación
 *     masiva que este sistema existe para evitar.
 *   - No calcula ningún KPI de "% del catálogo cubierto". El objetivo de
 *     este backlog es que cada página publicada merezca existir, no
 *     maximizar cuántas hay.
 *
 * También imprime un OVERLAP SUMMARY (ver src/lib/intent-overlap.ts): qué
 * herramientas se repiten entre varias candidatas y qué relación estructural
 * hay entre cada par que comparte alguna (low-overlap/strong-subset/
 * near-identical/same-tools-different-intent). Es la misma filosofía que el
 * resto del script: señal para revisión humana, nunca una regla que
 * descarte páginas automáticamente ni un score compuesto.
 */
import { computeFullCoverage, COVERAGE_THRESHOLDS, type CoverageRow, type CoverageState } from "../src/lib/intent-coverage";
import { computeAllOverlapPairs, computeToolFanout, OVERLAP_THRESHOLDS, type CandidateRef, type OverlapPair } from "../src/lib/intent-overlap";
import { formatMinRam } from "../src/lib/tool-difficulty";

const STATE_ORDER: CoverageState[] = ["published", "editorial-candidate", "needs-editorial-signal", "not-worth-a-page", "insufficient-data"];

const STATE_LABEL: Record<CoverageState, string> = {
  published: "PUBLISHED — contenido editorial curado y publicado",
  "editorial-candidate": "EDITORIAL-CANDIDATE — señal automática fuerte, pendiente de revisión humana",
  "needs-editorial-signal": "NEEDS-EDITORIAL-SIGNAL — elegible, pero la señal automática es débil",
  "not-worth-a-page": "NOT-WORTH-A-PAGE — elegible, pero la intención no cambia nada observable",
  "insufficient-data": "INSUFFICIENT-DATA — menos del mínimo de herramientas elegibles",
};

function formatSignal(row: CoverageRow): string {
  if (row.intent === "self-hosted") {
    return row.ramSpreadMb === null ? "—" : `RAM spread ${formatMinRam(row.ramSpreadMb)}`;
  }
  return row.cutRatio === null ? "—" : `cut ratio ${Math.round(row.cutRatio * 100)}%`;
}

function formatCandidate(ref: CandidateRef): string {
  return `${ref.saasName}-${ref.intent}`;
}

const OVERLAP_RELATION_LABEL: Record<OverlapPair["relation"], string> = {
  "near-identical": "near-identical — mismo conjunto de herramientas en ambos sentidos",
  "strong-subset": "strong-subset — un conjunto está total o sustancialmente contenido en el otro",
  "same-tools-different-intent": "same-tools-different-intent — mismo SaaS, self-hosted vs. open-source",
  "low-overlap": "low-overlap — comparten alguna herramienta, sin más",
};

/**
 * Muestra primero las relaciones más accionables (near-identical/strong-subset,
 * donde SÍ conviene revisar si conviene investigar juntas o descartar una),
 * dejando same-tools-different-intent (estructuralmente normal) y
 * low-overlap (rara vez accionable) al final — nunca oculta ninguna, solo
 * ordena para que lo más urgente se lea primero.
 */
const OVERLAP_RELATION_ORDER: OverlapPair["relation"][] = ["near-identical", "strong-subset", "same-tools-different-intent", "low-overlap"];

function printOverlapSection(): void {
  const fanout = computeToolFanout();
  const pairs = computeAllOverlapPairs();

  console.log("\n\nOVERLAP SUMMARY");
  console.log("Señal de PRIORIZACIÓN para revisión editorial — nunca clasifica dos páginas como duplicadas ni decide automáticamente cuál publicar.");
  console.log(`Umbral configurado: solapamiento parcial >= ${Math.round(OVERLAP_THRESHOLDS.partialStrongSubsetContainment * 100)}% en al menos un sentido -> strong-subset (además del caso de contención total al 100%).\n`);

  console.log(`Tools shared by multiple candidates (fan-out >= 2, ${fanout.length} herramientas)`);
  console.log("-----------------------------------------------------------------------------");
  if (fanout.length === 0) {
    console.log("  (ninguna herramienta aparece en más de una candidata hoy)");
  }
  for (const entry of fanout) {
    const candidates = entry.candidates.map(formatCandidate).join(", ");
    console.log(`  ${entry.toolName.padEnd(24)} ${entry.candidates.length} candidates (${candidates})`);
  }

  console.log(`\nCandidate relationships (${pairs.length} pares con >=1 herramienta compartida — solo se listan pares con solapamiento real)`);
  console.log("-----------------------------------------------------------------------------------------------------------------------");
  if (pairs.length === 0) {
    console.log("  (ninguna relación de solapamiento hoy)");
  }
  const sorted = [...pairs].sort((a, b) => OVERLAP_RELATION_ORDER.indexOf(a.relation) - OVERLAP_RELATION_ORDER.indexOf(b.relation) || formatCandidate(a.a).localeCompare(formatCandidate(b.a)));
  for (const pair of sorted) {
    console.log(`\n${formatCandidate(pair.a)} <-> ${formatCandidate(pair.b)}`);
    console.log(`  relation: ${OVERLAP_RELATION_LABEL[pair.relation]}`);
    console.log(`  shared: ${pair.sharedTools.join(", ")}`);
    console.log(`  containment: ${formatCandidate(pair.a)} ${Math.round(pair.containmentA * 100)}% (${pair.sharedTools.length}/${pair.toolCountA}) / ${formatCandidate(pair.b)} ${Math.round(pair.containmentB * 100)}% (${pair.sharedTools.length}/${pair.toolCountB})`);
  }

  console.log("\nRecordatorio: compartir herramientas NUNCA significa automáticamente \"página duplicada\" — same-tools-different-intent es la arquitectura normal del sistema (self-hosted/open-source del mismo SaaS). La decisión de investigar juntas, fusionar o mantener ambas sigue siendo editorial.");
}

function main(): void {
  const rows = computeFullCoverage();

  console.log("EDITORIAL COVERAGE / INTENT BACKLOG");
  console.log(`Total combinaciones (SaaS x intención): ${rows.length}\n`);

  console.log("Umbrales configurados (heurísticas de PRIORIZACIÓN, no prueba de que una página esté justificada):");
  console.log(`  self-hosted: ramSpreadMb >= ${COVERAGE_THRESHOLDS.selfHostedRamSpreadMb} -> señal fuerte`);
  console.log(`  open-source: cutRatio >= ${Math.round(COVERAGE_THRESHOLDS.openSourceCutRatio * 100)}% -> señal fuerte`);
  console.log("  Un ramSpread/cutRatio alto NUNCA demuestra por sí solo que la página merece existir.\n");

  console.log("Resumen por estado:");
  const counts: Record<CoverageState, number> = { published: 0, "editorial-candidate": 0, "needs-editorial-signal": 0, "not-worth-a-page": 0, "insufficient-data": 0 };
  for (const row of rows) counts[row.state]++;
  for (const state of STATE_ORDER) {
    console.log(`  ${STATE_LABEL[state]}: ${counts[state]}`);
  }

  console.log("\n| SaaS | Intent | Nº herramientas elegibles | Señal automática | Estado |");
  console.log("|---|---|---|---|---|");

  for (const state of STATE_ORDER) {
    const inState = rows.filter((row) => row.state === state);
    if (inState.length === 0) continue;
    console.log(`\n-- ${STATE_LABEL[state]} (${inState.length}) --`);
    for (const row of inState.sort((a, b) => a.saasName.localeCompare(b.saasName) || a.intent.localeCompare(b.intent))) {
      console.log(`| ${row.saasName} | ${row.intent} | ${row.eligibleToolCount} | ${formatSignal(row)} | ${row.state} |`);
    }
  }

  console.log("\nRecordatorio: este informe no crea páginas, no modifica el catálogo, no genera rutas.");
  console.log("Nunca leas \"editorial-candidate\" como \"crear esta página\" — significa \"revisar a mano si hay contenido diferencial real\".");
  console.log("Evaluar si una página YA publicada merece seguir viva es responsabilidad humana (Search Console, canibalización), no de este script.");

  printOverlapSection();
}

main();
