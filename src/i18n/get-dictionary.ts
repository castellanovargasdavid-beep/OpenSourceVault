import type { Locale } from "./config";
import es from "./dictionaries/es";
import en from "./dictionaries/en";
import zh from "./dictionaries/zh";

export function getDictionary(locale: Locale) {
  if (locale === "en") return en;
  if (locale === "zh") return zh;
  return es;
}
