import { test } from "node:test";
import assert from "node:assert/strict";
import { allTools, getToolById, getLocalizedTool } from "../src/data/tools";
import { isPublished } from "../src/lib/types";
import { replaceMappingContent } from "../src/data/replace-mappings";
import { replaceMappingContentEn } from "../src/data/replace-mappings.en";
import { AGPL_COPYLEFT_NOTE_ES, AGPL_COPYLEFT_NOTE_EN } from "../src/data/license-notes";
import es from "../src/i18n/dictionaries/es";
import en from "../src/i18n/dictionaries/en";

/**
 * Regresión directa de la auditoría "cierra de forma rigurosa los problemas
 * que todavía aparecen en producción" — cada caso aquí fue una afirmación
 * legal absoluta o una simplificación incorrecta que YA se corrigió una vez
 * y volvió a aparecer en una fuente de datos distinta a la que se revisó.
 * Estos tests fallan si alguien reintroduce la frase vieja en CUALQUIER
 * fuente (tools.ts, tools.en.ts, replace-mappings.ts/.en.ts), no solo en la
 * que se tocó la última vez.
 */

const FORBIDDEN_PLAUSIBLE_PHRASES = [
  /cumple\s+GDPR\s*\/?\s*CCPA/i,
  /GDPR\/CCPA\s+compliance/i,
  /no\s+cookies\s+or\s+consent\s+banner\s+needed/i,
  /sin\s+cookies\s+ni\s+banner\s+de\s+consentimiento\s+necesario/i,
  /\bcumple\s+privacidad\s+por\s+diseño/i,
];

const FORBIDDEN_AGPL_PHRASES = [
  /obliga\s+a\s+liberar\s+el\s+código/i,
  /requires?\s+releas(e|ing)\s+your\s+code/i,
  /requires\s+you\s+to\s+release\s+your\s+code/i,
];

function allTextBlobs(): { source: string; text: string }[] {
  const blobs: { source: string; text: string }[] = [];
  for (const tool of allTools) {
    blobs.push({ source: `tools.ts:${tool.id}`, text: JSON.stringify(tool) });
    const en_ = getLocalizedTool(tool, "en");
    blobs.push({ source: `tools.en.ts:${tool.id}`, text: JSON.stringify(en_) });
  }
  for (const [key, value] of Object.entries(replaceMappingContent)) {
    blobs.push({ source: `replace-mappings.ts:${key}`, text: JSON.stringify(value) });
  }
  for (const [key, value] of Object.entries(replaceMappingContentEn)) {
    blobs.push({ source: `replace-mappings.en.ts:${key}`, text: JSON.stringify(value) });
  }
  return blobs;
}

test("no forbidden Plausible GDPR/CCPA/consent-banner absolute claims anywhere in the catalog", () => {
  const blobs = allTextBlobs();
  for (const { source, text } of blobs) {
    for (const re of FORBIDDEN_PLAUSIBLE_PHRASES) {
      assert.doesNotMatch(text, re, `${source} contains a forbidden legal-compliance absolute claim (${re})`);
    }
  }
});

test("no forbidden AGPL oversimplification anywhere in the catalog", () => {
  const blobs = allTextBlobs();
  for (const { source, text } of blobs) {
    for (const re of FORBIDDEN_AGPL_PHRASES) {
      assert.doesNotMatch(text, re, `${source} contains the old incorrect AGPL explanation (${re})`);
    }
  }
});

test("AGPL explanatory note is a single shared source of truth, reused verbatim everywhere it appears", () => {
  const blobs = allTextBlobs();
  const esHits = blobs.filter((b) => b.text.includes(AGPL_COPYLEFT_NOTE_ES));
  const enHits = blobs.filter((b) => b.text.includes(AGPL_COPYLEFT_NOTE_EN));
  // AppFlowy, NocoDB, Zitadel, Formbricks, Linkwarden (tools.ts) + the
  // Airtable->NocoDB replace-mapping use this note on each side — verified
  // against the real catalog, not hardcoded, so this assertion breaks
  // loudly (not silently) if a future edit removes the shared import.
  assert.ok(esHits.length >= 5, `expected >=5 ES usages of the shared AGPL note, found ${esHits.length}`);
  assert.ok(enHits.length >= 5, `expected >=5 EN usages of the shared AGPL note, found ${enHits.length}`);
});

test("Plausible's own catalog entry never claims legal compliance, in ES or EN", () => {
  const plausible = getToolById("plausible");
  assert.ok(plausible, "plausible must exist in the catalog");
  const plausibleEn = getLocalizedTool(plausible!, "en");
  for (const re of FORBIDDEN_PLAUSIBLE_PHRASES) {
    assert.doesNotMatch(plausible!.description, re);
    assert.doesNotMatch(JSON.stringify(plausible!.features), re);
    assert.doesNotMatch(JSON.stringify(plausible!.pros ?? []), re);
    assert.doesNotMatch(plausibleEn.description, re);
    assert.doesNotMatch(JSON.stringify(plausibleEn.features), re);
    assert.doesNotMatch(JSON.stringify(plausibleEn.pros ?? []), re);
  }
});

