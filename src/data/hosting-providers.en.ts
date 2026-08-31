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
  vultr: {
    tagline: "High-performance cloud servers across 32 datacenters worldwide",
    startingPrice: "from $6/mo",
    bestFor: "Picking the region closest to your users, with predictable pricing",
    features: [
      "Cloud Compute from 1 vCPU / 1GB RAM",
      "Marketplace with 1-Click Apps for Docker",
      "Block storage and load balancers",
      "32 datacenters across 6 continents",
    ],
    ctaLabel: "Deploy on Vultr",
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
