import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { categories } from "@/data/categories";
import { categoriesEn } from "@/data/categories.en";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

export function Footer({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-base font-semibold text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-slate-500">{t.siteDescription}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{t.footer.categorias}</p>
          <ul className="mt-3 space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={localeHref(`/categoria/${category.slug}`, locale)}
                  className="text-sm text-slate-500 hover:text-emerald-700"
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
              <Link href={localeHref("/calculadora-ahorro", locale)} className="text-sm text-slate-500 hover:text-emerald-700">
                {t.footer.calculadora}
              </Link>
            </li>
            <li>
              <Link href={localeHref("/guias/desplegar-con-docker", locale)} className="text-sm text-slate-500 hover:text-emerald-700">
                {t.footer.guiaDespliegue}
              </Link>
            </li>
            <li>
              <Link href={localeHref("/hosting-deals", locale)} className="text-sm text-slate-500 hover:text-emerald-700">
                {t.footer.hostingDescuentos}
              </Link>
            </li>
            <li>
              <Link href={localeHref("/#destacadas", locale)} className="text-sm text-slate-500 hover:text-emerald-700">
                {t.footer.herramientasDestacadas}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-6">
        <p className="mx-auto max-w-7xl px-4 text-xs text-slate-400 sm:px-6 lg:px-8">
          © {siteConfig.year} {siteConfig.name}. {t.footer.disclosure}
        </p>
      </div>
    </footer>
  );
}
