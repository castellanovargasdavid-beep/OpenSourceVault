import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories, getCategoryHref } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { catalogStats } from "@/lib/catalog-stats";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import { getSavingsCalculatorHref, getCostCalculatorHref, getDeployGuideHref, getHowWeAuditHref, getContributeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import { GithubIcon } from "@/components/icons/github-icon";

export function Footer({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  // Mismo motivo que en header.tsx: ninguna de las columnas de abajo
  // (categorías, stacks, calculadoras, guía de despliegue, hosting-deals,
  // promote, how-we-audit) tiene página /zh/... en este piloto. Privacy/
  // Terms/Affiliate Disclosure SÍ son páginas reales que un visitante
  // podría necesitar — enlazan a su versión EN con la etiqueta "(EN)"
  // visible en vez de fabricar una traducción legal que no existe (ver
  // sección 13 del encargo: EN está bien cuando el idioma queda claro).
  if (locale === "zh") {
    return (
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-base font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-slate-600">{t.siteDescription}</p>
        </div>
        <div className="border-t border-slate-200 py-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <p className="text-xs text-slate-600">© {siteConfig.year} {siteConfig.name}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-emerald-700">
                <GithubIcon size={14} />
                GitHub
              </a>
              <Link href="/en/privacy" className="hover:text-emerald-700">
                Privacy <span className="text-[10px] opacity-70">(EN)</span>
              </Link>
              <Link href="/en/terms" className="hover:text-emerald-700">
                Terms <span className="text-[10px] opacity-70">(EN)</span>
              </Link>
              <Link href="/en/affiliate-disclosure" className="hover:text-emerald-700">
                Affiliate Disclosure <span className="text-[10px] opacity-70">(EN)</span>
              </Link>
              <a href="/api/catalog" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
                Catalog dataset (JSON)
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-base font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-slate-600">{t.siteDescription}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t.footer.categorias}</p>
          <ul className="mt-3 space-y-2">
            {/* Mismo filtro que discovery-strip.tsx y el contador de la home
                (catalogStats.totalCategories): antes este footer enlazaba las
                16 categorías de la taxonomía completa, incluyendo 3 sin
                ninguna herramienta publicada todavía, mientras la home
                anunciaba "13 categorías" — un visitante podía contarlas y
                encontrar el desajuste, además de aterrizar en una ficha vacía. */}
            {categories
              .filter((category) => catalogStats.toolCountByCategory[category.id] > 0)
              .map((category) => (
              <li key={category.id}>
                <Link
                  href={getCategoryHref(category.id, locale)}
                  className="text-sm text-slate-600 hover:text-emerald-700"
                >
                  {locale === "en" ? categoriesEn[category.id].label : category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t.footer.recursos}</p>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href={localeHref("/stacks", locale)} className="text-sm text-slate-600 hover:text-emerald-700">
                {t.footer.stacks}
              </Link>
            </li>
            <li>
              <Link href={getSavingsCalculatorHref(locale)} className="text-sm text-slate-600 hover:text-emerald-700">
                {t.footer.calculadora}
              </Link>
            </li>
            <li>
              <Link href={getCostCalculatorHref(locale)} className="text-sm text-slate-600 hover:text-emerald-700">
                {t.footer.calculadoraCostes}
              </Link>
            </li>
            <li>
              <Link href={getDeployGuideHref(locale)} className="text-sm text-slate-600 hover:text-emerald-700">
                {t.footer.guiaDespliegue}
              </Link>
            </li>
            <li>
              <Link href={localeHref("/hosting-deals", locale)} className="text-sm text-slate-600 hover:text-emerald-700">
                {t.footer.hostingDescuentos}
              </Link>
            </li>
            <li>
              <Link href={localeHref("/#destacadas", locale)} className="text-sm text-slate-600 hover:text-emerald-700">
                {t.footer.herramientasDestacadas}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-slate-600">
            © {siteConfig.year} {siteConfig.name}. {t.footer.disclosure}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
            <Link href={getContributeHref(locale)} className="inline-flex items-center gap-1.5 hover:text-emerald-700">
              <GithubIcon size={14} />
              {t.footer.github}
            </Link>
            <Link href={localeHref("/promote", locale)} className="hover:text-emerald-700">
              {t.footer.promote}
            </Link>
            <Link href={localeHref("/privacy", locale)} className="hover:text-emerald-700">
              {t.footer.privacidad}
            </Link>
            <Link href={localeHref("/terms", locale)} className="hover:text-emerald-700">
              {t.footer.terminos}
            </Link>
            <Link href={localeHref("/affiliate-disclosure", locale)} className="hover:text-emerald-700">
              {t.footer.divulgacionAfiliados}
            </Link>
            <a href="/api/catalog" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
              {t.footer.apiDataset}
            </a>
            <Link href={getHowWeAuditHref(locale)} className="hover:text-emerald-700">
              {t.footer.comoAuditamos}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
