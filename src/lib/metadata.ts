import type { ResolvingMetadata } from "next";

/**
 * Las imágenes OG/Twitter de cada locale se generan una sola vez, vía
 * (es)/opengraph-image.tsx y (en)/opengraph-image.tsx (file-based metadata,
 * heredada por todas las rutas hijas). El problema: en cuanto un
 * `generateMetadata` de página define su propio `openGraph`/`twitter` (para
 * el title/description específicos de esa página), esa asignación
 * REEMPLAZA por completo el objeto heredado del padre en vez de fusionarse
 * con él — comportamiento documentado de Next.js ("Metadata objects
 * exported from multiple segments... are shallowly merged... duplicate
 * keys are replaced"), confirmado en producción: ~97% de las páginas
 * generadas no llevaban `og:image`/`twitter:image` por este motivo exacto.
 *
 * La solución oficial de Next (ver generateMetadata() docs, parámetro
 * `parent: ResolvingMetadata`) es leer las imágenes ya resueltas del padre
 * e incluirlas explícitamente en el objeto devuelto — nunca referenciar a
 * mano el archivo/hash generado, que es un detalle interno del build.
 */
export async function inheritedSocialImages(parent: ResolvingMetadata) {
  const resolved = await parent;
  return {
    openGraphImages: resolved.openGraph?.images,
    twitterImages: resolved.twitter?.images,
  };
}
