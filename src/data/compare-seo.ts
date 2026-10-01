import { AGPL_COPYLEFT_NOTE_ES } from "./license-notes";
import { compareSeoEn } from "./compare-seo.en";
import type { Locale } from "@/i18n/config";

export interface CompareSeoFaqEntry {
  q: string;
  a: string;
}

export interface CompareSeoOverride {
  /** Reemplaza el title plantilla (`t.comparisonPage.metaTitle`) solo para este par. */
  metaTitle?: string;
  /** Reemplaza `t.comparisonPage.metaDescription` solo para este par. */
  metaDescription?: string;
  /** Respuesta rápida visible justo debajo del header, antes de la tabla comparativa. */
  tldr?: string;
  /** FAQ real y específica del par, mostrada con schema FAQPage cuando existe. */
  faqs?: CompareSeoFaqEntry[];
}

/**
 * Overrides SEO quirúrgicos para comparativas con señal real en Search
 * Console (ver SEO_CHANGELOG.md) — el resto de las comparativas sigue usando
 * la plantilla genérica de `t.comparisonPage`, sin cambios. Mismo patrón que
 * tool-seo.ts. Clave: `pairSlug` (`${toolA.slug}-vs-${toolB.slug}`, ver
 * lib/comparisons.ts).
 */
export const compareSeo: Partial<Record<string, CompareSeoOverride>> = {
  "garage-vs-seaweedfs": {
    metaTitle: "Garage vs SeaweedFS: almacenamiento S3 self-hosted (2026)",
    metaDescription:
      "Garage vs SeaweedFS: comparamos licencia, arquitectura y recursos de dos alternativas open source a Amazon S3 para auto-hospedar tu propio almacenamiento de objetos.",
    tldr:
      "Garage encaja mejor en un cluster casero de nodos modestos, incluso geo-distribuidos, con muy bajo consumo por nodo. SeaweedFS encaja mejor cuando necesitas servir muchísimos archivos pequeños a gran escala y funciones extra como erasure coding. Ambos son compatibles con la API S3.",
    faqs: [
      {
        q: "¿Garage o SeaweedFS para un homelab con hardware modesto?",
        a: "Garage está pensado específicamente para eso: clusters de varios nodos pequeños, incluso geo-distribuidos, con muy bajo consumo de recursos por nodo. Su configuración de clustering tiene algo más de curva de aprendizaje a cambio.",
      },
      {
        q: "¿Cuál tiene más funciones?",
        a: "SeaweedFS incluye replicación y erasure coding configurables, y está optimizado para servir miles de millones de archivos pequeños a gran escala — más funciones a cambio de un proyecto más grande.",
      },
      {
        q: "¿Los dos son compatibles con la API de Amazon S3?",
        a: "Sí, ambos incluyen una capa de compatibilidad S3, así que la mayoría de clientes y herramientas que ya hablan S3 funcionan contra cualquiera de los dos sin cambios de código.",
      },
      {
        q: "¿Qué diferencia hay entre sus licencias?",
        a: `Garage usa ${AGPL_COPYLEFT_NOTE_ES}. SeaweedFS usa Apache-2.0, una licencia permisiva sin esa obligación de red. Importante sobre todo si planeas ofrecer el almacenamiento como servicio a terceros.`,
      },
    ],
  },
};

export function getCompareSeo(pairSlug: string, locale: Locale): CompareSeoOverride | undefined {
  if (locale === "en") return compareSeoEn[pairSlug] ?? compareSeo[pairSlug];
  return compareSeo[pairSlug];
}
