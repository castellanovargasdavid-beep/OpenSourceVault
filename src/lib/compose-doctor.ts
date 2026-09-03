export type DoctorSeverity = "error" | "warning" | "info";

export interface DoctorFinding {
  severity: DoctorSeverity;
  /** Línea 1-indexada del texto pegado por el usuario, si aplica. */
  line?: number;
  message: string;
}

export interface DoctorFix {
  fixedYaml: string;
  /** Frases legibles de lo que cambió el reparador — vacío si no hizo falta tocar nada. */
  changes: string[];
}

export type DoctorInputKind = "yaml" | "error-message";

type Locale = "es" | "en";

/**
 * Deliberadamente NO es un parser YAML real: es el mismo enfoque ingenuo
 * basado en indentación que ya usa src/lib/stack-merge.ts, aplicado esta vez
 * a detectar errores en vez de fusionar archivos. Suficiente para las causas
 * más comunes de fallo en un docker-compose.yml de un principiante — no
 * pretende sustituir a `docker compose config` como validador exhaustivo.
 */

function getIndent(line: string): number {
  let i = 0;
  while (i < line.length && line[i] === " ") i++;
  return i;
}

function hasLeadingTab(line: string): boolean {
  const m = line.match(/^[ \t]*/);
  return m ? m[0].includes("\t") : false;
}

function isBlankOrComment(line: string): boolean {
  const t = line.trim();
  return t === "" || t.startsWith("#");
}

export function detectInputKind(text: string): DoctorInputKind {
  const trimmed = text.trim();
  if (!trimmed) return "yaml";
  if (/^services:\s*$/m.test(text)) return "yaml";
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  if (lines.length === 0) return "yaml";
  const yamlKeyLines = lines.filter((l) => /^\s*[A-Za-z0-9_.-]+:(\s|$)/.test(l) || /^\s*-\s/.test(l)).length;
  if (yamlKeyLines / lines.length > 0.4 && yamlKeyLines >= 2) return "yaml";
  return "error-message";
}

/** Detecta el número de espacios que usa el archivo como "una sangría" (2, 4...) a partir del primer salto de nivel real. */
function detectIndentUnit(lines: string[]): number {
  let min = Infinity;
  for (const line of lines) {
    if (hasLeadingTab(line) || isBlankOrComment(line)) continue;
    const ind = getIndent(line);
    if (ind > 0 && ind < min) min = ind;
  }
  return Number.isFinite(min) ? min : 2;
}

const PLACEHOLDER_VALUE = /^(change-?me[\w-]*|changeit|change[_-]?this|your[_-].*|replace[_-]?me|xxx+|todo|secret123?|password123?|admin(123)?|123456|contrase[ñn]a|placeholder)$/i;

const STRINGS: Record<
  Locale,
  {
    tab: (line: number) => string;
    badIndent: (line: number, indent: number, unit: number) => string;
    crlf: string;
    versionObsolete: (line: number) => string;
    duplicateService: (name: string) => string;
    emptyEnvVar: (line: number, key: string) => string;
    placeholderSecretVar: (line: number, key: string, value: string) => string;
    placeholderGenericVar: (line: number, key: string, value: string) => string;
    portInfo: (host: string, container: string) => string;
    noPorts: string;
    yamlAllGood: string;
    errorFallback: string;
    errorNoLineHint: string;
  }
