import Link from "next/link";
import { Boxes } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { GithubIcon } from "@/components/icons/github-icon";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavDropdown } from "@/components/site/nav-dropdown";

export function Header({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);

  // El piloto zh-CN (ver lib/zh-mvp.ts) no tiene página propia para
  // categorías, stacks, Stack Builder, Doctor Compose, Replace o SaaS
  // Exit — el nav de abajo enlazaría a rutas /zh/... inexistentes. En vez
  // de forzar cada href con comprobaciones condicionales, un header propio
  // y deliberadamente mínimo: logo → /zh, selector de idioma y el único
  // enlace que sigue siendo válido en cualquier idioma (GitHub, externo).
  if (locale === "zh") {
    return (
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/zh" className="flex items-center gap-2 font-semibold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
              <Boxes size={18} />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
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
          </div>
        </div>
      </header>
    );
  }
  /**
   * Doctor Compose / Reemplaza mi SaaS / Auditoría SaaS agrupadas bajo un
   * desplegable "Herramientas" en escritorio (ver <NavDropdown>) — a
   * 1024px (breakpoint `lg` donde aparece este nav) el margen disponible
   * entre el nav y el bloque de idioma/GitHub/hosting era de solo 18-31px
   * según el idioma, insuficiente para un enlace de texto más. Agrupar en
   * vez de añadir un enlace plano libera espacio en vez de consumirlo.
   * Stack Builder ya NO está aquí dentro: es el paso "Construir" del
   * funnel Descubrir→Decidir→Construir→Desplegar, así que se promueve a
   * enlace plano junto a Categorías/Stacks en vez de compartir jerarquía
   * con estas 3 utilidades secundarias — "Stack Builder" (13/13 car. en
   * ES/EN) es más corto que "Doctor Compose"/"Compose Doctor" (14 car. en
   * ambos), así que el swap no reintroduce el problema de espacio de
   * arriba. MobileNav sigue recibiendo las 6 rutas en plano — el menú
   * móvil no tiene ese problema de espacio.
   */
  const toolsMenuLinks = [
    { href: localeHref("/doctor", locale), label: t.composeDoctor.navLabel },
    { href: localeHref("/replace", locale), label: t.replaceFlow.navLabel },
    { href: localeHref("/saas-exit", locale), label: t.saasExit.navLabel },
  ];
  const navLinks = [
    { href: localeHref("/#categorias", locale), label: t.header.categorias },
    { href: localeHref("/stacks", locale), label: t.header.stacks },
    { href: localeHref("/stacks/builder", locale), label: t.stackBuilder.navLabel },
    ...toolsMenuLinks,
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
          <Link href={localeHref("/#categorias", locale)} className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            {t.header.categorias}
          </Link>
          <Link href={localeHref("/stacks", locale)} className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            {t.header.stacks}
          </Link>
          <Link href={localeHref("/stacks/builder", locale)} className="whitespace-nowrap text-sm font-medium text-slate-600 transition-colors hover:text-slate-900">
            {t.stackBuilder.navLabel}
          </Link>
          <NavDropdown label={t.header.toolsMenu} items={toolsMenuLinks} />
        </nav>
        <div className="flex items-center gap-3">
          <MobileNav
            navLinks={navLinks}
            githubHref={siteConfig.links.github}
            githubLabel={t.header.github}
            hostingHref={localeHref("/saas-exit", locale)}
            hostingLabel={t.header.verOfertas}
            menuLabel={t.header.abrirMenu}
            closeLabel={t.header.cerrarMenu}
          />
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
            href={localeHref("/saas-exit", locale)}
            className="hidden h-9 items-center whitespace-nowrap rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-4 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 xl:inline-flex"
          >
            {t.header.verOfertas}
          </Link>
        </div>
      </div>
    </header>
  );
}
