import { NextResponse } from "next/server";
import { getToolBySlug } from "@/data/tools";
import { mergeDockerComposeFiles } from "@/lib/stack-merge";

export const runtime = "nodejs";

const MAX_TOOLS = 20;

/**
 * Fusiona el docker-compose.yml de varias herramientas en un solo archivo.
 * Vive en el servidor a propósito: es la única forma de que el Stack
 * Builder pueda leer el `dockerCompose` completo de las herramientas
 * elegidas sin tener que enviar el catálogo entero (¡326KB con las 150
 * fichas!) al cliente solo para picker un puñado de ellas.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("tools") ?? "";
  const slugs = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_TOOLS);

  if (slugs.length === 0) {
    return NextResponse.json({ error: "no_tools" }, { status: 400 });
  }

  const notFound: string[] = [];
  const tools = slugs
    .map((slug) => {
      const tool = getToolBySlug(slug);
      if (!tool) {
        notFound.push(slug);
        return null;
      }
      return { slug: tool.slug, name: tool.name, dockerCompose: tool.dockerCompose };
    })
    .filter((t): t is { slug: string; name: string; dockerCompose: string } => t !== null);

  if (tools.length === 0) {
    return NextResponse.json({ error: "unknown_tools", notFound }, { status: 404 });
  }

  const { yaml, warnings, skippedTools } = mergeDockerComposeFiles(tools);

  return NextResponse.json({
    yaml,
    warnings,
    skippedTools,
    notFound,
    toolCount: tools.length,
  });
}
