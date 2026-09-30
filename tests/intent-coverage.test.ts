import { test } from "node:test";
import assert from "node:assert/strict";
import { classifySelfHostedSignal, classifyOpenSourceSignal, computeCoverageRow, computeFullCoverage, COVERAGE_THRESHOLDS } from "../src/lib/intent-coverage";
import { getSaasAlternatives, type SaasAlternativeGroup } from "../src/lib/alternatives";
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

function fakeGroup(tools: OpenSourceTool[], saasName = "Fake SaaS"): SaasAlternativeGroup {
  return { saasSlug: "fake-saas", saasName, tools };
}

// --- classifySelfHostedSignal: límites exactos del umbral de RAM ---

test("classifySelfHostedSignal: RAM spread exactamente 0 -> not-worth-a-page", () => {
  assert.equal(classifySelfHostedSignal(0), "not-worth-a-page");
});

test("classifySelfHostedSignal: justo por debajo del umbral -> needs-editorial-signal", () => {
  assert.equal(classifySelfHostedSignal(COVERAGE_THRESHOLDS.selfHostedRamSpreadMb - 1), "needs-editorial-signal");
});

test("classifySelfHostedSignal: exactamente en el umbral -> editorial-candidate", () => {
  assert.equal(classifySelfHostedSignal(COVERAGE_THRESHOLDS.selfHostedRamSpreadMb), "editorial-candidate");
});

test("classifySelfHostedSignal: por encima del umbral -> editorial-candidate", () => {
  assert.equal(classifySelfHostedSignal(COVERAGE_THRESHOLDS.selfHostedRamSpreadMb + 1000), "editorial-candidate");
});

// --- classifyOpenSourceSignal: límites exactos del cut ratio ---

test("classifyOpenSourceSignal: cut ratio exactamente 0% -> not-worth-a-page", () => {
  assert.equal(classifyOpenSourceSignal(0), "not-worth-a-page");
});

test("classifyOpenSourceSignal: justo por debajo del umbral (29%) -> needs-editorial-signal", () => {
  assert.equal(classifyOpenSourceSignal(0.29), "needs-editorial-signal");
});

test("classifyOpenSourceSignal: exactamente en el umbral (30%) -> editorial-candidate", () => {
  assert.equal(classifyOpenSourceSignal(COVERAGE_THRESHOLDS.openSourceCutRatio), "editorial-candidate");
});

test("classifyOpenSourceSignal: por encima del umbral -> editorial-candidate", () => {
  assert.equal(classifyOpenSourceSignal(0.6), "editorial-candidate");
});

// --- computeCoverageRow: casos con menos de MIN_ELIGIBLE_TOOLS ---

test("computeCoverageRow: 0 herramientas elegibles -> insufficient-data, sin señal calculada", () => {
  const group = fakeGroup([fakeTool({ status: "coming_soon" })]);
  const row = computeCoverageRow(group, "self-hosted");
  assert.equal(row.state, "insufficient-data");
  assert.equal(row.eligibleToolCount, 0);
  assert.equal(row.ramSpreadMb, null);
  assert.equal(row.cutRatio, null);
});

test("computeCoverageRow: exactamente 1 herramienta elegible (justo por debajo de MIN_ELIGIBLE_TOOLS) -> insufficient-data", () => {
  const group = fakeGroup([fakeTool({ id: "a" })]);
  const row = computeCoverageRow(group, "self-hosted");
  assert.equal(row.state, "insufficient-data");
  assert.equal(row.eligibleToolCount, 1);
});

test("computeCoverageRow: 2 herramientas elegibles (justo en MIN_ELIGIBLE_TOOLS) sí calcula señal", () => {
  const group = fakeGroup([
    fakeTool({ id: "a", difficulty: "beginner", minRamMb: 256 }),
    fakeTool({ id: "b", difficulty: "advanced", minRamMb: 1024 }),
  ]);
  const row = computeCoverageRow(group, "self-hosted");
  assert.equal(row.eligibleToolCount, 2);
  assert.notEqual(row.state, "insufficient-data");
  assert.equal(row.ramSpreadMb, 768);
});

// --- computeCoverageRow: self-hosted RAM spread real, incluyendo 0 ---

