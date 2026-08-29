export interface HostingProviderTranslation {
  tagline: string;
  startingPrice: string;
  freeCredit?: string;
  bestFor: string;
  features: string[];
  ctaLabel: string;
}

export const hostingProvidersEn: Record<string, HostingProviderTranslation> = {
  digitalocean: {
    tagline: "Simple, predictable VPS with the best documentation in the market",
    startingPrice: "from $4/mo",
    freeCredit: "$200 in free credit for 60 days",
    bestFor: "Getting started fast with Droplets and App Platform",
    features: [
      "Droplets (VPS) from 512MB RAM",
      "Marketplace with 1-Click Apps for Docker",
      "Managed Databases and Kubernetes",
      "Very simple dashboard and CLI",
    ],
    ctaLabel: "Get $200 in free credit",
  },
  hetzner: {
    tagline: "The best price/performance ratio in European cloud servers",
    startingPrice: "from €3.79/mo",
    bestFor: "Maximum performance per euro, EU datacenters",
    features: [
      "Very affordable dedicated and shared vCPUs",
      "Private network and load balancers included",
      "Automatic snapshots and backups",
      "Datacenters in Germany, Finland and the US",
    ],
    ctaLabel: "Deploy on Hetzner",
  },
  railway: {
    tagline: "Deploy straight from your docker-compose or GitHub repo in minutes",
    startingPrice: "Hobby plan from $5/mo",
    bestFor: "Deploying without managing servers or Docker manually",
    features: [
      "Automatic deploys from GitHub",
      "Supports Dockerfile and docker-compose",
      "One-click managed databases",
      "Automatic scaling and PR previews",
    ],
    ctaLabel: "Deploy on Railway",
  },
};
