import { saasPricing, getSaasPricingLocalized } from "@/data/saas-pricing";
import { getSaasAlternatives } from "@/lib/alternatives";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { slugify } from "@/lib/utils";
import type { Locale } from "@/i18n/config";

export interface SaasExitItem {
  saasSlug: string;
  saasName: string;
  priceUsd: number;
  pricingModel: "perSeat" | "flat";
  billingNote: string;
  primaryToolSlug: string;
  primaryToolName: string;
  minRamMb: number;
}

/**
 * Para cada SaaS con precio conocido, resuelve su alternativa "principal":
 * la de más estrellas reales en GitHub entre las que la sustituyen (dato ya
 * existente en el catálogo, no una elección subjetiva nuestra). Evita cargar
 * TODAS las alternativas de golpe en el Stack Builder cuando varias
 * herramientas compiten por el mismo hueco (ej. Nextcloud/Seafile/Syncthing
 * para Dropbox) — el usuario puede cambiarla luego a mano en el Builder.
 */
export function buildSaasExitCatalog(locale: Locale): SaasExitItem[] {
  const items: SaasExitItem[] = [];

  for (const entry of saasPricing) {
    const saasSlug = slugify(entry.saasName);
    const group = getSaasAlternatives(saasSlug);
    if (!group || group.tools.length === 0) continue;

    // Prioriza las herramientas ya marcadas como "featured" en el catálogo
    // (la curación editorial existente) y usa las estrellas reales de GitHub
    // como desempate — ninguno de los dos criterios se inventa aquí.
    const primary = [...group.tools].sort((a, b) => {
      if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
      return (b.starsCount ?? 0) - (a.starsCount ?? 0);
    })[0];
    const priced = getSaasPricingLocalized(entry.saasName, locale)!;
    const { minRamMb } = resolveToolResourceProfile(primary);

    items.push({
      saasSlug,
      saasName: entry.saasName,
      priceUsd: priced.pricePerSeatUsd,
      pricingModel: priced.pricingModel,
      billingNote: priced.billingNote,
      primaryToolSlug: primary.slug,
      primaryToolName: primary.name,
      minRamMb,
    });
  }

  return items;
}
