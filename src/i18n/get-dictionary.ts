import type { Locale } from "./config";
import es from "./dictionaries/es";
import en from "./dictionaries/en";

export function getDictionary(locale: Locale) {
  return locale === "en" ? en : es;
}
