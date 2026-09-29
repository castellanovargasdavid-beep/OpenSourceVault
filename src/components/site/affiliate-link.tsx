"use client";

import * as React from "react";
import { trackReplaceEvent } from "@/lib/analytics";

/**
 * Único punto donde se renderiza un <a> de afiliado real — centraliza
 * `rel="noopener noreferrer sponsored"` (nunca renderizado a mano en otro
 * sitio) y dispara `hosting_click` (Fase 9) sin convertir en cliente a las
 * páginas/tarjetas que lo rodean, que siguen siendo Server Components.
 */
export function AffiliateLink({
  href,
  provider,
  className,
  children,
}: {
  href: string;
  provider: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={() => trackReplaceEvent({ name: "hosting_click", provider })}
    >
      {children}
    </a>
  );
}
