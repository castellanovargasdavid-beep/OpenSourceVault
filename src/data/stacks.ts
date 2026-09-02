import type { Stack } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { stacksEn } from "./stacks.en";

/**
 * Packs temáticos curados a partir del catálogo existente, orientados a un
 * caso de uso concreto (ver /stacks). Cada `tools` referencia ids de
 * OpenSourceTool que ya existen y están publicados — nunca herramientas
 * "coming_soon", para que ninguna tarjeta del pack quede rota o sin ficha.
 */
export const stacks: Stack[] = [
  {
    slug: "solopreneur-web-launch",
    title: "El Stack para Solopreneurs y Lanzamiento Web",
    description:
      "Todo lo que necesita una persona sola para lanzar su web, publicar contenido, medir visitas, recoger feedback de clientes y facturar — sin pagar una suscripción SaaS distinta por cada pieza. Ideal para founders solo, freelancers y creadores lanzando su primer producto.",
    estimatedSavings: "Ahorra más de $120/mes frente a Typeform + Ghost Pro + Google Analytics",
    categoryTag: "Productividad",
    tools: ["strapi", "umami", "plausible", "typebot", "invoice-ninja"],
    icon: "rocket",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    slug: "growth-marketing-automation",
    title: "El Stack de Marketing y Automatización de Crecimiento",
    description:
      "Newsletter sin límite de contactos, automatización de flujos de trabajo, enlaces cortos con analíticas propias y una bandeja de soporte omnicanal — el motor de growth marketing de un equipo, auto-hospedado y sin cuotas por contacto ni por asiento.",
    estimatedSavings: "Mailchimp cobra por contactos; Listmonk envía sin límites por el coste de tu VPS",
    categoryTag: "Marketing",
    tools: ["listmonk", "n8n", "activepieces", "shlink", "chatwoot"],
    icon: "trending-up",
    gradient: "from-pink-500 to-fuchsia-600",
  },
  {
    slug: "startup-ops-team",
    title: "El Stack de Operaciones para Equipos Async",
    description:
      "Chat de equipo, gestión de proyectos, documentación interna y un gestor de contraseñas compartido — la base operativa de una startup remota, sin pagar por asiento en Slack, Notion o Jira.",
    estimatedSavings: "Elimina el coste de $8-$15 por usuario/mes en Slack y Notion",
    categoryTag: "Operaciones de equipo",
    tools: ["mattermost", "zulip", "plane", "vikunja", "outline", "appflowy", "vaultwarden"],
    icon: "users",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    slug: "homelab-media-cloud",
    title: "El Stack de Media y Nube Personal para HomeLab",
    description:
      "Tus fotos, tus archivos, tu streaming de video y tus artículos guardados — todo en tu propio servidor, sin depender de Google Photos, Dropbox o Netflix para tu propia colección de medios.",
    estimatedSavings: "Soberanía digital para tus fotos, streaming y archivos",
    categoryTag: "Autoalojamiento",
    tools: ["immich", "nextcloud", "jellyfin", "linkwarden", "wallabag"],
    icon: "hard-drive",
    gradient: "from-teal-500 to-emerald-600",
  },
  {
    slug: "privacy-personal-security",
    title: "El Stack de Privacidad y Seguridad Personal",
    description:
      "Contraseñas, red privada, DNS con bloqueo de anuncios y notas cifradas — el kit de seguridad personal para tomar control de tus credenciales, tu tráfico de red y tu navegación.",
    estimatedSavings: "Control total sobre tus credenciales, DNS y navegación cifrada",
    categoryTag: "Seguridad",
    tools: ["vaultwarden", "headscale", "wg-easy", "pihole", "adguard-home", "joplin"],
    icon: "shield-check",
    gradient: "from-sky-500 to-blue-700",
  },
  {
    slug: "modern-devops",
    title: "El Stack Moderno para Developers y DevOps en Solitario",
    description:
      "Aloja tu propio código, monitoriza la disponibilidad de tus servicios y despliega tus propias apps con un flujo tipo Heroku — infraestructura completa de CI/CD y PaaS auto-gestionado sin las cuotas mensuales de un proveedor cloud.",
    estimatedSavings: "Infraestructura CI/CD y despliegue PaaS autónomo sin costes de Heroku",
    categoryTag: "DevOps",
    tools: ["gitea", "uptime-kuma", "dokploy", "portainer"],
    icon: "terminal",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    slug: "customer-support-community",
    title: "El Stack de Soporte al Cliente y Comunidad",
    description:
      "Bandeja de tickets de soporte, foro de comunidad y monitorización de disponibilidad — todo lo que necesitas para atender clientes y construir comunidad sin pagar por agente ni por asiento.",
    estimatedSavings: "Mesa de ayuda y comunidad sin licencias por agente",
    categoryTag: "Soporte",
    tools: ["freescout", "zammad", "discourse", "uptime-kuma"],
    icon: "headset",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    slug: "ecommerce-micro-business",
    title: "El Stack de E-commerce y Micro-negocio",
    description:
      "Tienda online headless, gestión empresarial (ERP) y firma de contratos digital — monta y gestiona tu negocio sin comisiones porcentuales por venta ni licencias de ERP propietario.",
    estimatedSavings: "Ventas, ERP y firma de contratos sin comisiones porcentuales de plataforma",
    categoryTag: "E-commerce",
    tools: ["medusa", "erpnext", "dolibarr", "documenso"],
    icon: "shopping-cart",
    gradient: "from-orange-500 to-red-500",
  },
];

export function getStackBySlug(slug: string): Stack | undefined {
  return stacks.find((s) => s.slug === slug);
}

/** Packs en los que aparece una herramienta dada, para el cross-link "Featured in X" en su ficha. */
export function getStacksForTool(toolId: string): Stack[] {
  return stacks.filter((s) => s.tools.includes(toolId));
}

export function getLocalizedStack(stack: Stack, locale: Locale): Stack {
  if (locale !== "en") return stack;
  const translation = stacksEn[stack.slug];
  if (!translation) return stack;
  return { ...stack, ...translation };
}
