import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SearchBar } from "@/components/site/search-bar";
import { RotatingExamples } from "@/components/site/rotating-examples";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { LogoImage } from "@/components/site/logo-image";
import { FloatingHero } from "@/components/site/floating-hero";
import { HeroCtaLink } from "@/components/site/hero-cta-link";
import { getSaasDomain } from "@/lib/saas-domains";
import { getHeroFloatingData } from "@/lib/hero-floating-data";
import { catalogStats } from "@/lib/catalog-stats";
import { getDictionary } from "@/i18n/get-dictionary";
import { getHowWeAuditHref, getToolsExplorerHref } from "@/lib/routes";
import { localeHref } from "@/lib/locale-href";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
  const floatingData = getHeroFloatingData(tools);
  // Mismas 4 palabras que ya alimentan el flujo Descubre→Compara→Construye→
  // Despliega de abajo (heroFloating.journey*) — una sola fuente para el
  // texto del flujo y para la palabra dinámica del H1, en vez de mantener
  // dos listas que podrían desincronizarse. "Construye" es el índice 2:
  // es lo que se pinta en el servidor/primer paint (Stack Builder como
  // producto principal, visible incluso sin JS o para un crawler), y la
  // rotación sigue el orden narrativo normal del funnel a partir de ahí.
  const journeySteps = [t.heroFloating.journeyDiscover, t.heroFloating.journeyCompare, t.heroFloating.journeyBuild, t.heroFloating.journeyDeploy];
  const HIGHLIGHTED_STEP_INDEX = 2;

  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
        <div className="animate-blob-delayed absolute -top-16 right-0 h-80 w-80 rounded-full bg-violet-300/35 blur-3xl" />
        <div className="animate-blob-slow absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      {/* Ancho mayor que la columna central de texto (nivel 1) a propósito: le da sitio a las tarjetas flotantes (nivel 2) alrededor sin que compitan con el headline. Ver src/components/site/floating-hero.tsx. */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Link
            href={getHowWeAuditHref(locale)}
            className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 transition-colors hover:bg-emerald-200"
          >
            {t.hero.badge(catalogStats.totalTools)}
          </Link>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            <RotatingExamples
              examples={journeySteps}
              startIndex={HIGHLIGHTED_STEP_INDEX}
              className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent"
            />{" "}
            {t.hero.h1Suffix}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{t.hero.subtitle}</p>

          <ol className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
            {journeySteps.map((step, i, all) => (
              <li key={step} className="flex items-center gap-2">
                <span className={i === HIGHLIGHTED_STEP_INDEX ? "text-emerald-600" : undefined}>{step}</span>
                {i < all.length - 1 && (
                  <span aria-hidden className="text-slate-300">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-6 max-w-2xl">
            <SearchBar tools={tools} locale={locale} t={t.searchBar} />
          </div>

          {/* Stack Builder es el CTA primario: el producto ya no se presenta
              como un directorio de alternativas, sino como la herramienta
              para construir y desplegar un stack self-hosted — el catálogo/
              comparativas pasan a ser la infraestructura que lo alimenta.
              Explorar alternativas sigue siendo un camino completo (SEO,
              usuarios que ya saben qué SaaS quieren sustituir, entrada
              directa al catálogo), solo que ya no es el primero. */}
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3">
            <HeroCtaLink
              href={localeHref("/stacks/builder", locale)}
              cta="build_stack"
              className={cn(buttonVariants({ size: "lg" }), "gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90")}
            >
              {t.hero.ctaBuildStack}
              <ArrowRight size={16} aria-hidden />
            </HeroCtaLink>
            <HeroCtaLink href={getToolsExplorerHref(locale)} cta="explore_alternatives" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              {t.hero.ctaExplore}
            </HeroCtaLink>
          </div>

          <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                <AnimatedCounter value={catalogStats.totalTools} suffix="+" />
              </p>
              <p className="text-xs text-slate-600">{t.hero.statTools}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                <AnimatedCounter value={catalogStats.totalSaasReplaced} suffix="+" />
              </p>
              <p className="text-xs text-slate-600">{t.hero.statSaas}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">
                <AnimatedCounter value={catalogStats.totalCategories} />
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

        <FloatingHero data={floatingData} locale={locale} t={t.heroFloating} toolCardT={t.toolCard} />
      </div>
    </section>
  );
}
