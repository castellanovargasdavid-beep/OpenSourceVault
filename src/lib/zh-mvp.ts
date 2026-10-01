/**
 * Alcance cerrado del piloto zh-CN (AI/LLM/self-hosting) — ver el encargo
 * original. Toda la generación de rutas/hreflang/sitemap para zh-CN pasa
 * por estas listas en vez de reimplementar el filtro en cada sitio: así
 * crecer o reducir el piloto es un cambio en un solo archivo, y
 * generateStaticParams nunca puede generar más páginas zh de las aquí
 * declaradas (dynamicParams = false en las rutas zh las cierra).
 */

/** Las 10 fichas de herramienta con traducción zh-CN propia (tools.zh.ts). */
export const ZH_TOOL_SLUGS: readonly string[] = [
  "dify",
  "ollama",
  "vllm",
  "open-webui",
  "comfyui",
  "searxng",
  "nextcloud",
  "odoo",
  "appflowy",
  "syncthing",
];

/**
 * Las 10 comparativas con página zh-CN propia. El pairSlug es el mismo
 * "a-vs-b" alfabético que usan ya /comparar y /en/compare (ver
 * lib/comparisons.ts) — no se traducen slugs.
 */
export const ZH_COMPARE_PAIR_SLUGS: readonly string[] = [
  "dify-vs-ollama",
  "dify-vs-vllm",
  "ollama-vs-vllm",
  "ollama-vs-text-generation-webui",
  "localai-vs-ollama",
  "comfyui-vs-invokeai",
  "librechat-vs-open-webui",
  "khoj-vs-open-webui",
  "nextcloud-vs-seafile",
  "nextcloud-vs-syncthing",
];

const zhToolSlugSet = new Set(ZH_TOOL_SLUGS);
const zhComparePairSlugSet = new Set(ZH_COMPARE_PAIR_SLUGS);

/** true si esta ficha de herramienta tiene página /zh/tool/{slug} real. */
export function hasZhTool(slug: string): boolean {
  return zhToolSlugSet.has(slug);
}

/** true si esta comparativa tiene página /zh/compare/{pair} real. */
export function hasZhCompare(pairSlug: string): boolean {
  return zhComparePairSlugSet.has(pairSlug);
}

/**
 * Enlazado interno contextual (sección 13 del encargo) — curado a mano en
 * vez de derivado automáticamente de la categoría, porque "misma categoría"
 * agrupa cosas sin relación real de uso (p.ej. Odoo y Nextcloud son ambos
 * de uso empresarial pero no se usan juntos). Solo referencia otros
 * slugs de ZH_TOOL_SLUGS — nunca un slug fuera del piloto.
 */
export const ZH_RELATED_TOOLS: Record<string, readonly string[]> = {
  dify: ["ollama", "vllm", "open-webui"],
  ollama: ["vllm", "dify", "open-webui"],
  vllm: ["ollama", "dify", "open-webui"],
  "open-webui": ["ollama", "vllm", "dify"],
  comfyui: ["ollama", "dify"],
  searxng: [],
  nextcloud: ["syncthing"],
  syncthing: ["nextcloud"],
  odoo: [],
  appflowy: [],
};
