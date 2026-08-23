import type { ToolCategory } from "@/lib/types";

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
    | "database";
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
];

export function getCategoryMeta(id: ToolCategory): CategoryMeta {
  return categories.find((c) => c.id === id)!;
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
