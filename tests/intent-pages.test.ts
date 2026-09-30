import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isSelfHostedEligible,
  isOpenSourceEligible,
  getIntentPage,
  getAllIntentPageSlugs,
  getIntentPagesForSaas,
  getIntentPageHref,
} from "../src/lib/intent-pages";
import type { OpenSourceTool } from "../src/lib/types";

function fakeTool(overrides: Partial<OpenSourceTool> = {}): OpenSourceTool {
  return {
    id: "fake",
    name: "Fake Tool",
    slug: "fake-tool",
    replaces: ["Fake SaaS"],
    category: "productivity",
    description: "",
    shortDescription: "",
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com/fake/fake",
    license: "MIT",
    dockerCompose: "services:\n  app:\n    image: fake:1.0.0\n",
    affiliateLinks: { digitalOceanUrl: "", vultrUrl: "", railwayUrl: "" },
    features: [],
    techStack: [],
    pros: [],
    cons: [],
    tags: [],
    ...overrides,
  } as OpenSourceTool;
}

test("isSelfHostedEligible: published, non-archived tool is eligible", () => {
  assert.equal(isSelfHostedEligible(fakeTool()), true);
});

test("isSelfHostedEligible: archived upstream image is not eligible", () => {
  assert.equal(isSelfHostedEligible(fakeTool({ dockerStatus: "ARCHIVED_UPSTREAM" })), false);
});

test("isSelfHostedEligible: coming_soon/scheduled tools are not eligible (not published yet)", () => {
  assert.equal(isSelfHostedEligible(fakeTool({ status: "coming_soon" })), false);
  assert.equal(isSelfHostedEligible(fakeTool({ status: "scheduled", publishDate: "2099-01-01" })), false);
});

test("isOpenSourceEligible: only fossModel FOSS passes, never Open-Core/Fair-code/Source-available", () => {
  assert.equal(isOpenSourceEligible(fakeTool({ fossModel: "FOSS" })), true);
  assert.equal(isOpenSourceEligible(fakeTool({ fossModel: "OpenCore" })), false);
  assert.equal(isOpenSourceEligible(fakeTool({ fossModel: "FairCode" })), false);
  assert.equal(isOpenSourceEligible(fakeTool({ fossModel: "SourceAvailable" })), false);
  assert.equal(isOpenSourceEligible(fakeTool({})), false);
});

test("getIntentPage: unknown slug shape (no recognized intent suffix) resolves to undefined", () => {
  assert.equal(getIntentPage("notion", "es"), undefined);
  assert.equal(getIntentPage("notion-something-else", "es"), undefined);
});

test("getIntentPage: SaaS that doesn't exist in the catalog resolves to undefined", () => {
  assert.equal(getIntentPage("not-a-real-saas-self-hosted", "es"), undefined);
});

test("getIntentPage: real SaaS with no curated content for that intent resolves to undefined", () => {
  // Trello has real catalog alternatives but no curated intent-page content.
  assert.equal(getIntentPage("trello-self-hosted", "es"), undefined);
});

test("getIntentPage: Airtable has no open-source page (0 of 3 tools are FOSS)", () => {
  assert.equal(getIntentPage("airtable-open-source", "es"), undefined);
});

test("getIntentPage: Microsoft Teams never gets a page (only 1 tool, below MIN_ELIGIBLE_TOOLS)", () => {
  assert.equal(getIntentPage("microsoft-teams-self-hosted", "es"), undefined);
});

test("getIntentPage: pilot pages resolve with real, eligible tools and a real RAM range", () => {
  const page = getIntentPage("notion-self-hosted", "es");
  assert.ok(page);
  assert.equal(page.saasName, "Notion");
  assert.equal(page.intent, "self-hosted");
  assert.ok(page.eligibleTools.length >= 2);
  assert.ok(page.ramRangeMb.min > 0 && page.ramRangeMb.max >= page.ramRangeMb.min);
  assert.equal(page.content.intent, "self-hosted");
});

test("getIntentPage: Slack open-source only includes FOSS tools (Huly, Zulip), not RocketChat/Mattermost", () => {
  const page = getIntentPage("slack-open-source", "es");
  assert.ok(page);
  const slugs = page.eligibleTools.map((t) => t.slug).sort();
  assert.deepEqual(slugs, ["huly", "zulip"]);
});

test("getIntentPage works the same way in EN with the EN URL suffix", () => {
  const page = getIntentPage("notion-self-hosted", "en");
  assert.ok(page);
  assert.equal(page.saasName, "Notion");
});

test("getAllIntentPageSlugs: returns exactly the approved 22-page set (6-page pilot + 9-page second batch + 7-page third batch), no more, no less", () => {
  const slugs = getAllIntentPageSlugs("es").sort();
  assert.deepEqual(slugs, [
    "airtable-self-hosted",
    "auth0-open-source",
    "datadog-self-hosted",
    "dropbox-self-hosted",
    "github-self-hosted",
    "google-analytics-self-hosted",
    "google-docs-self-hosted",
    "google-drive-self-hosted",
    "google-photos-self-hosted",
    "heroku-open-source",
    "heroku-self-hosted",
    "jira-self-hosted",
    "lastpass-open-source",
    "mixpanel-self-hosted",
    "notion-self-hosted",
    "retool-self-hosted",
    "shopify-plus-self-hosted",
    "shopify-self-hosted",
    "slack-open-source",
    "slack-self-hosted",
    "zendesk-self-hosted",
    "zoom-self-hosted",
  ]);
});

test("getIntentPagesForSaas: Slack has both intents, Airtable only self-hosted, Microsoft Teams has none", () => {
  assert.deepEqual(
    getIntentPagesForSaas("Slack", "es").map((p) => p.intent),
    ["self-hosted", "open-source"]
  );
  assert.deepEqual(
    getIntentPagesForSaas("Airtable", "es").map((p) => p.intent),
    ["self-hosted"]
  );
  assert.deepEqual(getIntentPagesForSaas("Microsoft Teams", "es"), []);
});

test("getIntentPageHref: builds the flat hyphenated URL per locale", () => {
  assert.equal(getIntentPageHref("Notion", "self-hosted", "es"), "/alternativas/notion-self-hosted");
  assert.equal(getIntentPageHref("Notion", "self-hosted", "en"), "/en/alternatives/notion-self-hosted");
  assert.equal(getIntentPageHref("Google Analytics", "self-hosted", "es"), "/alternativas/google-analytics-self-hosted");
});
