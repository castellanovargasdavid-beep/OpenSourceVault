import Link from "next/link";
import { Check, X, Star, ArrowRight } from "lucide-react";
import type { ToolComparison } from "@/lib/comparisons";
import { getLocalizedTool, hasZhTranslation } from "@/data/tools";
import { getCategoryMetaLocalized } from "@/data/categories";
import { categoryColors } from "@/lib/category-colors";
import { LogoImage } from "@/components/site/logo-image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd, buildBreadcrumbListSchema } from "@/components/site/json-ld";
import { getCompareHref } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { cn, formatStars, getHostname } from "@/lib/utils";
import type { OpenSourceTool } from "@/lib/types";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasZhTool } from "@/lib/zh-mvp";

function starWinner(a: OpenSourceTool, b: OpenSourceTool): string | null {
  if (!a.starsCount || !b.starsCount) return null;
  if (a.starsCount === b.starsCount) return null;
  const winner = a.starsCount > b.starsCount ? a : b;
  return winner.name;
}

/**
 * Pareja con tool-page-content.tsx / ZhToolPageContent: cada tool.slug
 * aquí puede o no tener página /zh/tool/{slug} propia (ver lib/zh-mvp.ts
 * — las herramientas secundarias de una comparativa, p.ej. Seafile en
 * nextcloud-vs-seafile, no la tienen todavía). El botón "ver ficha
 * completa" enlaza a /zh/tool/{slug} SOLO si existe; si no, enlaza a la
 * ficha EN con una etiqueta "(EN)" visible — nunca a una URL /zh/tool/...
 * inexistente.
 */
export function ZhComparisonPageContent({ comparison }: { comparison: ToolComparison }) {
  const t = getDictionary("zh");
  const toolA = getLocalizedTool(comparison.toolA, "zh");
  const toolB = getLocalizedTool(comparison.toolB, "zh");
  const categoryA = getCategoryMetaLocalized(toolA.category, "zh");
  const categoryB = getCategoryMetaLocalized(toolB.category, "zh");
  const paletteA = categoryColors[toolA.category];
  const paletteB = categoryColors[toolB.category];
  const popularity = starWinner(toolA, toolB);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: t.breadcrumb.home, url: `${siteConfig.url}/zh` },
          { name: `${toolA.name} vs ${toolB.name}`, url: `${siteConfig.url}${getCompareHref(comparison.pairSlug, "zh")}` },
        ])}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href="/zh" className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">
          {toolA.name} vs {toolB.name}
        </span>
      </nav>

      <header className="mb-10 text-center">
        <div className="mb-4 flex items-center justify-center gap-4">
          <LogoImage domain={getHostname(toolA.websiteUrl)} label={toolA.name} size={56} fallbackGradient={paletteA.gradient} className="rounded-xl" />
          <span className="text-lg font-bold text-slate-300">VS</span>
          <LogoImage domain={getHostname(toolB.websiteUrl)} label={toolB.name} size={56} fallbackGradient={paletteB.gradient} className="rounded-xl" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.comparisonPage.h1(toolA.name, toolB.name, siteConfig.year)}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t.comparisonPage.subtitle(comparison.sharedSaas.join(", "))}</p>
      </header>

      <section className="mb-10 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-xl border border-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-600">
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3">{toolA.name}</th>
              <th className="px-4 py-3">{toolB.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-4 py-3 font-medium text-slate-600">{t.comparisonPage.tableCategory}</td>
              <td className="px-4 py-3">
                <Badge className={paletteA.badge}>{categoryA.label}</Badge>
              </td>
              <td className="px-4 py-3">
                <Badge className={paletteB.badge}>{categoryB.label}</Badge>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-600">{t.comparisonPage.tableLicense}</td>
              <td className="px-4 py-3 text-slate-900">{toolA.license}</td>
              <td className="px-4 py-3 text-slate-900">{toolB.license}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-600">{t.comparisonPage.tableStars}</td>
              <td className="px-4 py-3 text-slate-900">
                {toolA.starsCount ? (
                  <span className="inline-flex items-center gap-1" title={t.toolCard.starsSnapshotCaption}>
                    <Star size={14} className="text-amber-500" /> ~{formatStars(toolA.starsCount)}
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-4 py-3 text-slate-900">
                {toolB.starsCount ? (
                  <span className="inline-flex items-center gap-1" title={t.toolCard.starsSnapshotCaption}>
                    <Star size={14} className="text-amber-500" /> ~{formatStars(toolB.starsCount)}
                  </span>
                ) : (
                  "—"
                )}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-600">{t.comparisonPage.tableStack}</td>
              <td className="px-4 py-3 text-slate-900">{toolA.techStack.join(", ")}</td>
              <td className="px-4 py-3 text-slate-900">{toolB.techStack.join(", ")}</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-slate-600">{t.comparisonPage.tableReplaces}</td>
              <td className="px-4 py-3 text-slate-900">{toolA.replaces.join(", ")}</td>
              <td className="px-4 py-3 text-slate-900">{toolB.replaces.join(", ")}</td>
            </tr>
          </tbody>
        </table>
        {popularity && <p className="mt-3 text-xs text-slate-600">{t.comparisonPage.popularityNote(popularity)}</p>}
      </section>

      <section className="mb-10 grid gap-6 sm:grid-cols-2">
        {[
          { tool: toolA, palette: paletteA },
          { tool: toolB, palette: paletteB },
        ].map(({ tool, palette }) => {
          const hasOwnZhPage = hasZhTool(tool.slug);
          const usingFallback = !hasZhTranslation(tool.id);
          return (
            <div key={tool.id} className={cn("rounded-xl border p-6", palette.soft, palette.border)}>
              <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                {tool.name}
                {usingFallback && <span className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px] font-normal text-slate-500">EN</span>}
              </h2>
              <p className="mb-4 text-sm text-slate-600">{tool.shortDescription}</p>

              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                <Check size={14} /> {t.comparisonPage.pros}
              </p>
              <ul className="mb-4 space-y-1.5">
                {tool.pros.map((pro) => (
                  <li key={pro} className="text-sm text-slate-700">
                    {pro}
                  </li>
                ))}
              </ul>

              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
                <X size={14} /> {t.comparisonPage.cons}
              </p>
              <ul className="mb-5 space-y-1.5">
                {tool.cons.map((con) => (
                  <li key={con} className="text-sm text-slate-700">
                    {con}
                  </li>
                ))}
              </ul>

              <Link
                href={hasOwnZhPage ? `/zh/tool/${tool.slug}` : `/en/tool/${tool.slug}`}
                className={cn(buttonVariants({ size: "sm" }), "w-full justify-between bg-gradient-to-r", palette.gradient)}
              >
                {t.comparisonPage.viewFullProfile(tool.name)}
                {!hasOwnZhPage && <span className="text-[10px] opacity-80">(EN)</span>}
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl border border-slate-200 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">{t.comparisonPage.features}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-900">{toolA.name}</p>
            <ul className="space-y-1.5">
              {toolA.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-900">{toolB.name}</p>
            <ul className="space-y-1.5">
              {toolB.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
