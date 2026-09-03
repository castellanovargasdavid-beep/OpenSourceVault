"use client";

import Link from "next/link";
import { Layers } from "lucide-react";
import { useStackBuilder } from "@/lib/stack-builder-store";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/**
 * Píldora flotante sitewide (montada en el layout raíz de cada locale) que
 * muestra cuántas herramientas hay en el stack activo y enlaza al Stack
 * Builder. Se oculta mientras no se ha leído localStorage todavía (evita un
 * parpadeo con el contador en 0) y mientras el stack esté vacío, para no
 * ensuciar la interfaz a quien no está usando la función.
 */
export function StackBuilderWidget({ locale = "es", t }: { locale?: Locale; t: Dictionary["stackBuilder"] }) {
  const { hydrated, activeStack } = useStackBuilder();
  const count = activeStack.toolSlugs.length;

  if (!hydrated || count === 0) return null;

  return (
    <Link
      href={localeHref("/stacks/builder", locale)}
      title={t.widgetTooltip}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
    >
      <Layers size={16} />
      {t.navLabel}
      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-500 px-1.5 text-xs font-bold">{count}</span>
    </Link>
  );
}
