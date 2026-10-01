"use client";

import * as React from "react";
import { trackReplaceEvent, type AnalyticsPlacement } from "@/lib/analytics";

/**
 * Único punto donde se renderiza un <a> de afiliado real — centraliza
 * `rel="noopener noreferrer sponsored"` (nunca renderizado a mano en otro
 * sitio) y dispara `hosting_click` (Fase 9) sin convertir en cliente a las
 * páginas/tarjetas que lo rodean, que siguen siendo Server Components.
 * `placement` es opcional para no romper los usos existentes, pero conviene
 * pasarlo siempre que se sepa — es lo que permite distinguir, en el mismo
 * evento `hosting_click`, desde qué superficie (ficha, Stack Builder,
 * comparador de hosting...) llegó el clic de afiliado (Fase 15/18 del PRD
 * de CRO).
 */
export function AffiliateLink({
  href,
  provider,
  placement,
  className,
  children,
}: {
  href: string;
  provider: string;
  placement?: AnalyticsPlacement;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={() => trackReplaceEvent({ name: "hosting_click", provider, placement })}
    >
      {children}
    </a>
  );
}
