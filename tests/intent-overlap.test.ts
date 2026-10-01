import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyOverlap, computeOverlapPair, pairwiseOverlaps, toolFanout, OVERLAP_THRESHOLDS, type CandidateToolSet } from "../src/lib/intent-overlap";
import type { OpenSourceTool } from "../src/lib/types";

function fakeTool(id: string, name = id): OpenSourceTool {
  return {
    id,
    name,
    slug: id,
    replaces: ["Fake SaaS"],
    category: "Productivity",
    description: "",
    shortDescription: "",
    websiteUrl: "https://example.com",
    githubUrl: "https://github.com/fake/fake",
    license: "MIT",
    dockerCompose: "services:\n  app:\n    image: fake:1.0.0\n",
    features: [],
    techStack: [],
    pros: [],
    cons: [],
    tags: [],
  } as OpenSourceTool;
}

function candidate(saasName: string, intent: "self-hosted" | "open-source", toolIds: string[]): CandidateToolSet {
  return { saasSlug: saasName.toLowerCase().replace(/\s+/g, "-"), saasName, intent, tools: toolIds.map((id) => fakeTool(id)) };
}

// --- classifyOverlap: los 4 estados, con límites exactos ---

test("classifyOverlap: mismo SaaS siempre da same-tools-different-intent, con independencia del containment", () => {
  assert.equal(classifyOverlap(1, 1, true), "same-tools-different-intent");
  assert.equal(classifyOverlap(0.1, 0.9, true), "same-tools-different-intent");
});

test("classifyOverlap: containment 100% en ambos sentidos (conjuntos idénticos) -> near-identical", () => {
  assert.equal(classifyOverlap(1, 1, false), "near-identical");
});

test("classifyOverlap: containment 100% en un solo sentido -> strong-subset (subconjunto total)", () => {
  assert.equal(classifyOverlap(1, 0.5, false), "strong-subset");
  assert.equal(classifyOverlap(0.5, 1, false), "strong-subset");
});

test("classifyOverlap: containment parcial exactamente en el umbral -> strong-subset", () => {
  assert.equal(classifyOverlap(OVERLAP_THRESHOLDS.partialStrongSubsetContainment, 0.1, false), "strong-subset");
});

test("classifyOverlap: containment parcial justo por debajo del umbral -> low-overlap", () => {
  assert.equal(classifyOverlap(OVERLAP_THRESHOLDS.partialStrongSubsetContainment - 0.01, 0.1, false), "low-overlap");
});

test("classifyOverlap: containment bajo en ambos sentidos -> low-overlap", () => {
  assert.equal(classifyOverlap(0.2, 0.2, false), "low-overlap");
});

// --- computeOverlapPair: casos completos, con datos pequeños y deterministas ---

test("computeOverlapPair: cero herramientas compartidas -> null (no se reporta la relación)", () => {
  const a = candidate("SaaS A", "self-hosted", ["tool-1", "tool-2"]);
  const b = candidate("SaaS B", "self-hosted", ["tool-3", "tool-4"]);
  assert.equal(computeOverlapPair(a, b), null);
});

