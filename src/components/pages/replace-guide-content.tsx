import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReplaceMapping } from "@/lib/replace";
import { ReplaceEntryCard } from "@/components/site/replace-entry-card";
import { JsonLd, buildBreadcrumbListSchema } from "@/components/site/json-ld";
import { ViewTracker } from "@/components/site/view-tracker";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { getAlternativeHref } from "@/lib/alternatives";
import { siteConfig } from "@/lib/site-config";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * /replace/[slug] — responde "¿Cómo sustituyo {saas}?" con el caso de uso y
 * la limitación de cada alternativa (Fase 3/4/7). Deliberadamente distinta
 * de /alternativas/[slug] (que responde "¿qué alternativas existen?" con
 * una tabla comparativa de RAM/licencia/precio): aquí no se repite esa
 * tabla, solo se enlaza a ella para quien la quiera ver completa.
 */
export function ReplaceGuideContent({ mapping, locale = "es", dict }: { mapping: ReplaceMapping; locale?: Locale; dict: Dictionary }) {
  const t = dict.replacePage;
  // Precarga las alternativas de "buen encaje" en el Stack Builder — si por
  // lo que sea ninguna entrada llegara a ser "good" (no ocurre hoy con el
  // contenido curado, pero no lo demos por hecho), cae a todas para que el
  // CTA principal nunca enlace a un stack vacío.
  const goodFitSlugs = mapping.entries.filter((e) => e.fit === "good").map((e) => e.tool.slug);
  const buildStackSlugs = goodFitSlugs.length > 0 ? goodFitSlugs : mapping.entries.map((e) => e.tool.slug);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <ViewTracker event={{ name: "replace_view", saasSlug: mapping.saasSlug }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: t.breadcrumb(mapping.saasName),
          itemListElement: mapping.entries.map((entry, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteConfig.url}${localeHref(`/tool/${entry.tool.slug}`, locale)}`,
            name: entry.tool.name,
          })),
        }}
      />
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: dict.breadcrumb.home, url: `${siteConfig.url}${localeHref("/", locale)}` },
          { name: t.breadcrumb(mapping.saasName), url: `${siteConfig.url}${localeHref(`/replace/${mapping.saasSlug}`, locale)}` },
        ])}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {dict.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{t.breadcrumb(mapping.saasName)}</span>
      </nav>

      <header className="mb-10 max-w-2xl">
        <div className="mb-4 flex items-center gap-3">
          <LogoImage domain={getSaasDomain(mapping.saasName)} label={mapping.saasName} size={40} fallbackGradient="from-slate-300 to-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{t.eyebrow}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.pageTitle(mapping.saasName)}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.pageSubtitle(mapping.saasName, mapping.entries.length)}</p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {mapping.entries.map((entry) => (
          <ReplaceEntryCard key={entry.tool.slug} entry={entry} saasSlug={mapping.saasSlug} saasName={mapping.saasName} locale={locale} />
        ))}
      </div>

      <div className="mt-8 rounded-xl border-2 border-emerald-300 bg-emerald-50/40 p-6">
        <p className="text-base font-semibold text-slate-900">{t.buildStackTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{t.buildStackBody}</p>
        <Link
          href={`${localeHref("/stacks/builder", locale)}?tools=${encodeURIComponent(buildStackSlugs.join(","))}`}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {t.buildStackCta}
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href={getAlternativeHref(mapping.saasName, locale)} className="text-sm font-medium text-slate-600 hover:text-emerald-700">
          {t.viewAllAlternativesLink(mapping.saasName)}
        </Link>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-semibold text-slate-900">{t.tryFullFlowTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{t.tryFullFlowBody}</p>
        <Link
          href={localeHref("/replace", locale)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:underline"
        >
          {t.tryFullFlowLink} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
