import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories, getCategoryHref } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { getFeaturedTools, getRecentlyAddedTools } from "@/data/tools";
import type { OpenSourceTool } from "@/lib/types";
import { isPublished } from "@/lib/types";
import { catalogStats } from "@/lib/catalog-stats";
import { categoryColors } from "@/lib/category-colors";
import { categoryIconMap } from "@/lib/category-icons";
import { cn, getHostname } from "@/lib/utils";
import { localeHref } from "@/lib/locale-href";
import { getToolsExplorerHref } from "@/lib/routes";
import { getDictionary } from "@/i18n/get-dictionary";
import { LogoImage } from "@/components/site/logo-image";
import type { Locale } from "@/i18n/config";

const MAX_HIGHLIGHT_TOOLS = 6;

/** Featured + recién añadidas, deduplicadas y publicadas únicamente — un puñado, no las ~30 tarjetas completas que mostraban por separado FeaturedTools/RecentlyAddedTools. */
function getHighlightTools(): OpenSourceTool[] {
  const seen = new Set<string>();
  const highlight: OpenSourceTool[] = [];
  for (const tool of [...getFeaturedTools(), ...getRecentlyAddedTools()]) {
    if (!isPublished(tool) || seen.has(tool.id)) continue;
    seen.add(tool.id);
    highlight.push(tool);
    if (highlight.length >= MAX_HIGHLIGHT_TOOLS) break;
  }
  return highlight;
}

/**
 * Sustituye a CategoryGrid + FeaturedTools + RecentlyAddedTools (hasta ~30
 * ToolCards completas más ~15 tarjetas de categoría, cada bloque con su
 * propio py-16) por una única franja compacta de descubrimiento — el
 * buscador del Hero sigue siendo la acción principal de la home; esto es
 * solo el paso 2 ("¿no sabes qué buscas? explora algunas opciones") antes
 * del CatalogTeaser. Mismos enlaces internos (todas las categorías con
 * herramientas, ver-todo-el-catálogo), sin la altura ni el número de
 * tarjetas de antes.
 */
export function DiscoveryStrip({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const categoriesWithTools = categories.filter((category) => catalogStats.toolCountByCategory[category.id] > 0);
  const highlightTools = getHighlightTools();

  return (
    <section id="categorias" className="border-t border-slate-200 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{t.discoveryStrip.title}</h2>

        <p className="mt-6 text-sm font-medium text-slate-500">{t.header.categorias}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {categoriesWithTools.map((category) => {
            const Icon = categoryIconMap[category.icon];
            const count = catalogStats.toolCountByCategory[category.id];
            const palette = categoryColors[category.id];
            const label = locale === "en" ? categoriesEn[category.id].label : category.label;
            return (
              <Link
                key={category.id}
                href={getCategoryHref(category.id, locale)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border bg-white px-3 py-1.5 text-sm font-medium transition-colors hover:shadow-sm",
                  palette.border,
                  palette.text
                )}
              >
                <Icon size={14} />
                {label}
                <span className="text-xs text-slate-400">{count}</span>
              </Link>
            );
          })}
        </div>

        <div id="destacadas" className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-500" title={t.discoveryStrip.featuredCriteria}>
            {t.discoveryStrip.toolsLabel}
          </p>
          <Link href={getToolsExplorerHref(locale)} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            {t.discoveryStrip.viewAllTools}
          </Link>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {highlightTools.map((tool) => (
            <Link
              key={tool.id}
              href={localeHref(`/tool/${tool.slug}`, locale)}
              className="group flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50/30"
            >
              <LogoImage
                domain={getHostname(tool.websiteUrl)}
                label={tool.name}
                size={32}
                fallbackGradient={categoryColors[tool.category].gradient}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900 group-hover:text-emerald-700">{tool.name}</p>
                <p className="truncate text-xs text-slate-500">
                  {t.toolCard.alternativeTo} {tool.replaces.join(", ")}
                </p>
              </div>
              <ArrowRight
                size={14}
                className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-emerald-500"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
