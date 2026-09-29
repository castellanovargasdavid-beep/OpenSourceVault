import type { CSSProperties } from "react";
import Link from "next/link";
import { Cpu, DollarSign, ArrowRight, Boxes, Check } from "lucide-react";
import type { StackPreview } from "@/lib/hero-floating-data";
import { formatMinRam } from "@/lib/tool-difficulty";
import { localeHref } from "@/lib/locale-href";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

const formatUsd = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === "en" ? "en-US" : "es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Vista previa del Stack Builder para el hero: no es "tu stack" real (el
 * Stack Builder vive en localStorage por visitante, así que aquí no
 * sabemos si el visitante ya tiene uno propio distinto) — es un stack de
 * ejemplo construido con datos reales del catálogo (ver
 * src/lib/hero-floating-data.ts). El botón enlaza a /stacks/builder con
 * esas mismas herramientas precargadas, así que el ejemplo es 100%
 * reproducible con un clic.
 */
export function FloatingStackCard({
  stack,
  locale,
  t,
  toolCardT,
  layout = "floating",
  style,
  className,
}: {
  stack: StackPreview;
  locale: Locale;
  t: Dictionary["heroFloating"];
  toolCardT: Dictionary["toolCard"];
  layout?: "floating" | "inline";
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <div
      style={style}
      className={cn(
        "w-52 shrink-0 rounded-xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm",
        layout === "floating" && "animate-hero-card-float",
        className
      )}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-medium text-violet-700">
        <Boxes size={11} /> {t.exampleBadge}
      </span>
      <p className="mt-2 text-lg font-bold text-slate-900">{t.toolsLabel(stack.toolCount)}</p>
      <p className="text-xs text-slate-500">{t.exampleSubtitle}</p>

      <div className="mt-3 space-y-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Cpu size={13} className="shrink-0 text-slate-400" aria-hidden />
          {t.ramLabel} {formatMinRam(stack.totalMinRamMb, stack.isRamEstimated)}
        </div>
        {stack.dockerReady && (
          <div className="flex items-center gap-2">
            <Check size={13} className="shrink-0 text-sky-600" aria-hidden />
            {toolCardT.tagDockerReady}
          </div>
        )}
        {stack.savingsMatchedCount > 0 && (
          <div className="flex items-center gap-2 font-medium text-emerald-700">
            <DollarSign size={13} className="shrink-0" aria-hidden />
            {t.savingsLabel}: {formatUsd(stack.savingsMonthlyUsd, locale)}
            {t.savingsPerMonth}
          </div>
        )}
      </div>

      <Link
        href={`${localeHref("/stacks/builder", locale)}?tools=${encodeURIComponent(stack.toolSlugs.join(","))}`}
        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
      >
        {t.buildStackCta} <ArrowRight size={12} aria-hidden />
      </Link>
    </div>
  );
}
