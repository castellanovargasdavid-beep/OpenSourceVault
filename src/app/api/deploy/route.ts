import { getToolBySlug } from "@/data/tools";
import { mergeDockerComposeFiles } from "@/lib/stack-merge";
import { buildDeployScript } from "@/lib/deploy-script";

export const runtime = "nodejs";

const MAX_TOOLS = 20;

const TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  // Cada respuesta lleva secretos aleatorios recién generados — nunca debe
  // servirse cacheada (ni por un CDN ni por el navegador), o distintos
  // visitantes podrían acabar compartiendo el mismo secreto "aleatorio".
  "Cache-Control": "no-store",
};

function errorScript(locale: "es" | "en", message: string): string {
  const lines =
    locale === "en"
      ? [
          "#!/usr/bin/env bash",
          "# AltFreeStack Stack Builder — this link couldn't generate a deploy script.",
          `echo "❌ ${message}"`,
          'echo "   Go back to https://altfreestack.com/en/stacks/builder and try again."',
          "exit 1",
        ]
      : [
          "#!/usr/bin/env bash",
          "# Stack Builder de AltFreeStack — este enlace no pudo generar un script de despliegue.",
          `echo "❌ ${message}"`,
          'echo "   Vuelve a https://altfreestack.com/stacks/builder e inténtalo de nuevo."',
          "exit 1",
        ];
  return lines.join("\n") + "\n";
}

/**
 * Devuelve un script bash de un solo comando (`curl -sSL .../api/deploy?stack=... | bash`)
 * que instala Docker si hace falta, escribe el docker-compose.yml fusionado
 * de las herramientas pedidas (con secretos ya aleatorizados) y lo arranca.
 *
 * SIEMPRE responde 200 con texto plano — incluso en error — para que un
 * `curl | bash` nunca reciba una página de error HTML como si fuera un
 * script: en su lugar recibe un script válido y corto que solo imprime el
 * error y sale con código 1.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawLocale = searchParams.get("locale");
  const locale: "es" | "en" = rawLocale === "en" ? "en" : "es";
  const raw = searchParams.get("stack") ?? "";
  const slugs = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_TOOLS);

  if (slugs.length === 0) {
    const message = locale === "en" ? "No tools were specified (?stack=...)." : "No se indicó ninguna herramienta (?stack=...).";
    return new Response(errorScript(locale, message), { headers: TEXT_HEADERS });
  }

  const tools = slugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => tool !== undefined)
    .map((tool) => ({ slug: tool.slug, name: tool.name, dockerCompose: tool.dockerCompose }));

  if (tools.length === 0) {
    const message = locale === "en" ? "None of the requested tools were found in the catalog." : "Ninguna de las herramientas pedidas existe en el catálogo.";
    return new Response(errorScript(locale, message), { headers: TEXT_HEADERS });
  }

  const merged = mergeDockerComposeFiles(tools);

  if (!merged.yaml) {
    const message =
      locale === "en"
        ? "None of the requested tools can be deployed via docker-compose (they install via their own script)."
        : "Ninguna de las herramientas pedidas se despliega con docker-compose (se instalan con su propio script).";
    return new Response(errorScript(locale, message), { headers: TEXT_HEADERS });
  }

  const script = buildDeployScript({
    yaml: merged.yaml,
    toolSummaries: merged.toolSummaries,
    skippedTools: merged.skippedTools,
    locale,
  });

  return new Response(script, { headers: TEXT_HEADERS });
}
