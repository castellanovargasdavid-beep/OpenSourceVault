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
 * 'FOSS': 100% software libre, sin funciones detrás de un plan de pago.
 * 'OpenCore': el núcleo es open source, pero hay funciones avanzadas o
 * planes empresariales de pago (o una licencia que restringe el uso
 * comercial/reventa, como el fair-code de n8n).
 */
export type FossModel = "FOSS" | "OpenCore";

/** Plataformas con plantilla oficial de despliegue en 1 clic verificable por URL. */
export type DeployPlatform = "Railway" | "Coolify" | "Render" | "Elestio" | "Portainer";

/**
 * Nivel de dificultad/recursos de despliegue.
 * 'beginner': 1 contenedor, SQLite o sin base de datos separada, < 512 MB RAM.
 * 'intermediate': 1-2 contenedores (ej. App + Postgres/Redis), 1-2 GB RAM.
 * 'advanced': multi-contenedor, microservicios, brokers de colas, > 2 GB RAM.
 */
export type ToolDifficulty = "beginner" | "intermediate" | "advanced";

export interface OneClickDeployTarget {
  platform: DeployPlatform;
  /** URL de la plantilla/botón de despliegue oficial de esa plataforma para esta herramienta. */
  url: string;
}

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
  /** Plantillas de despliegue en 1 clic verificadas (Railway/Coolify/Render/Elestio/Portainer). */
  oneClickDeploy?: OneClickDeployTarget[];
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
  /** Motor de base de datos, ej. "PostgreSQL", "SQLite", "MySQL / MariaDB", "None / File-based". */
  database?: string;
  /** Lenguaje principal del backend/core, ej. "Rust", "Go", "TypeScript (Node.js)". */
  language?: string;
  /** Dónde corre/se usa, ej. ["Web", "Desktop (Mac/Win/Linux)", "Mobile (iOS/Android)"]. */
  platforms?: string[];
  /** Transparencia de licencia estilo Awesome-Selfhosted: ver FossModel. */
  fossModel?: FossModel;
  /**
   * Override explícito del nivel de dificultad/recursos. Si se omite, se
   * infiere de dockerCompose + database vía resolveToolResourceProfile() en
   * src/lib/tool-difficulty.ts — la mayoría de herramientas del catálogo no
   * necesitan fijar esto a mano.
   */
  difficulty?: ToolDifficulty;
  /** Override explícito de la RAM mínima recomendada, en MB. Ver difficulty. */
  minRamMb?: number;
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

/**
 * Proyección ligera de OpenSourceTool con solo los campos que una tarjeta de
 * listado (ToolCard) necesita para renderizarse — sin dockerCompose,
 * features, pros, cons, techStack, affiliateLinks, githubUrl, etc. Úsala en
 * cualquier vista de listado (portada, categorías, alternativas,
 * destacadas) para no cruzar esos campos pesados hacia el cliente en cada
 * tarjeta. Ver toToolCardData() en src/lib/tool-card-data.ts.
 */
export interface ToolCardData {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  websiteUrl: string;
  category: ToolCategory;
  replaces: string[];
  license: string;
  starsCount?: number;
  fossModel?: FossModel;
  tags: ToolTag[];
  sponsored?: boolean;
  status?: ToolStatus;
  publishDate?: string;
  /** Siempre resuelto en toToolCardData() — ver resolveToolResourceProfile(). */
  difficulty: ToolDifficulty;
  /** RAM mínima recomendada en MB. Ver difficulty. */
  minRamMb: number;
}

export type StackIcon =
  | "rocket"
  | "trending-up"
  | "users"
  | "hard-drive"
  | "shield-check"
  | "terminal"
  | "headset"
  | "shopping-cart";

/**
 * Pack temático de herramientas ya existentes en el catálogo, agrupadas por
 * caso de uso (ej. "el stack de un solopreneur para lanzar su web"). Ver
 * src/data/stacks.ts.
 */
export interface Stack {
  slug: string;
  title: string;
  description: string;
  /** Frase-gancho del ahorro frente al equivalente SaaS, ej. "Ahorra más de $120/mes...". */
  estimatedSavings: string;
  /** Etiqueta general del pack, ej. "Marketing", "DevOps", "Productividad". */
  categoryTag: string;
  /** ids de OpenSourceTool que componen el pack (deben existir y estar publicados). */
  tools: string[];
  icon: StackIcon;
  /** Clases Tailwind "from-x to-y" para el acento visual del pack. */
  gradient: string;
}

/** true si la ficha debe tener página propia, entrar en el sitemap y ser enlazable. */
export function isPublished(tool: Pick<OpenSourceTool, "status" | "publishDate">): boolean {
  if (!tool.status || tool.status === "published") return true;
  if (tool.status === "scheduled" && tool.publishDate) {
    return new Date(tool.publishDate).getTime() <= Date.now();
  }
  return false;
}
