import { affiliateLinks } from "@/lib/site-config";

export interface HostingProvider {
  id: string;
  name: string;
  logo: "digitalocean" | "hetzner" | "railway";
  domain: string;
  tagline: string;
  startingPrice: string;
  /** Precio mensual aproximado en USD, solo para la calculadora de ahorro */
  monthlyUsdApprox: number;
  freeCredit?: string;
  bestFor: string;
  features: string[];
  affiliateUrl: string;
  ctaLabel: string;
}

export const hostingProviders: HostingProvider[] = [
  {
    id: "digitalocean",
    name: "DigitalOcean",
    logo: "digitalocean",
    domain: "digitalocean.com",
    tagline: "VPS simples y predecibles con la mejor documentación del mercado",
    startingPrice: "desde $4/mes",
    monthlyUsdApprox: 4,
    freeCredit: "$200 de crédito gratis por 60 días",
    bestFor: "Empezar rápido con Droplets y App Platform",
    features: [
      "Droplets (VPS) desde 512MB RAM",
      "Marketplace con 1-Click Apps para Docker",
      "Managed Databases y Kubernetes",
      "Panel y CLI muy simples",
    ],
    affiliateUrl: affiliateLinks.digitalOceanUrl,
    ctaLabel: "Obtener $200 de crédito gratis",
  },
  {
    id: "hetzner",
    name: "Hetzner Cloud",
    logo: "hetzner",
    domain: "hetzner.com",
    tagline: "La mejor relación precio/rendimiento en servidores cloud europeos",
    startingPrice: "desde €3.79/mes",
    monthlyUsdApprox: 4.1,
    bestFor: "Máximo rendimiento por euro, datacenters en la UE",
    features: [
      "vCPUs dedicadas y compartidas muy económicas",
      "Red privada y balanceadores de carga incluidos",
      "Snapshots y backups automáticos",
      "Datacenters en Alemania, Finlandia y EE.UU.",
    ],
    affiliateUrl: affiliateLinks.hetznerUrl,
    ctaLabel: "Desplegar en Hetzner",
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
  },
];
