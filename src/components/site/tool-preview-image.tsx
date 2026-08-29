"use client";

import * as React from "react";

export function ToolPreviewImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = React.useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 object-cover shadow-sm"
    />
  );
}
