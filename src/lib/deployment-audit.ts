import type { OpenSourceTool } from "@/lib/types";
import { isComposeFile } from "@/lib/deploy-guide";

/**
 * Clasificación técnica del sistema de despliegue de cada herramienta —
 * fuente única para la UI de /tool/* y para `npm run audit:deployment`
 * (scripts/deployment-audit.ts). Todo aquí es DERIVADO de `dockerCompose`/
 * `dockerStatus`, ya presentes en el catálogo — no añade ni asume ningún
 * dato nuevo por herramienta, y nunca inventa una versión ni un origen que
 * no se pueda confirmar con lo que ya hay en tools.ts.
 */

// --- Clasificación de tags de imagen Docker --------------------------------

export type DockerTagClass = "pinned" | "digest" | "mutable" | "unknown";

export interface DockerImageRef {
  /** El valor completo de `image:` tal cual aparece en el compose (repo + tag/digest). */
  image: string;
  tagClass: DockerTagClass;
}

/** Nombres de tag que por convención son "móviles" (apuntan a algo distinto con cada rebuild upstream), nunca a una versión concreta. Se comprueban por segmento (ej. "main-latest" o "postgresql-latest" cuentan como móviles por el segmento "latest"), no solo por coincidencia exacta de todo el tag. */
const MUTABLE_TAG_NAMES = new Set(["latest", "main", "master", "dev", "edge", "nightly", "rolling", "stable", "unstable", "lts", "release"]);

/** "16.4", "v2.1.0", "2026.08.1-alpine"... — algo con pinta de versión real, no un alias móvil. */
const VERSION_LIKE_TAG = /^v?\d+([.\-_][\w]+)*$/;

function classifyTag(tag: string | undefined): DockerTagClass {
  if (tag === undefined) return "mutable"; // sin tag = Docker asume "latest" implícitamente
  const lower = tag.toLowerCase();
  const segments = lower.split(/[.\-_]/);
  if (segments.some((s) => MUTABLE_TAG_NAMES.has(s))) return "mutable";
  if (VERSION_LIKE_TAG.test(tag)) return "pinned";
  return "unknown";
}