> = {
  es: {
    tab: (line) => `Línea ${line}: estás usando un tabulador (Tab) para sangrar. YAML no admite tabuladores, solo espacios — sustitúyelo por espacios (normalmente 2 por nivel).`,
    badIndent: (line, indent, unit) =>
      `Línea ${line}: tiene ${indent} espacios de sangría, que no es múltiplo de los ${unit} que usa el resto del archivo. Esta es la causa más habitual del error "did not find expected key".`,
    crlf: "Tu archivo tiene finales de línea de Windows (CRLF). No debería impedir este análisis, pero si lo subes tal cual a un servidor Linux a veces da problemas raros — el botón de reparar los normaliza a Unix (LF).",
    versionObsolete: (line) => `Línea ${line}: la clave "version:" ya no hace falta en Docker Compose moderno (el propio comando la ignora, y a veces avisa de que está obsoleta). El botón de reparar la puede quitar sin problema.`,
    duplicateService: (name) => `El servicio "${name}" está definido más de una vez bajo "services:". YAML se queda calladamente con la última definición y descarta la primera — revisa si es un copiar-y-pegar de más.`,
    emptyEnvVar: (line, key) => `Línea ${line}: la variable "${key}" está vacía. Si tu app la necesita para arrancar, esto puede hacer que falle o que arranque sin protección alguna.`,
    placeholderSecretVar: (line, key, value) =>
      `Línea ${line}: dejaste "${key}" como "${value}". Si arrancas esto expuesto a internet tal cual, es una contraseña adivinable en segundos — te hackearán en cuestión de minutos. Cámbiala antes de desplegar (el botón de reparar puede generarte una real).`,
    placeholderGenericVar: (line, key, value) => `Línea ${line}: "${key}" tiene el valor de ejemplo "${value}" sin rellenar. Revisa que sea el que quieres antes de desplegar.`,
    portInfo: (host, container) => `Puertos: tu app escuchará en el puerto ${host} (mapeado al ${container} interno del contenedor). Asegúrate de que esté abierto en el cortafuegos de tu VPS si necesitas entrar desde fuera.`,
    noPorts: "No se detectó ningún puerto publicado (\"ports:\"). Si solo accedes desde dentro del propio servidor no pasa nada, pero si necesitas entrar desde fuera añade un bloque \"ports:\" al servicio principal.",
    yamlAllGood: "No hemos encontrado nada raro en la estructura del archivo. Tiene buena pinta.",
    errorFallback:
      "Todavía no reconocemos este mensaje de error exacto, pero las causas más comunes de un fallo así son: sangría con tabuladores en vez de espacios, un nivel de indentación que no coincide con el resto del archivo, o un \":\" que falta o que sobra. Pega tu docker-compose.yml completo arriba para que lo revisemos automáticamente.",
    errorNoLineHint: "No hemos podido extraer un número de línea de ese mensaje — revisa el archivo completo con la otra pestaña de esta herramienta.",
  },
  en: {
    tab: (line) => `Line ${line}: you're using a tab character to indent. YAML doesn't allow tabs, only spaces — replace it with spaces (usually 2 per level).`,
    badIndent: (line, indent, unit) =>
      `Line ${line}: has ${indent} spaces of indentation, which isn't a multiple of the ${unit} the rest of the file uses. This is the most common cause of the "did not find expected key" error.`,
    crlf: "Your file has Windows-style (CRLF) line endings. That shouldn't break this analysis, but uploading it as-is to a Linux server sometimes causes odd issues — the fix button normalizes it to Unix (LF).",
    versionObsolete: (line) => `Line ${line}: the "version:" key isn't needed in modern Docker Compose anymore (the command itself ignores it, and sometimes warns that it's obsolete). The fix button can safely remove it.`,
    duplicateService: (name) => `The service "${name}" is defined more than once under "services:". YAML silently keeps the last definition and drops the first one — check if this is a leftover from copy-pasting.`,
    emptyEnvVar: (line, key) => `Line ${line}: the "${key}" variable is empty. If your app needs it to start, this can make it crash or start up with no protection at all.`,
    placeholderSecretVar: (line, key, value) =>
      `Line ${line}: you left "${key}" as "${value}". If you deploy this exposed to the internet as-is, that's a guessable password within minutes — you'll get hacked fast. Change it before deploying (the fix button can generate a real one).`,
    placeholderGenericVar: (line, key, value) => `Line ${line}: "${key}" still has the example value "${value}". Double-check it's what you actually want before deploying.`,
    portInfo: (host, container) => `Ports: your app will listen on port ${host} (mapped to the container's internal ${container}). Make sure it's open on your VPS's firewall if you need to reach it from outside.`,
    noPorts: 'No published port ("ports:") was detected. That\'s fine if you only access it from inside the server itself, but if you need to reach it from outside, add a "ports:" block to the main service.',
    yamlAllGood: "We didn't find anything odd in the file's structure. Looks good.",
    errorFallback:
      "We don't recognize this exact error message yet, but the most common causes of a failure like this are: indenting with tabs instead of spaces, an indentation level that doesn't match the rest of the file, or a missing or extra \":\". Paste your full docker-compose.yml above so we can check it automatically.",
    errorNoLineHint: "We couldn't extract a line number from that message — review the full file using the other tab of this tool.",
  },
};

