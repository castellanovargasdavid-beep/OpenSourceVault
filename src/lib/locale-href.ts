import type { Locale } from "@/i18n/config";

/** Prefixes a canonical (Spanish) path with /en when locale is "en". Path must start with "/". */
export function localeHref(path: string, locale: Locale): string {
  if (locale === "en") {
    return path === "/" ? "/en" : `/en${path}`;
  }
  return path;
}
