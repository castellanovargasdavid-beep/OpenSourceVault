import { getSaasAlternatives } from "@/lib/alternatives";
import { resolveToolResourceProfile } from "@/lib/tool-difficulty";
import { isPublished, type OpenSourceTool } from "@/lib/types";
import { slugify } from "@/lib/utils";
import { INTENT_PAGE_CONTENT, type IntentType, type IntentPageContent } from "@/data/intent-pages";
import { INTENT_PAGE_CONTENT as INTENT_PAGE_CONTENT_EN } from "@/data/intent-pages.en";
import type { Locale } from "@/i18n/config";

export type { IntentType, IntentPageContent };

/**
 * Páginas long-tail de intención (/alternativas/{saas}-{intent}) —
 * "auditado"/"self-hosted"/"open-source" NO son una etiqueta que se
 * pega por SaaS: cada herramienta se evalúa por separado (ver
 * isSelfHostedEligible/isOpenSourceEligible) y la página de un SaaS+intención
 * solo existe si hay contenido curado a mano en src/data/intent-pages(.en).ts
 * Y suficientes herramientas elegibles — nunca se genera ni se infiere nada
 * automáticamente. "privacy" quedó deliberadamente fuera de este sistema: el
 * catálogo no tiene ningún campo verificable (telemetría, llamadas externas,
 * cumplimiento legal) que soporte esa afirmación sin inventar un dato — se
 * añadirá como IntentType el día que exista un campo así.
 */
export const INTENT_TYPES: readonly IntentType[] = ["self-hosted", "open-source"];

const INTENT_SLUG: Record<IntentType, string> = {
  "self-hosted": "self-hosted",
  "open-source": "open-source",
};

/**
 * Mínimo de herramientas elegibles para que una página exista. Ninguna
 * entrada del piloto necesita bajar de esto — una excepción por debajo de 2
 * exige justificación editorial explícita en el propio dato curado, nunca
 * un valor por defecto más permisivo.
 */
const MIN_ELIGIBLE_TOOLS = 2;

/**
 * "Self-hosted" NO exige docker-compose específicamente: una herramienta
 * con instalador oficial propio (ej. Coolify, method "external_script") es
 * igual de self-hosted que una con docker-compose.yml — el catálogo entero
 * lo es, por definición. Lo único que descarta una herramienta aquí es que
 * la imagen esté archivada/descontinuada (dockerStatus), no la vía de
 * instalación.
 */
export function isSelfHostedEligible(tool: OpenSourceTool): boolean {
  return isPublished(tool) && tool.dockerStatus !== "ARCHIVED_UPSTREAM";
}

/**
 * Estricto a propósito: Open-Core/Fair-code/Source-available quedan fuera
 * aunque el código sea público — ver los captions ya existentes de
 * fossModel en t.toolCard para la misma distinción en el resto del sitio.
 */
export function isOpenSourceEligible(tool: OpenSourceTool): boolean {
  return isPublished(tool) && tool.fossModel === "FOSS";
}

const ELIGIBILITY: Record<IntentType, (tool: OpenSourceTool) => boolean> = {
  "self-hosted": isSelfHostedEligible,
  "open-source": isOpenSourceEligible,
};

function contentFor(locale: Locale) {
  return locale === "en" ? INTENT_PAGE_CONTENT_EN : INTENT_PAGE_CONTENT;
}

export function getIntentPageHref(saasName: string, intent: IntentType, locale: Locale): string {
  const slug = `${slugify(saasName)}-${INTENT_SLUG[intent]}`;
  return locale === "en" ? `/en/alternatives/${slug}` : `/alternativas/${slug}`;
}

/**
 * "notion-self-hosted" -> { saasSlug: "notion", intent: "self-hosted" }.
 * Compara contra los sufijos de intención conocidos (no el último "-") para
 * no cortar mal un slug de SaaS que ya lleva guiones (ej. "google-analytics").
 */
function parseIntentSlug(slug: string): { saasSlug: string; intent: IntentType } | null {
  for (const intent of INTENT_TYPES) {
    const suffix = `-${INTENT_SLUG[intent]}`;
    if (slug.endsWith(suffix)) {
      const saasSlug = slug.slice(0, -suffix.length);
      if (saasSlug) return { saasSlug, intent };
    }
  }
  return null;
}

export interface IntentPage {
  saasSlug: string;
  saasName: string;
  intent: IntentType;
  content: IntentPageContent;
  eligibleTools: OpenSourceTool[];
  /** RAM mínima real del grupo elegible (min/max), para el bloque de requisitos de servidor — nunca inventada, siempre recalculada. */
  ramRangeMb: { min: number; max: number };
}

/**
 * Resuelve una página de intención a partir del slug completo de la URL.
 * Devuelve undefined (== 404) si: el slug no tiene un sufijo de intención
 * reconocido, el SaaS no existe, no hay contenido curado para ese par, o
 * el catálogo ya no sostiene la afirmación (menos de MIN_ELIGIBLE_TOOLS
 * herramientas elegibles) — igual que replace.ts con /replace/*, nunca
 * confía ciegamente en el contenido escrito a mano.
 */
export function getIntentPage(rawSlug: string, locale: Locale): IntentPage | undefined {
  const parsed = parseIntentSlug(rawSlug);
  if (!parsed) return undefined;

  const group = getSaasAlternatives(parsed.saasSlug);
  if (!group) return undefined;

  const content = contentFor(locale)[`${group.saasName}→${parsed.intent}`];
  if (!content) return undefined;

  const eligibleTools = group.tools.filter(ELIGIBILITY[parsed.intent]);
  if (eligibleTools.length < MIN_ELIGIBLE_TOOLS) return undefined;

  const rams = eligibleTools.map((tool) => resolveToolResourceProfile(tool).minRamMb);

  return {
    saasSlug: parsed.saasSlug,
    saasName: group.saasName,
    intent: parsed.intent,
    content,
    eligibleTools,
    ramRangeMb: { min: Math.min(...rams), max: Math.max(...rams) },
  };
}

/**
 * Todas las páginas de intención que existen DE VERDAD hoy (contenido
 * curado + elegibilidad, no solo lo primero) — para generateStaticParams y
 * el sitemap. Igual que categoriesWithTools en sitemap.ts: solo entra lo
 * que ya se puede sostener con datos reales.
 */
export function getAllIntentPageSlugs(locale: Locale): string[] {
  const slugs: string[] = [];
  for (const key of Object.keys(contentFor(locale))) {
    const sep = key.indexOf("→");
    const saasName = key.slice(0, sep);
    const intent = key.slice(sep + 1) as IntentType;
    const candidateSlug = `${slugify(saasName)}-${INTENT_SLUG[intent]}`;
    if (getIntentPage(candidateSlug, locale)) slugs.push(candidateSlug);
  }
  return slugs;
}

/**
 * Las páginas de intención que existen para UN SaaS concreto — para el
 * enlazado "¿Buscas algo más concreto?" en /alternativas/[slug]. Nunca
 * enlaza a una combinación que no exista.
 */
export function getIntentPagesForSaas(saasName: string, locale: Locale): { intent: IntentType; href: string }[] {
  return INTENT_TYPES.filter((intent) => contentFor(locale)[`${saasName}→${intent}`] && getIntentPage(`${slugify(saasName)}-${INTENT_SLUG[intent]}`, locale)).map(
    (intent) => ({ intent, href: getIntentPageHref(saasName, intent, locale) })
  );
}
