import type { Locale } from "@/i18n/config";
import { toolSeoEn } from "./tool-seo.en";

export interface ToolSeoFaqEntry {
  q: string;
  a: string;
}

export interface ToolSeoOverride {
  /** Reemplaza el title plantilla (`t.toolPage.metaTitle`) solo para esta ficha. */
  metaTitle?: string;
  /** Reemplaza `tool.shortDescription` como meta description solo para esta ficha. */
  metaDescription?: string;
  /** FAQ real y específica de la ficha, mostrada con schema FAQPage cuando existe. */
  faqs?: ToolSeoFaqEntry[];
}

/**
 * Overrides SEO quirúrgicos para las fichas de herramienta con señal real en
 * Search Console (ver SEO_CHANGELOG.md) — el resto de las ~196 fichas sigue
 * usando el title/description genérico de `t.toolPage` sin cambios. Mismo
 * patrón "mapa opcional con fallback" que category-faqs.ts / tools.en.ts.
 * Clave: `OpenSourceTool.id` (no el slug, para evitar colisión si algún día
 * cambia el slug).
 */
export const toolSeo: Partial<Record<string, ToolSeoOverride>> = {
  vikunja: {
    metaTitle: "Vikunja: gestor de tareas open source con 4 vistas (2026)",
    metaDescription:
      "Qué es Vikunja, el gestor de tareas open source que sustituye a Todoist y Asana: vistas Lista, Kanban, Gantt y Tabla, licencia AGPL-3.0 y despliegue con Docker en minutos.",
    faqs: [
      {
        q: "¿Qué es Vikunja?",
        a: "Un gestor de tareas y proyectos open source (licencia AGPL-3.0) escrito en Go, pensado como alternativa ligera a Todoist y Asana para equipos pequeños. Corre bien incluso con SQLite, sin necesitar una base de datos separada.",
      },
      {
        q: "¿Qué vistas ofrece Vikunja?",
        a: "Cuatro: Lista, Kanban, Gantt y Tabla. Puedes cambiar entre ellas según la tarea — Tabla para comparar muchos campos a la vez, Kanban para flujos de trabajo, Gantt para planificar por fechas.",
      },
      {
        q: "¿Vikunja es gratis del todo o tiene funciones de pago?",
        a: "Es Open-Core: el núcleo autohospedado es AGPL-3.0 real y gratuito. Vikunja Cloud (el SaaS oficial) es la versión de pago, pero no es necesaria para usarlo en tu propio servidor.",
      },
    ],
  },
  typesense: {
    metaTitle: "Typesense: motor de búsqueda open source, alternativa a Algolia (2026)",
    metaDescription:
      "Typesense es un motor de búsqueda open source en C++ con búsqueda federada y geosearch, sin coste por request como Algolia. Imagen Docker oficial y guía de despliegue.",
    faqs: [
      {
        q: "¿Qué es Typesense?",
        a: "Un motor de búsqueda open source (licencia GPL-3.0) escrito en C++, centrado en simplicidad y velocidad, con búsqueda federada, geosearch y filtros facetados — pensado como alternativa directa a Algolia sin coste por request.",
      },
      {
        q: "¿Cómo se despliega Typesense con Docker?",
        a: "Con una sola imagen oficial (`typesense/typesense`) y un volumen para los datos — no necesita una base de datos externa. El docker-compose de esta ficha incluye la configuración mínima con la API key y el directorio de datos.",
      },
      {
        q: "¿Typesense es igual de maduro que Algolia o Meilisearch?",
        a: "Su documentación y experiencia de desarrollador están muy cuidadas, aunque su comunidad es algo más pequeña que la de Meilisearch — para la mayoría de casos de búsqueda en catálogos o sitios de contenido, cubre lo mismo que Algolia sin el coste por request.",
      },
    ],
  },
  vendure: {
    metaTitle: "Vendure: framework e-commerce headless en TypeScript (código abierto)",
    metaDescription:
      "Vendure es un framework de e-commerce headless en TypeScript con plugins y API GraphQL, licencia GPL-3.0 (Open-Core). Qué incluye, cómo desplegarlo y alternativa a Shopify.",
    faqs: [
      {
        q: "¿Vendure es open source?",
        a: "Sí, el núcleo es GPL-3.0 (Open-Core) — desde la v3.0 cambió de MIT a GPLv3, con un plan comercial (VCL) opcional solo para quien necesite términos distintos a GPL. Para auto-hospedarlo no necesitas ninguna licencia de pago.",
      },
      {
        q: "¿Vendure tiene una imagen Docker oficial?",
        a: "No. Vendure no publica una imagen Docker lista para usar — la vía documentada por el propio proyecto es generar tu código con @vendure/create y construir tu propio Dockerfile siguiendo su guía oficial de despliegue.",
      },
      {
        q: "¿Para quién es Vendure, comparado con Shopify?",
        a: "Para equipos con capacidad de desarrollo que quieren controlar cada parte de su tienda como código (API GraphQL autogenerada, sistema de plugins en TypeScript). El ecosistema de plugins es más pequeño que la App Store de Shopify, así que piezas que ahí son un plugin de un clic aquí pueden requerir escribir tu propio plugin.",
      },
    ],
  },
  wikijs: {
    metaTitle: "Wiki.js: wiki open source con control de versiones Git (alternativa a Confluence)",
    metaDescription:
      "Wiki.js es una wiki open source (AGPL-3.0) con editor Markdown o visual, historial tipo Git y múltiples proveedores de autenticación — alternativa flexible a Confluence.",
    faqs: [
      {
        q: "¿Qué es Wiki.js?",
        a: "Una wiki moderna open source (licencia AGPL-3.0) con editor Markdown o visual, historial de cambios tipo Git y soporte para múltiples proveedores de autenticación — pensada como alternativa flexible a Confluence.",
      },
      {
        q: "¿Qué necesito para desplegar Wiki.js?",
        a: "La imagen oficial `requarks/wiki` más una base de datos PostgreSQL — el docker-compose de esta ficha incluye ambos servicios listos para copiar.",
      },
      {
        q: "¿Wiki.js tiene tantas integraciones como Confluence?",
        a: "No tantas integraciones empresariales de catálogo, pero es muy configurable en autenticación y almacenamiento — para equipos que quieren una wiki auto-hospedada sin depender del ecosistema Atlassian, cubre el caso de uso principal.",
      },
    ],
  },
  bagisto: {
    metaTitle: "Bagisto: e-commerce open source sobre Laravel (alternativa gratuita a Shopify)",
    metaDescription:
      "Bagisto es una plataforma e-commerce 100% gratuita (MIT) sobre Laravel y Vue.js, con multi-tienda y multi-idioma — sin ediciones de pago ocultas. Despliegue con Docker.",
    faqs: [
      {
        q: "¿Qué es Bagisto?",
        a: "Una plataforma de e-commerce open source (licencia MIT) construida sobre Laravel y Vue.js, con soporte multi-tienda y multi-idioma y un marketplace de extensiones — pensada como alternativa gratuita a Shopify.",
      },
      {
        q: "¿Bagisto vs WooCommerce: cuál elegir?",
        a: "WooCommerce es un plugin sobre WordPress (vive dentro de un CMS existente); Bagisto es una aplicación Laravel independiente pensada desde el inicio como plataforma de tienda, con su propia API y panel en Vue.js — tiene sentido si no necesitas WordPress y prefieres un stack PHP/Laravel dedicado al e-commerce.",
      },
      {
        q: "¿Bagisto tiene costes ocultos o ediciones de pago?",
        a: "El core es 100% gratuito, sin ediciones de pago ocultas — el coste real es el servidor donde lo despliegues y, opcionalmente, extensiones de terceros en su marketplace si necesitas funciones que el core no cubre.",
      },
    ],
  },
  "gitlab-ce": {
    metaTitle: "GitLab CE: plataforma DevOps completa auto-hospedada (Git + CI/CD)",
    metaDescription:
      "GitLab Community Edition integra Git, CI/CD, issues y registro de contenedores en una sola plataforma, gratis y auto-hospedable. Requisitos de RAM y comparativa con Gitea.",
    faqs: [
      {
        q: "¿Qué es GitLab CE?",
        a: "GitLab Community Edition: la versión gratuita y auto-hospedable (licencia MIT) de GitLab, con repositorios Git, CI/CD integrado, gestión de issues y registro de contenedores en una sola plataforma DevOps.",
      },
      {
        q: "¿Cuánta RAM necesita un servidor GitLab CE?",
        a: "Requiere notablemente más RAM que Gitea — esta ficha recomienda al menos 4GB para una instancia cómoda, frente a instalaciones de Gitea que corren con mucho menos. Si solo necesitas alojar repositorios Git sin CI/CD integrado, Gitea es la opción más ligera.",
      },
      {
        q: "¿GitLab CE vs Gitea: cuál elegir?",
        a: "GitLab CE cubre todo el ciclo DevOps (CI/CD, registro de contenedores, epics) en una sola plataforma, a cambio de más RAM y más complejidad operativa. Gitea es mucho más ligero pero se centra en alojar repositorios Git, dejando el CI/CD a herramientas externas.",
      },
    ],
  },
  focalboard: {
    metaTitle: "Focalboard: tableros Kanban open source con licencia MIT (alternativa a Trello)",
    metaDescription:
      "Focalboard ofrece tableros Kanban, tabla, galería y calendario con licencia MIT, standalone o como plugin de Mattermost. Cómo desplegarlo con Docker y qué esperar.",
    faqs: [
      {
        q: "¿Qué es Focalboard?",
        a: "Una herramienta de tableros Kanban open source (licencia MIT) con vistas de tabla, galería y calendario además de Kanban — se puede usar como app independiente o integrada como plugin de Mattermost. Alternativa ligera a Trello.",
      },
      {
        q: "¿Cómo se despliega Focalboard con Docker?",
        a: "Con la imagen oficial `mattermost/focalboard` y un volumen para sus datos — soporta SQLite o PostgreSQL. El docker-compose de esta ficha usa la configuración mínima con SQLite.",
      },
      {
        q: "¿Focalboard sigue en desarrollo activo?",
        a: "Su desarrollo se ha ralentizado desde que Mattermost lo adquirió, con menos funciones de automatización que Trello con Power-Ups. Sigue siendo una opción sólida si buscas algo ligero y con licencia permisiva, pero no esperes el ritmo de lanzamientos de una herramienta comercial.",
      },
    ],
  },
};

export function getToolSeo(id: string, locale: Locale): ToolSeoOverride | undefined {
  if (locale === "en") return toolSeoEn[id] ?? toolSeo[id];
  return toolSeo[id];
}
