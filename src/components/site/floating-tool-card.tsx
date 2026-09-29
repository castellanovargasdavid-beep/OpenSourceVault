"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import type { FloatingPair } from "@/lib/hero-floating-data";
import { LogoImage } from "@/components/site/logo-image";
import { formatMinRam } from "@/lib/tool-difficulty";
import { localeHref } from "@/lib/locale-href";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/es";

/** Cada tarjeta rota como mucho una vez cada 6s — ver sección 6/7 del brief: movimiento sutil, ciclos lentos, nunca todas a la vez. */
const ROTATE_INTERVAL_MS = 6000;
const ROTATE_FADE_MS = 300;

function fossModelLabel(fossModel: FloatingPair["fossModel"], t: Dictionary["toolCard"]): string | undefined {
  switch (fossModel) {
    case "FOSS":
      return t.fossModelFoss;
    case "OpenCore":
      return t.fossModelOpenCore;
    case "FairCode":
      return t.fossModelFairCode;
    case "SourceAvailable":
      return t.fossModelSourceAvailable;
    default:
      return undefined;
  }
}

export function FloatingToolCard({
  pairs,
  locale,
  ramLabel,
  toolCardT,
  layout = "floating",
  style,
  className,
}: {
  /** 1 elemento = tarjeta estática. 2+ = rota lentamente entre esos pares reales. */
  pairs: FloatingPair[];
  locale: Locale;
  /** Solo el string que hace falta aquí (t.heroFloating.ramLabel) — nunca el diccionario completo: heroFloating también trae toolsLabel (una función), y una Server Component no puede pasarle una función a este Client Component. */
  ramLabel: string;
  toolCardT: Dictionary["toolCard"];
  layout?: "floating" | "inline";
  style?: React.CSSProperties;
  className?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    // El estado inicial (índice 0) ya es comprensible por sí solo — la
    // rotación es una mejora progresiva, no algo de lo que dependa el
    // contenido. Se desactiva también con reduced-motion y en el layout
    // "inline" de mobile (menos movimiento, ver sección 12/13 del brief).
    if (layout !== "floating" || pairs.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % pairs.length);
        setVisible(true);
      }, ROTATE_FADE_MS);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [layout, pairs.length]);

  const pair = pairs[index % pairs.length];
  const fossLabel = fossModelLabel(pair.fossModel, toolCardT);

  return (
    <Link
      href={localeHref(`/tool/${pair.toolSlug}`, locale)}
      aria-label={`${pair.saasName} → ${pair.toolName}`}
      style={style}
      className={cn(
        "block w-44 shrink-0 rounded-xl border border-slate-200/80 bg-white/85 p-3 shadow-sm backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md",
        layout === "floating" && "animate-hero-card-float",
        className
      )}
    >
      <div
        className={cn("flex flex-col gap-1.5 transition-opacity ease-in-out", visible ? "opacity-100 duration-300" : "opacity-0 duration-0")}
      >
        <div className="flex items-center gap-1.5">
          <LogoImage domain={pair.saasDomain} label={pair.saasName} size={18} fallbackGradient="from-slate-300 to-slate-400" />
          <span className="truncate text-xs font-medium text-slate-500">{pair.saasName}</span>
        </div>
        <ArrowDown size={11} className="text-slate-300" aria-hidden />
        <div className="flex items-center gap-1.5">
          <LogoImage domain={pair.toolDomain} label={pair.toolName} size={20} fallbackGradient="from-emerald-400 to-teal-500" />
          <span className="truncate text-sm font-semibold text-slate-900">{pair.toolName}</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1">
          {fossLabel && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                pair.fossModel === "FOSS" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
              )}
            >
              {fossLabel}
            </span>
          )}
          {pair.dockerReady && (
            <span className="inline-flex items-center rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-700">
              {toolCardT.tagDockerReady}
            </span>
          )}
          <span className="inline-flex items-center rounded-full border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
            {ramLabel} {formatMinRam(pair.minRamMb, pair.isEstimated)}
          </span>
        </div>
      </div>
    </Link>
  );
}