test("computeOverlapPair: solapamiento bajo (1 de 4 compartida en cada lado)", () => {
  const a = candidate("SaaS A", "self-hosted", ["shared", "a2", "a3", "a4"]);
  const b = candidate("SaaS B", "self-hosted", ["shared", "b2", "b3", "b4"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.relation, "low-overlap");
  assert.deepEqual(pair.sharedTools, ["shared"]);
  assert.equal(pair.containmentA, 0.25);
  assert.equal(pair.containmentB, 0.25);
  assert.equal(pair.sameSaas, false);
});

test("computeOverlapPair: subconjunto total A ⊂ B (A cabe entera dentro de B, B tiene más)", () => {
  const a = candidate("SaaS A", "self-hosted", ["t1", "t2"]);
  const b = candidate("SaaS B", "self-hosted", ["t1", "t2", "t3", "t4"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.relation, "strong-subset");
  assert.equal(pair.containmentA, 1);
  assert.equal(pair.containmentB, 0.5);
});

test("computeOverlapPair: subconjunto total B ⊂ A (mismo caso, invertido)", () => {
  const a = candidate("SaaS A", "self-hosted", ["t1", "t2", "t3", "t4"]);
  const b = candidate("SaaS B", "self-hosted", ["t1", "t2"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.relation, "strong-subset");
  assert.equal(pair.containmentA, 0.5);
  assert.equal(pair.containmentB, 1);
});

test("computeOverlapPair: conjuntos idénticos (mismo SaaS distinto, ej. Zapier vs Make) -> near-identical", () => {
  const a = candidate("Zapier", "self-hosted", ["n8n", "activepieces"]);
  const b = candidate("Make", "self-hosted", ["n8n", "activepieces"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.relation, "near-identical");
  assert.equal(pair.containmentA, 1);
  assert.equal(pair.containmentB, 1);
  assert.equal(pair.sameSaas, false);
});

test("computeOverlapPair: mismo SaaS, distinta intención -> same-tools-different-intent, conservando containment real", () => {
  const a = candidate("Heroku", "self-hosted", ["coolify", "caprover", "dokku", "dokploy"]);
  const b = candidate("Heroku", "open-source", ["coolify", "dokku"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.relation, "same-tools-different-intent");
  assert.equal(pair.sameSaas, true);
  assert.equal(pair.containmentA, 0.5);
  assert.equal(pair.containmentB, 1);
  assert.deepEqual(pair.sharedTools.sort(), ["coolify", "dokku"]);
});

test("computeOverlapPair: containment parcial que cruza el umbral (no es subconjunto total de ninguno) -> strong-subset", () => {
  // 3 de 4 en A (75%), 3 de 5 en B (60%) — ninguno llega a 100%, pero ambos superan el 50%.
  const a = candidate("SaaS A", "self-hosted", ["s1", "s2", "s3", "a4"]);
  const b = candidate("SaaS B", "self-hosted", ["s1", "s2", "s3", "b4", "b5"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.containmentA, 0.75);
  assert.equal(pair.containmentB, 0.6);
  assert.equal(pair.relation, "strong-subset");
});

test("computeOverlapPair: containment parcial por debajo del umbral en ambos lados -> low-overlap", () => {
  // 1 de 3 en A (33%), 1 de 4 en B (25%) — ninguno llega al 50%.
  const a = candidate("SaaS A", "self-hosted", ["shared", "a2", "a3"]);
  const b = candidate("SaaS B", "self-hosted", ["shared", "b2", "b3", "b4"]);
  const pair = computeOverlapPair(a, b);
  assert.ok(pair);
  assert.equal(pair.relation, "low-overlap");
});

// --- pairwiseOverlaps: solo se listan pares con solapamiento real ---

test("pairwiseOverlaps: omite los pares sin ninguna herramienta compartida", () => {
  const candidates = [candidate("A", "self-hosted", ["t1"]), candidate("B", "self-hosted", ["t2"]), candidate("C", "self-hosted", ["t1", "t3"])];
  const pairs = pairwiseOverlaps(candidates);
  assert.equal(pairs.length, 1); // solo A<->C comparten t1
});

// --- toolFanout: en cuántas y cuáles candidatas aparece cada herramienta ---

test("toolFanout: una herramienta compartida por 3 candidatas (ej. Plane en Asana/Jira/Linear) se reporta con fan-out 3", () => {
  const candidates = [
    candidate("Asana", "self-hosted", ["plane", "vikunja"]),
    candidate("Jira", "self-hosted", ["plane", "taiga"]),
    candidate("Linear", "self-hosted", ["plane", "huly"]),
  ];
  const fanout = toolFanout(candidates);
  const plane = fanout.find((entry) => entry.toolId === "plane");
  assert.ok(plane);
  assert.equal(plane.candidates.length, 3);
  assert.deepEqual(
    plane.candidates.map((c) => c.saasName).sort(),
    ["Asana", "Jira", "Linear"]
  );
});

test("toolFanout: excluye herramientas que solo aparecen en una candidata", () => {
  const candidates = [candidate("Asana", "self-hosted", ["plane", "vikunja"]), candidate("Jira", "self-hosted", ["plane", "taiga"])];
  const fanout = toolFanout(candidates);
  assert.equal(
    fanout.find((entry) => entry.toolId === "vikunja"),
    undefined
  );
  assert.equal(
    fanout.find((entry) => entry.toolId === "taiga"),
    undefined
  );
  assert.ok(fanout.find((entry) => entry.toolId === "plane"));
});

test("toolFanout: se ordena por fan-out descendente", () => {
  const candidates = [
    candidate("A", "self-hosted", ["shared-3", "solo-a"]),
    candidate("B", "self-hosted", ["shared-3", "shared-2"]),
    candidate("C", "self-hosted", ["shared-3", "shared-2"]),
  ];
  const fanout = toolFanout(candidates);
  assert.equal(fanout[0].toolId, "shared-3");
  assert.equal(fanout[0].candidates.length, 3);
  assert.equal(fanout[1].toolId, "shared-2");
  assert.equal(fanout[1].candidates.length, 2);
});
