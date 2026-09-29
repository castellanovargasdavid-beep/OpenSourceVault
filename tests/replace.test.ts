import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllReplaceMappings, getAllReplaceSlugs, getReplaceMapping } from "../src/lib/replace";
import { REPLACE_SAAS_NAMES } from "../src/data/replace-mappings";
import { slugify } from "../src/lib/utils";
import { getToolBySlug } from "../src/data/tools";

test("a single SaaS with a mapping resolves with at least one real alternative", () => {
  const mapping = getReplaceMapping("notion", "es");
  assert.ok(mapping);
  assert.equal(mapping?.saasName, "Notion");
  assert.ok(mapping!.entries.length > 0);
});

test("multiple SaaS: getAllReplaceMappings returns every curated SaaS, in REPLACE_SAAS_NAMES order", () => {
  const mappings = getAllReplaceMappings("es");
  assert.equal(mappings.length, REPLACE_SAAS_NAMES.length);
  assert.deepEqual(
    mappings.map((m) => m.saasName),
    [...REPLACE_SAAS_NAMES]
  );
});

test("a SaaS with real catalog alternatives but no curated /replace mapping returns undefined", () => {
  // Jira has real alternatives in the catalog (Plane, Focalboard...) via
  // getSaasAlternatives, but it is deliberately NOT in REPLACE_SAAS_NAMES —
  // Phase 1 says only ship curated content, never auto-generate from
  // tool.replaces alone.
  const mapping = getReplaceMapping("jira", "es");
  assert.equal(mapping, undefined);
  assert.ok(!getAllReplaceSlugs().includes("jira"));
});

test("a SaaS with several matching alternatives (Firebase) exposes all of them with a fit level each", () => {
  const mapping = getReplaceMapping("firebase", "es");
  assert.ok(mapping);
  assert.ok(mapping!.entries.length >= 3);
  for (const entry of mapping!.entries) {
    assert.ok(["good", "partial", "specialized"].includes(entry.fit));
  }
});

test("a nonexistent mapping slug returns undefined, not a crash or an empty-but-truthy object", () => {
  assert.equal(getReplaceMapping("this-saas-does-not-exist", "es"), undefined);
  assert.equal(getReplaceMapping("this-saas-does-not-exist", "en"), undefined);
});

test("every curated slug resolves with content in both locales (no dead /replace/[slug] page)", () => {
  for (const slug of getAllReplaceSlugs()) {
    const es = getReplaceMapping(slug, "es");
    const en = getReplaceMapping(slug, "en");
    assert.ok(es, `missing ES mapping for ${slug}`);
    assert.ok(en, `missing EN mapping for ${slug}`);
    assert.ok(es!.entries.length > 0, `ES mapping for ${slug} has no entries`);
    assert.ok(en!.entries.length > 0, `EN mapping for ${slug} has no entries`);
    // Same set of tools in both locales — only the copy is translated, never the relationships.
    assert.deepEqual(
      es!.entries.map((e) => e.tool.slug).sort(),
      en!.entries.map((e) => e.tool.slug).sort(),
      `ES/EN tool sets differ for ${slug}`
    );
  }
});

test("every mapped entry's tool genuinely lists the SaaS in its own replaces[] (never an invented equivalence)", () => {
  for (const mapping of getAllReplaceMappings("es")) {
    for (const entry of mapping.entries) {
      assert.ok(
        entry.tool.replaces.includes(mapping.saasName),
        `${entry.tool.slug} does not declare replacing ${mapping.saasName} in tools.ts`
      );
    }
  }
});

test("hasMigrationGuide is true only when the SaaS is the tool's primary (replaces[0]) target — matches the real /guias/migrar/[from]/[to] route resolution", () => {
  for (const mapping of getAllReplaceMappings("es")) {
    for (const entry of mapping.entries) {
      const expected = slugify(entry.tool.replaces[0]) === slugify(mapping.saasName);
      assert.equal(entry.hasMigrationGuide, expected, `${mapping.saasSlug}→${entry.tool.slug}`);
    }
  }
});

test("no mapping references a tool slug that doesn't exist in the published catalog", () => {
  for (const mapping of getAllReplaceMappings("es")) {
    for (const entry of mapping.entries) {
      assert.ok(getToolBySlug(entry.tool.slug), `${entry.tool.slug} not found via getToolBySlug`);
    }
  }
});

test("entries never use blanket-replacement wording — useCase always frames it as a specific, non-absolute claim", () => {
  for (const mapping of getAllReplaceMappings("es")) {
    for (const entry of mapping.entries) {
      assert.match(entry.useCase, /^Puede sustituir/, `${mapping.saasSlug}→${entry.tool.slug} useCase doesn't use the "Puede sustituir..." framing`);
      assert.doesNotMatch(entry.useCase, /sustituye completamente/i);
    }
  }
});
