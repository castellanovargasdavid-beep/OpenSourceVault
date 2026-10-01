"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackReplaceEvent } from "@/lib/analytics";

/**
 * `<Link onClick={...}>` no puede escribirse directamente dentro de Hero
 * (Server Component): Next.js no permite pasar un manejador de evento como
 * prop a un Client Component desde un Server Component. Este wrapper es la
 * pieza mínima "use client" que hace falta para medir los dos CTA
 * principales del hero con el sistema de analytics ya existente
 * (lib/analytics.ts) — ningún proveedor ni evento nuevo, solo el registro
 * que faltaba.
 */
export function HeroCtaLink({
  href,
  className,
  children,
  cta,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  cta: "build_stack" | "explore_alternatives";
}) {
  return (
    <Link href={href} className={className} onClick={() => trackReplaceEvent({ name: "hero_cta_click", cta })}>
      {children}
    </Link>
  );
}
