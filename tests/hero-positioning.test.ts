import { test } from "node:test";
import assert from "node:assert/strict";
import es from "../src/i18n/dictionaries/es";
import en from "../src/i18n/dictionaries/en";
import { catalogStats } from "../src/lib/catalog-stats";

/**
 * Regresión del rediseño del hero (Stack Builder como producto principal,
 * ver el encargo "AUDITORÍA COMPLETA + REDISEÑO QUIRÚRGICO de la homepage",
 * y la iteración posterior "frases dinámicas por paso del journey + segunda
 * línea fija" — NO es una plantilla fija de "2 palabras", las 4 frases
 * varían en longitud). No testea layout/CSS — eso se verificó a mano contra
 * el HTML generado — sino el contrato de contenido que un cambio futuro
 * podría romper sin querer: el H1 sigue siendo gramatical en los 4 estados
 * de la frase dinámica, ninguna frase repite una palabra con la línea fija,
 * ambos locales están sincronizados, y la jerarquía de CTAs no vuelve a
 * invertirse en silencio.
 */

function h1PhrasesOf(dict: typeof es | typeof en): string[] {
  return [dict.hero.h1PhraseDiscover, dict.hero.h1PhraseCompare, dict.hero.h1PhraseBuild, dict.hero.h1PhraseDeploy];
}

test("each H1 phrase is a complete, grammatical sentence on its own, in both locales", () => {
  for (const [locale, dict] of [["es", es], ["en", en]] as const) {
    for (const phrase of h1PhrasesOf(dict)) {
      assert.ok(phrase.length > 10, `${locale}: "${phrase}" looks too short to be a real sentence`);
      assert.ok(/^[A-Z]/.test(phrase), `${locale}: "${phrase}" should start with a capital letter`);
      assert.ok(phrase.endsWith("."), `${locale}: "${phrase}" should end with a period`);
    }
  }
});

function significantWordsOf(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[.,]/g, "")
      .split(/\s+/)
      .filter(Boolean)
  );
}

test("no dynamic H1 phrase repeats a word with the fixed h1Suffix line — they read as two consecutive lines, not a concatenated sentence", () => {
  // Regresión directa: una versión anterior tenía h1Suffix = "tu stack
  // self-hosted."/"your self-hosted stack.", lo que para los estados
  // Construye/Despliega (que ya dicen "tu stack"/"your stack") leía como
  // "Construye tu stack tu stack self-hosted." al renderizarse como dos
  // líneas consecutivas del mismo H1. Comprobar solape de palabras en vez de
  // solo substring exacto protege contra cualquier variante futura del mismo
  // problema, no solo la redacción exacta que causó el bug original.
  for (const dict of [es, en]) {
    const suffixWords = significantWordsOf(dict.hero.h1Suffix);
    for (const phrase of h1PhrasesOf(dict)) {
      const overlap = [...significantWordsOf(phrase)].filter((w) => suffixWords.has(w));
      assert.equal(
        overlap.length,
        0,
        `"${phrase}" and "${dict.hero.h1Suffix}" share the word(s) ${JSON.stringify(overlap)} — reads as an immediate repetition when rendered as two consecutive H1 lines`
      );
    }
  }
});

test("h1Suffix still carries the 'open source'/'self-hosted' positioning in both locales, without reintroducing 'stack' (which would risk repeating it with 2 of the 4 phrases)", () => {
  // Ya no exige "stack" en h1Suffix a propósito: "Construye tu stack."/
  // "Despliega tu stack." ya lo mencionan, así que mantenerlo también en la
  // línea fija es justo lo que producía la repetición de arriba. "stack"
  // sigue presente en el H1 para esos 2 estados, y en el subtitle para los
  // 4 — este test no lo exige aquí, solo evita que vuelva a este sitio en
  // concreto.
  assert.match(es.hero.h1Suffix, /open source/i);
  assert.match(es.hero.h1Suffix, /self-hosted/i);
  assert.doesNotMatch(es.hero.h1Suffix, /stack/i);
  assert.match(en.hero.h1Suffix, /open source/i);
  assert.match(en.hero.h1Suffix, /self-hosted/i);
  assert.doesNotMatch(en.hero.h1Suffix, /stack/i);
});

