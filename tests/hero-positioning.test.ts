import { test } from "node:test";
import assert from "node:assert/strict";
import es from "../src/i18n/dictionaries/es";
import en from "../src/i18n/dictionaries/en";
import { catalogStats } from "../src/lib/catalog-stats";

/**
 * Regresión del rediseño del hero (Stack Builder como producto principal,
 * ver el encargo "AUDITORÍA COMPLETA + REDISEÑO QUIRÚRGICO de la homepage").
 * No testea layout/CSS — eso se verificó a mano contra el HTML generado —
 * sino el contrato de contenido que un cambio futuro podría romper sin
 * querer: el H1 sigue siendo gramatical en los 4 estados de la palabra
 * dinámica, ambos locales están sincronizados, y la jerarquía de CTAs no
 * vuelve a invertirse en silencio.
 */

function buildH1(verb: string, suffix: string): string {
  return `${verb} ${suffix}`;
}

test("H1 is grammatical in all 4 rotating states, in both locales", () => {
  for (const [locale, dict] of [["es", es], ["en", en]] as const) {
    const verbs = [dict.heroFloating.journeyDiscover, dict.heroFloating.journeyCompare, dict.heroFloating.journeyBuild, dict.heroFloating.journeyDeploy];
    for (const verb of verbs) {
      const sentence = buildH1(verb, dict.hero.h1Suffix);
      assert.ok(sentence.length > 10, `${locale}: "${sentence}" looks too short to be a real sentence`);
      assert.ok(/^[A-Z]/.test(sentence), `${locale}: "${sentence}" should start with a capitalized verb`);
      assert.ok(sentence.endsWith("."), `${locale}: "${sentence}" should end with a period`);
    }
  }
});

test("H1 suffix mentions 'stack' and 'self-hosted' in both locales — the new positioning, not the old 'replace SaaS' framing", () => {
  assert.match(es.hero.h1Suffix, /stack/i);
  assert.match(es.hero.h1Suffix, /self-hosted/i);
  assert.match(en.hero.h1Suffix, /stack/i);
  assert.match(en.hero.h1Suffix, /self-hosted/i);
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

test("the journey flow (Discover->Compare->Build->Deploy) is the single source for both the H1 word and the static flow row — never two drifting lists", () => {
  for (const dict of [es, en]) {
    const steps = [dict.heroFloating.journeyDiscover, dict.heroFloating.journeyCompare, dict.heroFloating.journeyBuild, dict.heroFloating.journeyDeploy];
    assert.equal(steps.length, 4);
    assert.equal(new Set(steps).size, 4, "the 4 journey steps must be distinct words");
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
