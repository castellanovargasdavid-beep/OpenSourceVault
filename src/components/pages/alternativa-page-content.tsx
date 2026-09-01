import Link from "next/link";
import type { SaasAlternativeGroup } from "@/lib/alternatives";
import { ToolCard } from "@/components/site/tool-card";
import { JsonLd } from "@/components/site/json-ld";
import { LogoImage } from "@/components/site/logo-image";
import { getSaasDomain } from "@/lib/saas-domains";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function AlternativaPageContent({ group, locale }: { group: SaasAlternativeGroup; locale: Locale }) {
  const t = getDictionary(locale);

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
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {group.tools.length} {t.alternativaPage.verified(group.tools.length)}
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {t.alternativaPage.h1(group.saasName, siteConfig.year)}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{t.alternativaPage.subtitle(group.tools.length)}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {group.tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} locale={locale} />
        ))}
      </div>
    </div>
  );
}
