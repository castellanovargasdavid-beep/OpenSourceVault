export type ToolCategory =
  | "Productivity"
  | "Analytics"
  | "DevTools"
  | "CRM"
  | "AI"
  | "Storage"
  | "Ecommerce"
  | "VideoConferencing"
  | "PasswordManagers";

export type ToolTag = "docker-ready" | "1-click-deploy" | "permissive-license";

export interface OpenSourceTool {
  id: string;
  name: string;
  slug: string;
  /** Herramientas SaaS a las que sustituye, ej: ['Notion', 'Slite'] */
  replaces: string[];
  category: ToolCategory;
  description: string;
  shortDescription: string;
  websiteUrl: string;
  githubUrl: string;
  starsCount?: number;
  license: string;
  dockerCompose: string;
  affiliateLinks: {
    digitalOceanUrl: string;
    hetznerUrl: string;
    railwayUrl: string;
  };
  features: string[];
  techStack: string[];
  pros: string[];
  cons: string[];
  tags: ToolTag[];
  featured?: boolean;
}
