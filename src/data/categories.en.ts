import type { ToolCategory } from "@/lib/types";

export interface CategoryTranslation {
  label: string;
  description: string;
}

export const categoriesEn: Record<ToolCategory, CategoryTranslation> = {
  Productivity: {
    label: "Productivity",
    description: "Notes, project management, calendars and team chat without relying on a SaaS.",
  },
  Analytics: {
    label: "Web Analytics",
    description: "Measure your traffic without handing your users' data to third parties.",
  },
  DevTools: {
    label: "Dev Tools",
    description: "Backends, automation and databases to build faster.",
  },
  CRM: {
    label: "CRM & Support",
    description: "Manage customers, sales and support without per-seat fees.",
  },
  AI: {
    label: "Artificial Intelligence",
    description: "AI interfaces and tools you can self-host.",
  },
  Storage: {
    label: "Storage",
    description: "Store files and data on your own infrastructure.",
  },
  Ecommerce: {
    label: "E-commerce",
    description: "Run your online store with no per-sale commissions or monthly fees.",
  },
  VideoConferencing: {
    label: "Video Conferencing",
    description: "Video calls and webinars with no minute or participant limits.",
  },
  PasswordManagers: {
    label: "Password Managers",
    description: "Keep your team's passwords on your own infrastructure.",
  },
  AuthIdentity: {
    label: "Auth & Identity",
    description: "Single sign-on, SSO and identity management without relying on Auth0 or Okta.",
  },
  CloudPaas: {
    label: "Deployment, PaaS & Hosting",
    description: "Platforms to deploy your own apps without relying on Vercel or Heroku.",
  },
  MonitoringLogs: {
    label: "Monitoring, Logs & Errors",
    description: "Track errors, metrics and production logs without paying per seat.",
  },
  MarketingForms: {
    label: "Marketing, Forms & Emailing",
    description: "Surveys, forms, newsletters and short links with your own data.",
  },
};
