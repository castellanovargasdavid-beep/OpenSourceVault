/**
 * JSON.stringify no escapa "<", así que un campo que contuviera literalmente
 * "</script>" rompería fuera de esta etiqueta e inyectaría HTML/script
 * arbitrario en la página (los datos actuales del catálogo son de confianza,
 * pero esto es la mitigación estándar recomendada por Next.js para JSON-LD).
 */
function safeJsonLdString(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdString(data) }}
    />
  );
}
