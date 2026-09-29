"use client";

import { track } from "@vercel/analytics";

/**
 * Eventos personalizados del flujo "Reemplaza mi SaaS" (Fase 9 del brief) +
 * el evento de descarga del compose que ya existía en el Stack Builder sin
 * instrumentar. Se apoyan en <Analytics /> de @vercel/analytics, ya montado
 * en ambos layouts (es)/(en) — este módulo no añade ningún proveedor nuevo,
 * solo tipa los nombres de evento y las pocas propiedades mínimas que tiene
 * sentido registrar (slugs/recuentos, nunca texto libre ni nada personal).
 */
export type ReplaceAnalyticsEvent =
  | { name: "replace_started" }
  | { name: "saas_selected"; saasSlug: string }
  | { name: "alternative_selected"; saasSlug: string; toolSlug: string }
  | { name: "stack_created"; toolCount: number }
  | { name: "compose_downloaded"; toolCount: number };

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
