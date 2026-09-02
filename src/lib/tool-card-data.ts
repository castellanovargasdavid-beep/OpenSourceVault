import type { OpenSourceTool, ToolCardData } from "@/lib/types";
import { toolCardShortDescriptionsEn } from "@/data/tool-card-short-descriptions.en";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import type { Locale } from "@/i18n/config";

/**
 * Reduce una OpenSourceTool completa a solo los campos que ToolCard
 * necesita — sin dockerCompose, features, pros, cons, techStack ni
 * affiliateLinks. Úsala en cualquier vista de listado justo antes de
 * pasarle la herramienta a <ToolCard>, para no cruzar esos campos pesados
 * hacia el cliente en cada tarjeta.
 *
 * Deliberadamente en su propio módulo, separado de src/data/tools.ts: ese
 * archivo también exporta `allTools` (con el docker-compose completo de
 * las 136 herramientas), y un bundler que solo puede hacer tree-shaking a
 * nivel de archivo — no de export individual — incluiría igualmente todo
 * `allTools` en el bundle del cliente si ToolCard importara esta función
 * desde allí, aunque no la use.
 */
export function toToolCardData(tool: OpenSourceTool): ToolCardData {
  const { difficulty, minRamMb } = resolveToolResourceProfile(tool);
  return {
    id: tool.id,
    slug: tool.slug,
    name: tool.name,
    shortDescription: tool.shortDescription,
    websiteUrl: tool.websiteUrl,
    category: tool.category,
    replaces: tool.replaces,
    license: tool.license,
    starsCount: tool.starsCount,
    fossModel: tool.fossModel,
    tags: tool.tags,
    sponsored: tool.sponsored,
    status: tool.status,
    publishDate: tool.publishDate,
    difficulty,
    minRamMb,
  };
}

export function getLocalizedToolCardData(card: ToolCardData, locale: Locale): ToolCardData {
  if (locale !== "en") return card;
  const shortDescription = toolCardShortDescriptionsEn[card.id];
  if (!shortDescription) return card;
  return { ...card, shortDescription };
}
