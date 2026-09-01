import type { ToolCategory } from "@/lib/types";
import { categoriesEn } from "./categories.en";

export interface CategoryMeta {
  id: ToolCategory;
  slug: string;
  label: string;
  description: string;
  icon:
    | "layout-grid"
    | "bar-chart-3"
    | "terminal"
    | "users"
    | "sparkles"
    | "database"
    | "shopping-cart"
    | "video"
    | "key-round"
    | "shield-check"
    | "cloud"
    | "activity"
    | "megaphone";
}

export const categories: CategoryMeta[] = [
  {
    id: "Productivity",
    slug: "productividad",
    label: "Productividad",
    description:
      "Notas, gestión de proyectos, calendarios y chat en equipo sin depender de un SaaS.",
    icon: "layout-grid",
  },
  {
    id: "Analytics",
    slug: "analitica",
    label: "Analítica Web",
    description:
      "Mide tu tráfico sin ceder los datos de tus usuarios a terceros.",
    icon: "bar-chart-3",
  },
  {
    id: "DevTools",
    slug: "devtools",
    label: "Herramientas Dev",
    description:
      "Backends, automatización y bases de datos para construir más rápido.",
    icon: "terminal",
  },
  {
    id: "CRM",
    slug: "crm",
    label: "CRM & Soporte",
    description: "Gestiona clientes, ventas y soporte sin cuotas por asiento.",
    icon: "users",
  },
  {
    id: "AI",
    slug: "ia",
    label: "Inteligencia Artificial",
    description: "Interfaces y herramientas de IA que puedes auto-hospedar.",
    icon: "sparkles",
  },
  {
    id: "Storage",
    slug: "almacenamiento",
    label: "Almacenamiento",
    description: "Guarda archivos y datos en tu propia infraestructura.",
    icon: "database",
  },
  {
    id: "Ecommerce",
    slug: "ecommerce",
    label: "E-commerce",
    description: "Monta tu tienda online sin comisiones por venta ni cuotas mensuales.",
    icon: "shopping-cart",
  },
  {
    id: "VideoConferencing",
    slug: "videoconferencia",
    label: "Videoconferencia",
    description: "Videollamadas y webinars sin límite de minutos ni participantes.",
    icon: "video",
  },
  {
    id: "PasswordManagers",
    slug: "gestores-de-contrasenas",
    label: "Gestores de Contraseñas",
    description: "Guarda las contraseñas de tu equipo bajo tu propia infraestructura.",
    icon: "key-round",
  },
  {
    id: "AuthIdentity",
    slug: "autenticacion-e-identidad",
    label: "Autenticación e Identidad",
    description: "Login único, SSO y gestión de identidad sin depender de Auth0 u Okta.",
    icon: "shield-check",
  },
  {
    id: "CloudPaas",
    slug: "despliegue-paas-hosting",
    label: "Despliegue, PaaS & Hosting",
    description: "Plataformas para desplegar tus propias apps sin depender de Vercel o Heroku.",
    icon: "cloud",
  },
  {
    id: "MonitoringLogs",
    slug: "monitoreo-logs-errores",
    label: "Monitoreo, Logs & Errores",
    description: "Rastrea errores, métricas y logs de producción sin pagar por asiento.",
    icon: "activity",
  },
  {
    id: "MarketingForms",
    slug: "marketing-formularios-email",
    label: "Marketing, Formularios & Emailing",
    description: "Encuestas, formularios, newsletters y enlaces cortos con tus propios datos.",
    icon: "megaphone",
  },
];

export function getCategoryMeta(id: ToolCategory): CategoryMeta {
  return categories.find((c) => c.id === id)!;
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryMetaLocalized(id: ToolCategory, locale: "es" | "en"): CategoryMeta {
  const meta = getCategoryMeta(id);
  if (locale === "en") {
    return { ...meta, ...categoriesEn[id] };
  }
  return meta;
}
