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
  immich: {
    metaTitle: "Immich: backup de fotos self-hosted con IA (alternativa a Google Photos)",
    metaDescription:
      "Immich hace backup automático de fotos y vídeos desde el móvil a tu propio servidor, con reconocimiento facial y álbumes compartidos. Licencia AGPL-3.0, Docker y GPU opcional.",
    faqs: [
      {
        q: "¿Qué es Immich?",
        a: "Una herramienta open source (AGPL-3.0) que hace copia de seguridad automática de fotos y vídeos desde tu móvil a tu propio servidor, con reconocimiento facial, búsqueda inteligente y álbumes compartidos — alternativa auto-hospedada a Google Photos.",
      },
      {
        q: "¿Immich necesita GPU?",
        a: "No es obligatoria. Soporta aceleración por hardware opcional tanto para transcodificación de vídeo (NVENC, Quick Sync, VAAPI, RKMPP) como para el reconocimiento facial y la búsqueda inteligente (CUDA, OpenVINO, ROCm) — ambas se activan aparte en Ajustes, sin GPU todo sigue funcionando sobre CPU.",
      },
      {
        q: "¿Cómo se despliega Immich con Docker?",
        a: "Con varios servicios: el servidor principal, un contenedor de machine learning, PostgreSQL (con la extensión pgvecto-rs para búsqueda vectorial) y Redis. El volumen de subida debe apuntar a un disco con espacio real para toda tu biblioteca, no al disco del sistema.",
      },
    ],
  },
  garage: {
    metaTitle: "Garage: almacenamiento S3 distribuido para clusters caseros (open source)",
    metaDescription:
      "Garage es almacenamiento de objetos compatible con S3, pensado para clusters pequeños y geo-distribuidos con muy bajo consumo de recursos por nodo. Licencia AGPL-3.0, Docker en minutos.",
    faqs: [
      {
        q: "¿Qué es Garage?",
        a: "Un sistema de almacenamiento de objetos open source (AGPL-3.0) y compatible con la API de S3, escrito en Rust y diseñado para ejecutarse en varios nodos pequeños, incluso geo-distribuidos, con alta resiliencia.",
      },
      {
        q: "¿Garage es compatible con el API de Amazon S3?",
        a: "Sí, su API es 100% compatible con S3, así que la mayoría de clientes y herramientas que ya hablan S3 funcionan contra Garage sin cambios de código.",
      },
      {
        q: "¿Para qué tipo de cluster está pensado Garage?",
        a: "Para clusters caseros o self-hosted de varios nodos pequeños con hardware modesto, incluso distribuidos geográficamente, con muy bajo consumo de recursos por nodo. Su configuración de clustering tiene algo más de curva de aprendizaje a cambio.",
      },
    ],
  },
  wekan: {
    metaTitle: "Wekan: tablero Kanban open source con licencia MIT (alternativa a Trello)",
    metaDescription:
      "Wekan es un tablero Kanban open source con swimlanes, checklists e integraciones vía webhooks, licencia MIT. Cómo desplegarlo con Docker y qué esperar frente a Trello.",
    faqs: [
      {
        q: "¿Qué es Wekan?",
        a: "Un tablero Kanban open source (licencia MIT) con listas, tarjetas, etiquetas y checklists, muy similar en experiencia a Trello, con soporte activo de la comunidad.",
      },
      {
        q: "¿Wekan vs Trello: qué cambia?",
        a: "La experiencia es muy similar (listas, tarjetas, swimlanes), pero la interfaz de Wekan está algo menos pulida que Trello — a cambio, es gratis, auto-hospedable y con licencia MIT muy permisiva, sin límites de una cuenta gratuita de SaaS.",
      },
      {
        q: "¿Cómo se despliega Wekan con Docker?",
        a: "Con la imagen oficial `wekanteam/wekan` y una base de datos MongoDB — el docker-compose de esta ficha incluye ambos servicios listos para copiar.",
      },
    ],
  },
  saleor: {
    metaTitle: "Saleor: e-commerce headless GraphQL open source (alternativa a Shopify Plus)",
    metaDescription:
      "Saleor es una plataforma de e-commerce headless con API GraphQL completa y arquitectura orientada a eventos, pensada para tiendas de tráfico alto. Licencia BSD-3-Clause.",
    faqs: [
      {
        q: "¿Qué es Saleor?",
        a: "Una plataforma de comercio headless GraphQL-first (licencia BSD-3-Clause), con checkout totalmente personalizable y arquitectura orientada a eventos (webhooks) — pensada para tiendas de gran escala como alternativa a Shopify Plus.",
      },
      {
        q: "¿Saleor vs Shopify Plus: para quién es cada uno?",
        a: "Saleor es para equipos con capacidad de desarrollo que quieren controlar cada parte del checkout y la tienda vía su API GraphQL. Shopify Plus es un servicio gestionado sin necesidad de mantener infraestructura propia — a cambio de ceder ese control y pagar la suscripción.",
      },
      {
        q: "¿Saleor es realmente gratis?",
        a: "El core es open source (BSD-3-Clause) y se auto-hospeda sin coste de licencia. Es Open-Core: existe un plan cloud gestionado opcional de pago, pero no es necesario para desplegarlo tú mismo.",
      },
    ],
  },
  appwrite: {
    metaTitle: "Appwrite: backend-as-a-service open source (alternativa a Firebase)",
    metaDescription:
      "Appwrite cubre auth, bases de datos, storage y funciones serverless con SDKs para todos los frameworks. Licencia BSD-3-Clause, imagen Docker verificada y pineada.",
    faqs: [
      {
        q: "¿Qué es Appwrite?",
        a: "Una plataforma backend-as-a-service (licencia BSD-3-Clause) con SDKs para todos los frameworks populares, que cubre auth, bases de datos, storage, funciones serverless y mensajería — alternativa a Firebase con foco en experiencia de desarrollador.",
      },
      {
        q: "¿Appwrite vs PocketBase: cuál elegir?",
        a: "Appwrite es una BaaS completa con mensajería, múltiples runtimes de funciones y un panel muy completo, a cambio de un stack con varios contenedores internos (MariaDB + Redis) más pesado de auditar. PocketBase es un único binario Go con SQLite embebido — mucho más simple de desplegar, pensado para proyectos pequeños o MVPs.",
      },
      {
        q: "¿La imagen Docker de Appwrite es fiable?",
        a: "Sí — está marcada como `VERIFIED_PINNED` en nuestra auditoría de despliegue: imagen con versión fijada y verificada, no un tag flotante.",
      },
    ],
  },
  redash: {
    metaTitle: "Redash: consultas SQL y dashboards open source (alternativa a Looker)",
    metaDescription:
      "Redash conecta con tus fuentes de datos para escribir SQL, visualizar resultados y compartir dashboards. Licencia BSD-2-Clause, despliegue con Docker en minutos.",
    faqs: [
      {
        q: "¿Qué es Redash?",
        a: "Una herramienta open source (licencia BSD-2-Clause) que conecta con múltiples fuentes de datos para escribir consultas SQL, visualizarlas y compartirlas en dashboards — alternativa ligera a Looker para equipos de datos.",
      },
      {
        q: "¿Redash sigue en desarrollo activo?",
        a: "Su ritmo de desarrollo se ha ralentizado frente a Metabase en los últimos años. Sigue siendo una opción sólida con licencia muy permisiva, pero no esperes el ritmo de lanzamientos de herramientas con desarrollo comercial detrás.",
      },
      {
        q: "¿Cómo se despliega Redash con Docker?",
        a: "Con la imagen oficial `redash/redash` más PostgreSQL y Redis — el docker-compose de esta ficha incluye los tres servicios listos para copiar.",
      },
    ],
  },
  zammad: {
    metaTitle: "Zammad: sistema de tickets open source (alternativa auto-hospedable a Zendesk)",
    metaDescription:
      "Zammad ofrece bandeja de tickets multicanal, base de conocimiento y automatizaciones con SLA, licencia AGPL-3.0. Qué necesitas para desplegarlo con Docker.",
    faqs: [
      {
        q: "¿Qué es Zammad?",
        a: "Un sistema de tickets de soporte (licencia AGPL-3.0) con bandeja multicanal, base de conocimiento integrada y automatizaciones con SLA — ofrecido como alternativa auto-hospedable a Zendesk.",
      },
      {
        q: "¿Qué necesito para desplegar Zammad?",
        a: "PostgreSQL y Elasticsearch — un servicio más que mantener frente a otros helpdesks de este catálogo, ya que Zammad depende de Elasticsearch para su búsqueda.",
      },
      {
        q: "¿Zammad vs Zendesk: qué cambia?",
        a: "Zammad es gratuito y auto-hospedable (AGPL-3.0), con una interfaz moderna comparada con otros helpdesks open source. A cambio de no pagar licencia, tú mantienes la infraestructura (incluido Elasticsearch).",
      },
    ],
  },
  headscale: {
    metaTitle: "Headscale: servidor de coordinación self-hosted compatible con Tailscale",
    metaDescription:
      "Headscale reimplementa el control plane de Tailscale para que uses sus clientes oficiales sin depender de su servicio comercial. Licencia BSD-3-Clause, WireGuard por debajo.",
    faqs: [
      {
        q: "¿Qué es Headscale?",
        a: "Una implementación open source (BSD-3-Clause) del servidor de coordinación de Tailscale: crea tu propia red mallada cifrada con WireGuard usando los mismos clientes oficiales, sin depender del control plane comercial de Tailscale Inc.",
      },
      {
        q: "¿Necesito el cliente de Headscale o el de Tailscale?",
        a: "Usas los clientes oficiales de Tailscale en todos tus dispositivos — Headscale solo sustituye el servidor de coordinación (control plane) al que se conectan, no el cliente.",
      },
      {
        q: "¿Headscale soporta ACLs y exit nodes como el servicio comercial?",
        a: "Sí, soporta ACLs, exit nodes y subredes igual que Tailscale Inc. A cambio, requiere editar un archivo de configuración YAML — no todo se controla solo con variables de entorno.",
      },
    ],
  },
  umami: {
    metaTitle: "Umami: analítica web minimalista y privada (alternativa a Google Analytics)",
    metaDescription:
      "Umami es analítica web ligera y respetuosa con la privacidad, con un único contenedor y base de datos. Licencia MIT. Cómo se compara con Plausible y Matomo.",
    faqs: [
      {
        q: "¿Qué es Umami?",
        a: "Una herramienta de analítica web (licencia MIT) simple, rápida y respetuosa con la privacidad, con un único binario Node.js y una base de datos — ideal para quien quiere el mínimo overhead operativo.",
      },
      {
        q: "¿Umami vs Plausible vs Matomo: cuál elegir?",
        a: "Umami es la opción más ligera de desplegar (un solo contenedor + base de datos) para analítica básica multi-sitio. Matomo es la más completa (heatmaps, grabación de sesiones, embudos, nivel de detalle de GA4) a cambio de más complejidad operativa. Plausible se centra en minimización de datos y un dashboard muy simple sin cookies.",
      },
      {
        q: "¿Umami reemplaza del todo a Google Analytics?",
        a: "Cubre lo esencial — tráfico multi-sitio, eventos personalizados, API propia de reportes — pero sus informes son menos detallados que los de GA4 o Matomo, como ya indicamos honestamente en la ficha.",
      },
    ],
  },
  neko: {
    metaTitle: "Neko (n.eko): navegador compartido en streaming vía Docker (open source)",
    metaDescription:
      "Neko crea una sala de navegador virtual compartido donde varias personas ven y controlan el mismo navegador a la vez. Licencia Apache-2.0, un solo comando Docker.",
    faqs: [
      {
        q: "¿Qué es Neko (n.eko)?",
        a: "Una herramienta open source (Apache-2.0) que crea una sala de navegador compartida en streaming: varias personas ven y controlan el mismo navegador virtual a la vez, ideal para watch parties o navegación colaborativa.",
      },
      {
        q: "¿Neko es un sustituto de Zoom?",
        a: "No. Cubre un caso de uso único y específico que Zoom no resuelve bien — un navegador realmente compartido, no solo pantalla compartida — pero no es un sustituto general de videollamadas de trabajo, como ya indicamos en la ficha.",
      },
      {
        q: "¿Cómo se despliega Neko con Docker?",
        a: "Con la imagen `m1k1o/neko` en la variante del navegador que prefieras (por ejemplo `m1k1o/neko:firefox`) — un único servicio Docker, sin base de datos externa.",
      },
    ],
  },
  hasura: {
    metaTitle: "Hasura: API GraphQL instantánea sobre PostgreSQL (open source)",
    metaDescription:
      "Hasura genera una API GraphQL y REST en tiempo real a partir de tu base PostgreSQL, con permisos a nivel de fila. Licencia Apache-2.0, Docker Compose incluido.",
    faqs: [
      {
        q: "¿Qué es Hasura?",
        a: "Un motor (licencia Apache-2.0) que genera una API GraphQL y REST en tiempo real instantáneamente a partir de tu base de datos PostgreSQL, con permisos granulares a nivel de fila — alternativa a Firebase o AWS AppSync.",
      },
      {
        q: "¿Hasura es realmente gratis?",
        a: "El motor (Community Edition) es Apache-2.0 y se auto-hospeda gratis. Es Open-Core: Hasura Cloud es el plan gestionado de pago, opcional y no necesario para desplegarlo tú mismo.",
      },
      {
        q: "¿Hasura funciona con bases de datos NoSQL?",
        a: "Está pensado principalmente para PostgreSQL y algunas otras bases relacionales, no para NoSQL — ya indicado honestamente en la ficha.",
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
