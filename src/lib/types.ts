export type ToolCategory =
  | "Productivity"
  | "Analytics"
  | "DevTools"
  | "CRM"
  | "AI"
  | "Storage"
  | "Ecommerce"
  | "VideoConferencing"
  | "PasswordManagers"
  | "AuthIdentity"
  | "CloudPaas"
  | "MonitoringLogs"
  | "MarketingForms";

export type ToolTag = "docker-ready" | "1-click-deploy" | "permissive-license";

/**
 * published: visible y enlazable con normalidad.
 * coming_soon: visible en catálogo/categoría con badge "Próximamente", sin
 * página propia (no genera /tool/[slug] ni entra en el sitemap).
 * scheduled: igual que coming_soon hasta que `publishDate` llega — en un
 * sitio estático, "llegar" significa "en el próximo build tras esa fecha",
 * no en tiempo real (no hay ISR en estas páginas).
 */
export type ToolStatus = "published" | "coming_soon" | "scheduled";

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
  /** URL de una demo pública oficial (sin necesidad de instalar ni crear cuenta), si existe */
  demoUrl?: string;
  starsCount?: number;
  license: string;
  dockerCompose: string;
  /** URL de despliegue en 1 clic (plantilla de Railway/Coolify/etc.), si el proyecto ofrece una. */
  deployUrl?: string;
  affiliateLinks: {
    digitalOceanUrl: string;
    vultrUrl: string;
    railwayUrl: string;
  };
  features: string[];
  techStack: string[];
  pros: string[];
  cons: string[];
  tags: ToolTag[];
  featured?: boolean;
  /**
   * Marca un listado como patrocinado (listing pagado por el propio
   * proyecto open-core). Ningún valor actual lo usa todavía — queda listo
   * para activarlo cuando haya un acuerdo real con un sponsor.
   */
  sponsored?: boolean;
  /** Ausente = "published" (todas las 121 herramientas originales). */
  status?: ToolStatus;
  /** ISO 8601. Solo relevante cuando status === "scheduled". */
  publishDate?: string;
}

/** true si la ficha debe tener página propia, entrar en el sitemap y ser enlazable. */
export function isPublished(tool: Pick<OpenSourceTool, "status" | "publishDate">): boolean {
  if (!tool.status || tool.status === "published") return true;
  if (tool.status === "scheduled" && tool.publishDate) {
    return new Date(tool.publishDate).getTime() <= Date.now();
  }
  return false;
}
