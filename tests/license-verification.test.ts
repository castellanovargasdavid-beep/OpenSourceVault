import { test } from "node:test";
import assert from "node:assert/strict";
import { verifyLicense } from "../src/lib/license-verification";

test("matching SPDX id: verified", () => {
  assert.equal(verifyLicense("MIT", "MIT"), "verified");
  assert.equal(verifyLicense("Apache-2.0", "Apache-2.0"), "verified");
});

test("catalog license with parenthetical note still matches its base SPDX id", () => {
  assert.equal(verifyLicense("AGPL-3.0 (con excepciones Apache-2.0/MIT en algunos directorios)", "AGPL-3.0"), "verified");
});

test("SPDX -only/-or-later suffix differences are not treated as a mismatch", () => {
  assert.equal(verifyLicense("GPL-3.0", "GPL-3.0-only"), "verified");
  assert.equal(verifyLicense("GPL-3.0-or-later", "GPL-3.0"), "verified");
});

test("genuinely different license families: mismatch", () => {
  assert.equal(verifyLicense("MIT", "GPL-3.0"), "mismatch");
});

test("GitHub returns no license data: unverifiable, never a false mismatch", () => {
  assert.equal(verifyLicense("MIT", null), "unverifiable");
  assert.equal(verifyLicense("MIT", undefined), "unverifiable");
  assert.equal(verifyLicense("MIT", "NOASSERTION"), "unverifiable");
});

test("catalog value with no reliable SPDX equivalent: unverifiable, never guessed", () => {
  assert.equal(verifyLicense("Source-available (non-OSI)", "MIT"), "unverifiable");
  assert.equal(verifyLicense("Sustainable Use License (Fair-code)", "Apache-2.0"), "unverifiable");
  assert.equal(verifyLicense("BUSL-1.1", "BUSL-1.1"), "unverifiable");
});

test("unmapped catalog license string: unverifiable, not a crash", () => {
  assert.equal(verifyLicense("Some future license nobody added to the table yet", "MIT"), "unverifiable");
});
