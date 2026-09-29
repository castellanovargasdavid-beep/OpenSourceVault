import { siteConfig } from "@/lib/site-config";

/**
 * Obtiene la imagen Open Graph (og:image) que la propia web de la
 * herramienta publica para que se reutilice al compartir su enlace — es
 * exactamente el propósito de esa etiqueta, así que es la forma más segura
 * de mostrar una vista previa visual sin alojar ni redistribuir capturas de
 * pantalla de terceros por nuestra cuenta.
 *
 * Igual que las estrellas de GitHub, esto degrada en silencio a `null` ante
 * cualquier fallo (timeout, web caída, sin meta og:image) — nunca rompe el
 * build.
 */
export async function getOgImageUrl(websiteUrl: string): Promise<string | null> {
  try {
    const res = await fetch(websiteUrl, {
      headers: {
        // Convención estándar de bots (Googlebot, bingbot...): el +URL al
        // final identifica el sitio que hace la petición ante quien reciba
        // esta request — debe ser el dominio oficial, igual que en el resto
        // de metadata emitida por el sitio.
        "User-Agent": `Mozilla/5.0 (compatible; AltFreeStackBot/1.0; +${siteConfig.url})`,
      },
      next: { revalidate: 604800 }, // 7 días: el og:image de una web cambia poco
      signal: AbortSignal.timeout(4000),
    });

    if (!res.ok) return null;

    const html = await res.text();
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    if (!match) return null;

    let imageUrl = match[1];
    if (imageUrl.startsWith("//")) {
      imageUrl = `https:${imageUrl}`;
    } else if (imageUrl.startsWith("/")) {
      imageUrl = new URL(imageUrl, websiteUrl).toString();
    }

    return imageUrl;
  } catch {
    return null;
  }
}
