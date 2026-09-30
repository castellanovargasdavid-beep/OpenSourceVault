import { affiliateLinks } from "@/lib/site-config";
import { hostingProvidersEn } from "./hosting-providers.en";

export interface HostingTier {
  ramMb: number;
  vcpu: number;
  /** Precio mensual aproximado en USD de este plan concreto — lista pública, orientativo. */
  monthlyUsdApprox: number;
}

export interface HostingProvider {
  id: string;
  name: string;
  logo: "digitalocean" | "vultr" | "railway";
  domain: string;
  tagline: string;
  startingPrice: string;
  /** Precio mensual aproximado en USD del plan de entrada — solo para la calculadora de ahorro de un único servidor pequeño. */
  monthlyUsdApprox: number;
  freeCredit?: string;
  bestFor: string;
  features: string[];
  affiliateUrl: string;
  ctaLabel: string;
  /**
   * Fecha (YYYY-MM-DD) en la que se verificó manualmente que `freeCredit` y
   * `startingPrice` siguen coincidiendo con la oferta pública real del
   * proveedor (no solo con lo que dice nuestra propia copia). Ausente si no
   * se ha podido verificar contra una fuente primaria en la última revisión.
   * Ver auditoría 2026-09: la oferta de DigitalOcean pasó de "$200/60 días"
   * a "$5/90 días" sin que esta página se actualizara — este campo existe
   * para que ese tipo de desfase sea visible y revisable periódicamente.
   */
  lastVerified?: string;
  /**
   * Escalera de planes reales por RAM, para recomendar el tamaño de VPS
   * exacto que necesita un stack concreto (ver src/lib/hosting-tier.ts).
   * Ordenada de menor a mayor. Ausente en proveedores cuyo precio no depende
   * de un tamaño de servidor fijo (ej. Railway, que cobra por uso).
   */
  tiers?: HostingTier[];
}

export const hostingProviders: HostingProvider[] = [
  {
    id: "digitalocean",
    name: "DigitalOcean",
    logo: "digitalocean",
    domain: "digitalocean.com",
    tagline: "VPS simples y predecibles, con documentación técnica extensa",
    startingPrice: "desde $4/mes",
    monthlyUsdApprox: 4,
    freeCredit: "$5 de crédito gratis por 90 días",
    bestFor: "Empezar rápido con Droplets y App Platform",
    features: [
      "Droplets (VPS) desde 512MB RAM",
      "Marketplace con 1-Click Apps para Docker",
      "Managed Databases y Kubernetes",
      "Panel y CLI muy simples",
    ],
    affiliateUrl: affiliateLinks.digitalOceanUrl,
    ctaLabel: "Obtener $5 de crédito gratis",
    lastVerified: "2026-09-30",
    tiers: [
      { ramMb: 512, vcpu: 1, monthlyUsdApprox: 4 },
      { ramMb: 1024, vcpu: 1, monthlyUsdApprox: 6 },
      { ramMb: 2048, vcpu: 1, monthlyUsdApprox: 12 },
      { ramMb: 4096, vcpu: 2, monthlyUsdApprox: 24 },
      { ramMb: 8192, vcpu: 4, monthlyUsdApprox: 48 },
    ],
  },
  {
    id: "vultr",
    name: "Vultr",
    logo: "vultr",
    domain: "vultr.com",
    tagline: "Servidores cloud de alto rendimiento en 32 datacenters por todo el mundo",
    startingPrice: "desde $6/mes",
    monthlyUsdApprox: 6,
    bestFor: "Elegir la región más cercana a tus usuarios, con precios predecibles",
    features: [
      "Cloud Compute desde 1 vCPU / 1GB RAM",
      "Marketplace con 1-Click Apps para Docker",
      "Bloques de almacenamiento y balanceadores de carga",
      "32 datacenters en 6 continentes",
    ],
    affiliateUrl: affiliateLinks.vultrUrl,
    ctaLabel: "Desplegar en Vultr",
    tiers: [
      { ramMb: 1024, vcpu: 1, monthlyUsdApprox: 6 },
      { ramMb: 2048, vcpu: 1, monthlyUsdApprox: 12 },
      { ramMb: 4096, vcpu: 2, monthlyUsdApprox: 24 },
      { ramMb: 8192, vcpu: 4, monthlyUsdApprox: 48 },
    ],
  },
  {
    id: "railway",
    name: "Railway",
    logo: "railway",
    domain: "railway.app",
    tagline: "Despliega directo desde tu docker-compose o repo de GitHub en minutos",
    startingPrice: "plan Hobby desde $5/mes",
    monthlyUsdApprox: 5,
    bestFor: "Desplegar sin gestionar servidores ni Docker manualmente",
    features: [
      "Deploy automático desde GitHub",
      "Soporta Dockerfile y docker-compose",
      "Bases de datos gestionadas con un clic",
      "Escalado automático y previews por PR",
    ],
    affiliateUrl: affiliateLinks.railwayUrl,
    ctaLabel: "Desplegar en Railway",
    lastVerified: "2026-09-30",
  },
];

export function getHostingProvidersLocalized(locale: "es" | "en"): HostingProvider[] {
  if (locale === "en") {
    return hostingProviders.map((p) => ({ ...p, ...hostingProvidersEn[p.id] }));
  }
  return hostingProviders;
}