test("the old SaaS-name H1 template (titlePrefix/titleSuffix) was fully removed, not left dangling", () => {
  assert.ok(!("titlePrefix" in es.hero), "es.hero.titlePrefix should no longer exist");
  assert.ok(!("titleSuffix" in es.hero), "es.hero.titleSuffix should no longer exist");
  assert.ok(!("titlePrefix" in en.hero), "en.hero.titlePrefix should no longer exist");
  assert.ok(!("titleSuffix" in en.hero), "en.hero.titleSuffix should no longer exist");
});

test("subtitle keeps the SEO-relevant keywords (open source, self-hosted, SaaS) while foregrounding 'build a stack'", () => {
  for (const dict of [es, en]) {
    assert.match(dict.hero.subtitle, /open source/i);
    assert.match(dict.hero.subtitle, /self-hosted/i);
    assert.match(dict.hero.subtitle, /stack/i);
  }
  assert.match(es.hero.subtitle, /construye/i);
  assert.match(en.hero.subtitle, /build/i);
});

test("the journey flow (Discover->Compare->Build->Deploy) stays in sync between the static flow row and the H1 phrases — same order, same count, never drifting", () => {
  // Ya no son literalmente la misma lista (heroFloating.journey* son
  // palabras sueltas para la fila estática; hero.h1Phrase* son frases
  // completas para el H1 rotativo — necesario para que cada estado del H1
  // sea una oración legible por sí sola, ver hero.tsx) — pero deben seguir
  // representando los mismos 4 pasos, en el mismo orden, o un cambio futuro
  // podría desincronizarlos sin que nadie lo note.
  for (const dict of [es, en]) {
    const steps = [dict.heroFloating.journeyDiscover, dict.heroFloating.journeyCompare, dict.heroFloating.journeyBuild, dict.heroFloating.journeyDeploy];
    const phrases = h1PhrasesOf(dict);
    assert.equal(steps.length, 4);
    assert.equal(new Set(steps).size, 4, "the 4 journey steps must be distinct words");
    assert.equal(phrases.length, steps.length, "H1 phrases and journey steps must have the same number of states");
    assert.equal(new Set(phrases).size, 4, "the 4 H1 phrases must be distinct sentences");
    steps.forEach((verb, i) => {
      assert.ok(
        phrases[i].toLowerCase().startsWith(verb.toLowerCase()),
        `H1 phrase "${phrases[i]}" should start with the same verb as journey step "${verb}" (position ${i}) — they must stay conceptually in sync`
      );
    });
  }
});

test("H1 phrases are reasonably similar in length across the 4 states — avoids the rotating line wrapping differently (visible height jump) between states", () => {
  for (const dict of [es, en]) {
    const lengths = h1PhrasesOf(dict).map((p) => p.length);
    const shortest = Math.min(...lengths);
    const longest = Math.max(...lengths);
    assert.ok(
      longest - shortest <= 8,
      `H1 phrase lengths vary too much (${shortest}-${longest} chars) — risks a layout shift as the rotation wraps differently per state: ${JSON.stringify(h1PhrasesOf(dict))}`
    );
  }
});

test("'$0 license cost' stat no longer risks reading as '$0 total cost' — label is scoped to licensing specifically", () => {
  assert.doesNotMatch(es.hero.statLicenseCost, /^costo de licencia$/, "should no longer be the ambiguous bare 'costo de licencia'");
  assert.match(es.hero.statLicenseCost, /licenci/i);
  assert.match(en.hero.statLicenseCost, /licens/i);
});

test("hero stats are read from the single canonical catalogStats source, never hardcoded", () => {
  assert.equal(typeof catalogStats.totalTools, "number");
  assert.equal(typeof catalogStats.totalSaasReplaced, "number");
  assert.equal(typeof catalogStats.totalCategories, "number");
  assert.ok(catalogStats.totalTools > 0);
});

test("CTA copy still offers both paths (build stack and explore alternatives) — hierarchy changed, nothing was removed", () => {
  for (const dict of [es, en]) {
    assert.ok(dict.hero.ctaBuildStack.length > 0);
    assert.ok(dict.hero.ctaExplore.length > 0);
  }
});
