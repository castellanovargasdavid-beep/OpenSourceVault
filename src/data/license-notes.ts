/**
 * Única fuente de verdad para la explicación editorial (no el nombre de la
 * licencia, que sigue viviendo en el campo `license` de cada herramienta)
 * de lo que implica AGPL-3.0, reutilizada en `cons` de `tools.ts`/`tools.en.ts`
 * y en `limitation` de `replace-mappings.ts`/`replace-mappings.en.ts`.
 *
 * Antes cada sitio escribía su propia frase a mano — una de ellas llegó a
 * decir "AGPL-3.0 obliga a liberar el código si modificas y ofreces el
 * servicio", una simplificación incorrecta (AGPL no "obliga" en ese sentido
 * amplio; sus obligaciones de compartir código fuente aplican a las
 * circunstancias concretas que cubren sus términos, no a cualquier uso).
 * Con un único texto importado en los cuatro sitios, una corrección futura
 * solo se escribe una vez.
 */
export const AGPL_COPYLEFT_NOTE_ES =
  "AGPL-3.0: licencia de copyleft fuerte, con obligaciones de compartir el código fuente para las versiones modificadas cubiertas y cierto uso en red, según sus términos";

export const AGPL_COPYLEFT_NOTE_EN =
  "AGPL-3.0: a strong copyleft license, with source-sharing obligations for covered modified versions and certain network use, under its terms";
