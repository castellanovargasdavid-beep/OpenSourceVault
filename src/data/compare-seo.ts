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
  "affine-vs-outline": {
    metaTitle: "AFFiNE vs Outline: documentos + pizarra vs wiki de equipo (2026)",
    metaDescription:
      "AFFiNE vs Outline: comparamos licencia, arquitectura y enfoque de dos alternativas open source a Notion/Confluence para elegir tu wiki o workspace auto-hospedado.",
    tldr:
      "AFFiNE combina documentos, bases de datos y una pizarra infinita en el mismo lienzo — ideal si quieres algo más visual que una wiki tradicional. Outline es una wiki de equipo más enfocada, con búsqueda instantánea y colecciones claras. AFFiNE usa licencia MIT; Outline usa BUSL-1.1 (no OSI).",
    faqs: [
      {
        q: "¿AFFiNE o Outline si solo necesito una wiki de equipo?",
        a: "Outline: está enfocado específicamente en documentación de equipo, con búsqueda instantánea y una estructura de colecciones clara. La pizarra de AFFiNE no aporta valor si solo necesitas texto organizado.",
      },
      {
        q: "¿Cuál tiene pizarra o whiteboard visual?",
        a: "Solo AFFiNE combina documentos, bases de datos y una pizarra infinita en el mismo lienzo. Outline no tiene esa función — es una wiki centrada en texto y colecciones.",
      },
      {
        q: "¿Qué licencia usa cada uno?",
        a: "AFFiNE es MIT, una licencia OSI real. Outline es BUSL-1.1 (Business Source License): el código es público, pero no es una licencia reconocida por la OSI — importa sobre todo si planeas ofrecer cualquiera de las dos como tu propio SaaS de pago.",
      },
      {
        q: "¿Cuál es más madura para producción?",
        a: "Outline lleva más años centrado específicamente en su caso de uso (wiki de equipo). AFFiNE es más ambicioso al combinar más funciones, pero su self-host oficial todavía evoluciona rápido entre versiones, como ya indicamos en su ficha.",
      },
    ],
  },
  "appflowy-vs-outline": {
    metaTitle: "AppFlowy vs Outline: workspace todo-en-uno vs wiki enfocada (2026)",
    metaDescription:
      "AppFlowy vs Outline: comparamos licencia, infraestructura necesaria y enfoque de dos alternativas open source a Notion/Confluence antes de elegir cuál auto-hospedar.",
    tldr:
      "AppFlowy es un workspace todo-en-uno (notas, bases de datos, kanban) con licencia AGPL-3.0 real. Outline es una wiki de equipo más enfocada con licencia BUSL-1.1 (no OSI). Si solo necesitas documentación, Outline es más directo; si quieres sustituir Notion al completo, AppFlowy cubre más terreno.",
    faqs: [
      {
        q: "¿AppFlowy o Outline: cuál se parece más a Notion?",
        a: "AppFlowy, porque combina notas, bases de datos y tableros Kanban en un solo workspace, igual que Notion. Outline está más enfocado en documentación de equipo tipo wiki, sin bases de datos ni tableros.",
      },
      {
        q: "¿Qué licencia usa cada uno?",
        a: "AppFlowy es AGPL-3.0, una licencia OSI real. Outline es BUSL-1.1, no reconocida por la OSI aunque su código sea público.",
      },
      {
        q: "¿Cuál necesita menos servicios para auto-hospedar?",
        a: "AppFlowy Cloud (la vía de auto-hospedaje de AppFlowy) solo necesita PostgreSQL. Outline necesita PostgreSQL y Redis — un servicio más que mantener.",
      },
    ],
  },
  "docmost-vs-outline": {
    metaTitle: "Docmost vs Outline: dos wikis colaborativas, licencias distintas (2026)",
    metaDescription:
      "Docmost vs Outline: comparamos licencia, infraestructura y madurez de dos wikis de equipo modernas antes de elegir cuál auto-hospedar como alternativa a Confluence.",
    tldr:
      "Docmost y Outline son wikis colaborativas modernas con infraestructura similar (PostgreSQL + Redis). La diferencia real está en la licencia: Docmost es AGPL-3.0 (código abierto real); Outline es BUSL-1.1 (no OSI, aunque el código es público) y lleva más años de desarrollo.",
    faqs: [
      {
        q: "¿Docmost o Outline: cuál elegir?",
        a: "Ambas son wikis colaborativas modernas con edición en tiempo real. Docmost es un proyecto más joven pero con licencia AGPL-3.0 real; Outline lleva más tiempo en desarrollo con un enfoque muy pulido en búsqueda y colecciones, aunque su licencia BUSL-1.1 no es OSI.",
      },
      {
        q: "¿Qué necesito para desplegar cada una?",
        a: "Ambas necesitan PostgreSQL y Redis — los requisitos de infraestructura son muy similares entre las dos.",
      },
      {
        q: "¿Cuál es más madura?",
        a: "Outline lleva más años en desarrollo activo centrado en su caso de uso. Docmost es un proyecto más reciente, con buen ritmo de desarrollo pero menos tiempo de maduración en producción.",
      },
    ],
  },
  "minio-vs-seaweedfs": {
    metaTitle: "MinIO vs SeaweedFS: estado real de cada imagen Docker (2026)",
    metaDescription:
      "MinIO vs SeaweedFS para S3 self-hosted: comparamos licencia y arquitectura, incluida una alerta de seguridad vigente sobre la imagen Docker de MinIO community edition.",
    tldr:
      "Antes de comparar funciones: la community edition de MinIO ya no tiene una imagen Docker pública fiable — su repo se archivó, la imagen se retiró de Docker Hub, y la última versión libre que circula tiene una vulnerabilidad crítica sin parchear. SeaweedFS sigue publicando binarios, con 3.99 como último tag Docker fijable. Si necesitas S3 compatible hoy mismo, SeaweedFS (o Garage) es la opción más segura de desplegar de las dos.",
    faqs: [
      {
        q: "¿Es seguro desplegar MinIO hoy?",
        a: "No lo recomendamos actualmente: su community edition ya no se publica como imagen Docker pública (el repositorio se archivó y la imagen se retiró de Docker Hub y de su mirror en quay.io), y la última versión gratuita que aún circula tiene una vulnerabilidad crítica de autenticación sin parchear (CVSS 8.8). Considera SeaweedFS o Garage mientras MinIO no ofrezca una vía oficial de nuevo.",
      },
      {
        q: "¿SeaweedFS sigue recibiendo actualizaciones de Docker?",
        a: "Sigue en desarrollo, pero su imagen Docker no ha publicado un tag de versión nuevo desde 3.99 (octubre 2025) — la actividad reciente del registro son solo firmas cosign, no versiones nuevas consumibles. 3.99 es la última versión real a la que se puede fijar hoy.",
      },
      {
        q: "¿Las dos son compatibles con la API de Amazon S3?",
        a: "Sí, ambas incluyen una capa de compatibilidad S3, independientemente del problema de disponibilidad de imagen que afecta a MinIO.",
      },
      {
        q: "¿Qué licencia usa cada uno?",
        a: "MinIO es AGPL-3.0 (Open-Core: algunas funciones avanzadas quedan reservadas a un plan empresarial). SeaweedFS es Apache-2.0, totalmente FOSS sin ese modelo.",
      },
    ],
  },
  "docmost-vs-wikijs": {
    metaTitle: "Docmost vs Wiki.js: edición en tiempo real vs historial tipo Git (2026)",
    metaDescription:
      "Docmost vs Wiki.js: comparamos arquitectura e infraestructura de dos wikis AGPL-3.0 antes de elegir cuál auto-hospedar como alternativa a Confluence.",
    tldr:
      "Wiki.js y Docmost son ambas AGPL-3.0, pero técnicamente distintas: Wiki.js solo necesita PostgreSQL y ofrece historial de cambios tipo Git con múltiples proveedores de autenticación; Docmost añade Redis y se centra en edición colaborativa en tiempo real al estilo Notion.",
    faqs: [
      {
        q: "¿Docmost o Wiki.js: cuál elegir?",
        a: "Wiki.js si quieres un editor flexible (Markdown o visual) con historial de cambios tipo Git. Docmost si priorizas edición colaborativa en tiempo real con un estilo más parecido a Notion.",
      },
      {
        q: "¿Cuál necesita menos infraestructura para auto-hospedar?",
        a: "Wiki.js, que solo necesita PostgreSQL. Docmost añade Redis además de PostgreSQL, un servicio más que mantener.",
      },
      {
        q: "¿Qué licencia usa cada uno?",
        a: "Ambas son AGPL-3.0 — en este par, la licencia no es el diferenciador real, sino la arquitectura y el estilo de edición.",
      },
    ],
  },
};

export function getCompareSeo(pairSlug: string, locale: Locale): CompareSeoOverride | undefined {
  if (locale === "en") return compareSeoEn[pairSlug] ?? compareSeo[pairSlug];
  return compareSeo[pairSlug];
}
