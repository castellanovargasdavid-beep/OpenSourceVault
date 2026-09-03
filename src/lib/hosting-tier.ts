import { OS_OVERHEAD_MB } from "@/lib/hardware-profiles";
import type { HostingProvider, HostingTier } from "@/data/hosting-providers";

export type HostingCategory = "basic" | "pro" | "dedicated";

/**
 * 'basic': stack ligero, cabe en un plan de entrada.
 * 'pro': stack estándar en producción — necesita un plan medio para no
 * quedarse sin memoria bajo carga real.
 * 'dedicated': stack pesado — busca un plan grande o un servidor dedicado.
 * Mismos umbrales que las zonas verde/amarilla/roja de computeHardwareFit().
 */
export function classifyHostingCategory(totalMinRamMb: number): HostingCategory {
  const usedMb = totalMinRamMb + OS_OVERHEAD_MB;
  if (usedMb <= 1536) return "basic";
  if (usedMb <= 4096) return "pro";
  return "dedicated";
}

export interface HostingTierMatch {
  provider: HostingProvider;
  /** null = ninguno de los planes de este proveedor llega a la RAM que hace falta. */
  tier: HostingTier | null;
}

/** Para cada proveedor con escalera de planes, el más barato que cubre la RAM real del stack (+ margen de sistema operativo). */
export function matchHostingTiers(providers: HostingProvider[], totalMinRamMb: number): HostingTierMatch[] {
  const usedMb = totalMinRamMb + OS_OVERHEAD_MB;
  return providers
    .filter((provider): provider is HostingProvider & { tiers: HostingTier[] } => Boolean(provider.tiers?.length))
    .map((provider) => ({
      provider,
      tier: provider.tiers.find((tier) => tier.ramMb >= usedMb) ?? null,
    }));
}
