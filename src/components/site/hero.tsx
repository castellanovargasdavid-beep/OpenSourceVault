import { SearchBar } from "@/components/site/search-bar";
import { RotatingExamples } from "@/components/site/rotating-examples";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { LogoImage } from "@/components/site/logo-image";
import { categories } from "@/data/categories";
import { getSaasDomain } from "@/lib/saas-domains";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import type { ToolCardData } from "@/lib/types";

const showcaseSaas = [
  "Notion",
  "Slack",
  "Airtable",
  "Salesforce",
  "Google Analytics",
  "Firebase",
  "Calendly",
  "Zapier",
];

export function Hero({ tools, locale = "es" }: { tools: ToolCardData[]; locale?: Locale }) {
  const t = getDictionary(locale);
  const totalSaas = new Set(tools.flatMap((tool) => tool.replaces)).size;

  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
        <div className="animate-blob-delayed absolute -top-16 right-0 h-80 w-80 rounded-full bg-violet-300/35 blur-3xl" />
        <div className="animate-blob-slow absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          {t.hero.badge(tools.length)}
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {t.hero.titlePrefix}{" "}
          <RotatingExamples
            examples={showcaseSaas}
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent"
          />
          .
          <br />
          {t.hero.titleSuffix}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t.hero.subtitle}</p>
        <div className="mx-auto mt-10 max-w-2xl">
          <SearchBar tools={tools} locale={locale} t={t.searchBar} />
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              <AnimatedCounter value={tools.length} suffix="+" />
            </p>
            <p className="text-xs text-slate-600">{t.hero.statTools}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              <AnimatedCounter value={totalSaas} suffix="+" />
            </p>
            <p className="text-xs text-slate-600">{t.hero.statSaas}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              <AnimatedCounter value={categories.length} />
            </p>
            <p className="text-xs text-slate-600">{t.hero.statCategories}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">$0</p>
            <p className="text-xs text-slate-600">{t.hero.statLicenseCost}</p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-600">{t.hero.replacesLabel}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {showcaseSaas.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm text-slate-600 shadow-sm backdrop-blur"
              >
                <LogoImage domain={getSaasDomain(name)} label={name} size={18} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
