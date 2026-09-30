import Link from "next/link";
import type { SaasAlternativeGroup } from "@/lib/alternatives";
import { buildAlternativeTableRows, getAlternativeHref } from "@/lib/alternatives";
import { AlternativeDecisionFilters } from "@/components/pages/alternativa-decision-filters";
import { formatMinRam } from "@/lib/tool-difficulty";
import { getSaasPricingLocalized } from "@/data/saas-pricing";
import { JsonLd, buildBreadcrumbListSchema } from "@/components/site/json-ld";
import { ViewTracker } from "@/components/site/view-tracker";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import { getHowWeAuditHref } from "@/lib/routes";
import { getReplaceMapping } from "@/lib/replace";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

function formatPrice(price: number): string {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

export function AlternativaPageContent({ group, locale }: { group: SaasAlternativeGroup; locale: Locale }) {
  const t = getDictionary(locale);
  const rows = buildAlternativeTableRows(group.tools);
  const primaryTool = rows[0].tool;
  const replaceMapping = getReplaceMapping(group.saasSlug, locale);

  const pricing = getSaasPricingLocalized(group.saasName, locale);
  const priceLabel = pricing
    ? locale === "en"
      ? `$${formatPrice(pricing.pricePerSeatUsd)}/mo${pricing.pricingModel === "perSeat" ? " per user" : ""}`
      : `$${formatPrice(pricing.pricePerSeatUsd)}/mes${pricing.pricingModel === "perSeat" ? " por usuario" : ""}`
    : null;

  const dockerCount = rows.filter((r) => r.dockerReady).length;
  const fossCount = rows.filter((r) => r.tool.fossModel === "FOSS").length;
  const lightestRow = rows.find((r) => r.badgeCodes.includes("lightestRam")) ?? rows[0];

  const faqs = [
    { q: t.alternativaPage.faqDockerQ(group.saasName), a: t.alternativaPage.faqDockerA(dockerCount, rows.length) },
    { q: t.alternativaPage.faqRamQ, a: t.alternativaPage.faqRamA(formatMinRam(lightestRow.minRamMb), lightestRow.tool.name) },
    { q: t.alternativaPage.faqFreeQ(group.saasName), a: t.alternativaPage.faqFreeA(fossCount, rows.length) },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <ViewTracker event={{ name: "alternative_view", saasSlug: group.saasSlug }} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${t.alternativaPage.breadcrumb(group.saasName)}`,
          itemListElement: group.tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteConfig.url}${localeHref(`/tool/${tool.slug}`, locale)}`,
            name: tool.name,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: t.breadcrumb.home, url: `${siteConfig.url}${localeHref("/", locale)}` },
          { name: t.alternativaPage.breadcrumb(group.saasName), url: `${siteConfig.url}${getAlternativeHref(group.saasName, locale)}` },
        ])}
      />

      <nav className="mb-6 text-sm text-slate-600">
        <Link href={localeHref("/", locale)} className="hover:text-emerald-700">
          {t.breadcrumb.home}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-700">{t.alternativaPage.breadcrumb(group.saasName)}</span>
      </nav>

      <header className="mb-10 max-w-3xl">
        <div className="mb-4 flex items-center gap-3">
          <LogoImage
            domain={getSaasDomain(group.saasName)}
            label={group.saasName}
            size={48}
            fallbackGradient="from-slate-400 to-slate-500"
            className="rounded-xl grayscale"
          />
          <Link
            href={getHowWeAuditHref(locale)}
            className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            {group.tools.length} {t.alternativaPage.verified(group.tools.length)}
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.alternativaPage.h1(group.saasName, siteConfig.year, group.tools.length)}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{t.alternativaPage.subtitle(group.tools.length)}</p>
      </header>

      <AlternativeDecisionFilters
        rows={rows}
        tools={group.tools}
        locale={locale}
        t={{
          tableTitle: t.alternativaPage.tableTitle,
          sortNote: t.alternativaPage.sortNote,
          tableHeaders: t.alternativaPage.tableHeaders,
          badgeLightestRam: t.alternativaPage.badgeLightestRam,
          badgeMostPopular: t.alternativaPage.badgeMostPopular,
          detailedCardsTitle: t.alternativaPage.detailedCardsTitle,
          filters: t.alternativaPage.filters,
        }}
        toolCardT={t.toolCard}
        comingSoonBadge={t.comingSoon.badge}
        difficultyT={t.difficulty}
        stackBuilderT={t.stackBuilder}
      />

      <section className={cn("mb-12 grid gap-6 sm:grid-cols-2", replaceMapping && "lg:grid-cols-3")}>
        {replaceMapping && (
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-2 text-base font-semibold text-slate-900">{t.alternativaPage.replaceGuideTitle(group.saasName)}</h2>
            <p className="mb-4 text-sm text-slate-600">{t.alternativaPage.replaceGuideBody(replaceMapping.entries.length)}</p>
            <Link
              href={localeHref(`/replace/${replaceMapping.saasSlug}`, locale)}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
            >
              {t.alternativaPage.replaceGuideCta} →
            </Link>
          </div>
        )}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-2 text-base font-semibold text-slate-900">{t.alternativaPage.costTitle(group.saasName)}</h2>
          <p className="mb-4 text-sm text-slate-600">
            {priceLabel ? t.alternativaPage.costWithPrice(group.saasName, priceLabel) : t.alternativaPage.costWithoutPrice(group.saasName)}
          </p>
          <Link href={localeHref("/saas-exit", locale)} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
            {t.alternativaPage.costCta} →
          </Link>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="mb-2 text-base font-semibold text-slate-900">{t.alternativaPage.buildStackTitle}</h2>
          <p className="mb-4 text-sm text-slate-600">{t.alternativaPage.buildStackBody(primaryTool.name)}</p>
          <Link
            href={`${localeHref("/stacks/builder", locale)}?tools=${encodeURIComponent(primaryTool.slug)}`}
            className="inline-flex h-9 items-center rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90"
          >
            {t.alternativaPage.buildStackCta}
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.alternativaPage.faqTitle}</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-1 text-sm font-semibold text-slate-900">{q}</p>
              <p className="text-sm text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
