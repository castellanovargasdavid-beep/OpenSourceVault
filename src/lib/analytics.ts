"use client";

import { track } from "@vercel/analytics";

/**
 * Eventos personalizados del funnel completo (Google → Landing → Tool /
 * Alternative / Replace → Stack Builder → Infraestructura → Deployment →
 * Hosting/Affiliate). Se apoyan en <Analytics /> de @vercel/analytics, ya
 * montado en ambos layouts (es)/(en) — este módulo no añade ningún
 * proveedor nuevo, solo tipa los nombres de evento y las pocas propiedades
 * mínimas que tiene sentido registrar (slugs/recuentos/nombre de
 * proveedor, nunca texto libre ni nada personal).
 */
export type ReplaceAnalyticsEvent =
  | { name: "replace_started" }
  | { name: "saas_selected"; saasSlug: string }
  | { name: "alternative_selected"; saasSlug: string; toolSlug: string }
  | { name: "tool_view"; toolSlug: string }
  | { name: "alternative_view"; saasSlug: string }
  | { name: "replace_view"; saasSlug: string }
  | { name: "stack_builder_opened" }
  | { name: "stack_created"; toolCount: number }
  | { name: "compose_downloaded"; toolCount: number }
  | { name: "calculator_used"; calculator: "cost" | "savings" }
  | { name: "hosting_click"; provider: string };

export function trackReplaceEvent(event: ReplaceAnalyticsEvent): void {
  try {
    const { name, ...properties } = event;
    track(name, properties);
  } catch {
    // El bloqueador de anuncios/privacidad del usuario puede impedir que
    // @vercel/analytics cargue su script — nunca debe romper la interacción
    // real del usuario por un evento de analítica que no se pudo enviar.
  }
}
