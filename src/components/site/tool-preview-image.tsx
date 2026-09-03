"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ToolPreviewImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("w-full rounded-xl border border-slate-200 bg-slate-50 object-cover shadow-sm", className)}
    />
  );
}