function scanIndentationAndTabs(lines: string[], locale: Locale): DoctorFinding[] {
  const t = STRINGS[locale];
  const findings: DoctorFinding[] = [];
  const unit = detectIndentUnit(lines);
  let blockScalarUntilIndent: number | null = null;

  lines.forEach((line, idx) => {
    const lineNo = idx + 1;
    if (isBlankOrComment(line)) return;

    if (hasLeadingTab(line)) {
      findings.push({ severity: "error", line: lineNo, message: t.tab(lineNo) });
      return;
    }

    const ind = getIndent(line);

    if (blockScalarUntilIndent !== null) {
      if (ind > blockScalarUntilIndent) return;
      blockScalarUntilIndent = null;
    }

    if (/:\s*[|>][+-]?\d*\s*$/.test(line)) {
      blockScalarUntilIndent = ind;
    }

    if (ind % unit !== 0) {
      findings.push({ severity: "error", line: lineNo, message: t.badIndent(lineNo, ind, unit) });
    }
  });

  return findings;
}

function scanVersionKey(lines: string[], locale: Locale): DoctorFinding[] {
  const t = STRINGS[locale];
  const findings: DoctorFinding[] = [];
  lines.forEach((line, idx) => {
    if (/^version:\s*["']?[0-9]/.test(line)) {
      findings.push({ severity: "info", line: idx + 1, message: t.versionObsolete(idx + 1) });
    }
  });
  return findings;
}

function scanDuplicateServices(lines: string[], locale: Locale): DoctorFinding[] {
  const t = STRINGS[locale];
  const seen = new Map<string, number[]>();
  let inServices = false;
  lines.forEach((line) => {
    if (/^services:\s*$/.test(line)) {
      inServices = true;
      return;
    }
    if (inServices && /^\S/.test(line) && line.trim() !== "") {
      inServices = false;
      return;
    }
    if (!inServices) return;
    const m = line.match(/^ {2}([A-Za-z0-9_.-]+):\s*$/);
    if (m) seen.set(m[1], [...(seen.get(m[1]) ?? []), 1]);
  });
  const findings: DoctorFinding[] = [];
  for (const [name, occurrences] of seen) {
    if (occurrences.length > 1) findings.push({ severity: "warning", message: t.duplicateService(name) });
  }
  return findings;
}

function scanEnvPlaceholders(lines: string[], locale: Locale): DoctorFinding[] {
  const t = STRINGS[locale];
  const findings: DoctorFinding[] = [];
  const flaggedLines = new Set<number>();
  let envIndent: number | null = null;

  lines.forEach((line, idx) => {
    const lineNo = idx + 1;
    const envHeader = line.match(/^(\s*)environment:\s*$/);
    if (envHeader) {
      envIndent = envHeader[1].length;
      return;
    }
    if (envIndent === null) return;
    if (line.trim() === "") return;
    const ind = getIndent(line);
    if (ind <= envIndent) {
      envIndent = null;
      return;
    }

    let key: string | undefined;
    let rawValue: string | undefined;
    const mapMatch = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    const listMatch = line.match(/^\s*-\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (mapMatch) {
      key = mapMatch[1];
      rawValue = mapMatch[2];
    } else if (listMatch) {
      key = listMatch[1];
      rawValue = listMatch[2];
    }
    if (!key || rawValue === undefined) return;

    const value = rawValue.trim().replace(/^["']|["']$/g, "");
    if (value === "") {
      findings.push({ severity: "warning", line: lineNo, message: t.emptyEnvVar(lineNo, key) });
      flaggedLines.add(lineNo);
    } else if (PLACEHOLDER_VALUE.test(value) || /^change-me/i.test(value)) {
      findings.push(placeholderFinding(t, lineNo, key, value));
      flaggedLines.add(lineNo);
    }
  });

  // Placeholders "change-me..." fuera de un bloque `environment:` (ej. en `command:` o argumentos sueltos).
  lines.forEach((line, idx) => {
    const lineNo = idx + 1;
    if (flaggedLines.has(lineNo)) return;
    const m = line.match(/change-me[A-Za-z0-9-]*/);
    if (m) {
      const keyMatch = line.match(/([A-Za-z0-9_]+)\s*[:=]/);
      findings.push(placeholderFinding(t, lineNo, keyMatch ? keyMatch[1] : "?", m[0]));
    }
  });

  return findings;
}

/** Solo se habla de "contraseña adivinable" cuando el nombre de la clave sugiere que de verdad es un secreto — el resto son placeholders genéricos sin fabricar alarma de seguridad donde no la hay. */
const SECRET_LIKE_KEY = /PASSWORD|SECRET|TOKEN|_KEY$|^KEY$|_KEY_|HASH|CREDENTIAL|PASS\d*$/i;

function placeholderFinding(t: (typeof STRINGS)["es"], line: number, key: string, value: string): DoctorFinding {
  if (SECRET_LIKE_KEY.test(key)) {
    return { severity: "error", line, message: t.placeholderSecretVar(line, key, value) };
  }
  return { severity: "warning", line, message: t.placeholderGenericVar(line, key, value) };
}

function scanPorts(lines: string[], locale: Locale): DoctorFinding[] {
  const t = STRINGS[locale];
  const found: { host: string; container: string }[] = [];
  const seenHosts = new Set<string>();
  for (const line of lines) {
    const m = line.match(/^\s*-\s*"?(\d{2,5}):(\d{1,5})(?:\/(?:tcp|udp))?"?\s*$/);
    if (m && !seenHosts.has(m[1])) {
      seenHosts.add(m[1]);
      found.push({ host: m[1], container: m[2] });
    }
  }
  if (found.length === 0) return [{ severity: "info", message: t.noPorts }];
  return found.map(({ host, container }) => ({ severity: "info" as const, message: t.portInfo(host, container) }));
}

const severityRank: Record<DoctorSeverity, number> = { error: 0, warning: 1, info: 2 };

function sortFindings(findings: DoctorFinding[]): DoctorFinding[] {
  return [...findings].sort((a, b) => {
    if (severityRank[a.severity] !== severityRank[b.severity]) return severityRank[a.severity] - severityRank[b.severity];
    return (a.line ?? Infinity) - (b.line ?? Infinity);
  });
}

export function analyzeComposeYaml(yaml: string, locale: Locale = "es"): DoctorFinding[] {
  const t = STRINGS[locale];
  const lines = yaml.split("\n");
  const findings: DoctorFinding[] = [
    ...scanIndentationAndTabs(lines, locale),
    ...scanVersionKey(lines, locale),
    ...scanDuplicateServices(lines, locale),
    ...scanEnvPlaceholders(lines, locale),
    ...scanPorts(lines, locale),
  ];
  if (yaml.includes("\r")) findings.push({ severity: "warning", message: t.crlf });
  if (findings.length === 0) findings.push({ severity: "info", message: t.yamlAllGood });
  return sortFindings(findings);
}

interface ErrorPattern {
  pattern: RegExp;
  es: string;
  en: string;
}

/**
 * Mensajes reales y bien documentados de docker-compose/go-yaml — no
 * inventados. Cuando el mensaje pegado no coincide con ninguno, se muestra
 * errorFallback en vez de fingir un diagnóstico.
 */
const ERROR_PATTERNS: ErrorPattern[] = [
  {
    pattern: /found character ['"]?\\?t['"]? that cannot start any token|found character that cannot start any token/i,
    es: "Hay un tabulador (Tab) donde debería haber espacios. YAML no permite tabuladores para la sangría — sustitúyelos por espacios (normalmente 2 por nivel).",
    en: "There's a tab character where spaces were expected. YAML doesn't allow tabs for indentation — replace them with spaces (usually 2 per level).",
  },
  {
    pattern: /did not find expected key/i,
    es: "El archivo tiene un problema de sangría (indentación) cerca de esa línea. YAML es muy estricto: cada nivel debe estar siempre el mismo número de espacios más adentro que su padre. Revisa que no haya una línea con un espacio de más o de menos justo antes de la línea indicada.",
    en: "The file has an indentation problem near that line. YAML is very strict: every level must sit exactly the same number of spaces deeper than its parent. Check for a line with one space too many or too few right before the reported line.",
  },
  {
    pattern: /did not find expected ':'/i,
    es: "Falta un \":\" después de una clave, o hay un \":\" dentro de un valor sin comillas (por ejemplo una URL) que confunde al analizador. Si el valor contiene \":\", ponlo entre comillas.",
    en: 'A ":" is missing after a key, or there\'s a ":" inside an unquoted value (like a URL) confusing the parser. If the value contains ":", wrap it in quotes.',
  },
  {
    pattern: /mapping values are not allowed (in this context|here)/i,
    es: 'Suele pasar cuando un valor sin comillas contiene un ":" (por ejemplo una hora "12:30" o una URL), o cuando falta indentar una lista/objeto que va después de una clave. Prueba a poner el valor entre comillas.',
    en: 'This usually happens when an unquoted value contains a ":" (like a time "12:30" or a URL), or when a list/object after a key isn\'t indented. Try wrapping the value in quotes.',
  },
  {
    pattern: /found unexpected end of stream/i,
    es: "El archivo se corta a media estructura — probablemente falta cerrar unas comillas que se abrieron antes, o el archivo se pegó incompleto.",
    en: "The file cuts off mid-structure — you probably have an unclosed quote from earlier, or the file was pasted incompletely.",
  },
  {
    pattern: /additional propert(?:y|ies) ['"]?([\w.-]+)['"]? (?:is|are) not allowed/i,
    es: "Docker Compose no reconoce esa clave. Es probable que esté mal escrita (revisa mayúsculas/minúsculas) o que esté puesta en el nivel del archivo que no toca.",
    en: "Docker Compose doesn't recognize that key. It's likely misspelled (check upper/lowercase) or placed at the wrong level of the file.",
  },
  {
    pattern: /services\.([\w.-]+) must be a mapping/i,
    es: "Esa sección de \"services\" no tiene el formato correcto: le falta el bloque indentado con sus opciones (imagen, puertos, etc.) justo debajo de su nombre.",
    en: 'That "services" section isn\'t formatted correctly: it\'s missing the indented block of options (image, ports, etc.) right below its name.',
  },
  {
    pattern: /unsupported config option for services\.([\w.-]+): ?['"]?([\w-]+)['"]?/i,
    es: "Esa opción no existe (o está mal escrita) dentro de ese servicio. Revisa el nombre exacto de la clave en la documentación de Docker Compose.",
    en: "That option doesn't exist (or is misspelled) inside that service. Double-check the exact key name in the Docker Compose documentation.",
  },
  {
    pattern: /no configuration file provided[:.]? not found/i,
    es: "Esto no es un error de tu archivo YAML: Docker Compose no encuentra ningún docker-compose.yml en la carpeta donde estás. Asegúrate de estar en la carpeta donde lo guardaste, o indica la ruta con -f ruta/al/archivo.yml.",
    en: "This isn't an error in your YAML file: Docker Compose can't find any docker-compose.yml in the folder you're in. Make sure you're in the folder where you saved it, or point to it with -f path/to/file.yml.",
  },
  {
    pattern: /bind for [\d.]+:(\d+) failed[:,]? port is already allocated|port is already allocated/i,
    es: "El puerto ya lo está usando otro programa (puede que otro contenedor, o Apache/Nginx corriendo ya en esa máquina). No es un error de sintaxis: cambia el puerto de la izquierda en \"ports:\" (por ejemplo de \"80:80\" a \"8080:80\") o para el servicio que lo esté usando.",
    en: 'Another program is already using that port (maybe another container, or Apache/Nginx already running on that machine). This isn\'t a syntax error: change the left-hand port under "ports:" (e.g. from "80:80" to "8080:80") or stop whatever is using it.',
  },
  {
    pattern: /permission denied/i,
    es: "Suele pasar con un volumen (\"volumes:\") que apunta a una carpeta cuyo dueño no es el usuario con el que corre Docker. Revisa los permisos de esa carpeta con \"ls -la\", o prueba arrancando con sudo.",
    en: 'This usually happens with a volume ("volumes:") pointing at a folder not owned by the user Docker runs as. Check that folder\'s permissions with "ls -la", or try running with sudo.',
  },
  {
    pattern: /network [\w-]+ declared as external, but could not be found/i,
    es: "Tu archivo referencia una red externa (\"external: true\") que Docker espera que ya exista, pero no la has creado. Créala con \"docker network create nombre-de-la-red\" o quita \"external: true\" si no la necesitas.",
    en: 'Your file references an external network ("external: true") that Docker expects to already exist, but it hasn\'t been created. Create it with "docker network create network-name", or remove "external: true" if you don\'t need it.',
  },
  {
    pattern: /cannot connect to the docker daemon/i,
    es: "Docker no está arrancado (o tu usuario no tiene permiso para hablar con él). Prueba \"sudo systemctl start docker\", y si sigue fallando añade tu usuario al grupo docker (\"sudo usermod -aG docker $USER\") y vuelve a iniciar sesión.",
    en: 'Docker isn\'t running (or your user can\'t talk to it). Try "sudo systemctl start docker", and if it still fails, add your user to the docker group ("sudo usermod -aG docker $USER") and log back in.',
  },
  {
    pattern: /docker-compose: command not found/i,
    es: "Estás usando el comando antiguo \"docker-compose\" (con guion). Las versiones modernas de Docker usan \"docker compose\" (dos palabras, sin guion).",
    en: 'You\'re using the old "docker-compose" command (with a hyphen). Modern Docker uses "docker compose" (two words, no hyphen).',
  },
  {
    pattern: /version.{0,15}is obsolete/i,
    es: "Es solo un aviso, no un error de verdad: la clave \"version:\" de tu archivo ya no hace falta en las versiones modernas de Docker Compose. Puedes ignorarlo, o borrar esa línea.",
    en: 'This is just a warning, not a real error: the "version:" key in your file isn\'t needed anymore in modern Docker Compose. You can ignore it, or delete that line.',
  },
  {
    pattern: /pull access denied|repository does not exist/i,
    es: "Docker no encuentra esa imagen en Docker Hub (o es privada). Revisa que el nombre de la imagen esté bien escrito en tu docker-compose.yml, sin errores de tipeo.",
    en: "Docker can't find that image on Docker Hub (or it's private). Double-check the image name in your docker-compose.yml for typos.",
  },
];

export function analyzeErrorMessage(text: string, locale: Locale = "es"): DoctorFinding[] {
  const t = STRINGS[locale];
  const findings: DoctorFinding[] = [];
  const lineMatch = text.match(/line (\d+)/i);
  const line = lineMatch ? parseInt(lineMatch[1], 10) : undefined;

  let matched = false;
  for (const entry of ERROR_PATTERNS) {
    if (entry.pattern.test(text)) {
      matched = true;
      findings.push({ severity: "error", line, message: locale === "en" ? entry.en : entry.es });
    }
  }

  if (!matched) {
    findings.push({ severity: "info", message: t.errorFallback });
  } else if (!line) {
    findings.push({ severity: "info", message: t.errorNoLineHint });
  }

  return findings;
}

function generateSecret(length = 32): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").slice(0, length);
}

function randomizeSecrets(yaml: string): { text: string; count: number } {
  const generated = new Map<string, string>();
  let count = 0;
  const text = yaml.replace(/change-me[A-Za-z0-9-]*/g, (match) => {
    if (!generated.has(match)) {
      generated.set(match, generateSecret(32));
      count++;
    }
    return generated.get(match)!;
  });
  return { text, count };
}

export function autoFixComposeYaml(yaml: string, locale: Locale = "es"): DoctorFix {
  const changes: string[] = [];
  const msg = (es: string, en: string) => (locale === "en" ? en : es);

  let text = yaml;

  if (text.includes("\r")) {
    text = text.replace(/\r\n?/g, "\n");
    changes.push(msg("Finales de línea Windows (CRLF) convertidos a Unix (LF).", "Windows (CRLF) line endings converted to Unix (LF)."));
  }

  const linesWithTabs = text.split("\n").filter((l) => hasLeadingTab(l)).length;
  if (linesWithTabs > 0) {
    text = text
      .split("\n")
      .map((line) => {
        const leading = line.match(/^[ \t]*/)![0];
        if (!leading.includes("\t")) return line;
        return leading.replace(/\t/g, "  ") + line.slice(leading.length);
      })
      .join("\n");
    changes.push(
      msg(`Tabuladores convertidos a espacios (${linesWithTabs} línea${linesWithTabs === 1 ? "" : "s"}).`, `Tabs converted to spaces (${linesWithTabs} line${linesWithTabs === 1 ? "" : "s"}).`)
    );
  }

  const lines = text.split("\n");
  const unit = detectIndentUnit(lines);
  if (unit !== 2 && unit > 0) {
    const newLines = lines.map((line) => {
      if (isBlankOrComment(line)) return line;
      const ind = getIndent(line);
      if (ind === 0 || ind % unit !== 0) return line;
      const level = ind / unit;
      return "  ".repeat(level) + line.slice(ind);
    });
    text = newLines.join("\n");
    changes.push(msg(`Sangría normalizada de ${unit} a 2 espacios por nivel.`, `Indentation normalized from ${unit} to 2 spaces per level.`));
  }

  if (/^version:\s*["']?[0-9]/m.test(text)) {
    text = text.replace(/^version:\s*["'][\d.]+["']\s*\n?/m, "").replace(/^version:\s*[\d.]+\s*\n?/m, "");
    changes.push(msg('Clave "version:" obsoleta eliminada.', '"version:" key removed (obsolete).'));
  }

  const beforeTrim = text;
  text = text
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/, ""))
    .join("\n");
  if (text !== beforeTrim) changes.push(msg("Espacios sobrantes al final de cada línea eliminados.", "Trailing whitespace removed from each line."));

  const beforeCollapse = text;
  text = text.replace(/\n{3,}/g, "\n\n");
  if (text !== beforeCollapse) changes.push(msg("Líneas en blanco de más colapsadas.", "Extra blank lines collapsed."));

  const { text: randomized, count } = randomizeSecrets(text);
  if (count > 0) {
    text = randomized;
    changes.push(
      msg(`${count} secreto${count === 1 ? "" : "s"} "change-me..." sustituido${count === 1 ? "" : "s"} por valores aleatorios reales.`, `${count} "change-me..." secret${count === 1 ? "" : "s"} replaced with real random values.`)
    );
  }

  return { fixedYaml: text, changes };
}
