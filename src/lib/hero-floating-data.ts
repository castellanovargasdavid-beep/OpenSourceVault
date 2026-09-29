import type { ToolCardData, FossModel } from "@/lib/types";
import { getSaasPricing } from "@/data/saas-pricing";
import { getSaasDomain } from "@/lib/saas-domains";
import { getHostname } from "@/lib/utils";

/**
 * Selección determinista (no random) de herramientas reales para el hero
 * flotante de la portada — mismo criterio que `showcaseSaas` en hero.tsx:
 * una lista fija de ids ya verificados en el catálogo (licencia conocida,
 * docker-compose real, relación `replaces` clara), no un algoritmo. Si algún
 * id deja de existir en el catálogo publicado, se filtra solo — nunca se
 * rellena con un dato inventado.
 *
 * Cada sub-array es un "slot" de tarjeta flotante: un solo id = tarjeta
 * estática, varios ids = la tarjeta rota lentamente entre esos pares reales
 * (ver FloatingToolCard). Los 4 slots cubren 4 categorías distintas del
 * catálogo (Productivity, Analytics, CloudPaas, PasswordManagers).
 */
const FLOATING_SLOT_IDS: readonly (readonly string[])[] = [
  ["appflowy", "plausible"],
  ["mattermost"],
  ["coolify"],
  ["vaultwarden"],
];

/**
 * Combo real para la tarjeta de "stack de ejemplo": las mismas herramientas
 * que ya aparecen en los slots de arriba (menos Coolify, que es una
 * plataforma PaaS con su propio instalador, no un servicio para componer
 * junto a otros vía docker-compose) más n8n, para mostrar un stack de 5
 * piezas realmente desplegable junto.
 */
const STACK_PREVIEW_IDS: readonly string[] = ["appflowy", "mattermost", "plausible", "vaultwarden", "n8n"];

export interface FloatingPair {
  toolId: string;
  toolName: string;
  toolSlug: string;
  toolDomain?: string;
  saasName: string;
  saasDomain?: string;
  fossModel?: FossModel;
  minRamMb: number;
  isEstimated: boolean;
  dockerReady: boolean;
}

export interface FloatingSlot {
  /** 1 elemento = tarjeta estática. 2+ = rota lentamente entre ellos. */
  pairs: FloatingPair[];
}

export interface StackPreview {
  toolCount: number;
  totalMinRamMb: number;
  isRamEstimated: boolean;
  dockerReady: boolean;
  savingsMonthlyUsd: number;
  savingsMatchedCount: number;
  toolSlugs: string[];
}

export interface HeroFloatingData {
  slots: FloatingSlot[];
  stack: StackPreview | null;
}

function toFloatingPair(tool: ToolCardData): FloatingPair {
  const saasName = tool.replaces[0] ?? tool.name;
  return {
    toolId: tool.id,
    toolName: tool.name,
    toolSlug: tool.slug,
    toolDomain: getHostname(tool.websiteUrl),
    saasName,
    saasDomain: getSaasDomain(saasName),
    fossModel: tool.fossModel,
    minRamMb: tool.minRamMb,
    isEstimated: tool.isEstimated,
    dockerReady: tool.tags.includes("docker-ready"),
  };
}

/**
 * Deriva los datos del hero flotante a partir del catálogo ya cargado por la
 * página (los mismos `ToolCardData[]` publicados que recibe <Hero>, sin
 * volver a tocar `tools.ts`/dockerCompose). Determinista: mismo input,
 * mismo output siempre — sin Math.random ni Date.now(), para no romper la
 * hidratación entre el render de servidor y el de cliente.
 */
export function getHeroFloatingData(tools: ToolCardData[]): HeroFloatingData {
  const byId = new Map(tools.map((tool) => [tool.id, tool]));

  const slots: FloatingSlot[] = FLOATING_SLOT_IDS.map((ids) => ({
    pairs: ids
      .map((id) => byId.get(id))
      .filter((tool): tool is ToolCardData => tool !== undefined)
      .map(toFloatingPair),
  })).filter((slot) => slot.pairs.length > 0);

  const stackTools = STACK_PREVIEW_IDS.map((id) => byId.get(id)).filter((tool): tool is ToolCardData => tool !== undefined);

  if (stackTools.length === 0) {
    return { slots, stack: null };
  }

  let savingsMonthlyUsd = 0;
  let savingsMatchedCount = 0;
  for (const tool of stackTools) {
    const pricing = getSaasPricing(tool.replaces[0] ?? "");
    if (pricing) {
      savingsMonthlyUsd += pricing.pricePerSeatUsd;
      savingsMatchedCount++;
    }
  }

  return {
    slots,
    stack: {
      toolCount: stackTools.length,
      totalMinRamMb: stackTools.reduce((sum, tool) => sum + tool.minRamMb, 0),
      isRamEstimated: stackTools.some((tool) => tool.isEstimated),
      dockerReady: stackTools.every((tool) => tool.tags.includes("docker-ready")),
      savingsMonthlyUsd,
      savingsMatchedCount,
      toolSlugs: stackTools.map((tool) => tool.slug),
    },
  };
}