test("fossModel drives the tool page title word, in ES and EN — never a blanket 'Open Source'", () => {
  const appflowy = getToolById("appflowy");
  const n8n = getToolById("n8n");
  const umami = getToolById("umami");
  assert.ok(appflowy && n8n && umami, "appflowy, n8n and umami must exist in the catalog");

  assert.equal(appflowy!.fossModel, "OpenCore");
  assert.equal(n8n!.fossModel, "FairCode");
  assert.equal(umami!.fossModel, "FOSS");

  const titleEs = es.toolPage.h1("AppFlowy", "Notion", 2026, appflowy!.fossModel);
  const titleEn = en.toolPage.h1("AppFlowy", "Notion", 2026, appflowy!.fossModel);
  assert.match(titleEs, /Open-Core/);
  assert.match(titleEn, /Open-Core/);
  assert.doesNotMatch(titleEs, /^AppFlowy: alternativa Open Source\b/);

  const n8nTitleEs = es.toolPage.h1("n8n", "Zapier", 2026, n8n!.fossModel);
  assert.match(n8nTitleEs, /Fair-code/);

  const umamiTitleEs = es.toolPage.h1("Umami", "Google Analytics", 2026, umami!.fossModel);
  assert.match(umamiTitleEs, /Open Source/);
});

test("published tools with a dockerCompose never use a bare :latest tag unless explicitly declared LATEST_ONLY/ARCHIVED_UPSTREAM/LEGACY_IMAGE", () => {
  const offenders: string[] = [];
  for (const tool of allTools) {
    if (!isPublished(tool)) continue;
    if (!tool.dockerCompose) continue;
    if (tool.dockerStatus === "LATEST_ONLY" || tool.dockerStatus === "ARCHIVED_UPSTREAM" || tool.dockerStatus === "LEGACY_IMAGE") continue;
    if (/image:\s*"?[a-zA-Z0-9][a-zA-Z0-9._/-]*:latest"?/.test(tool.dockerCompose)) {
      offenders.push(tool.id);
    }
  }
  // Documented, time-boxed exception list (see the remediation report) —
  // each one verified individually against the real registry, never
  // guessed. Shrinking this list is encouraged; growing it should fail CI.
  const KNOWN_EXCEPTIONS = new Set([
    // No official all-in-one image exists at all — the project is either
    // several independent services, a framework with no all-in-one image,
    // or requires building from source. A `notes` field on the tool
    // explains the real deployment path; faking a pinned tag here would be
    // worse than disclosing the gap honestly.
    "huly", "openreplay", "highlight", "openpanel", "strapi", "novu",
    "suitecrm", "monica", "yetiforce-crm", "medusa", "vendure", "sylius",
    "jami",
    // BigBlueButton: bbb-install isn't a Docker image at all (it's a bash
    // installer script) — see its `notes` field.
    "bigbluebutton",
    // Registry unreachable from this sandbox's egress policy — could not be
    // verified either way (registry.supertokens.io, codeberg.org).
    "supertokens", "forgejo",
  ]);
  const unexpected = offenders.filter((id) => !KNOWN_EXCEPTIONS.has(id));
  assert.deepEqual(unexpected, [], `new, undocumented :latest tag(s) found: ${unexpected.join(", ")}`);
  const noLongerNeeded = [...KNOWN_EXCEPTIONS].filter((id) => !offenders.includes(id));
  if (noLongerNeeded.length > 0) {
    assert.fail(
      `KNOWN_EXCEPTIONS lists tool(s) that are already fixed — remove from the exception list: ${noLongerNeeded.join(", ")}`
    );
  }
});

test("star counts: card data and the tool's own page are documented as two distinct, honestly-labeled moments", () => {
  // Cards (ToolCard) show the static tools.ts snapshot with a "~" prefix and
  // an explanatory tooltip; the tool's own page prefers a live GitHub fetch
  // and only falls back to the same static number (labeled "estimated")
  // when the live call fails. This test locks in that BOTH dictionaries
  // carry the caption string the UI depends on, so removing it without
  // updating tool-card.tsx/comparison-page-content.tsx/etc. fails loudly.
  assert.equal(typeof es.toolCard.starsSnapshotCaption, "string");
  assert.equal(typeof en.toolCard.starsSnapshotCaption, "string");
  assert.ok(es.toolCard.starsSnapshotCaption.length > 10);
  assert.ok(en.toolCard.starsSnapshotCaption.length > 10);
});
