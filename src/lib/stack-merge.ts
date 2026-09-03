import { isComposeFile } from "@/lib/deploy-guide";

interface ParsedBlock {
  name: string;
  bodyLines: string[];
}

interface ParsedCompose {
  services: ParsedBlock[];
  volumes: ParsedBlock[];
}

/**
 * Parser deliberadamente ingenuo (no un parser YAML real) — se apoya en que
 * TODO el catálogo de AltFreeStack se escribe con el mismo estilo consistente:
 * `services:`/`volumes:` en columna 0, cada entrada con exactamente 2
 * espacios de indentación y sin valor en la misma línea. Verificado contra
 * el catálogo completo (ningún docker-compose.yml usa `networks:` ni
 * variantes de indentación). Si algún día se añade una herramienta con un
 * compose.yml de forma distinta, el fusionador la trata como no fusionable
 * (mergeDockerComposeFiles la añade a `skippedTools`) en vez de generar un
 * archivo incorrecto.
 */
function parseCompose(text: string): ParsedCompose {
  const lines = text.split("\n");
  const services: ParsedBlock[] = [];
  const volumes: ParsedBlock[] = [];
  let mode: "none" | "services" | "volumes" = "none";
  let current: ParsedBlock | null = null;

  const flush = () => {
    if (!current) return;
    if (mode === "services") services.push(current);
    else if (mode === "volumes") volumes.push(current);
    current = null;
  };

  for (const line of lines) {
    if (/^services:\s*$/.test(line)) {
      flush();
      mode = "services";
      continue;
    }
    if (/^volumes:\s*$/.test(line)) {
      flush();
      mode = "volumes";
      continue;
    }
    if (/^\S/.test(line) && line.trim() !== "") {
      // Volvimos a un nivel superior (0 espacios) con otra clave que no
      // manejamos (ej. "version:") — cierra la sección actual.
      flush();
      mode = "none";
      continue;
    }
    if (mode === "none") continue;
    const headerMatch = line.match(/^ {2}([A-Za-z0-9_.-]+):\s*$/);
    if (headerMatch) {
      flush();
      current = { name: headerMatch[1], bodyLines: [] };
      continue;
    }
    if (current) current.bodyLines.push(line);
  }
  flush();

  return { services, volumes };
}

/** Reescribe `depends_on:\n  - nombre` cuando `nombre` fue renombrado por colisión. */
function rewriteDependsOn(bodyLines: string[], renameMap: Map<string, string>): string[] {
  if (renameMap.size === 0) return bodyLines;
  return bodyLines.map((line) => {
    const m = line.match(/^(\s*-\s*)([A-Za-z0-9_.-]+)\s*$/);
    if (m && renameMap.has(m[2])) return `${m[1]}${renameMap.get(m[2])}`;
    return line;
  });
}

/** Reescribe montajes `- nombre_volumen:/ruta` cuando el volumen fue renombrado por colisión. */
function rewriteVolumeMounts(bodyLines: string[], volumeRenameMap: Map<string, string>): string[] {
  if (volumeRenameMap.size === 0) return bodyLines;
  return bodyLines.map((line) => {
    const m = line.match(/^(\s*-\s*)([A-Za-z0-9_.-]+)(:\/.*)$/);
    if (m && volumeRenameMap.has(m[2])) return `${m[1]}${volumeRenameMap.get(m[2])}${m[3]}`;
    return line;
  });
}

/** Reasigna el puerto de host de una línea `- "HOST:CONTAINER"` si ya está en uso por otra herramienta del stack. */
function rewritePorts(bodyLines: string[], usedHostPorts: Set<string>, warnings: string[], toolName: string): string[] {
  return bodyLines.map((line) => {
    const m = line.match(/^(\s*-\s*)"?(\d{2,5}):(\d{1,5}(?:\/(?:tcp|udp))?)"?\s*$/);
    if (!m) return line;
    const [, prefix, hostPort, rest] = m;
    let finalPort = hostPort;
    if (usedHostPorts.has(finalPort)) {
      let candidate = parseInt(hostPort, 10) + 1;
      while (usedHostPorts.has(String(candidate))) candidate++;
      finalPort = String(candidate);
      warnings.push(`${toolName}: puerto ${hostPort} ya usado por otra herramienta del stack → reasignado a ${finalPort}.`);
    }
    usedHostPorts.add(finalPort);
    return `${prefix}"${finalPort}:${rest}"`;
  });
}

