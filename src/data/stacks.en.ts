/**
 * English overrides for each stack's narrative fields. `tools`, `icon` and
 * `gradient` are language-neutral and live only in stacks.ts. Missing keys
 * fall back to the Spanish text via getLocalizedStack().
 */
export interface StackTranslation {
  title: string;
  description: string;
  estimatedSavings: string;
  categoryTag: string;
}

export const stacksEn: Record<string, StackTranslation> = {
  "solopreneur-web-launch": {
    title: "The Solopreneur & Web Launch Stack",
    description:
      "Everything a one-person team needs to launch a website, publish content, measure traffic, collect customer feedback and get paid — without a separate SaaS subscription for every piece. Ideal for solo founders, freelancers and creators launching their first product.",
    estimatedSavings: "Save over $120/mo versus Typeform + Ghost Pro + Google Analytics",
    categoryTag: "Productivity",
  },
  "growth-marketing-automation": {
    title: "The Growth Marketing & Automation Stack",
    description:
      "Newsletters with no contact limit, workflow automation, short links with your own analytics and an omnichannel support inbox — a team's growth marketing engine, self-hosted with no per-contact or per-seat fees.",
    estimatedSavings: "Mailchimp charges by contact; Listmonk sends unlimited for the cost of your VPS",
    categoryTag: "Marketing",
  },
  "startup-ops-team": {
    title: "The Startup Ops & Async Team Stack",
    description:
      "Team chat, project management, internal docs and a shared password manager — the operational backbone of a remote startup, without paying per seat for Slack, Notion or Jira.",
    estimatedSavings: "Eliminates the $8-$15 per user/month cost of Slack and Notion",
    categoryTag: "Team Ops",
  },
  "homelab-media-cloud": {
    title: "The HomeLab Media & Personal Cloud Stack",
    description:
      "Your photos, your files, your video streaming and your saved articles — all on your own server, without relying on Google Photos, Dropbox or Netflix for your own media collection.",
    estimatedSavings: "Digital sovereignty for your photos, streaming and files",
    categoryTag: "Self-Hosting",
  },
  "privacy-personal-security": {
    title: "The Privacy & Personal Security Stack",
    description:
      "Passwords, a private network, ad-blocking DNS and encrypted notes — the personal security kit to take control of your credentials, your network traffic and your browsing.",
    estimatedSavings: "Full control over your credentials, DNS and encrypted browsing",
    categoryTag: "Security",
  },
  "modern-devops": {
    title: "The Modern Developer & Solo DevOps Stack",
    description:
      "Host your own code, monitor the uptime of your services and deploy your own apps with a Heroku-like workflow — full CI/CD and self-managed PaaS infrastructure without the monthly fees of a cloud provider.",
    estimatedSavings: "CI/CD infrastructure and self-managed PaaS deployment without Heroku's costs",
    categoryTag: "DevOps",
  },
  "customer-support-community": {
    title: "The Customer Support & Community Stack",
    description:
      "A support ticket inbox, a community forum and uptime monitoring — everything you need to support customers and build community without paying per agent or per seat.",
    estimatedSavings: "Help desk and community with no per-agent licenses",
    categoryTag: "Support",
  },
  "ecommerce-micro-business": {
    title: "The E-Commerce & Micro-Business Stack",
    description:
      "A headless online store, business management (ERP) and digital contract signing — run your business without percentage fees per sale or proprietary ERP licenses.",
    estimatedSavings: "Sales, ERP and contract signing with no percentage platform fees",
    categoryTag: "E-commerce",
  },
};
