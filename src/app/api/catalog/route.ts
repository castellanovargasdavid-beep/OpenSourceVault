import { NextResponse } from "next/server";
import { tools } from "@/data/tools";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { auditToolDeployment } from "@/lib/deployment-audit";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
// Catálogo público, el mismo cada vez hasta el próximo deploy — no depende
// de nada por request, así que puede cachearse agresivamente en el edge/CDN.
export const revalidate = 86400;

/**
 * Dataset público y legible por máquina del catálogo (Fase 26/30 del PRD de
 * CRO: "linkable product asset" — ver COMPETITOR_GAP.md y SEO_ROADMAP.md
 * para el porqué). Cubre a la vez tres de las ideas evaluadas ahí: "resource/
 * RAM matrix", "Docker compatibility matrix" y "Stack Builder public
 * dataset" — un solo endpoint en vez de tres, porque los tres piden
 * exactamente los mismos campos.
 *
 * Cero datos nuevos: cada campo ya es público en su propia ficha
 * (`/tool/{slug}`) — esto solo re-serializa en JSON lo que ya auditamos y
 * publicamos ahí, nunca un precio/benchmark/rating inventado. `license`,
 * `fossModel`, `minRamMb` y `dockerStatus` vienen literalmente de la misma
 * función (`resolveToolResourceProfile`/`auditToolDeployment`) que ya
 * alimenta la ficha visible, así que nunca pueden desincronizarse en
 * silencio de lo que un humano ve en la web.
 */
export async function GET() {
  const data = tools.map((tool) => {
    const { difficulty, minRamMb, isEstimated } = resolveToolResourceProfile(tool);
    const deployment = tool.dockerCompose ? auditToolDeployment(tool) : null;
    return {
      id: tool.id,
      slug: tool.slug,
      name: tool.name,
      category: tool.category,
      replaces: tool.replaces,
      license: tool.license,
      fossModel: tool.fossModel ?? null,
      language: tool.language ?? null,
      database: tool.database ?? null,
      difficulty,
      minRamMb,
      ramIsEstimated: isEstimated,
      dockerReady: Boolean(tool.dockerCompose),
      deploymentState: deployment?.state ?? "manual_setup",
      websiteUrl: tool.websiteUrl,
      githubUrl: tool.githubUrl,
      url: `${siteConfig.url}/tool/${tool.slug}`,
    };
  });

  return NextResponse.json(
    {
      source: siteConfig.url,
      generatedAt: new Date().toISOString().slice(0, 10),
      license: "Catalog data is published for reference/linking. Verify against the linked tool page before relying on any single field — see each tool's own page for full context and sourcing.",
      count: data.length,
      tools: data,
    },
    { headers: { "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800" } }
  );
}