export interface StackMergeInput {
  slug: string;
  name: string;
  dockerCompose: string;
}

export interface StackMergeResult {
  /** El docker-compose.yml combinado, listo para `docker compose up -d`. Vacío si ninguna herramienta era fusionable. */
  yaml: string;
  /** Avisos legibles (renombrados, puertos reasignados) para mostrar al usuario — nunca se ocultan. */
  warnings: string[];
  /** Nombres de herramientas sin docker-compose.yml combinable (instaladores por script) — no entran en el archivo. */
  skippedTools: string[];
}

export function mergeDockerComposeFiles(tools: StackMergeInput[]): StackMergeResult {
  const usedServiceNames = new Set<string>();
  const usedVolumeNames = new Set<string>();
  const usedHostPorts = new Set<string>();
  const warnings: string[] = [];
  const skippedTools: string[] = [];
  const serviceLines: string[] = [];
  const volumeLines: string[] = [];

  for (const tool of tools) {
    if (!tool.dockerCompose || !isComposeFile(tool.dockerCompose)) {
      skippedTools.push(tool.name);
      continue;
    }

    const { services, volumes } = parseCompose(tool.dockerCompose);
    if (services.length === 0) {
      skippedTools.push(tool.name);
      continue;
    }

    const renameMap = new Map<string, string>();
    const volumeRenameMap = new Map<string, string>();
    const finalServiceNames = new Map<string, string>();
    const finalVolumeNames = new Map<string, string>();

    for (const svc of services) {
      let finalName = svc.name;
      if (usedServiceNames.has(finalName)) {
        finalName = `${tool.slug}-${svc.name}`;
        let suffix = 2;
        while (usedServiceNames.has(finalName)) finalName = `${tool.slug}-${svc.name}-${suffix++}`;
        renameMap.set(svc.name, finalName);
      }
      usedServiceNames.add(finalName);
      finalServiceNames.set(svc.name, finalName);
    }

    for (const vol of volumes) {
      let finalName = vol.name;
      if (usedVolumeNames.has(finalName)) {
        finalName = `${tool.slug}-${vol.name}`;
        let suffix = 2;
        while (usedVolumeNames.has(finalName)) finalName = `${tool.slug}-${vol.name}-${suffix++}`;
        volumeRenameMap.set(vol.name, finalName);
      }
      usedVolumeNames.add(finalName);
      finalVolumeNames.set(vol.name, finalName);
    }

    if (renameMap.size > 0 || volumeRenameMap.size > 0) {
      const parts = [...renameMap.entries(), ...volumeRenameMap.entries()].map(([from, to]) => `"${from}" → "${to}"`);
      warnings.push(`${tool.name}: renombrado(s) por colisión con otra herramienta del stack — ${parts.join(", ")}.`);
    }

    serviceLines.push(`  # ── ${tool.name} ──`);
    for (const svc of services) {
      const finalName = finalServiceNames.get(svc.name)!;
      let body = rewriteDependsOn(svc.bodyLines, renameMap);
      body = rewriteVolumeMounts(body, volumeRenameMap);
      body = rewritePorts(body, usedHostPorts, warnings, tool.name);
      serviceLines.push(`  ${finalName}:`, ...body);
    }

    for (const vol of volumes) {
      const finalName = finalVolumeNames.get(vol.name)!;
      volumeLines.push(`  ${finalName}:`, ...vol.bodyLines);
    }
  }

  if (serviceLines.length === 0) {
    return { yaml: "", warnings, skippedTools };
  }

  const header = [
    "# docker-compose.yml generado por el Stack Builder de AltFreeStack",
    `# Combina: ${tools.filter((t) => !skippedTools.includes(t.name)).map((t) => t.name).join(", ")}`,
    "# Antes de arrancar, sustituye cada valor \"change-me...\" por un secreto real",
    "# (usa el botón \"Generar secretos seguros\" de la ficha de cada herramienta).",
    "",
    "services:",
  ];

  const body = [...header, ...serviceLines];
  if (volumeLines.length > 0) {
    body.push("", "volumes:", ...volumeLines);
  }

  return { yaml: body.join("\n"), warnings, skippedTools };
}
