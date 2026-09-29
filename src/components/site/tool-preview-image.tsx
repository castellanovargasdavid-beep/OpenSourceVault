"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ToolPreviewImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) return null;

  return (
    // aspect-[1.91/1]: reserva el hueco antes de que la imagen termine de
    // cargar (og:image real, de tamaño desconocido hasta descargarla) para
    // no provocar un salto de layout — 1200×630 es la proporción estándar
    // recomendada para og:image, así que es una reserva segura incluso
    // cuando el sitio de origen use otra resolución exacta.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("aspect-[1.91/1] w-full rounded-xl border border-slate-200 bg-slate-50 object-cover shadow-sm", className)}
    />
  );
}
