import Link from "next/link";
import { Boxes } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import { getSavingsCalculatorHref, getDeployGuideHref } from "@/lib/routes";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { GithubIcon } from "@/components/icons/github-icon";

export function Header({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const navLinks = [
    { href: localeHref("/#categorias", locale), label: t.header.categorias },
    { href: localeHref("/stacks", locale), label: t.header.stacks },
    { href: getSavingsCalculatorHref(locale), label: t.header.calculadora },
    { href: getDeployGuideHref(locale), label: t.header.guiaDespliegue },
    { href: localeHref("/hosting-deals", locale), label: t.header.hosting },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={localeHref("/", locale)} className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
            <Boxes size={18} />
          </span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-300 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 sm:inline-flex"
          >
            <GithubIcon size={16} />
            {t.header.github}
          </a>
          <Link
            href={localeHref("/hosting-deals", locale)}
            className="hidden h-9 items-center whitespace-nowrap rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 xl:inline-flex"
          >
            {t.header.verOfertas}
          </Link>
        </div>
      </div>
    </header>
  );
}
