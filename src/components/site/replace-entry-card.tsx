"use client";

import Link from "next/link";
import type { ReplaceMappingEntry } from "@/lib/replace";
import { AddToStackButton } from "@/components/site/add-to-stack-button";
import { LogoImage } from "@/components/site/logo-image";
import { getHostname, cn, slugify } from "@/lib/utils";
import { getMigrationGuideHref } from "@/lib/routes";
import { localeHref } from "@/lib/locale-href";
import { trackReplaceEvent } from "@/lib/analytics";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

/**
 * Tarjeta de una alternativa dentro de "Reemplaza mi SaaS" — compartida por
 * el wizard (/replace) y las páginas SEO (/replace/[slug]) para no duplicar
 * el marcado ni la lógica de compatibilidad. Fase 4 del brief: solo tres
 * niveles de encaje (Good/Partial/Specialized fit), nunca un score numérico
 * inventado.
 */
const FIT_STYLES: Record<ReplaceMappingEntry["fit"], string> = {
  good: "border-emerald-200 bg-emerald-50 text-emerald-800",
  partial: "border-amber-200 bg-amber-50 text-amber-800",
  specialized: "border-sky-200 bg-sky-50 text-sky-800",
};

export function ReplaceEntryCard({
  entry,
  saasSlug,
  saasName,
  locale,
}: {
  entry: ReplaceMappingEntry;
  saasSlug: string;
  saasName: string;
  locale: Locale;
}) {
  // Resuelto dentro del propio componente cliente (no recibido como prop
  // desde un Server Component) — el namespace `replaceFlow` del diccionario
  // incluye funciones (alternativesFor, selectedCount), y React no permite
  // pasar funciones como prop de servidor a cliente. Mismo patrón que
  // SavingsCalculator/CostCalculator: solo `locale` (string) cruza el
  // límite, el diccionario se resuelve del lado del cliente.
  const dict = getDictionary(locale);
  const t = dict.replaceFlow;
  const fitLabel = entry.fit === "good" ? t.fitGoodLabel : entry.fit === "partial" ? t.fitPartialLabel : t.fitSpecializedLabel;

  return (
    <div className="rounded-xl border border-slate-200 p-5">
      <div className="flex items-start justify-between gap-3">
        <Link href={localeHref(`/tool/${entry.tool.slug}`, locale)} className="flex min-w-0 items-center gap-3">
          <LogoImage
            domain={getHostname(entry.tool.websiteUrl)}
            label={entry.tool.name}
            size={36}
            fallbackGradient="from-slate-300 to-slate-400"
          />
          <span className="min-w-0">
            <span className="block truncate font-semibold text-slate-900 hover:text-emerald-700">{entry.tool.name}</span>
            <span className={cn("mt-0.5 inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", FIT_STYLES[entry.fit])}>
              {fitLabel}
            </span>
          </span>
        </Link>
        <AddToStackButton
          toolSlug={entry.tool.slug}
          addLabel={dict.stackBuilder.addButton}
          addedLabel={dict.stackBuilder.addedButton}
          compact
          placement="tool_card"
          onAdd={() => trackReplaceEvent({ name: "alternative_selected", saasSlug, toolSlug: entry.tool.slug })}
        />
      </div>

      <p className="mt-3 text-sm text-slate-700">{entry.useCase}</p>
      <p className="mt-2 text-xs text-slate-500">
        <span className="font-medium text-slate-600">{t.limitationLabel}</span> {entry.limitation}
      </p>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium">
        {entry.hasMigrationGuide && (
          <Link href={getMigrationGuideHref(slugify(saasName), entry.tool.slug, locale)} className="text-emerald-700 hover:underline">
            {t.migrationGuideLink}
          </Link>
        )}
        <Link href={localeHref(`/tool/${entry.tool.slug}`, locale)} className="text-slate-600 hover:underline">
          {t.viewToolLink}
        </Link>
      </div>
    </div>
  );
}
