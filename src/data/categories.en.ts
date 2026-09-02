import type { ToolCategory } from "@/lib/types";

export interface CategoryTranslation {
  label: string;
  description: string;
  /** Slug used for the English category URL, e.g. /en/categories/{slug}. */
  slug: string;
}

export const categoriesEn: Record<ToolCategory, CategoryTranslation> = {
  Productivity: {
    label: "Productivity",
    description: "Notes, project management, calendars and team chat without relying on a SaaS.",
    slug: "productivity",
  },
  Analytics: {
    label: "Web Analytics",
    description: "Measure your traffic without handing your users' data to third parties.",
    slug: "analytics",
  },
  DevTools: {
    label: "Dev Tools",
    description: "Backends, automation and databases to build faster.",
    slug: "dev-tools",
  },
  CRM: {
    label: "CRM & Support",
    description: "Manage customers, sales and support without per-seat fees.",
    slug: "crm",
  },
  AI: {
    label: "Artificial Intelligence",
    description: "AI interfaces and tools you can self-host.",
    slug: "ai",
  },
  Storage: {
    label: "Storage",
    description: "Store files and data on your own infrastructure.",
    slug: "storage",
  },
  Ecommerce: {
    label: "E-commerce",
    description: "Run your online store with no per-sale commissions or monthly fees.",
    slug: "ecommerce",
  },
  VideoConferencing: {
    label: "Video Conferencing",
    description: "Video calls and webinars with no minute or participant limits.",
    slug: "video-conferencing",
  },
  PasswordManagers: {
    label: "Password Managers",
    description: "Keep your team's passwords on your own infrastructure.",
    slug: "password-managers",
  },
  AuthIdentity: {
    label: "Auth & Identity",
    description: "Single sign-on, SSO and identity management without relying on Auth0 or Okta.",
    slug: "auth-identity",
  },
  CloudPaas: {
    label: "Deployment, PaaS & Hosting",
    description: "Platforms to deploy your own apps without relying on Vercel or Heroku.",
    slug: "deployment-paas-hosting",
  },
  MonitoringLogs: {
    label: "Monitoring, Logs & Errors",
    description: "Track errors, metrics and production logs without paying per seat.",
    slug: "monitoring-logs-errors",
  },
  MarketingForms: {
    label: "Marketing, Forms & Emailing",
    description: "Surveys, forms, newsletters and short links with your own data.",
    slug: "marketing-forms-email",
  },
};