/** Extrae cada línea `image:` de un docker-compose.yml y clasifica su tag. Vacío si el contenido no es un compose real (ver isComposeFile) — algunas herramientas usan este mismo campo para un script de instalación. */
export function extractDockerImageRefs(dockerCompose: string): DockerImageRef[] {
  const refs: DockerImageRef[] = [];
  for (const line of dockerCompose.split("\n")) {
    const m = line.match(/^\s*image:\s*(.+?)\s*(#.*)?$/);
    if (!m) continue;
    const raw = m[1].replace(/^["']|["']$/g, "");

    if (raw.includes("@sha256:")) {
      refs.push({ image: raw, tagClass: "digest" });
      continue;
    }
    const lastColon = raw.lastIndexOf(":");
    const lastSlash = raw.lastIndexOf("/");
    // El ":" solo es separador de tag si viene DESPUÉS de la última "/" —
    // si no, es parte de un host:puerto de un registry privado (raro en
    // este catálogo, pero evita clasificar mal si aparece).
    const tag = lastColon > lastSlash ? raw.slice(lastColon + 1) : undefined;
    refs.push({ image: raw, tagClass: classifyTag(tag) });
  }
  return refs;
}

// --- Método de despliegue y origen del script ------------------------------

export type DeploymentMethod = "compose" | "external_script";

export function getDeploymentMethod(tool: Pick<OpenSourceTool, "dockerCompose">): DeploymentMethod {
  return isComposeFile(tool.dockerCompose) ? "compose" : "external_script";
}

export type ScriptOriginClass = "official" | "third_party" | "unverifiable";

export interface ScriptOriginResult {
  origin: ScriptOriginClass;
  /** URLs http(s) encontradas en el script, para que la UI pueda enlazarlas ("ver script antes de ejecutar"). */
  urls: string[];
}

function extractHttpUrls(text: string): string[] {
  return text.match(/https?:\/\/[^\s"')]+/g) ?? [];
}

function hostnameOf(url: string | undefined): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return undefined;
  }
}

function isSameOrSubdomain(host: string, officialHost: string): boolean {
  return host === officialHost || host.endsWith(`.${officialHost}`);
}

/** "org/repo" extraído de una URL de GitHub (ej. "coollabsio/coolify" de "https://github.com/coollabsio/coolify"), o undefined si no es una URL de GitHub reconocible. */
function githubOrgRepoOf(githubUrl: string): string | undefined {
  try {
    const url = new URL(githubUrl);
    if (hostnameOf(githubUrl) !== "github.com") return undefined;
    const [, org, repo] = url.pathname.split("/");
    return org && repo ? `${org}/${repo}` : undefined;
  } catch {
    return undefined;
  }
}

/**
 * "official" solo cuando TODAS las URLs del script resuelven al mismo
 * dominio que `githubUrl` o `websiteUrl` de esa misma herramienta (o un
 * subdominio suyo), o son contenido servido por GitHub (github.com /
 * raw.githubusercontent.com / codeload.github.com) bajo el mismo "org/repo"
 * que `githubUrl` — es decir, algo verificable desde el propio dato de la
 * ficha, no una suposición. Si el proyecto real publica su script desde un
 * dominio distinto al que tenemos registrado (pasa, p.ej., con CDNs de la
 * misma empresa bajo otro nombre), esto lo marca "unverifiable" en vez de
 * asumir que es correcto — más estricto que necesario en algún caso
 * concreto, pero nunca falso-positivo.
 */
export function getScriptOrigin(tool: Pick<OpenSourceTool, "dockerCompose" | "githubUrl" | "websiteUrl">): ScriptOriginResult {
  const urls = extractHttpUrls(tool.dockerCompose);
  if (urls.length === 0) return { origin: "unverifiable", urls: [] };

  const officialHosts = [hostnameOf(tool.githubUrl), hostnameOf(tool.websiteUrl)].filter((h): h is string => Boolean(h));
  const orgRepo = githubOrgRepoOf(tool.githubUrl);
  const githubContentHosts = new Set(["raw.githubusercontent.com", "codeload.github.com", "github.com"]);

  const allMatch = urls.every((url) => {
    const host = hostnameOf(url);
    if (host === undefined) return false;
    if (officialHosts.some((official) => isSameOrSubdomain(host, official))) return true;
    if (orgRepo && githubContentHosts.has(host)) {
      try {
        return new URL(url).pathname.replace(/^\//, "").startsWith(`${orgRepo}/`) || new URL(url).pathname.replace(/^\//, "") === orgRepo;
      } catch {
        return false;
      }
    }
    return false;
  });

  return { origin: allMatch ? "official" : "unverifiable", urls };
}

/** true si el script hace pipe directo a un intérprete (`curl ... | bash`) sin pasar por un archivo intermedio que se pueda inspeccionar primero. */
export function usesDirectPipeToShell(dockerCompose: string): boolean {
  return /\|\s*(sudo\s+)?(ba)?sh\b/i.test(dockerCompose);
}

// --- Secretos hardcodeados vs placeholders ----------------------------------

/**
 * Marcadores que dejan claro que un valor es un placeholder deliberado a
 * rellenar por quien despliega — nunca un secreto real filtrado. Si un
 * valor de contraseña/secreto/clave/token NO lleva ninguno de estos
 * marcadores (ni está vacío, que es igual de seguro — el usuario debe
 * poner su propia clave), es una asignación sospechosa que merece revisión
 * manual: podría ser un secreto real olvidado en el catálogo.
 */
const PLACEHOLDER_MARKERS = /change[-_]?me|changeme|your[-_]|<.*>|\$\{|xxxx|placeholder|replace[-_]?me|example\.com|generat|random/i;

/** Devuelve cada asignación `XXX_PASSWORD=`/`XXX_SECRET=`/`XXX_KEY=`/`XXX_TOKEN=` en el compose cuyo valor no está vacío y no lleva ningún marcador de placeholder reconocible — candidatas a secreto hardcodeado real, para revisión humana (nunca se auto-corrigen, ver Fase 2 del brief). El `[ \t]*` (no `\s*`) tras `[:=]` es a propósito: `\s` también matcharía el salto de línea y, con un valor vacío, la captura se colaría hasta la línea siguiente. */
export function findSuspiciousSecretAssignments(dockerCompose: string): string[] {
  const re = /^[ \t]*-?[ \t]*[A-Z_]*(?:PASSWORD|SECRET|_KEY|TOKEN|API_KEY)[A-Z_]*[ \t]*[:=][ \t]*["']?([^"'\s#]+)/gm;
  const found: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(dockerCompose))) {
    const value = m[1];
    if (!value) continue; // valor vacío = el usuario debe poner el suyo, no un secreto olvidado
    if (PLACEHOLDER_MARKERS.test(value) || PLACEHOLDER_MARKERS.test(m[0])) continue;
    found.push(m[0].trim());
  }
  return found;
}

// --- Estado de verificación del despliegue ---------------------------------

/**
 * DECLARED / DETECTED / DERIVED — separación explícita para que "verified"
 * nunca dependa solo de una afirmación manual sin respaldo:
 *
 * - DECLARED (`declared`): el dato tal cual está escrito en tools.ts
 *   (`dockerStatus`). Es una AFIRMACIÓN de quien editó el catálogo — nadie
 *   automático la comprobó todavía en este punto. Puede ser correcta o
 *   puede estar simplemente mal escrita.
 * - DETECTED (`detected`): evidencia que este módulo puede confirmar por sí
 *   mismo, solo a partir del texto de `dockerCompose`/`githubUrl` ya
 *   presentes en el catálogo — sin tocar internet, sin inventar nada.
 * - DERIVED (`state`): el resultado de combinar ambas. `declared` por sí
 *   solo NUNCA es suficiente para "verified": si dice VERIFIED_PINNED pero
 *   `detected` no lo respalda (imagen sin identificar, tag móvil, fuente no
 *   identificable, o una señal de secreto hardcodeado), la afirmación queda
 *   marcada como no respaldada (`declaredVerifiedButUnsupported: true`) y
 *   el estado derivado cae a "partially_verified" — `npm run audit:deployment`
 *   convierte ese caso en un error (ver scripts/deployment-audit.ts).
 *
 * Estados:
 * - "verified": `declared.dockerStatus === "VERIFIED_PINNED"` Y todos los
 *   criterios de `detected` lo respaldan (ver `meetsVerifiedCriteria`). El
 *   nivel de confianza más alto que ofrece este catálogo — sigue sin ser una
 *   auditoría de seguridad del software, solo confirma que la referencia a
 *   la imagen está fijada y no contradice ninguna señal automática conocida.
 * - "partially_verified": o bien `dockerStatus` está fijado a mano pero con
 *   matices (`LATEST_ONLY`/`ARCHIVED_UPSTREAM`/`LEGACY_IMAGE`), o bien
 *   `VERIFIED_PINNED` fue declarado pero `detected` no lo respalda del todo
 *   (afirmación sin respaldo completo — no se descarta sin más, pero
 *   tampoco se confía a ciegas), o bien nadie lo declaró pero el texto de
 *   TODOS los tags ya tiene pinta de versión fija — un indicio razonable,
 *   no una confirmación.
 * - "unverified": no hay `dockerStatus` declarado Y al menos un tag de
 *   imagen es móvil o de forma no reconocible. El estado por defecto y más
 *   honesto para la mayoría del catálogo — no se afirma "verified" solo
 *   porque exista un docker-compose.
 * - "external_script": no hay un docker-compose.yml real — se instala con
 *   el instalador oficial del propio proyecto (gestiona Docker u otra
 *   infraestructura por su cuenta).
 * - "manual_setup": tampoco hay compose, y además el propio flujo oficial
 *   no usa Docker en absoluto (clonar + compilar a mano).
 */
export type DeploymentVerificationState = "verified" | "partially_verified" | "unverified" | "manual_setup" | "external_script";

/** El dato tal cual se declaró a mano en tools.ts — una afirmación, no una prueba. */
export interface DeclaredDeploymentInfo {
  dockerStatus: OpenSourceTool["dockerStatus"];
}

/**
 * Evidencia que SÍ puede confirmarse automáticamente, solo a partir de los
 * datos ya presentes en el catálogo (dockerCompose/githubUrl) — nunca
 * consulta un registro real ni internet.
 */
export interface DetectedDeploymentEvidence {
  imageCount: number;
  /** true solo si hay >=1 imagen Y todas son "pinned" o "digest" (ninguna mutable/unknown). */
  allTagsPinnedOrDigest: boolean;
  hasMutableTag: boolean;
  hasUnknownTag: boolean;
  /** `githubUrl` es una URL http(s) con forma reconocible — no confirma que el repo exista, solo que el dato tiene forma de fuente identificable. */
  hasIdentifiableSource: boolean;
  /** true si `findSuspiciousSecretAssignments` encuentra algo en este compose — señal conocida de deployment inseguro. */
  hasSuspiciousSecrets: boolean;
}

function hasIdentifiableSource(githubUrl: string | undefined): boolean {
  if (!githubUrl) return false;
  try {
    const url = new URL(githubUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Los criterios mínimos que este módulo puede comprobar automáticamente
 * para que una imagen "declarada" VERIFIED_PINNED merezca ese estado de
 * verdad (Fase 3): imagen identificable, tag fijado/digest, fuente
 * identificable, y ninguna señal conocida de deployment inseguro. Si falta
 * cualquiera de estos, `declared.dockerStatus === "VERIFIED_PINNED"` queda
 * como una afirmación SIN respaldo automático — nunca se traduce a
 * "verified" solo porque el catálogo lo diga.
 */
function meetsVerifiedCriteria(detected: DetectedDeploymentEvidence): boolean {
  return detected.imageCount > 0 && detected.allTagsPinnedOrDigest && detected.hasIdentifiableSource && !detected.hasSuspiciousSecrets;
}

export interface DeploymentAudit {
  method: DeploymentMethod;
  images: DockerImageRef[];
  hasMutableTag: boolean;
  hasUnknownTag: boolean;
  scriptOrigin?: ScriptOriginResult;
  usesDirectPipeToShell: boolean;
  state: DeploymentVerificationState;
  declared: DeclaredDeploymentInfo;
  detected: DetectedDeploymentEvidence;
  /** true si el catálogo declara VERIFIED_PINNED pero la evidencia detectada no lo respalda — inconsistencia real de datos, no solo un matiz. `npm run audit:deployment` falla si encuentra alguna. */
  declaredVerifiedButUnsupported: boolean;
}

/**
 * Herramientas cuyo flujo oficial NO usa contenedores en absoluto (build
 * manual sobre el host) — confirmado por el propio comentario de su
 * `dockerCompose` en tools.ts, no una suposición ni una detección por
 * palabra clave (probamos eso primero: buscar la palabra "docker" en el
 * comentario da falsos positivos y negativos, ya que unas herramientas la
 * mencionan solo para aclarar que NO la usan y otras ni la mencionan pese a
 * depender de Docker por dentro de su script). Lista corta y a mano a
 * propósito — son solo 10 herramientas "script" en todo el catálogo hoy.
 */
const NO_DOCKER_AT_ALL_TOOL_IDS = new Set(["dub-co"]);

export function auditToolDeployment(
  tool: Pick<OpenSourceTool, "id" | "dockerCompose" | "dockerStatus" | "githubUrl" | "websiteUrl">
): DeploymentAudit {
  const method = getDeploymentMethod(tool);
  const declared: DeclaredDeploymentInfo = { dockerStatus: tool.dockerStatus };

  if (method === "external_script") {
    const scriptOrigin = getScriptOrigin(tool);
    const detected: DetectedDeploymentEvidence = {
      imageCount: 0,
      allTagsPinnedOrDigest: false,
      hasMutableTag: false,
      hasUnknownTag: false,
      hasIdentifiableSource: hasIdentifiableSource(tool.githubUrl),
      hasSuspiciousSecrets: findSuspiciousSecretAssignments(tool.dockerCompose).length > 0,
    };
    return {
      method,
      images: [],
      hasMutableTag: false,
      hasUnknownTag: false,
      scriptOrigin,
      usesDirectPipeToShell: usesDirectPipeToShell(tool.dockerCompose),
      state: NO_DOCKER_AT_ALL_TOOL_IDS.has(tool.id) ? "manual_setup" : "external_script",
      declared,
      detected,
      // "verified" no existe para script/manual_setup — no aplica, nunca contradicho.
      declaredVerifiedButUnsupported: false,
    };
  }

  const images = extractDockerImageRefs(tool.dockerCompose);
  const hasMutableTag = images.some((i) => i.tagClass === "mutable");
  const hasUnknownTag = images.some((i) => i.tagClass === "unknown");
  const allPinnedOrDigest = images.length > 0 && images.every((i) => i.tagClass === "pinned" || i.tagClass === "digest");

  const detected: DetectedDeploymentEvidence = {
    imageCount: images.length,
    allTagsPinnedOrDigest: allPinnedOrDigest,
    hasMutableTag,
    hasUnknownTag,
    hasIdentifiableSource: hasIdentifiableSource(tool.githubUrl),
    hasSuspiciousSecrets: findSuspiciousSecretAssignments(tool.dockerCompose).length > 0,
  };

  const declaredVerified = declared.dockerStatus === "VERIFIED_PINNED";
  const declaredVerifiedButUnsupported = declaredVerified && !meetsVerifiedCriteria(detected);

  let state: DeploymentVerificationState;
  if (declaredVerified && meetsVerifiedCriteria(detected)) {
    // "verified" exige AMBAS cosas: la afirmación del catálogo Y que la
    // evidencia detectada automáticamente la respalde — nunca solo la
    // afirmación (ver meetsVerifiedCriteria y la Fase 3 del brief).
    state = "verified";
  } else if (declaredVerifiedButUnsupported) {
    // Se declaró VERIFIED_PINNED pero la evidencia no lo respalda del todo:
    // no se descarta sin más (alguien sí revisó algo), pero tampoco se
    // confía a ciegas en la afirmación — cae a "partially_verified", y
    // `npm run audit:deployment` convierte esto en un error de datos.
    state = "partially_verified";
  } else if (declared.dockerStatus === "LATEST_ONLY" || declared.dockerStatus === "ARCHIVED_UPSTREAM" || declared.dockerStatus === "LEGACY_IMAGE") {
    state = "partially_verified";
  } else if (allPinnedOrDigest) {
    state = "partially_verified";
  } else {
    state = "unverified";
  }

  return {
    method,
    images,
    hasMutableTag,
    hasUnknownTag,
    usesDirectPipeToShell: false,
    state,
    declared,
    detected,
    declaredVerifiedButUnsupported,
  };
}
