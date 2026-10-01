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
 * El lado self-hosted distingue FOSS de OpenCore/FairCode/SourceAvailable:
 * para OpenCore no se promete "sin límites", porque algunas funciones
 * avanzadas sí siguen de pago incluso auto-hospedado; para FairCode y
 * SourceAvailable no se promete "software libre", porque la licencia no es
 * OSI aunque el uso auto-hospedado en sí no tenga límites.
 */
export function getToolComparison(tool: Pick<OpenSourceTool, "replaces" | "fossModel">, locale: Locale): ToolComparisonText {
  const primarySaas = tool.replaces[0];
  const pricing = primarySaas ? getSaasPricingLocalized(primarySaas, locale) : undefined;

  let cloud: string;
  if (pricing) {
    const price = formatPrice(pricing.pricePerSeatUsd);
    if (locale === "en") {
      cloud = pricing.pricingModel === "perSeat" ? `$${price}/mo per user on ${primarySaas}` : `$${price}/mo on ${primarySaas}`;
    } else if (locale === "zh") {
      cloud = pricing.pricingModel === "perSeat" ? `${primarySaas} 每用户每月 $${price}` : `${primarySaas} 每月 $${price}`;
    } else {
      cloud = pricing.pricingModel === "perSeat" ? `$${price}/mes por usuario en ${primarySaas}` : `$${price}/mes en ${primarySaas}`;
    }
  } else if (primarySaas) {
    if (locale === "en") {
      cloud = `a recurring monthly fee and usage limits on ${primarySaas}`;
    } else if (locale === "zh") {
      cloud = `${primarySaas} 按月收费并有使用限制`;
    } else {
      cloud = `una cuota mensual recurrente y límites de uso en ${primarySaas}`;
    }
  } else if (locale === "en") {
    cloud = "a recurring monthly SaaS fee and usage limits";
  } else if (locale === "zh") {
    cloud = "按月收费的 SaaS 订阅，并有使用限制";
  } else {
    cloud = "una cuota mensual de SaaS y límites de uso";
  }

  let selfHosted: string;
  if (tool.fossModel === "OpenCore") {
    if (locale === "en") {
      selfHosted = "the core is free to self-host on your own server — no more monthly SaaS fee, though some advanced features stay behind a paid plan";
    } else if (locale === "zh") {
      selfHosted = "核心功能可以免费在你自己的服务器上自托管——不用再付月费，不过部分高级功能仍需付费解锁";
    } else {
      selfHosted = "el núcleo es gratis y auto-hospedable en tu propio servidor — sin la cuota mensual del SaaS, aunque algunas funciones avanzadas siguen de pago";
    }
  } else if (tool.fossModel === "FairCode" || tool.fossModel === "SourceAvailable") {
    if (locale === "en") {
      selfHosted =
        "free to self-host on your own server with no usage limits — no more monthly SaaS fee, though the license isn't OSI open source (check it before commercial use)";
    } else if (locale === "zh") {
      selfHosted = "可以免费在你自己的服务器上自托管，没有使用限制——不用再付月费，但许可证并非 OSI 认可的开源协议（商用前请先查看条款）";
    } else {
      selfHosted =
        "gratis y auto-hospedable en tu propio servidor sin límites de uso — sin la cuota mensual del SaaS, aunque la licencia no es open source OSI (revísala antes de un uso comercial)";
    }
  } else if (locale === "en") {
    selfHosted = "100% free software on your own server, with no artificial row, project or user limits";
  } else if (locale === "zh") {
    selfHosted = "100% 免费软件，部署在你自己的服务器上，没有行数、项目数或用户数的人为限制";
  } else {
    selfHosted = "software 100% gratis en tu propio servidor, sin límites artificiales de filas, proyectos ni usuarios";
  }

  return { cloud, selfHosted };
}
