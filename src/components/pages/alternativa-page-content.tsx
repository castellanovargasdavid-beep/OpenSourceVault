import Link from "next/link";
import type { SaasAlternativeGroup } from "@/lib/alternatives";
import { buildAlternativeTableRows } from "@/lib/alternatives";
import { formatMinRam, difficultyMeta } from "@/lib/tool-difficulty";
import { getSaasPricingLocalized } from "@/data/saas-pricing";
import { ToolCard } from "@/components/site/tool-card";
import { toToolCardData } from "@/lib/tool-card-data";
import { JsonLd } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import { getHowWeAuditHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";

function formatPrice(price: number): string {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

export function AlternativaPageContent({ group, locale }: { group: SaasAlternativeGroup; locale: Locale }) {
  const t = getDictionary(locale);
  const rows = buildAlternativeTableRows(group.tools);
  const primaryTool = rows[0].tool;

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
          {t.alternativaPage.h1(group.saasName, siteConfig.year)}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{t.alternativaPage.subtitle(group.tools.length)}</p>
      </header>

      <section className="mb-12">
        <h2 className="mb-1 text-xl font-semibold text-slate-900">{t.alternativaPage.tableTitle}</h2>
        <p className="mb-4 text-sm text-slate-500">{t.alternativaPage.sortNote}</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-50 text-xs font-medium uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">{t.alternativaPage.tableHeaders.tool}</th>
                <th className="px-4 py-3">{t.alternativaPage.tableHeaders.license}</th>
                <th className="px-4 py-3">{t.alternativaPage.tableHeaders.ram}</th>
                <th className="px-4 py-3">{t.alternativaPage.tableHeaders.docker}</th>
                <th className="px-4 py-3">{t.alternativaPage.tableHeaders.stars}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map(({ tool, minRamMb, dockerReady, difficulty, badgeCodes }) => (
                <tr key={tool.id}>
                  <td className="px-4 py-3">
                    <Link href={localeHref(`/tool/${tool.slug}`, locale)} className="font-medium text-slate-900 hover:text-emerald-700">
                      {tool.name}
                    </Link>
                    {badgeCodes.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {badgeCodes.includes("lightestRam") && (
                          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                            {t.alternativaPage.badgeLightestRam}
                          </span>
                        )}
                        {badgeCodes.includes("pureFoss") && (
                          <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                            {t.toolCard.fossModelFoss}
                          </span>
                        )}
                        {badgeCodes.includes("mostPopular") && (
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                            {t.alternativaPage.badgeMostPopular}
                          </span>
                        )}
                        {badgeCodes.includes("oneClickDeploy") && (
                          <span className="rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700">
                            {t.toolCard.tagOneClick}
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{tool.license}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <span className={`rounded border px-1.5 py-0.5 text-xs ${difficultyMeta[difficulty].badgeClass}`}>
                      {formatMinRam(minRamMb)}
                    </span>
                  </td>
                  <td className="px-4 py-3">{dockerReady ? "✅" : "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{tool.starsCount ? `★ ${tool.starsCount.toLocaleString(locale)}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12 grid gap-6 sm:grid-cols-2">
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

      <h2 className="mb-4 text-xl font-semibold text-slate-900">{t.alternativaPage.detailedCardsTitle}</h2>
      <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {group.tools.map((tool) => (
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
