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
/**
 * `placement` identifica desde qué superficie se disparó un evento (Fase 15
 * del PRD de CRO: "qué CTA, en qué página, para qué herramienta... produjo
 * el clic") — mismo string reutilizado en eventos de stack/hosting/deploy
 * para poder cruzarlos sin depender de la URL (que ya captura `page`/`locale`
 * por su cuenta en Vercel Analytics).
 */
export type AnalyticsPlacement =
  | "home"
  | "tool_page"
  | "tool_card"
  | "stack_builder"
  | "stack_builder_search"
  | "stack_result"
  | "curated_stack"
  | "hosting_comparison"
  | "cost_calculator"
  | "savings_calculator"
  | "saas_exit"
  | "deployment_guide"
  | "replace_wizard";

export type ReplaceAnalyticsEvent =
  | { name: "replace_started" }
  | { name: "saas_selected"; saasSlug: string }
  | { name: "alternative_selected"; saasSlug: string; toolSlug: string }
  | { name: "tool_view"; toolSlug: string }
  | { name: "alternative_view"; saasSlug: string }
  | { name: "replace_view"; saasSlug: string }
  | { name: "stack_builder_opened" }
  | { name: "hero_cta_click"; cta: "build_stack" | "explore_alternatives" }
  // `placement` distingue las dos acciones MUY distintas que comparten este
  // nombre: completar el wizard de reemplazo de SaaS (toolCount = nº de
  // herramientas ya elegidas) vs. crear un proyecto nuevo y vacío dentro del
  // Stack Builder (toolCount siempre 0 ahí) — antes eran indistinguibles en
  // los datos.
  | { name: "stack_created"; toolCount: number; placement: Extract<AnalyticsPlacement, "replace_wizard" | "stack_builder"> }
  | { name: "compose_downloaded"; toolCount: number }
  | { name: "calculator_used"; calculator: "cost" | "savings" }
  | { name: "hosting_click"; provider: string; placement?: AnalyticsPlacement }
  // --- Añadidos para el funnel Descubrir→Entender→Comparar→Calcular→
  // Construir→Coste→Infraestructura→Desplegar→Guardar/Compartir (ver
  // FUNNEL_ANALYTICS.md). Nunca texto libre ni PII: solo slugs/recuentos/
  // nombres de proveedor/placement, igual que los eventos ya existentes.
  | { name: "tool_add_to_stack"; toolSlug: string; placement: AnalyticsPlacement }
  | { name: "stack_shared"; toolCount: number }
  | { name: "stack_import_viewed"; toolCount: number }
  | { name: "stack_import_saved"; toolCount: number }
  | { name: "hosting_view"; providers: string; placement: AnalyticsPlacement }
  | { name: "deploy_click"; placement: AnalyticsPlacement; toolCount: number }
  | { name: "copy_docker_compose"; placement: AnalyticsPlacement; toolCount: number }
  | { name: "calculator_completed"; calculator: "cost" | "savings"; destination: "stack_builder" | "saas_exit" | "alternative" }
  | { name: "search_submit"; resultCount: number; placement: AnalyticsPlacement };

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
