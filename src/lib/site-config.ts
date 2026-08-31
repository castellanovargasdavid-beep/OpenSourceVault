export const siteConfig = {
  name: "AltFreeStack",
  tagline: "Las mejores alternativas Open Source al software que ya usas",
  description:
    "Descubre alternativas de código abierto y auto-hospedables al software SaaS más popular. Compara licencias, mira el docker-compose y despliega en minutos.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://altfreestack.com",
  year: 2026,
  links: {
    github: "https://github.com/castellanovargasdavid-beep/OpenSourceVault",
  },
};

/**
 * Enlaces de afiliado globales para hosting. Se leen de variables de entorno
 * públicas y caen a "#" si no están definidas, para que el build nunca falle
 * por falta de configuración en Vercel.
 */
export const affiliateLinks = {
  digitalOceanUrl: process.env.NEXT_PUBLIC_AFFILIATE_DIGITALOCEAN || "https://m.do.co/c/9f6e4c18c93c",
  vultrUrl: process.env.NEXT_PUBLIC_AFFILIATE_VULTR || "https://www.vultr.com/?ref=9920581",
  railwayUrl: process.env.NEXT_PUBLIC_AFFILIATE_RAILWAY || "https://railway.com?referralCode=jwbw2U",
};
