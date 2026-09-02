import type { Locale } from "@/i18n/config";

/**
 * Constructores de URL para las páginas cuyo path en inglés no es solo el
 * español con /en/ delante (evita repetir "comparar"/"guias"/"calculadora"
 * bajo /en/, que mezclaría palabras en español en una URL en inglés).
 */

export function getCompareHref(pairSlug: string, locale: Locale): string {
  return locale === "en" ? `/en/compare/${pairSlug}` : `/comparar/${pairSlug}`;
}

export function getDeployGuideHref(locale: Locale): string {
  return locale === "en" ? "/en/guides/deploy-with-docker" : "/guias/desplegar-con-docker";
}

export function getMigrationGuideHref(fromSlug: string, toSlug: string, locale: Locale): string {
  return locale === "en" ? `/en/guides/migrate/${fromSlug}/${toSlug}` : `/guias/migrar/${fromSlug}/${toSlug}`;
}

export function getSavingsCalculatorHref(locale: Locale): string {
  return locale === "en" ? "/en/savings-calculator" : "/calculadora-ahorro";
}

export function getHostingGuideHref(provider: string, locale: Locale): string {
  return locale === "en" ? `/en/guides/hosting/${provider}` : `/guias/hosting/${provider}`;
}