test("computeCoverageRow self-hosted: RAM idéntica entre herramientas -> not-worth-a-page", () => {
  const group = fakeGroup([
    fakeTool({ id: "a", difficulty: "beginner", minRamMb: 512 }),
    fakeTool({ id: "b", difficulty: "beginner", minRamMb: 512 }),
  ]);
  const row = computeCoverageRow(group, "self-hosted");
  assert.equal(row.ramSpreadMb, 0);
  assert.equal(row.state, "not-worth-a-page");
});

// --- computeCoverageRow: open-source cut ratio real, incluyendo 0% y el umbral ---

test("computeCoverageRow open-source: todas las self-hosted-elegibles son FOSS (0% corte) -> not-worth-a-page", () => {
  const group = fakeGroup([
    fakeTool({ id: "a", fossModel: "FOSS" }),
    fakeTool({ id: "b", fossModel: "FOSS" }),
  ]);
  const row = computeCoverageRow(group, "open-source");
  assert.equal(row.cutRatio, 0);
  assert.equal(row.state, "not-worth-a-page");
});

test("computeCoverageRow open-source: corte del 50% (2 de 4) -> editorial-candidate", () => {
  const group = fakeGroup([
    fakeTool({ id: "a", fossModel: "FOSS" }),
    fakeTool({ id: "b", fossModel: "FOSS" }),
    fakeTool({ id: "c", fossModel: "OpenCore" }),
    fakeTool({ id: "d", fossModel: "OpenCore" }),
  ]);
  const row = computeCoverageRow(group, "open-source");
  assert.equal(row.cutRatio, 0.5);
  assert.equal(row.state, "editorial-candidate");
});

test("computeCoverageRow open-source: solo 1 herramienta FOSS de 5 elegibles (open-source por debajo de MIN_ELIGIBLE_TOOLS) -> insufficient-data", () => {
  const group = fakeGroup([
    fakeTool({ id: "a", fossModel: "FOSS" }),
    fakeTool({ id: "b", fossModel: "OpenCore" }),
    fakeTool({ id: "c", fossModel: "OpenCore" }),
    fakeTool({ id: "d", fossModel: "OpenCore" }),
    fakeTool({ id: "e", fossModel: "OpenCore" }),
  ]);
  const row = computeCoverageRow(group, "open-source");
  assert.equal(row.eligibleToolCount, 1);
  assert.equal(row.state, "insufficient-data");
});

// --- computeCoverageRow: published siempre gana sobre la señal automática ---

test("computeCoverageRow: página real ya publicada (Notion self-hosted) siempre da published", () => {
  // Grupo real del catálogo (no sintético): "published" se resuelve contra
  // el contenido curado real en src/data/intent-pages.ts + la elegibilidad
  // real de hoy, así que hace falta el grupo real de Notion, no uno fake.
  const group = getSaasAlternatives("notion");
  assert.ok(group);
  const row = computeCoverageRow(group as SaasAlternativeGroup, "self-hosted");
  assert.equal(row.state, "published");
  assert.equal(row.isPublishedPage, true);
});

// --- computeFullCoverage: cobertura completa del catálogo real, nunca solo candidatas ---

test("computeFullCoverage: devuelve exactamente 2 filas por cada SaaS del catálogo (self-hosted + open-source)", () => {
  const rows = computeFullCoverage();
  const bySaas = new Map<string, number>();
  for (const row of rows) bySaas.set(row.saasSlug, (bySaas.get(row.saasSlug) ?? 0) + 1);
  assert.ok(bySaas.size > 0);
  for (const count of bySaas.values()) assert.equal(count, 2);
});

test("computeFullCoverage: incluye las 22 páginas ya publicadas (6 del piloto + 9 del segundo lote + 7 del tercer lote), correctamente marcadas", () => {
  const rows = computeFullCoverage();
  const published = rows.filter((row) => row.state === "published");
  assert.equal(published.length, 22);
});

test("computeFullCoverage: nunca produce el estado inexistente ready-for-editorial (nombre descartado por el usuario)", () => {
  const rows = computeFullCoverage();
  for (const row of rows) {
    assert.notEqual(row.state as string, "ready-for-editorial");
  }
});
