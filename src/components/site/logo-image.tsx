"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoImageProps {
  /** Dominio del sitio (ej. "notion.so") para pedir su favicon público */
  domain?: string;
  /** Texto usado para la inicial de respaldo si no hay logo */
  label: string;
  size?: number;
  className?: string;
  /** Clases de degradado (from-x to-y) para el respaldo con inicial */
  fallbackGradient?: string;
}

/**
 * Muestra el favicon público del sitio (vía el servicio de favicons de
 * Google, sin necesidad de alojar ni subir ninguna imagen nosotros) y cae a
 * una inicial con degradado si la imagen falla o no hay dominio.
 */
export function LogoImage({
  domain,
  label,
  size = 32,
  className,
  fallbackGradient = "from-slate-400 to-slate-500",
}: LogoImageProps) {
  const [failed, setFailed] = React.useState(false);
  const showFallback = !domain || failed;

  if (showFallback) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br font-semibold text-white",
          fallbackGradient,
          className
        )}
        style={{ width: size, height: size, fontSize: size * 0.42 }}
        aria-hidden="true"
      >
        {label.charAt(0).toUpperCase()}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("shrink-0 rounded-lg bg-white object-contain ring-1 ring-slate-200", className)}
      style={{ width: size, height: size, padding: size * 0.12 }}
    />
  );
}
