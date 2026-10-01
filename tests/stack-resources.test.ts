import { test } from "node:test";
import assert from "node:assert/strict";
import { allTools } from "../src/data/tools";
import type { OpenSourceTool } from "../src/lib/types";
import { toStackToolProfile, aggregateStack, computeStackCheck } from "../src/lib/stack-resources";

/**
 * Fixture mínima válida para OpenSourceTool — solo se fijan a mano los
 * campos que cada test necesita variar (dockerCompose, category, notes...);
 * el resto son valores neutros sin significado, para no depender de datos
 * reales del catálogo en los casos que necesitan un docker-compose
 * controlado a propósito (tag mutable, secreto hardcodeado...).
 */
let fixtureCounter = 0;
function makeTool(overrides: Partial<OpenSourceTool> & { dockerCompose: string }): OpenSourceTool {
  fixtureCounter++;
  return {
    id: `fixture-${fixtureCounter}`,
    name: `Fixture Tool ${fixtureCounter}`,
    slug: `fixture-tool-${fixtureCounter}`,
    replaces: [],
    category: "DevTools",
    description: "",
    shortDescription: "",
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com/example/example",
    license: "MIT",
    features: [],
    techStack: [],
    pros: [],
    cons: [],
    tags: [],
    ...overrides,
  };
}

function findCatalogTool(slug: string): OpenSourceTool {
  const tool = allTools.find((t) => t.slug === slug);
  assert.ok(tool, `expected "${slug}" to exist in the real catalog`);
  return tool;
}

test("empty stack: aggregate has no invented values", () => {
  const agg = aggregateStack([]);
  assert.equal(agg.totalApplicationRamMb, 0);
  assert.equal(agg.totalStorageGb, null, "storage must be null, never fabricated as 0");
  assert.equal(agg.cheapestMonthlyUsd, null, "cost must be null, never fabricated as 0");
  assert.equal(agg.hostingCategory, null);
  assert.equal(agg.totalAdditionalServices, 0);
  assert.deepEqual(computeStackCheck([], agg), [{ severity: "ok", code: "ram_available", toolSlugs: [] }]);
});

test("single tool with one image: no bundled dependencies", () => {
  const tool = makeTool({
    dockerCompose: "services:\n  meilisearch:\n    image: getmeili/meilisearch:v1.9\n",
  });
  const profile = toStackToolProfile(tool);
  assert.deepEqual(profile.dependencies, []);
  assert.equal(profile.imageCount, 1);
});

test("multiple real tools: nocodb + appwrite aggregate correctly", () => {
  const profiles = [findCatalogTool("nocodb"), findCatalogTool("appwrite")].map(toStackToolProfile);
  const agg = aggregateStack(profiles);
  assert.ok(agg.dependencyCounts.postgresql >= 1, "nocodb bundles postgres");
  assert.ok(agg.dependencyCounts.mysql_mariadb >= 1, "appwrite bundles mariadb");
  assert.ok(agg.dependencyCounts.redis >= 1, "appwrite bundles redis");
  assert.equal(agg.totalApplicationRamMb, profiles[0].ram.applicationRamMb + profiles[1].ram.applicationRamMb);
});

test("AI tool with detected GPU reservation is flagged as variable model RAM", () => {
  const gpuTool = findCatalogTool("automatic1111-sd-webui");
  const profile = toStackToolProfile(gpuTool);
  assert.equal(profile.ram.hasVariableModelRam, true);
});

test("AI orchestrator tool that explicitly does not run models itself is NOT flagged", () => {
  // dify/flowise/open-webui orchestrate but document that they don't load a
  // model in-process themselves — flagging them would be inventing a signal
  // that isn't there, exactly what the brief forbids.
  for (const slug of ["dify", "flowise", "open-webui"]) {
    const tool = allTools.find((t) => t.slug === slug);
    if (!tool) continue; // catalog composition may change; skip rather than fail on an absent slug
    const profile = toStackToolProfile(tool);
    assert.equal(profile.ram.hasVariableModelRam, false, `${slug} should not be flagged as variable model RAM`);
  }
});

test("tool without a documented storageGb shows as unknown, never as 0", () => {
  const tool = makeTool({ dockerCompose: "services:\n  app:\n    image: example/app:1.0.0\n" });
  assert.equal(tool.storageGb, undefined);
  const profile = toStackToolProfile(tool);
  const agg = aggregateStack([profile]);
  assert.equal(agg.totalStorageGb, null);
  assert.deepEqual(agg.toolsWithUnknownStorage, [tool.slug]);
});

test("bundled dependency detection: second image classified, first (primary) image ignored", () => {
  const tool = makeTool({
    dockerCompose: "services:\n  app:\n    image: example/app:1.0.0\n  db:\n    image: postgres:16\n",
  });
  const profile = toStackToolProfile(tool);
  assert.deepEqual(profile.dependencies, ["postgresql"]);
});

test("stack with multiple different databases: both surfaced, count matches", () => {
  const postgresTool = makeTool({
    dockerCompose: "services:\n  app1:\n    image: example/app1:1.0.0\n  db1:\n    image: postgres:16\n",
  });
  const mysqlTool = makeTool({
    dockerCompose: "services:\n  app2:\n    image: example/app2:1.0.0\n  db2:\n    image: mariadb:11\n",
  });
  const agg = aggregateStack([postgresTool, mysqlTool].map(toStackToolProfile));
  assert.equal(agg.dependencyCounts.postgresql, 1);
  assert.equal(agg.dependencyCounts.mysql_mariadb, 1);
  assert.equal(agg.totalAdditionalServices, 2);
});

test("mutable Docker tag is detected and surfaced as a stack check warning", () => {
  const tool = makeTool({
    dockerCompose: "services:\n  app:\n    image: example/app:latest\n",
  });
  const profile = toStackToolProfile(tool);
  assert.equal(profile.hasMutableTag, true);
  const check = computeStackCheck([profile], aggregateStack([profile]));
  const warning = check.find((item) => item.code === "mutable_tag");
  assert.ok(warning, "expected a mutable_tag warning");
  assert.deepEqual(warning?.toolSlugs, [tool.slug]);
});

test("hardcoded secret (no change-me placeholder) is detected and surfaced as a stack check warning", () => {
  const tool = makeTool({
    dockerCompose:
      "services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: hunter2plaintext\n",
  });
  const profile = toStackToolProfile(tool);
  assert.equal(profile.hasSuspiciousSecrets, true);
  const check = computeStackCheck([profile], aggregateStack([profile]));
  assert.ok(check.some((item) => item.code === "suspicious_secret"));
});

test("change-me placeholder is never flagged as a suspicious secret", () => {
  const tool = makeTool({
    dockerCompose:
      "services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: change-me-db-password\n",
  });
  const profile = toStackToolProfile(tool);
  assert.equal(profile.hasSuspiciousSecrets, false);
});

test("external API env var name is detected as a dependency without sniffing free text", () => {
  const tool = makeTool({
    dockerCompose: "services:\n  app:\n    image: example/app:1.0.0\n    environment:\n      OPENAI_API_KEY: change-me\n",
  });
  const profile = toStackToolProfile(tool);
  assert.ok(profile.dependencies.includes("external_api"));
});
