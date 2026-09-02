/**
 * Heurísticas para personalizar la guía "How to Deploy" a partir del
 * `dockerCompose` de cada herramienta, sin necesitar campos nuevos en el
 * catálogo.
 */

/** Primer puerto de host expuesto (ej. "8080" en `"8080:80"`), o null si no se encuentra ninguno. */
export function extractDefaultPort(dockerCompose: string): string | null {
  const match = dockerCompose.match(/["']?(\d{2,5}):\d{2,5}(?:\/(?:tcp|udp))?["']?/);
  return match ? match[1] : null;
}

/** Nombres de variables con un placeholder `change-me*` sin rellenar, en el orden en que aparecen. */
export function extractEnvPlaceholders(dockerCompose: string): string[] {
  const re = /^\s*(?:-\s*)?([A-Za-z0-9_]+)(?:=|:\s*)"?change-me/gm;
  const found: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = re.exec(dockerCompose))) {
    if (!found.includes(match[1])) found.push(match[1]);
  }
  return found;
}

/**
 * true si `dockerCompose` es un docker-compose.yml real (`docker compose up -d`
 * lo arranca). Un puñado de herramientas (ej. Discourse, Dokploy) exponen en
 * ese mismo campo un script de instalación propio en su lugar.
 */
export function isComposeFile(dockerCompose: string): boolean {
  return /(^|\n)\s*services:\s*\n/.test(dockerCompose);
}
