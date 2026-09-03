import { getSaasPricingLocalized } from "@/data/saas-pricing";
import type { OpenSourceTool } from "@/lib/types";
import type { Locale } from "@/i18n/config";

export interface ToolComparisonText {
  cloud: string;
  selfHosted: string;
}

function formatPrice(price: number): string {
  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

/**
 * Comparativa honesta "SaaS oficial vs self-hosted" para la ficha de cada
 * herramienta. Cuando tenemos un precio verificado (src/data/saas-pricing.ts)
 * lo usamos tal cual — respetando si es por asiento o precio de cuenta fijo
 * (Zapier/Mailchimp/Typeform no son "por usuario"). Si no hay precio
 * verificado para el SaaS que sustituye, un mensaje genérico pero
 * verdadero — nunca se inventa una cifra ni un límite concreto.
 *
 * El lado self-hosted distingue FOSS puro de OpenCore: para OpenCore no se
 * promete "sin límites", porque algunas funciones avanzadas sí siguen de
 * pago incluso auto-hospedado.
 */
export function getToolComparison(tool: Pick<OpenSourceTool, "replaces" | "fossModel">, locale: Locale): ToolComparisonText {
  const primarySaas = tool.replaces[0];
  const pricing = primarySaas ? getSaasPricingLocalized(primarySaas, locale) : undefined;

  let cloud: string;
  if (pricing) {
    const price = formatPrice(pricing.pricePerSeatUsd);
    if (locale === "en") {
      cloud = pricing.pricingModel === "perSeat" ? `$${price}/mo per user on ${primarySaas}` : `$${price}/mo on ${primarySaas}`;
    } else {
      cloud = pricing.pricingModel === "perSeat" ? `$${price}/mes por usuario en ${primarySaas}` : `$${price}/mes en ${primarySaas}`;
    }
  } else if (primarySaas) {
    cloud =
      locale === "en"
        ? `a recurring monthly fee and usage limits on ${primarySaas}`
        : `una cuota mensual recurrente y límites de uso en ${primarySaas}`;
  } else {
    cloud = locale === "en" ? "a recurring monthly SaaS fee and usage limits" : "una cuota mensual de SaaS y límites de uso";
  }

  const selfHosted =
    tool.fossModel === "OpenCore"
      ? locale === "en"
        ? "the core is free to self-host on your own server — no more monthly SaaS fee, though some advanced features stay behind a paid plan"
        : "el núcleo es gratis y auto-hospedable en tu propio servidor — sin la cuota mensual del SaaS, aunque algunas funciones avanzadas siguen de pago"
      : locale === "en"
        ? "100% free software on your own server, with no artificial row, project or user limits"
        : "software 100% gratis en tu propio servidor, sin límites artificiales de filas, proyectos ni usuarios";

  return { cloud, selfHosted };
}
