import type { Locale } from "@/i18n/config";

/** Prefixes a canonical (Spanish) path with /en or /zh when locale is "en"/"zh". Path must start with "/". */
export function localeHref(path: string, locale: Locale): string {
  if (locale === "en") {
    return path === "/" ? "/en" : `/en${path}`;
  }
  if (locale === "zh") {
    return path === "/" ? "/zh" : `/zh${path}`;
  }
  return path;
}
