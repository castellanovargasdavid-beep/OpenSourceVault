/**
 * Compara la licencia declarada a mano en el catálogo (`tool.license`, texto
 * libre pensado para humanos) contra el identificador SPDX que GitHub
 * detecta automáticamente para el repositorio (`license.spdx_id` de
 * `GET /repos/{owner}/{repo}`) — ver getGithubStats() en github-stats.ts.
 *
 * Deliberadamente una TABLA explícita, no un parser genérico: el catálogo
 * solo tiene ~19 valores distintos de `license` hoy (verificado con
 * `grep -oE 'license: "[^"]+"' src/data/tools.ts | sort -u`), así que listar
 * cada uno a mano es más fiable y mantenible que intentar adivinar un
 * identificador SPDX a partir de texto libre — un parser genérico
 * clasificaría mal casos como "Source-available (non-OSI)" o "Sustainable
 * Use License (Fair-code)", que NO son identificadores SPDX reales y nunca
 * deben compararse contra lo que devuelve GitHub.
 *
 * Añade una entrada aquí cuando se añada al catálogo un valor de `license`
 * que no esté ya en esta tabla — mapea a su SPDX id real si GitHub puede
 * detectarlo de forma fiable, o a `null` si no (custom license, source-available
 * no-OSI, o un identificador que GitHub no reconoce de forma consistente).
 */
const CATALOG_LICENSE_TO_SPDX: Record<string, string | null> = {
  "AGPL-3.0 (con excepciones Apache-2.0/MIT en algunos directorios)": "AGPL-3.0",
  "AGPL-3.0": "AGPL-3.0",
  "Apache-2.0": "Apache-2.0",
  "BSD-2-Clause": "BSD-2-Clause",
  "BSD-3-Clause": "BSD-3-Clause",
  // Business Source License: no es open source (OSI) y GitHub no la
  // reconoce como un SPDX estándar de forma fiable — nunca comparar.
  "BUSL-1.1": null,
  "EUPL-1.2": "EUPL-1.2",
  // GitHub a veces la detecta como "Elastic-2.0", a veces no detecta nada —
  // demasiado inconsistente para afirmar una coincidencia o discrepancia.
  "Elastic License 2.0": null,
  "FSL-1.1 (pasa a Apache-2.0 a los 2 años)": null,
  "GPL-2.0": "GPL-2.0",
  "GPL-3.0": "GPL-3.0",
  "GPL-3.0-or-later": "GPL-3.0",
  "LGPL-3.0": "LGPL-3.0",
  MIT: "MIT",
  "MPL-2.0": "MPL-2.0",
  "OSL-3.0": "OSL-3.0",
  "Source-available (non-OSI)": null,
  "Sustainable Use License (Fair-code)": null,
  Zlib: "Zlib",
};

export type LicenseVerification = "verified" | "mismatch" | "unverifiable";

/** SPDX deprecó los identificadores "-only"/"-or-later" a favor de variantes explícitas para GPL/LGPL/AGPL — normaliza ambos lados antes de comparar para no marcar como discrepancia una diferencia puramente de versión de la lista SPDX (ej. catálogo "GPL-3.0" vs GitHub "GPL-3.0-only"). */
function normalizeSpdxId(id: string): string {
  return id.trim().toUpperCase().replace(/-(ONLY|OR-LATER)$/, "");
}

/**
 * "unverifiable" (no "mismatch") siempre que la comparación no sea fiable:
 * GitHub no detectó ninguna licencia (repos con licencia custom o sin
 * archivo LICENSE reconocible), o el valor del catálogo no tiene un
 * equivalente SPDX fiable en la tabla — nunca se inventa una discrepancia
 * a partir de la ausencia de dato.
 */
export function verifyLicense(declaredLicense: string, githubSpdxId: string | null | undefined): LicenseVerification {
  if (!githubSpdxId || githubSpdxId === "NOASSERTION") return "unverifiable";
  const expectedSpdx = CATALOG_LICENSE_TO_SPDX[declaredLicense];
  if (!expectedSpdx) return "unverifiable";
  return normalizeSpdxId(expectedSpdx) === normalizeSpdxId(githubSpdxId) ? "verified" : "mismatch";
}
