"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

// No hay ninguna suscripción real a la que enganchar el cambio de hreflang
// (el <head> lo actualiza Next al navegar), así que subscribe() es un no-op:
// useSyncExternalStore ya vuelve a llamar a getSnapshot en cada render, y un
// cambio de pathname ya fuerza un render de este componente.
function subscribeNoop() {
  return () => {};
}

function readHreflangPath(lang: "es" | "en" | "zh-CN", fallback: string): string {
  const real = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`)?.getAttribute("href");
  if (!real) return fallback;
  try {
    return new URL(real).pathname;
  } catch {
    return fallback;
  }
}

/** true si la página actual ya declara un <link rel="alternate" hreflang="zh-CN">. */
function hasZhAlternateInDom(): boolean {
  return document.querySelector('link[rel="alternate"][hreflang="zh-CN"]') !== null;
}

// Adivinanza válida para SSR/primer pintado y para las rutas donde ES/EN
// comparten la misma palabra tras el prefijo /en (tool, stacks, replace,
// saas-exit...), y usada tal cual por getServerSnapshot. Se corrige al leer
// los <link rel="alternate" hreflang> reales que cada página ya declara en
// su metadata — necesario en las rutas donde ES/EN usan palabras distintas
// (alternativas/alternatives, categoria/categories, calculadora-costes/
// cost-calculator...), donde el prefijo simple llevaría a un 404 real al
// pulsar ES/EN. Ver la auditoría de hreflang del bloque de SEO: esas
// etiquetas ya son la fuente de verdad, esto solo las reutiliza. Se usa
// useSyncExternalStore (mismo patrón que stack-builder-store.tsx) en vez de
// useEffect + setState para leer esta fuente externa sin disparar
// react-hooks/set-state-in-effect ni provocar un render extra tras montar.
function useHreflangHref(lang: "es" | "en" | "zh-CN", guessedHref: string): string {
  return React.useSyncExternalStore(
    subscribeNoop,
    () => readHreflangPath(lang, guessedHref),
    () => guessedHref
  );
}

/**
 * El piloto zh-CN (ver lib/zh-mvp.ts) solo cubre 21 páginas de ~1337 — el
 * botón 简体中文 debe aparecer SOLO cuando la página actual de verdad tiene
 * traducción china, nunca como una promesa vacía que lleve a un 404 (ver
 * sección 10 del encargo). La única fuente de verdad fiable es el propio
 * <link rel="alternate" hreflang="zh-CN"> que cada página zh-elegible ya
 * declara en su metadata (tool/[slug], compare/[pair], los 3 layouts
 * raíz) — adivinarlo por patrón de URL, como ya hace esHref/enHref para
 * es/en, daría falsos positivos en las ~1316 páginas sin traducción.
 * `getServerSnapshot` asume `locale === "zh"` como único caso seguro de
 * adivinar antes de hidratar (la propia página actual, por definición,
 * declara su propio hreflang zh-CN) — para es/en se queda oculto hasta
 * confirmar contra el DOM real, en vez de arriesgar un parpadeo hacia un
 * enlace roto.
 */
function useHasZhAlternate(locale: Locale): boolean {
  return React.useSyncExternalStore(
    subscribeNoop,
    hasZhAlternateInDom,
    () => locale === "zh"
  );
}

function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en" || pathname === "/en/" || pathname === "/zh" || pathname === "/zh/") return "/";
  return pathname.replace(/^\/(en|zh)(\/|$)/, "/");
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const canonicalPath = stripLocalePrefix(pathname);
  const guessedEsHref = canonicalPath;
  const guessedEnHref = canonicalPath === "/" ? "/en" : `/en${canonicalPath}`;
  const guessedZhHref = canonicalPath === "/" ? "/zh" : `/zh${canonicalPath}`;

  const esHref = useHreflangHref("es", guessedEsHref);
  const enHref = useHreflangHref("en", guessedEnHref);
  const zhHref = useHreflangHref("zh-CN", guessedZhHref);
  const hasZh = useHasZhAlternate(locale);

  return (
    <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-0.5 text-xs font-medium">
      <Languages size={13} className="ml-1.5 text-slate-400" />
      <Link
        href={esHref}
        prefetch={false}
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "es" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
        )}
      >
        ES
      </Link>
      <Link
        href={enHref}
        prefetch={false}
        className={cn(
          "rounded-md px-2 py-1 transition-colors",
          locale === "en" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
        )}
      >
        EN
      </Link>
      {hasZh && (
        <Link
          href={zhHref}
          prefetch={false}
          className={cn(
            "rounded-md px-2 py-1 transition-colors",
            locale === "zh" ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
          )}
        >
          中文
        </Link>
      )}
    </div>
  );
}
