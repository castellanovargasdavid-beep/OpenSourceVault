import Link from "next/link";
import { getIntentPageHref, type IntentPage } from "@/lib/intent-pages";
import { getAlternativeHref } from "@/lib/alternatives";
import { formatMinRam } from "@/lib/tool-difficulty";
import { toToolCardData } from "@/lib/tool-card-data";
import { ToolCard } from "@/components/site/tool-card";
import { JsonLd, buildBreadcrumbListSchema } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

/** Contenido curado que necesita más de un párrafo (ej. un bloque operativo + uno de migración) separa cada uno con una línea en blanco ("\n\n") en el dato — esto solo decide cómo renderizarlos, nunca añade un campo ni una sección nueva al modelo. */
function Paragraphs({ text, className }: { text: string; className?: string }) {
  return (
    <div className="space-y-3">
      {text.split("\n\n").map((paragraph, i) => (
        <p key={i} className={className}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * Página long-tail /alternativas/{saas}-{intent} — deliberadamente NO
 * reutiliza la tabla comparativa ni el FAQ de AlternativaPageContent: el
 * contenido diferencial (§4 del diseño aprobado) vive en operationalNotes/
 * licenseAngle/tradeoffsVsSaas, curados a mano en src/data/intent-pages.ts,
 * más un bloque de requisitos de servidor calculado en vivo (nunca
 * inventado) a partir de las herramientas elegibles reales.
 */
export function IntentPageContent({ page, locale }: { page: IntentPage; locale: Locale }) {
  const t = getDictionary(locale);
  const it = t.intentPage;
  const baseHref = getAlternativeHref(page.saasName, locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: t.breadcrumb.home, url: `${siteConfig.url}${localeHref("/", locale)}` },
          { name: t.alternativaPage.breadcrumb(page.saasName), url: `${siteConfig.url}${baseHref}` },
          { name: it.breadcrumb[page.intent], url: `${siteConfig.url}${getIntentPageHref(page.saasName, page.intent, locale)}` },
        ])}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <Link href={baseHref} className="hover:text-emerald-700">
          {t.alternativaPage.breadcrumb(page.saasName)}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{it.breadcrumb[page.intent]}</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <LogoImage
            domain={getSaasDomain(page.saasName)}
            label={page.saasName}
            size={48}
            fallbackGradient="from-slate-400 to-slate-500"
            className="rounded-xl grayscale"
          />
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {it.chip[page.intent]}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{it.h1[page.intent](page.saasName)}</h1>
        <p className="mt-4 text-lg text-slate-600">{page.content.intro}</p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{it.toolsTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {page.eligibleTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={toToolCardData(tool)}
              locale={locale}
              t={t.toolCard}
              comingSoonBadge={t.comingSoon.badge}
              difficultyT={t.difficulty}
              stackBuilderT={t.stackBuilder}
            />
          ))}
        </div>
      </section>

      {page.content.intent === "self-hosted" && (
        <section className="mb-8 rounded-xl border border-slate-200 bg-slate-50/60 p-6">
          <h2 className="mb-2 text-base font-semibold text-slate-900">{it.serverRequirementsTitle}</h2>
          <p className="mb-3 text-sm font-medium text-slate-700">
            {it.serverRequirementsRange(formatMinRam(page.ramRangeMb.min), formatMinRam(page.ramRangeMb.max))}
          </p>
          <Paragraphs text={page.content.operationalNotes} className="text-sm text-slate-600" />
        </section>
      )}

      {page.content.intent === "open-source" && (
        <section className="mb-8 rounded-xl border border-slate-200 bg-slate-50/60 p-6">
          <h2 className="mb-2 text-base font-semibold text-slate-900">{it.licenseAngleTitle}</h2>
          <p className="text-sm text-slate-600">{page.content.licenseAngle}</p>
        </section>
      )}

      <section className="mb-10 rounded-xl border border-amber-200 bg-amber-50/60 p-6">
        <h2 className="mb-2 text-base font-semibold text-slate-900">{it.tradeoffsTitle}</h2>
        <p className="text-sm text-slate-700">{page.content.tradeoffsVsSaas}</p>
      </section>

      <Link href={baseHref} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
        {it.backToBaseLink(page.saasName)}
      </Link>
    </div>
  );
}
