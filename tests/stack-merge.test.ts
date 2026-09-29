import { test } from "node:test";
import assert from "node:assert/strict";
import { mergeDockerComposeFiles } from "../src/lib/stack-merge";

test("generated compose only contains selected tools, no hardcoded secrets, tags respected", () => {
  const result = mergeDockerComposeFiles([
    {
      slug: "tool-a",
      name: "Tool A",
      dockerCompose:
        "services:\n  app:\n    image: example/tool-a:1.2.3\n    environment:\n      SECRET_KEY: change-me-a\n    ports:\n      - \"8080:80\"\n",
    },
    {
      slug: "tool-b",
      name: "Tool B",
      dockerCompose: "services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_PASSWORD: change-me-b\n",
    },
  ]);

  assert.match(result.yaml, /image: example\/tool-a:1\.2\.3/, "pinned tag from Tool A must be preserved as-is");
  assert.match(result.yaml, /image: postgres:16/, "pinned tag from Tool B must be preserved as-is");
  assert.doesNotMatch(result.yaml, /change-me-a-resolved|hunter2/, "no real secret value should ever appear");
  assert.match(result.yaml, /change-me-a/, "unresolved placeholder must stay a placeholder, not a fabricated secret");
  assert.equal(result.skippedTools.length, 0);
  assert.equal(result.toolSummaries.length, 2);
});

test("a tool without a valid docker-compose (script installer) is skipped, not force-included", () => {
  const result = mergeDockerComposeFiles([
    { slug: "compose-tool", name: "Compose Tool", dockerCompose: "services:\n  app:\n    image: example/app:1.0.0\n" },
    { slug: "script-tool", name: "Script Tool", dockerCompose: "curl -fsSL https://example.com/install.sh | bash\n" },
  ]);
  assert.deepEqual(result.skippedTools, ["Script Tool"]);
  assert.match(result.yaml, /example\/app:1\.0\.0/);
  assert.doesNotMatch(result.yaml, /install\.sh/);
});

test("colliding service/volume names across tools are renamed, not silently dropped", () => {
  const result = mergeDockerComposeFiles([
    {
      slug: "tool-a",
      name: "Tool A",
      dockerCompose: "services:\n  db:\n    image: postgres:16\nvolumes:\n  db_data:\n    driver: local\n",
    },
    {
      slug: "tool-b",
      name: "Tool B",
      dockerCompose: "services:\n  db:\n    image: mariadb:11\nvolumes:\n  db_data:\n    driver: local\n",
    },
  ]);
  assert.match(result.yaml, /tool-b-db:/, "second colliding service name must be renamed, not overwritten");
  assert.ok(result.warnings.length > 0, "a rename must be surfaced as a warning, never silent");
});

test("empty selection produces an empty result, not a fabricated compose", () => {
  const result = mergeDockerComposeFiles([]);
  assert.equal(result.yaml, "");
  assert.equal(result.skippedTools.length, 0);
});
