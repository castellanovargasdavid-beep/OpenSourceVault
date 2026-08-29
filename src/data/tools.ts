import type { OpenSourceTool } from "@/lib/types";
import { affiliateLinks } from "@/lib/site-config";

export const tools: OpenSourceTool[] = [
  {
    id: "appflowy",
    name: "AppFlowy",
    slug: "appflowy",
    replaces: ["Notion"],
    category: "Productivity",
    description:
      "AppFlowy es un workspace todo-en-uno para notas, wikis y bases de datos, construido en Rust y Flutter para ser rápido incluso con miles de páginas. Es la alternativa open source a Notion más madura para equipos que quieren controlar dónde viven sus datos.",
    shortDescription: "Workspace de notas y bases de datos, la alternativa open source a Notion.",
    websiteUrl: "https://appflowy.io",
    githubUrl: "https://github.com/AppFlowy-IO/AppFlowy",
    starsCount: 59000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  appflowy-cloud:
    image: appflowyinc/appflowy_cloud:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - APPFLOWY_DATABASE_URL=postgres://postgres:password@postgres:5432/postgres
      - APPFLOWY_GOTRUE_JWT_SECRET=change-me-super-secret
    depends_on:
      - postgres
  postgres:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_PASSWORD=password
    volumes:
      - appflowy_pg_data:/var/lib/postgresql/data
volumes:
  appflowy_pg_data:
`,
    affiliateLinks,
    features: [
      "Editor de bloques tipo Notion con bases de datos",
      "Modo local-first, funciona sin conexión",
      "Apps nativas para Windows, macOS, Linux, iOS y Android",
      "Plugins y API abierta",
    ],
    techStack: ["Rust", "Flutter", "PostgreSQL"],
    pros: [
      "Rendimiento notablemente superior con documentos grandes",
      "Sin límites artificiales de bloques ni miembros",
      "Autoalojable con control total de los datos",
    ],
    cons: [
      "Ecosistema de plugins aún más pequeño que Notion",
      "AGPL-3.0 obliga a liberar el código si modificas y ofreces el servicio",
    ],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "plane",
    name: "Plane",
    slug: "plane",
    replaces: ["Jira", "Asana", "Linear"],
    category: "Productivity",
    description:
      "Plane es una plataforma de gestión de proyectos e issues pensada para equipos de producto e ingeniería, con ciclos, módulos y vistas Kanban al estilo Linear/Jira, pero completamente auto-hospedable.",
    shortDescription: "Gestión de proyectos e issues, alternativa a Jira y Asana.",
    websiteUrl: "https://plane.so",
    githubUrl: "https://github.com/makeplane/plane",
    starsCount: 33000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  plane-app:
    image: makeplane/plane-app:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://plane:plane@plane-db:5432/plane
      - REDIS_URL=redis://plane-redis:6379
      - SECRET_KEY=change-me-super-secret
    depends_on:
      - plane-db
      - plane-redis
  plane-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=plane
      - POSTGRES_PASSWORD=plane
      - POSTGRES_DB=plane
    volumes:
      - plane_pg_data:/var/lib/postgresql/data
  plane-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  plane_pg_data:
`,
    affiliateLinks,
    features: [
      "Ciclos (sprints), módulos y hojas de ruta",
      "Vistas Kanban, lista, calendario y Gantt",
      "API REST pública y webhooks",
      "Importadores desde Jira y Linear",
    ],
    techStack: ["Django", "Next.js", "PostgreSQL", "Redis"],
    pros: [
      "Interfaz muy pulida comparada con otras alternativas open source",
      "Sin cobro por asiento al auto-hospedarlo",
    ],
    cons: [
      "Requiere más recursos de servidor que un Kanban simple",
      "Algunas integraciones empresariales solo en la versión cloud",
    ],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "focalboard",
    name: "Focalboard",
    slug: "focalboard",
    replaces: ["Trello"],
    category: "Productivity",
    description:
      "Focalboard ofrece tableros Kanban, tablas y calendarios al estilo Trello, con la posibilidad de ejecutarlo como app independiente o integrado en Mattermost.",
    shortDescription: "Tableros Kanban open source, alternativa a Trello.",
    websiteUrl: "https://www.focalboard.com",
    githubUrl: "https://github.com/mattermost/focalboard",
    starsCount: 21000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  focalboard:
    image: mattermost/focalboard:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    volumes:
      - focalboard_data:/opt/focalboard/data
volumes:
  focalboard_data:
`,
    affiliateLinks,
    features: [
      "Tableros Kanban, tabla, galería y calendario",
      "Plantillas listas para usar",
      "Modo standalone o plugin de Mattermost",
    ],
    techStack: ["Go", "React", "SQLite/PostgreSQL"],
    pros: ["Licencia MIT muy permisiva", "Ligero y fácil de desplegar"],
    cons: [
      "Menos funciones de automatización que Trello con Power-Ups",
      "Desarrollo más lento tras la adquisición de Mattermost",
    ],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "nocodb",
    name: "NocoDB",
    slug: "nocodb",
    replaces: ["Airtable"],
    category: "DevTools",
    description:
      "NocoDB convierte cualquier base de datos SQL en una hoja de cálculo inteligente estilo Airtable, con vistas, formularios y automatizaciones, sin bloquear tus datos en un formato propietario.",
    shortDescription: "Hoja de cálculo inteligente sobre SQL, alternativa a Airtable.",
    websiteUrl: "https://nocodb.com",
    githubUrl: "https://github.com/nocodb/nocodb",
    starsCount: 50000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  nocodb:
    image: nocodb/nocodb:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - NC_DB=pg://nocodb-db:5432?u=nocodb&p=nocodb&d=nocodb
    volumes:
      - nocodb_data:/usr/app/data
    depends_on:
      - nocodb-db
  nocodb-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=nocodb
      - POSTGRES_PASSWORD=nocodb
      - POSTGRES_DB=nocodb
    volumes:
      - nocodb_pg_data:/var/lib/postgresql/data
volumes:
  nocodb_data:
  nocodb_pg_data:
`,
    affiliateLinks,
    features: [
      "Vistas Grid, Kanban, Galería y Formulario",
      "API REST y GraphQL autogeneradas",
      "Automatizaciones y webhooks",
      "Se conecta a MySQL, PostgreSQL, SQL Server y SQLite existentes",
    ],
    techStack: ["Node.js", "Vue.js", "PostgreSQL/MySQL"],
    pros: [
      "Funciona sobre bases de datos reales, no un formato propietario",
      "Sin límites de filas artificiales",
    ],
    cons: ["Curva de aprendizaje algo mayor que Airtable", "AGPL-3.0"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "baserow",
    name: "Baserow",
    slug: "baserow",
    replaces: ["Airtable"],
    category: "Storage",
    description:
      "Baserow es una alternativa open source a Airtable con una interfaz muy cercana al producto original, pensada para que equipos no técnicos construyan bases de datos sin código.",
    shortDescription: "Base de datos sin código, alternativa directa a Airtable.",
    websiteUrl: "https://baserow.io",
    githubUrl: "https://github.com/bram2w/baserow",
    starsCount: 22000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  baserow:
    image: baserow/baserow:1.28.2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    environment:
      - BASEROW_PUBLIC_URL=http://localhost
    volumes:
      - baserow_data:/baserow/data
volumes:
  baserow_data:
`,
    affiliateLinks,
    features: [
      "Interfaz drag-and-drop muy similar a Airtable",
      "Vistas Grid, Kanban, Calendario y Galería",
      "API REST automática por tabla",
      "Plugins y snapshots",
    ],
    techStack: ["Django", "Nuxt.js", "PostgreSQL"],
    pros: [
      "Curva de adopción mínima si vienes de Airtable",
      "Imagen Docker todo-en-uno muy simple de desplegar",
    ],
    cons: ["Automatizaciones avanzadas requieren la edición premium"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "plausible",
    name: "Plausible Analytics",
    slug: "plausible",
    replaces: ["Google Analytics"],
    category: "Analytics",
    description:
      "Plausible es una analítica web ligera y centrada en la privacidad: no usa cookies, cumple GDPR/CCPA de forma nativa y ofrece un dashboard mucho más simple que Google Analytics.",
    shortDescription: "Analítica web sin cookies, alternativa a Google Analytics.",
    websiteUrl: "https://plausible.io",
    githubUrl: "https://github.com/plausible/analytics",
    demoUrl: "https://plausible.io/plausible.io",
    starsCount: 21000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  plausible:
    image: ghcr.io/plausible/community-edition:v2
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - BASE_URL=http://localhost:8000
      - SECRET_KEY_BASE=change-me-64-char-secret
      - DATABASE_URL=postgres://postgres:postgres@plausible-db:5432/plausible
      - CLICKHOUSE_DATABASE_URL=http://plausible-events-db:8123/plausible_events_db
    depends_on:
      - plausible-db
      - plausible-events-db
  plausible-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_PASSWORD=postgres
    volumes:
      - plausible_pg_data:/var/lib/postgresql/data
  plausible-events-db:
    image: clickhouse/clickhouse-server:24-alpine
    restart: unless-stopped
    volumes:
      - plausible_ch_data:/var/lib/clickhouse
volumes:
  plausible_pg_data:
  plausible_ch_data:
`,
    affiliateLinks,
    features: [
      "Script de menos de 1KB, no ralentiza tu sitio",
      "Sin cookies ni banner de consentimiento necesario",
      "Dashboard de una sola pantalla",
      "Importa histórico desde Google Analytics",
    ],
    techStack: ["Elixir", "Phoenix", "ClickHouse", "PostgreSQL"],
    pros: [
      "Cumple privacidad por diseño",
      "Muchísimo más simple de leer que GA4",
    ],
    cons: [
      "Requiere ClickHouse, algo más pesado de auto-hospedar",
      "Menos profundidad de análisis que GA4 para ecommerce complejo",
    ],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "umami",
    name: "Umami",
    slug: "umami",
    replaces: ["Google Analytics"],
    category: "Analytics",
    description:
      "Umami es una analítica web simple, rápida y respetuosa con la privacidad, con un único binario Node.js y una base de datos, ideal para quien quiere el mínimo overhead operativo.",
    shortDescription: "Analítica web minimalista y muy fácil de auto-hospedar.",
    websiteUrl: "https://umami.is",
    githubUrl: "https://github.com/umami-software/umami",
    starsCount: 25000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://umami:umami@umami-db:5432/umami
      - APP_SECRET=change-me-super-secret
    depends_on:
      - umami-db
  umami-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=umami
      - POSTGRES_PASSWORD=umami
      - POSTGRES_DB=umami
    volumes:
      - umami_pg_data:/var/lib/postgresql/data
volumes:
  umami_pg_data:
`,
    affiliateLinks,
    features: [
      "Multi-sitio desde un único dashboard",
      "Eventos personalizados",
      "API propia para reportes",
    ],
    techStack: ["Next.js", "PostgreSQL/MySQL"],
    pros: ["Licencia MIT", "Despliegue en un solo contenedor + base de datos"],
    cons: ["Reportes menos detallados que GA4 o Matomo"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "matomo",
    name: "Matomo",
    slug: "matomo",
    replaces: ["Google Analytics"],
    category: "Analytics",
    description:
      "Matomo es la analítica web open source más completa, con heatmaps, grabación de sesiones, embudos y el nivel de detalle de GA4, pero con tus datos 100% bajo tu control.",
    shortDescription: "Analítica web completa, con heatmaps y sesiones, tuya al 100%.",
    websiteUrl: "https://matomo.org",
    githubUrl: "https://github.com/matomo-org/matomo",
    starsCount: 19000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  matomo:
    image: matomo:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - MATOMO_DATABASE_HOST=matomo-db
      - MATOMO_DATABASE_USERNAME=matomo
      - MATOMO_DATABASE_PASSWORD=matomo
      - MATOMO_DATABASE_DBNAME=matomo
    volumes:
      - matomo_data:/var/www/html
    depends_on:
      - matomo-db
  matomo-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_USER=matomo
      - MYSQL_PASSWORD=matomo
      - MYSQL_DATABASE=matomo
    volumes:
      - matomo_db_data:/var/lib/mysql
volumes:
  matomo_data:
  matomo_db_data:
`,
    affiliateLinks,
    features: [
      "Heatmaps y grabación de sesiones (plugin oficial)",
      "Embudos y segmentos avanzados",
      "100% de los datos, sin muestreo",
    ],
    techStack: ["PHP", "MySQL/MariaDB"],
    pros: ["El más completo de las alternativas open source a GA4"],
    cons: [
      "Interfaz más pesada, requiere más recursos que Plausible o Umami",
    ],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "posthog",
    name: "PostHog",
    slug: "posthog",
    replaces: ["Mixpanel", "Amplitude"],
    category: "Analytics",
    description:
      "PostHog combina product analytics, session replay, feature flags, A/B testing y encuestas en una sola plataforma auto-hospedable, pensada para equipos de producto.",
    shortDescription: "Product analytics + feature flags + A/B testing, todo en uno.",
    websiteUrl: "https://posthog.com",
    githubUrl: "https://github.com/PostHog/posthog",
    starsCount: 24000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  posthog:
    image: posthog/posthog:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://posthog:posthog@posthog-db:5432/posthog
      - SECRET_KEY=change-me-super-secret
      - REDIS_URL=redis://posthog-redis:6379
    depends_on:
      - posthog-db
      - posthog-redis
  posthog-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=posthog
      - POSTGRES_PASSWORD=posthog
      - POSTGRES_DB=posthog
    volumes:
      - posthog_pg_data:/var/lib/postgresql/data
  posthog-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  posthog_pg_data:
`,
    affiliateLinks,
    features: [
      "Session replay y heatmaps",
      "Feature flags y experimentos A/B",
      "Embudos, retención y cohortes",
    ],
    techStack: ["Django", "React", "ClickHouse", "PostgreSQL"],
    pros: ["Sustituye varias herramientas SaaS a la vez"],
    cons: [
      "El despliegue autoalojado a gran escala requiere más piezas (ClickHouse, Kafka)",
    ],
    tags: ["docker-ready"],
    featured: true,
  },
  {
    id: "cal-com",
    name: "Cal.com",
    slug: "cal-com",
    replaces: ["Calendly"],
    category: "Productivity",
    description:
      "Cal.com es la infraestructura de agendamiento open source: páginas de reserva, tipos de evento, integraciones de calendario y videollamadas, todo personalizable y auto-hospedable.",
    shortDescription: "Agendamiento de reuniones open source, alternativa a Calendly.",
    websiteUrl: "https://cal.com",
    githubUrl: "https://github.com/calcom/cal.com",
    starsCount: 32000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  calcom:
    image: calcom/cal.com:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://calcom:calcom@calcom-db:5432/calcom
      - NEXTAUTH_SECRET=change-me-super-secret
      - CALENDSO_ENCRYPTION_KEY=change-me-32-char-key
    depends_on:
      - calcom-db
  calcom-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=calcom
      - POSTGRES_PASSWORD=calcom
      - POSTGRES_DB=calcom
    volumes:
      - calcom_pg_data:/var/lib/postgresql/data
volumes:
  calcom_pg_data:
`,
    affiliateLinks,
    features: [
      "Páginas de reserva personalizadas",
      "Sincronización con Google/Outlook Calendar",
      "Videollamadas integradas (Cal Video)",
      "Enrutamiento de reuniones en equipo",
    ],
    techStack: ["Next.js", "PostgreSQL", "Prisma"],
    pros: ["White-label total, tu propio dominio y marca"],
    cons: ["El setup inicial es más técnico que registrarse en Calendly"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "rocketchat",
    name: "Rocket.Chat",
    slug: "rocketchat",
    replaces: ["Slack"],
    category: "Productivity",
    description:
      "Rocket.Chat es una plataforma de mensajería en equipo con canales, hilos, videollamadas y una API extensa, pensada para organizaciones que necesitan control total sobre sus comunicaciones.",
    shortDescription: "Chat de equipo auto-hospedable, alternativa a Slack.",
    websiteUrl: "https://www.rocket.chat",
    githubUrl: "https://github.com/RocketChat/Rocket.Chat",
    starsCount: 41000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  rocketchat:
    image: rocket.chat:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://rocketchat-db:27017/rocketchat
      - ROOT_URL=http://localhost:3000
    depends_on:
      - rocketchat-db
  rocketchat-db:
    image: mongo:6
    restart: unless-stopped
    command: mongod --replSet rs0
    volumes:
      - rocketchat_mongo_data:/data/db
volumes:
  rocketchat_mongo_data:
`,
    affiliateLinks,
    features: [
      "Canales, hilos y videollamadas nativas",
      "Bridging con Matrix, Slack y WhatsApp",
      "Apps y bots vía Rocket.Chat Marketplace",
    ],
    techStack: ["Node.js", "Meteor", "MongoDB"],
    pros: ["Licencia MIT", "Sin límite de historial de mensajes"],
    cons: ["MongoDB con replica set añade complejidad operativa"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "mattermost",
    name: "Mattermost",
    slug: "mattermost",
    replaces: ["Slack", "Microsoft Teams"],
    category: "Productivity",
    description:
      "Mattermost es una plataforma de colaboración segura muy usada en equipos de DevOps y gobierno, con integraciones profundas en flujos de CI/CD e incident response.",
    shortDescription: "Colaboración y chat de equipo enfocado en seguridad, alt. a Slack.",
    websiteUrl: "https://mattermost.com",
    githubUrl: "https://github.com/mattermost/mattermost",
    starsCount: 30000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  mattermost:
    image: mattermost/mattermost-team-edition:latest
    restart: unless-stopped
    ports:
      - "8065:8065"
    environment:
      - MM_SQLSETTINGS_DATASOURCE=postgres://mattermost:mattermost@mattermost-db:5432/mattermost?sslmode=disable
    volumes:
      - mattermost_data:/mattermost/data
    depends_on:
      - mattermost-db
  mattermost-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=mattermost
      - POSTGRES_PASSWORD=mattermost
      - POSTGRES_DB=mattermost
    volumes:
      - mattermost_pg_data:/var/lib/postgresql/data
volumes:
  mattermost_data:
  mattermost_pg_data:
`,
    affiliateLinks,
    features: [
      "Playbooks para gestión de incidentes",
      "Integraciones nativas con CI/CD",
      "Cumplimiento y retención configurables",
    ],
    techStack: ["Go", "React", "PostgreSQL"],
    pros: ["Muy usado en entornos regulados y gobierno"],
    cons: ["La edición Team tiene menos funciones que Enterprise"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "twenty",
    name: "Twenty",
    slug: "twenty",
    replaces: ["Salesforce", "HubSpot"],
    category: "CRM",
    description:
      "Twenty es un CRM moderno, construido para ser el equivalente open source a Salesforce/HubSpot, con una interfaz tipo spreadsheet muy flexible y un modelo de datos totalmente personalizable.",
    shortDescription: "CRM moderno y open source, alternativa a Salesforce.",
    websiteUrl: "https://twenty.com",
    githubUrl: "https://github.com/twentyhq/twenty",
    starsCount: 24000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  twenty:
    image: twentycrm/twenty-front:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - PG_DATABASE_URL=postgres://twenty:twenty@twenty-db:5432/twenty
      - APP_SECRET=change-me-super-secret
    depends_on:
      - twenty-db
  twenty-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=twenty
      - POSTGRES_PASSWORD=twenty
      - POSTGRES_DB=twenty
    volumes:
      - twenty_pg_data:/var/lib/postgresql/data
volumes:
  twenty_pg_data:
`,
    affiliateLinks,
    features: [
      "Campos y objetos 100% personalizables",
      "Vistas tipo tabla y Kanban de pipeline",
      "API GraphQL y REST",
    ],
    techStack: ["NestJS", "React", "PostgreSQL"],
    pros: ["Interfaz moderna, muy rápida de adoptar por el equipo"],
    cons: ["Todavía menos integraciones nativas que Salesforce/HubSpot"],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "chatwoot",
    name: "Chatwoot",
    slug: "chatwoot",
    replaces: ["Intercom", "Zendesk"],
    category: "CRM",
    description:
      "Chatwoot centraliza chat en vivo, email, redes sociales y WhatsApp en una sola bandeja de soporte al cliente, con automatizaciones y reportes, como alternativa directa a Intercom o Zendesk.",
    shortDescription: "Bandeja de soporte omnicanal, alternativa a Intercom/Zendesk.",
    websiteUrl: "https://www.chatwoot.com",
    githubUrl: "https://github.com/chatwoot/chatwoot",
    starsCount: 23000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  chatwoot:
    image: chatwoot/chatwoot:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - SECRET_KEY_BASE=change-me-super-secret
      - POSTGRES_HOST=chatwoot-db
      - POSTGRES_USERNAME=chatwoot
      - POSTGRES_PASSWORD=chatwoot
      - REDIS_URL=redis://chatwoot-redis:6379
    depends_on:
      - chatwoot-db
      - chatwoot-redis
  chatwoot-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=chatwoot
      - POSTGRES_PASSWORD=chatwoot
    volumes:
      - chatwoot_pg_data:/var/lib/postgresql/data
  chatwoot-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  chatwoot_pg_data:
`,
    affiliateLinks,
    features: [
      "Bandeja compartida multicanal (web, email, WhatsApp, Instagram)",
      "Chatbots y respuestas automáticas",
      "Reportes de SLA y satisfacción",
    ],
    techStack: ["Ruby on Rails", "Vue.js", "PostgreSQL", "Redis"],
    pros: ["Licencia MIT", "Widget de chat muy ligero para el sitio web"],
    cons: ["Algunas integraciones de IA solo en el plan cloud"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "supabase",
    name: "Supabase",
    slug: "supabase",
    replaces: ["Firebase"],
    category: "DevTools",
    description:
      "Supabase es el backend-as-a-service open source construido sobre PostgreSQL: base de datos, autenticación, storage, funciones edge y suscripciones en tiempo real, todo auto-hospedable.",
    shortDescription: "Backend-as-a-service sobre PostgreSQL, alternativa a Firebase.",
    websiteUrl: "https://supabase.com",
    githubUrl: "https://github.com/supabase/supabase",
    starsCount: 78000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  studio:
    image: supabase/studio:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - SUPABASE_URL=http://kong:8000
  kong:
    image: kong:2.8-alpine
    restart: unless-stopped
    ports:
      - "8000:8000"
    depends_on:
      - db
  db:
    image: supabase/postgres:15.1.0.117
    restart: unless-stopped
    environment:
      - POSTGRES_PASSWORD=postgres
    volumes:
      - supabase_db_data:/var/lib/postgresql/data
volumes:
  supabase_db_data:
`,
    affiliateLinks,
    features: [
      "Base de datos PostgreSQL completa (no un subconjunto)",
      "Auth con OAuth, magic links y RLS",
      "Storage de archivos con CDN",
      "Suscripciones en tiempo real y Edge Functions",
    ],
    techStack: ["PostgreSQL", "PostgREST", "Deno", "Elixir"],
    pros: ["Migración más sencilla gracias a SQL estándar"],
    cons: [
      "El stack completo autoalojado tiene bastantes servicios que mantener",
    ],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "appwrite",
    name: "Appwrite",
    slug: "appwrite",
    replaces: ["Firebase"],
    category: "DevTools",
    description:
      "Appwrite es una plataforma backend-as-a-service con SDKs para todos los frameworks populares, que cubre auth, bases de datos, storage, funciones y mensajería, con foco en la experiencia de desarrollador.",
    shortDescription: "Backend-as-a-service multi-lenguaje, alternativa a Firebase.",
    websiteUrl: "https://appwrite.io",
    githubUrl: "https://github.com/appwrite/appwrite",
    starsCount: 47000,
    license: "BSD-3-Clause",
    dockerCompose: `version: "3.9"
services:
  appwrite:
    image: appwrite/appwrite:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    environment:
      - _APP_ENV=production
      - _APP_OPENSSL_KEY_V1=change-me-super-secret
      - _APP_DB_HOST=mariadb
      - _APP_REDIS_HOST=redis
    depends_on:
      - mariadb
      - redis
  mariadb:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=rootpass
    volumes:
      - appwrite_mariadb_data:/var/lib/mysql
  redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  appwrite_mariadb_data:
`,
    affiliateLinks,
    features: [
      "SDKs para Flutter, Swift, Android, Web y más",
      "Funciones serverless en múltiples runtimes",
      "Panel de control muy completo",
    ],
    techStack: ["PHP", "MariaDB", "Redis"],
    pros: ["Experiencia de desarrollador multiplataforma muy cuidada"],
    cons: ["Stack con varios contenedores internos, más pesado de auditar"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "minio",
    name: "MinIO",
    slug: "minio",
    replaces: ["Amazon S3"],
    category: "Storage",
    description:
      "MinIO es almacenamiento de objetos de alto rendimiento, 100% compatible con la API de S3, ideal para quien quiere infraestructura de almacenamiento propia sin cambiar una línea de código de sus SDKs de AWS.",
    shortDescription: "Almacenamiento de objetos compatible con S3, auto-hospedado.",
    websiteUrl: "https://min.io",
    githubUrl: "https://github.com/minio/minio",
    starsCount: 48000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  minio:
    image: minio/minio:latest
    restart: unless-stopped
    command: server /data --console-address ":9001"
    ports:
      - "9000:9000"
      - "9001:9001"
    environment:
      - MINIO_ROOT_USER=admin
      - MINIO_ROOT_PASSWORD=change-me-super-secret
    volumes:
      - minio_data:/data
volumes:
  minio_data:
`,
    affiliateLinks,
    features: [
      "API 100% compatible con S3",
      "Cifrado en reposo y versionado de objetos",
      "Replicación multi-sitio",
    ],
    techStack: ["Go"],
    pros: ["Drop-in replacement de S3, migración casi sin fricción"],
    cons: ["Configurar alta disponibilidad real requiere varios nodos"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "nextcloud",
    name: "Nextcloud",
    slug: "nextcloud",
    replaces: ["Google Drive", "Dropbox"],
    category: "Storage",
    description:
      "Nextcloud es la suite de productividad y almacenamiento en la nube open source más popular: archivos, calendario, contactos, edición colaborativa y videollamadas, todo bajo tu propio dominio.",
    shortDescription: "Nube de archivos y colaboración, alternativa a Google Drive.",
    websiteUrl: "https://nextcloud.com",
    githubUrl: "https://github.com/nextcloud/server",
    starsCount: 27000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  nextcloud:
    image: nextcloud:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - MYSQL_HOST=nextcloud-db
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=nextcloud
    volumes:
      - nextcloud_data:/var/www/html
    depends_on:
      - nextcloud-db
  nextcloud-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_PASSWORD=nextcloud
    volumes:
      - nextcloud_db_data:/var/lib/mysql
volumes:
  nextcloud_data:
  nextcloud_db_data:
`,
    affiliateLinks,
    features: [
      "Sincronización de archivos multiplataforma",
      "Edición colaborativa de documentos (Collabora/OnlyOffice)",
      "Calendario, contactos y videollamadas (Nextcloud Talk)",
      "Cientos de apps oficiales y de la comunidad",
    ],
    techStack: ["PHP", "MariaDB/PostgreSQL"],
    pros: ["El ecosistema más amplio de apps de productividad self-hosted"],
    cons: ["Puede sentirse pesado en instancias pequeñas con muchas apps"],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "n8n",
    name: "n8n",
    slug: "n8n",
    replaces: ["Zapier", "Make"],
    category: "DevTools",
    description:
      "n8n es una herramienta de automatización de flujos de trabajo con un editor visual de nodos, más de 400 integraciones y la posibilidad de escribir código JavaScript/Python cuando lo necesites.",
    shortDescription: "Automatización de flujos de trabajo, alternativa a Zapier.",
    websiteUrl: "https://n8n.io",
    githubUrl: "https://github.com/n8n-io/n8n",
    starsCount: 55000,
    license: "Sustainable Use License (Fair-code)",
    dockerCompose: `version: "3.9"
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=n8n-db
      - DB_POSTGRESDB_USER=n8n
      - DB_POSTGRESDB_PASSWORD=n8n
      - N8N_ENCRYPTION_KEY=change-me-super-secret
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      - n8n-db
  n8n-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=n8n
      - POSTGRES_PASSWORD=n8n
      - POSTGRES_DB=n8n
    volumes:
      - n8n_pg_data:/var/lib/postgresql/data
volumes:
  n8n_data:
  n8n_pg_data:
`,
    affiliateLinks,
    features: [
      "Editor visual de flujos con más de 400 nodos",
      "Nodos de código JavaScript y Python cuando lo necesites",
      "Ejecución self-hosted sin límite de tareas",
    ],
    techStack: ["Node.js", "Vue.js", "PostgreSQL"],
    pros: ["Sin cobro por número de ejecuciones al auto-hospedarlo"],
    cons: [
      "La licencia Fair-code restringe ofrecerlo como SaaS competidor de n8n Cloud",
    ],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "open-webui",
    name: "Open WebUI",
    slug: "open-webui",
    replaces: ["ChatGPT Plus"],
    category: "AI",
    description:
      "Open WebUI es una interfaz de chat extensible y auto-hospedable para modelos LLM locales (vía Ollama) o remotos compatibles con la API de OpenAI, con soporte para RAG, múltiples usuarios y plugins.",
    shortDescription: "Interfaz de chat con LLMs auto-hospedada, alternativa a ChatGPT Plus.",
    websiteUrl: "https://openwebui.com",
    githubUrl: "https://github.com/open-webui/open-webui",
    starsCount: 62000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    restart: unless-stopped
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - open_webui_data:/app/backend/data
    depends_on:
      - ollama
  ollama:
    image: ollama/ollama:latest
    restart: unless-stopped
    volumes:
      - ollama_data:/root/.ollama
volumes:
  open_webui_data:
  ollama_data:
`,
    affiliateLinks,
    features: [
      "Compatible con Ollama y cualquier API tipo OpenAI",
      "RAG con tus propios documentos",
      "Gestión de usuarios y roles",
      "Marketplace de prompts y funciones comunitarias",
    ],
    techStack: ["Python", "Svelte", "SQLite"],
    pros: ["Corre modelos 100% locales, sin enviar datos a terceros"],
    cons: [
      "La calidad depende del modelo que elijas correr (GPU recomendada)",
    ],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
    featured: true,
  },
  {
    id: "langfuse",
    name: "Langfuse",
    slug: "langfuse",
    replaces: ["Datadog LLM Observability"],
    category: "AI",
    description:
      "Langfuse es una plataforma open source de observabilidad y evaluación para aplicaciones LLM: trazas, costes por request, datasets de evaluación y prompt management, auto-hospedable junto a tu stack de IA.",
    shortDescription: "Observabilidad y evals para apps LLM, auto-hospedable.",
    websiteUrl: "https://langfuse.com",
    githubUrl: "https://github.com/langfuse/langfuse",
    starsCount: 9000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  langfuse:
    image: langfuse/langfuse:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://langfuse:langfuse@langfuse-db:5432/langfuse
      - NEXTAUTH_SECRET=change-me-super-secret
      - SALT=change-me-salt
    depends_on:
      - langfuse-db
  langfuse-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=langfuse
      - POSTGRES_PASSWORD=langfuse
      - POSTGRES_DB=langfuse
    volumes:
      - langfuse_pg_data:/var/lib/postgresql/data
volumes:
  langfuse_pg_data:
`,
    affiliateLinks,
    features: [
      "Trazas detalladas de cada llamada a tu LLM",
      "Gestión de prompts con versionado",
      "Datasets y evaluaciones automáticas",
    ],
    techStack: ["TypeScript", "Next.js", "PostgreSQL", "ClickHouse"],
    pros: ["Núcleo MIT, con opción de features enterprise separadas"],
    cons: ["El despliegue a gran escala añade ClickHouse y Redis"],
    tags: ["docker-ready", "permissive-license"],
  },

  // ---------- Productividad ----------
  {
    id: "huly",
    name: "Huly",
    slug: "huly",
    replaces: ["Linear", "Notion", "Slack"],
    category: "Productivity",
    description:
      "Huly es una plataforma todo-en-uno que combina gestión de proyectos, chat de equipo y documentos, pensada como reemplazo conjunto de Linear, Notion y Slack en una sola app auto-hospedable.",
    shortDescription: "Proyectos + chat + documentos en uno, alternativa a Linear/Notion/Slack.",
    websiteUrl: "https://huly.io",
    githubUrl: "https://github.com/hcengineering/huly-platform",
    starsCount: 11000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  huly:
    image: hardcoreeng/huly:latest
    restart: unless-stopped
    ports:
      - "8087:8087"
    environment:
      - MONGO_URL=mongodb://huly-db:27017
      - SECRET=change-me-super-secret
    depends_on:
      - huly-db
  huly-db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - huly_mongo_data:/data/db
volumes:
  huly_mongo_data:
`,
    affiliateLinks,
    features: ["Issues y proyectos estilo Linear", "Chat y canales de equipo", "Documentos colaborativos"],
    techStack: ["Rust", "React", "MongoDB"],
    pros: ["Sustituye tres SaaS distintos con un solo despliegue"],
    cons: ["Proyecto joven, ecosistema de integraciones aún reducido"],
    tags: ["docker-ready"],
  },
  {
    id: "outline",
    name: "Outline",
    slug: "outline",
    replaces: ["Confluence", "Notion"],
    category: "Productivity",
    description:
      "Outline es una wiki de conocimiento rápida y bien diseñada para equipos, con edición colaborativa en tiempo real, búsqueda instantánea y una estructura de colecciones clara.",
    shortDescription: "Wiki de equipo rápida y elegante, alternativa a Confluence.",
    websiteUrl: "https://www.getoutline.com",
    githubUrl: "https://github.com/outline/outline",
    starsCount: 30000,
    license: "BUSL-1.1",
    dockerCompose: `version: "3.9"
services:
  outline:
    image: outlinewiki/outline:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - SECRET_KEY=change-me-super-secret
      - DATABASE_URL=postgres://outline:outline@outline-db:5432/outline
      - REDIS_URL=redis://outline-redis:6379
      - URL=http://localhost:3000
    depends_on:
      - outline-db
      - outline-redis
  outline-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=outline
      - POSTGRES_PASSWORD=outline
      - POSTGRES_DB=outline
    volumes:
      - outline_pg_data:/var/lib/postgresql/data
  outline-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  outline_pg_data:
`,
    affiliateLinks,
    features: ["Edición colaborativa en tiempo real", "Búsqueda instantánea", "Colecciones y permisos por equipo"],
    techStack: ["Node.js", "React", "PostgreSQL", "Redis"],
    pros: ["Interfaz muy pulida, adopción rápida por el equipo"],
    cons: ["Licencia BUSL-1.1 restringe ofrecerlo como SaaS competidor"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "bookstack",
    name: "BookStack",
    slug: "bookstack",
    replaces: ["Confluence"],
    category: "Productivity",
    description:
      "BookStack organiza la documentación en libros, capítulos y páginas, con un editor WYSIWYG o Markdown y control de permisos granular, como alternativa simple y ligera a Confluence.",
    shortDescription: "Documentación organizada en libros y páginas, alternativa a Confluence.",
    websiteUrl: "https://www.bookstackapp.com",
    githubUrl: "https://github.com/BookStackApp/BookStack",
    starsCount: 14000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  bookstack:
    image: lscr.io/linuxserver/bookstack:latest
    restart: unless-stopped
    ports:
      - "6875:80"
    environment:
      - DB_HOST=bookstack-db
      - DB_USER=bookstack
      - DB_PASS=bookstack
      - DB_DATABASE=bookstack
    depends_on:
      - bookstack-db
  bookstack-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=bookstack
      - MYSQL_USER=bookstack
      - MYSQL_PASSWORD=bookstack
    volumes:
      - bookstack_db_data:/var/lib/mysql
volumes:
  bookstack_db_data:
`,
    affiliateLinks,
    features: ["Estructura en libros, capítulos y páginas", "Editor WYSIWYG o Markdown", "Permisos granulares por rol"],
    techStack: ["PHP", "Laravel", "MySQL"],
    pros: ["Licencia MIT", "Muy ligero comparado con Confluence"],
    cons: ["Menos plugins de terceros que Confluence"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "wekan",
    name: "Wekan",
    slug: "wekan",
    replaces: ["Trello"],
    category: "Productivity",
    description:
      "Wekan es un tablero Kanban open source con listas, tarjetas, etiquetas y checklists, muy similar en experiencia a Trello y con soporte activo de la comunidad.",
    shortDescription: "Tablero Kanban clásico, alternativa directa a Trello.",
    websiteUrl: "https://wekan.github.io",
    githubUrl: "https://github.com/wekan/wekan",
    starsCount: 19000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  wekan:
    image: wekanteam/wekan:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - MONGO_URL=mongodb://wekan-db:27017/wekan
      - ROOT_URL=http://localhost:8080
    depends_on:
      - wekan-db
  wekan-db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - wekan_mongo_data:/data/db
volumes:
  wekan_mongo_data:
`,
    affiliateLinks,
    features: ["Tableros Kanban con etiquetas y checklists", "Swimlanes y vistas múltiples", "Integraciones vía webhooks"],
    techStack: ["Meteor", "MongoDB"],
    pros: ["Licencia MIT muy permisiva", "Curva de adopción mínima"],
    cons: ["Interfaz algo menos pulida que Trello"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "vikunja",
    name: "Vikunja",
    slug: "vikunja",
    replaces: ["Todoist", "Asana"],
    category: "Productivity",
    description:
      "Vikunja es un gestor de tareas open source con listas, Kanban, Gantt y recordatorios, pensado como alternativa ligera a Todoist y Asana para equipos pequeños.",
    shortDescription: "Gestor de tareas y proyectos, alternativa a Todoist y Asana.",
    websiteUrl: "https://vikunja.io",
    githubUrl: "https://github.com/go-vikunja/vikunja",
    starsCount: 8000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  vikunja:
    image: vikunja/vikunja:latest
    restart: unless-stopped
    ports:
      - "3456:3456"
    environment:
      - VIKUNJA_DATABASE_TYPE=sqlite
      - VIKUNJA_SERVICE_JWTSECRET=change-me-super-secret
    volumes:
      - vikunja_data:/app/vikunja/files
volumes:
  vikunja_data:
`,
    affiliateLinks,
    features: ["Vistas Lista, Kanban y Gantt", "Tareas recurrentes y recordatorios", "API REST y apps móviles"],
    techStack: ["Go", "Vue.js"],
    pros: ["Muy ligero, corre bien hasta con SQLite"],
    cons: ["Menos integraciones de terceros que Asana"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "taiga",
    name: "Taiga",
    slug: "taiga",
    replaces: ["Jira"],
    category: "Productivity",
    description:
      "Taiga es una plataforma de gestión ágil de proyectos con Scrum y Kanban, backlog e historias de usuario, orientada a equipos que quieren la simplicidad de Jira sin su complejidad.",
    shortDescription: "Gestión ágil (Scrum/Kanban), alternativa más simple a Jira.",
    websiteUrl: "https://www.taiga.io",
    githubUrl: "https://github.com/taigaio/taiga-back",
    starsCount: 4000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  taiga-back:
    image: taigaio/taiga-back:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - POSTGRES_HOST=taiga-db
      - POSTGRES_DB=taiga
      - POSTGRES_USER=taiga
      - POSTGRES_PASSWORD=taiga
      - SECRET_KEY=change-me-super-secret
    depends_on:
      - taiga-db
  taiga-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_DB=taiga
      - POSTGRES_USER=taiga
      - POSTGRES_PASSWORD=taiga
    volumes:
      - taiga_pg_data:/var/lib/postgresql/data
volumes:
  taiga_pg_data:
`,
    affiliateLinks,
    features: ["Scrum y Kanban en el mismo proyecto", "Backlog e historias de usuario", "Epics y sprints"],
    techStack: ["Django", "AngularJS", "PostgreSQL"],
    pros: ["Curva de aprendizaje mucho menor que Jira"],
    cons: ["El stack completo en producción requiere más piezas (nginx, RabbitMQ)"],
    tags: ["docker-ready"],
  },
  {
    id: "openproject",
    name: "OpenProject",
    slug: "openproject",
    replaces: ["Jira", "MS Project"],
    category: "Productivity",
    description:
      "OpenProject cubre gestión de proyectos clásica y ágil: diagramas de Gantt, backlogs, hoja de tiempos y presupuestos, como alternativa completa a Jira y MS Project para equipos grandes.",
    shortDescription: "Gestión de proyectos con Gantt y presupuestos, alternativa a Jira/MS Project.",
    websiteUrl: "https://www.openproject.org",
    githubUrl: "https://github.com/opf/openproject",
    starsCount: 9000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  openproject:
    image: openproject/openproject:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - SECRET_KEY_BASE=change-me-super-secret
    volumes:
      - openproject_data:/var/openproject/assets
volumes:
  openproject_data:
`,
    affiliateLinks,
    features: ["Diagramas de Gantt interactivos", "Backlogs ágiles y sprints", "Hoja de tiempos y presupuestos"],
    techStack: ["Ruby on Rails", "PostgreSQL"],
    pros: ["El más completo para gestión de proyectos tradicional + ágil"],
    cons: ["Interfaz más pesada que alternativas minimalistas"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "trilium-notes",
    name: "Trilium Notes",
    slug: "trilium-notes",
    replaces: ["Evernote", "OneNote"],
    category: "Productivity",
    description:
      "Trilium Notes es una app de notas jerárquicas con cifrado, versiones y scripting propio, pensada para bases de conocimiento personales grandes al estilo Evernote u OneNote.",
    shortDescription: "Notas jerárquicas y cifradas, alternativa a Evernote/OneNote.",
    websiteUrl: "https://github.com/zadam/trilium",
    githubUrl: "https://github.com/zadam/trilium",
    starsCount: 28000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  trilium:
    image: zadam/trilium:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - trilium_data:/home/node/trilium-data
volumes:
  trilium_data:
`,
    affiliateLinks,
    features: ["Notas jerárquicas ilimitadas", "Cifrado de notas sensibles", "Scripting y automatizaciones propias"],
    techStack: ["Node.js", "SQLite"],
    pros: ["Excelente para bases de conocimiento personales enormes"],
    cons: ["Interfaz menos amigable para equipos no técnicos"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "docmost",
    name: "Docmost",
    slug: "docmost",
    replaces: ["Confluence", "Notion"],
    category: "Productivity",
    description:
      "Docmost es una wiki y documentación colaborativa de código abierto con espacios, permisos y edición en tiempo real, nacida como alternativa moderna y auto-hospedable a Confluence.",
    shortDescription: "Wiki colaborativa moderna, alternativa open source a Confluence.",
    websiteUrl: "https://docmost.com",
    githubUrl: "https://github.com/docmost/docmost",
    starsCount: 14000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  docmost:
    image: docmost/docmost:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - APP_SECRET=change-me-super-secret
      - DATABASE_URL=postgresql://docmost:docmost@docmost-db:5432/docmost
      - REDIS_URL=redis://docmost-redis:6379
    depends_on:
      - docmost-db
      - docmost-redis
  docmost-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=docmost
      - POSTGRES_PASSWORD=docmost
      - POSTGRES_DB=docmost
    volumes:
      - docmost_pg_data:/var/lib/postgresql/data
  docmost-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  docmost_pg_data:
`,
    affiliateLinks,
    features: ["Espacios y permisos por equipo", "Edición colaborativa en tiempo real", "Comentarios y versionado de páginas"],
    techStack: ["NestJS", "React", "PostgreSQL"],
    pros: ["Crecimiento muy rápido de comunidad y features"],
    cons: ["Proyecto todavía joven frente a Confluence"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "affine",
    name: "AFFiNE",
    slug: "affine",
    replaces: ["Notion"],
    category: "Productivity",
    description:
      "AFFiNE combina documentos, bases de datos y pizarra visual (whiteboard) en un mismo lienzo, ofreciendo una alternativa a Notion con un fuerte enfoque en edición local-first.",
    shortDescription: "Documentos + whiteboard en un lienzo, alternativa a Notion.",
    websiteUrl: "https://affine.pro",
    githubUrl: "https://github.com/toeverything/AFFiNE",
    starsCount: 46000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  affine:
    image: ghcr.io/toeverything/affine-graphql:stable
    restart: unless-stopped
    ports:
      - "3010:3010"
    environment:
      - DATABASE_URL=postgresql://affine:affine@affine-db:5432/affine
      - REDIS_SERVER_HOST=affine-redis
    depends_on:
      - affine-db
      - affine-redis
  affine-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=affine
      - POSTGRES_PASSWORD=affine
      - POSTGRES_DB=affine
    volumes:
      - affine_pg_data:/var/lib/postgresql/data
  affine-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  affine_pg_data:
`,
    affiliateLinks,
    features: ["Documentos y bases de datos tipo Notion", "Pizarra/whiteboard infinita integrada", "Modo local-first"],
    techStack: ["Rust", "TypeScript", "PostgreSQL"],
    pros: ["Combina notas y whiteboard, algo que Notion no ofrece nativamente"],
    cons: ["El self-host oficial aún evoluciona rápido entre versiones"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "zulip",
    name: "Zulip",
    slug: "zulip",
    replaces: ["Slack"],
    category: "Productivity",
    description:
      "Zulip organiza las conversaciones de equipo en hilos por tema dentro de cada canal, lo que reduce el ruido frente a Slack en equipos grandes con mucho volumen de mensajes.",
    shortDescription: "Chat de equipo organizado por hilos, alternativa a Slack.",
    websiteUrl: "https://zulip.com",
    githubUrl: "https://github.com/zulip/zulip",
    starsCount: 21000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  zulip:
    image: zulip/docker-zulip:latest
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - SETTING_EXTERNAL_HOST=localhost
      - SECRETS_email_password=""
    volumes:
      - zulip_data:/data
volumes:
  zulip_data:
`,
    affiliateLinks,
    features: ["Hilos por tema dentro de cada canal", "Búsqueda potente en todo el historial", "Apps nativas multiplataforma"],
    techStack: ["Python", "Django", "PostgreSQL"],
    pros: ["Mucho menos ruido que Slack en canales muy activos"],
    cons: ["El modelo de hilos por tema tiene curva de aprendizaje"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "etherpad",
    name: "Etherpad",
    slug: "etherpad",
    replaces: ["Google Docs"],
    category: "Productivity",
    description:
      "Etherpad es un editor de texto colaborativo en tiempo real, ligero y muy rápido de desplegar, ideal para notas compartidas rápidas al estilo de Google Docs sin cuenta ni registro.",
    shortDescription: "Editor colaborativo en tiempo real, alternativa ligera a Google Docs.",
    websiteUrl: "https://etherpad.org",
    githubUrl: "https://github.com/ether/etherpad-lite",
    starsCount: 15000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  etherpad:
    image: etherpad/etherpad:latest
    restart: unless-stopped
    ports:
      - "9001:9001"
    environment:
      - DB_TYPE=postgres
      - DB_HOST=etherpad-db
      - DB_USER=etherpad
      - DB_PASS=etherpad
      - DB_NAME=etherpad
    depends_on:
      - etherpad-db
  etherpad-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=etherpad
      - POSTGRES_PASSWORD=etherpad
      - POSTGRES_DB=etherpad
    volumes:
      - etherpad_pg_data:/var/lib/postgresql/data
volumes:
  etherpad_pg_data:
`,
    affiliateLinks,
    features: ["Edición colaborativa en tiempo real", "Historial de revisiones", "Plugins de la comunidad"],
    techStack: ["Node.js", "PostgreSQL"],
    pros: ["Extremadamente ligero y rápido de desplegar"],
    cons: ["No tiene hojas de cálculo ni presentaciones, solo texto"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "wikijs",
    name: "Wiki.js",
    slug: "wikijs",
    replaces: ["Confluence"],
    category: "Productivity",
    description:
      "Wiki.js es una wiki moderna con editor Markdown o visual, control de versiones tipo Git y soporte para múltiples fuentes de autenticación, como alternativa flexible a Confluence.",
    shortDescription: "Wiki moderna con control de versiones, alternativa a Confluence.",
    websiteUrl: "https://js.wiki",
    githubUrl: "https://github.com/requarks/wiki",
    starsCount: 24000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  wikijs:
    image: requarks/wiki:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DB_TYPE=postgres
      - DB_HOST=wikijs-db
      - DB_USER=wikijs
      - DB_PASS=wikijs
      - DB_NAME=wikijs
    depends_on:
      - wikijs-db
  wikijs-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=wikijs
      - POSTGRES_PASSWORD=wikijs
      - POSTGRES_DB=wikijs
    volumes:
      - wikijs_pg_data:/var/lib/postgresql/data
volumes:
  wikijs_pg_data:
`,
    affiliateLinks,
    features: ["Editor Markdown y visual", "Historial de cambios tipo Git", "Múltiples proveedores de autenticación"],
    techStack: ["Node.js", "Vue.js", "PostgreSQL"],
    pros: ["Muy configurable en autenticación y almacenamiento"],
    cons: ["Menos integraciones empresariales que Confluence"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "rallly",
    name: "Rallly",
    slug: "rallly",
    replaces: ["Doodle", "Calendly"],
    category: "Productivity",
    description:
      "Rallly permite crear encuestas de disponibilidad para encontrar la mejor fecha de reunión entre varias personas, sin necesidad de cuenta para votar, como alternativa a Doodle.",
    shortDescription: "Encuestas de disponibilidad para reuniones, alternativa a Doodle.",
    websiteUrl: "https://rallly.co",
    githubUrl: "https://github.com/lukevella/rallly",
    starsCount: 5000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  rallly:
    image: lukevella/rallly:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://rallly:rallly@rallly-db:5432/rallly
      - SECRET_PASSWORD=change-me-32-char-secret
    depends_on:
      - rallly-db
  rallly-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=rallly
      - POSTGRES_PASSWORD=rallly
      - POSTGRES_DB=rallly
    volumes:
      - rallly_pg_data:/var/lib/postgresql/data
volumes:
  rallly_pg_data:
`,
    affiliateLinks,
    features: ["Encuestas de fecha sin necesidad de cuenta", "Recordatorios automáticos por email", "Integración de calendario"],
    techStack: ["Next.js", "PostgreSQL"],
    pros: ["Los votantes no necesitan registrarse"],
    cons: ["No reemplaza el agendamiento 1-a-1 de Calendly, solo encuestas grupales"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "cryptpad",
    name: "CryptPad",
    slug: "cryptpad",
    replaces: ["Google Docs"],
    category: "Productivity",
    description:
      "CryptPad es una suite ofimática colaborativa con cifrado de extremo a extremo: documentos, hojas de cálculo, presentaciones y formularios, sin que el servidor pueda leer el contenido.",
    shortDescription: "Suite ofimática cifrada de extremo a extremo, alternativa a Google Docs.",
    websiteUrl: "https://cryptpad.org",
    githubUrl: "https://github.com/cryptpad/cryptpad",
    starsCount: 5000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  cryptpad:
    image: cryptpad/cryptpad:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - cryptpad_data:/cryptpad/data
      - cryptpad_blob:/cryptpad/blob
volumes:
  cryptpad_data:
  cryptpad_blob:
`,
    affiliateLinks,
    features: ["Documentos, hojas y presentaciones colaborativas", "Cifrado de extremo a extremo", "Formularios y kanban integrados"],
    techStack: ["Node.js", "JavaScript"],
    pros: ["El servidor nunca ve el contenido en claro"],
    cons: ["Rendimiento algo menor que Google Docs en documentos gigantes"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "fider",
    name: "Fider",
    slug: "fider",
    replaces: ["Canny"],
    category: "Productivity",
    description:
      "Fider recopila y prioriza el feedback de tus usuarios mediante un tablero público de ideas donde pueden votar y comentar, como alternativa a Canny para roadmaps públicos.",
    shortDescription: "Tablero público de feedback y roadmap, alternativa a Canny.",
    websiteUrl: "https://fider.io",
    githubUrl: "https://github.com/getfider/fider",
    starsCount: 4000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  fider:
    image: getfider/fider:stable
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://fider:fider@fider-db:5432/fider?sslmode=disable
      - JWT_SECRET=change-me-super-secret
    depends_on:
      - fider-db
  fider-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=fider
      - POSTGRES_PASSWORD=fider
      - POSTGRES_DB=fider
    volumes:
      - fider_pg_data:/var/lib/postgresql/data
volumes:
  fider_pg_data:
`,
    affiliateLinks,
    features: ["Tablero público de ideas con votos", "Estados de roadmap personalizables", "Notificaciones por email a votantes"],
    techStack: ["Go", "TypeScript", "PostgreSQL"],
    pros: ["Muy simple de desplegar y mantener"],
    cons: ["Menos opciones de segmentación de usuarios que Canny"],
    tags: ["docker-ready", "1-click-deploy"],
  },

  // ---------- Analítica ----------
  {
    id: "metabase",
    name: "Metabase",
    slug: "metabase",
    replaces: ["Looker", "Tableau"],
    category: "Analytics",
    description:
      "Metabase permite crear dashboards y consultas sobre tus bases de datos con una interfaz visual (sin SQL) o con SQL directo, como alternativa accesible a Looker y Tableau.",
    shortDescription: "Dashboards y BI sobre tus bases de datos, alternativa a Looker/Tableau.",
    websiteUrl: "https://www.metabase.com",
    githubUrl: "https://github.com/metabase/metabase",
    demoUrl: "https://demo.metabase.com",
    starsCount: 38000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  metabase:
    image: metabase/metabase:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - MB_DB_TYPE=postgres
      - MB_DB_HOST=metabase-db
      - MB_DB_USER=metabase
      - MB_DB_PASS=metabase
      - MB_DB_DBNAME=metabase
    depends_on:
      - metabase-db
  metabase-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=metabase
      - POSTGRES_PASSWORD=metabase
      - POSTGRES_DB=metabase
    volumes:
      - metabase_pg_data:/var/lib/postgresql/data
volumes:
  metabase_pg_data:
`,
    affiliateLinks,
    features: ["Consultas visuales sin SQL", "Dashboards y alertas programadas", "Se conecta a la mayoría de bases de datos SQL"],
    techStack: ["Clojure", "PostgreSQL"],
    pros: ["Curva de aprendizaje muy baja para equipos no técnicos"],
    cons: ["Funciones avanzadas de gobierno de datos solo en la edición Enterprise"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "apache-superset",
    name: "Apache Superset",
    slug: "apache-superset",
    replaces: ["Tableau", "Power BI"],
    category: "Analytics",
    description:
      "Apache Superset es una plataforma de exploración y visualización de datos con decenas de tipos de gráficos y un editor SQL integrado, pensada para reemplazar Tableau o Power BI a gran escala.",
    shortDescription: "BI y visualización de datos a gran escala, alternativa a Tableau/Power BI.",
    websiteUrl: "https://superset.apache.org",
    githubUrl: "https://github.com/apache/superset",
    starsCount: 62000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  superset:
    image: apache/superset:latest
    restart: unless-stopped
    ports:
      - "8088:8088"
    environment:
      - SUPERSET_SECRET_KEY=change-me-super-secret
    volumes:
      - superset_data:/app/superset_home
volumes:
  superset_data:
`,
    affiliateLinks,
    features: ["Decenas de tipos de gráficos", "Editor SQL con autocompletado", "Alertas y reportes programados"],
    techStack: ["Python", "Flask", "React"],
    pros: ["Licencia Apache-2.0 sin restricciones de uso comercial"],
    cons: ["Configuración inicial de producción más laboriosa (Redis/Celery recomendados)"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "redash",
    name: "Redash",
    slug: "redash",
    replaces: ["Looker"],
    category: "Analytics",
    description:
      "Redash conecta con múltiples fuentes de datos para escribir consultas SQL, visualizarlas y compartirlas en dashboards, como alternativa ligera a Looker para equipos de datos.",
    shortDescription: "Consultas SQL y dashboards compartibles, alternativa a Looker.",
    websiteUrl: "https://redash.io",
    githubUrl: "https://github.com/getredash/redash",
    starsCount: 24000,
    license: "BSD-2-Clause",
    dockerCompose: `version: "3.9"
services:
  redash:
    image: redash/redash:latest
    restart: unless-stopped
    ports:
      - "5000:5000"
    environment:
      - REDASH_DATABASE_URL=postgresql://redash:redash@redash-db:5432/redash
      - REDASH_REDIS_URL=redis://redash-redis:6379/0
      - REDASH_COOKIE_SECRET=change-me-super-secret
    depends_on:
      - redash-db
      - redash-redis
  redash-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=redash
      - POSTGRES_PASSWORD=redash
      - POSTGRES_DB=redash
    volumes:
      - redash_pg_data:/var/lib/postgresql/data
  redash-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  redash_pg_data:
`,
    affiliateLinks,
    features: ["Consultas SQL reutilizables", "Dashboards compartibles con filtros", "Alertas basadas en consultas"],
    techStack: ["Python", "Flask", "PostgreSQL", "Redis"],
    pros: ["Licencia BSD muy permisiva"],
    cons: ["Ritmo de desarrollo más lento que Metabase en los últimos años"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "countly",
    name: "Countly",
    slug: "countly",
    replaces: ["Mixpanel"],
    category: "Analytics",
    description:
      "Countly es una plataforma de product analytics para web y móvil con embudos, retención y segmentación de usuarios, ofrecida como edición comunitaria auto-hospedable frente a Mixpanel.",
    shortDescription: "Product analytics para web y móvil, alternativa a Mixpanel.",
    websiteUrl: "https://count.ly",
    githubUrl: "https://github.com/Countly/countly-server",
    starsCount: 4000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  countly:
    image: countly/countly-server:latest
    restart: unless-stopped
    ports:
      - "443:443"
    environment:
      - COUNTLY_CONFIG_HOST=countly-db
    depends_on:
      - countly-db
  countly-db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - countly_mongo_data:/data/db
volumes:
  countly_mongo_data:
`,
    affiliateLinks,
    features: ["Embudos y retención de usuarios", "Analítica de apps móviles nativas", "Segmentación de usuarios"],
    techStack: ["Node.js", "MongoDB"],
    pros: ["Fuerte soporte para SDKs móviles nativos"],
    cons: ["La edición comunitaria tiene menos funciones que la Enterprise"],
    tags: ["docker-ready"],
  },
  {
    id: "ackee",
    name: "Ackee",
    slug: "ackee",
    replaces: ["Google Analytics"],
    category: "Analytics",
    description:
      "Ackee es una analítica web minimalista y auto-hospedable que respeta la privacidad, con un dashboard simple para medir visitas y eventos sin rastrear datos personales.",
    shortDescription: "Analítica web minimalista y privada, alternativa a Google Analytics.",
    websiteUrl: "https://ackee.electerious.com",
    githubUrl: "https://github.com/electerious/Ackee",
    starsCount: 8000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  ackee:
    image: electerious/ackee:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - ACKEE_MONGODB=mongodb://ackee-db:27017/ackee
      - ACKEE_USERNAME=admin
      - ACKEE_PASSWORD=change-me
    depends_on:
      - ackee-db
  ackee-db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - ackee_mongo_data:/data/db
volumes:
  ackee_mongo_data:
`,
    affiliateLinks,
    features: ["Dashboard minimalista de visitas", "Eventos personalizados", "Sin cookies de rastreo"],
    techStack: ["Node.js", "MongoDB"],
    pros: ["Licencia MIT y footprint muy pequeño"],
    cons: ["Reportes mucho más básicos que GA4"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "goatcounter",
    name: "GoatCounter",
    slug: "goatcounter",
    replaces: ["Google Analytics"],
    category: "Analytics",
    description:
      "GoatCounter es una analítica web extremadamente ligera (un solo binario en Go) centrada en la privacidad, pensada para blogs y sitios personales que no necesitan un GA4 completo.",
    shortDescription: "Analítica web ultraligera en un solo binario, alternativa a Google Analytics.",
    websiteUrl: "https://www.goatcounter.com",
    githubUrl: "https://github.com/arp242/goatcounter",
    starsCount: 5000,
    license: "EUPL-1.2",
    dockerCompose: `version: "3.9"
services:
  goatcounter:
    image: ghcr.io/arp242/goatcounter:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    command: ["serve", "-listen", ":8080", "-tls", "none"]
    volumes:
      - goatcounter_data:/home/goatcounter/db
volumes:
  goatcounter_data:
`,
    affiliateLinks,
    features: ["Un solo binario, sin dependencias externas", "Dashboard simple de visitas y referrers", "Sin cookies ni huella digital"],
    techStack: ["Go", "SQLite"],
    pros: ["El despliegue más ligero de toda la categoría"],
    cons: ["No pensado para analítica de producto compleja"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "openreplay",
    name: "OpenReplay",
    slug: "openreplay",
    replaces: ["LogRocket", "FullStory"],
    category: "Analytics",
    description:
      "OpenReplay graba sesiones de usuario para reproducirlas, junto con heatmaps y métricas de rendimiento, como alternativa auto-hospedable a LogRocket y FullStory.",
    shortDescription: "Grabación de sesiones y heatmaps, alternativa a LogRocket.",
    websiteUrl: "https://openreplay.com",
    githubUrl: "https://github.com/openreplay/openreplay",
    starsCount: 12000,
    license: "Apache-2.0",
    dockerCompose: `# OpenReplay recomienda su instalador oficial para producción
# (varios microservicios). Este es un punto de partida simplificado.
version: "3.9"
services:
  openreplay:
    image: openreplay/openreplay-quickstart:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    volumes:
      - openreplay_data:/data
volumes:
  openreplay_data:
`,
    affiliateLinks,
    features: ["Grabación y reproducción de sesiones", "Heatmaps y métricas de rendimiento", "Captura de errores de consola"],
    techStack: ["Go", "React", "PostgreSQL", "ClickHouse"],
    pros: ["Sin límite de sesiones grabadas al auto-hospedarlo"],
    cons: ["Instalación en producción real requiere varios microservicios"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "highlight",
    name: "Highlight",
    slug: "highlight",
    replaces: ["LogRocket"],
    category: "Analytics",
    description:
      "Highlight combina grabación de sesiones, monitoreo de errores y logs de backend en una sola plataforma, como alternativa full-stack auto-hospedable a LogRocket.",
    shortDescription: "Sesiones, errores y logs en una plataforma, alternativa a LogRocket.",
    websiteUrl: "https://www.highlight.io",
    githubUrl: "https://github.com/highlight/highlight",
    starsCount: 7000,
    license: "Apache-2.0",
    dockerCompose: `# Highlight recomienda docker-compose oficial con varios servicios.
# Este es un punto de partida simplificado del backend principal.
version: "3.9"
services:
  highlight-backend:
    image: highlight/highlight-backend:latest
    restart: unless-stopped
    ports:
      - "8082:8082"
    environment:
      - PSQL_HOST=highlight-db
    depends_on:
      - highlight-db
  highlight-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_PASSWORD=highlight
    volumes:
      - highlight_pg_data:/var/lib/postgresql/data
volumes:
  highlight_pg_data:
`,
    affiliateLinks,
    features: ["Session replay full-stack", "Monitoreo de errores frontend y backend", "Logs centralizados"],
    techStack: ["Go", "TypeScript", "PostgreSQL", "ClickHouse"],
    pros: ["Unifica frontend y backend en una sola herramienta"],
    cons: ["Stack de producción con varios servicios que mantener"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "openpanel",
    name: "OpenPanel",
    slug: "openpanel",
    replaces: ["Mixpanel", "Amplitude"],
    category: "Analytics",
    description:
      "OpenPanel combina analítica web y de producto (eventos, embudos, perfiles de usuario) en un dashboard moderno, como alternativa reciente y auto-hospedable a Mixpanel y Amplitude.",
    shortDescription: "Analítica web + producto en un dashboard moderno, alternativa a Mixpanel.",
    websiteUrl: "https://openpanel.dev",
    githubUrl: "https://github.com/Openpanel-dev/openpanel",
    starsCount: 3000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  openpanel:
    image: ghcr.io/openpanel-dev/openpanel:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://openpanel:openpanel@openpanel-db:5432/openpanel
      - CLICKHOUSE_URL=http://openpanel-ch:8123
    depends_on:
      - openpanel-db
      - openpanel-ch
  openpanel-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=openpanel
      - POSTGRES_PASSWORD=openpanel
      - POSTGRES_DB=openpanel
    volumes:
      - openpanel_pg_data:/var/lib/postgresql/data
  openpanel-ch:
    image: clickhouse/clickhouse-server:24-alpine
    restart: unless-stopped
    volumes:
      - openpanel_ch_data:/var/lib/clickhouse
volumes:
  openpanel_pg_data:
  openpanel_ch_data:
`,
    affiliateLinks,
    features: ["Eventos y embudos de producto", "Perfiles de usuario unificados", "Dashboard moderno y rápido"],
    techStack: ["Next.js", "PostgreSQL", "ClickHouse"],
    pros: ["Combina analítica web y de producto en una sola herramienta"],
    cons: ["Proyecto joven, comunidad todavía pequeña"],
    tags: ["docker-ready"],
  },

  // ---------- DevTools ----------
  {
    id: "gitea",
    name: "Gitea",
    slug: "gitea",
    replaces: ["GitHub"],
    category: "DevTools",
    description:
      "Gitea es una plataforma Git ligera con issues, pull requests, wiki y Actions integradas, pensada para equipos que quieren su propio GitHub auto-hospedado con muy pocos recursos.",
    shortDescription: "Plataforma Git ligera, alternativa auto-hospedada a GitHub.",
    websiteUrl: "https://about.gitea.com",
    githubUrl: "https://github.com/go-gitea/gitea",
    starsCount: 46000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  gitea:
    image: gitea/gitea:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
      - "222:22"
    environment:
      - GITEA__database__DB_TYPE=postgres
      - GITEA__database__HOST=gitea-db:5432
      - GITEA__database__NAME=gitea
      - GITEA__database__USER=gitea
      - GITEA__database__PASSWD=gitea
    volumes:
      - gitea_data:/data
    depends_on:
      - gitea-db
  gitea-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=gitea
      - POSTGRES_PASSWORD=gitea
      - POSTGRES_DB=gitea
    volumes:
      - gitea_pg_data:/var/lib/postgresql/data
volumes:
  gitea_data:
  gitea_pg_data:
`,
    affiliateLinks,
    features: ["Issues, PRs y wiki integrados", "Gitea Actions compatible con GitHub Actions", "Muy bajo consumo de recursos"],
    techStack: ["Go", "PostgreSQL"],
    pros: ["Corre perfectamente en un VPS de 1GB de RAM"],
    cons: ["Ecosistema de integraciones más pequeño que GitHub"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "gitlab-ce",
    name: "GitLab CE",
    slug: "gitlab-ce",
    replaces: ["GitHub"],
    category: "DevTools",
    description:
      "GitLab Community Edition ofrece repositorios Git, CI/CD, gestión de issues y registro de contenedores en una sola plataforma DevOps completa, auto-hospedable de forma gratuita.",
    shortDescription: "Plataforma DevOps completa (Git + CI/CD), alternativa a GitHub.",
    websiteUrl: "https://about.gitlab.com",
    githubUrl: "https://gitlab.com/gitlab-org/gitlab-foss",
    starsCount: 24000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  gitlab:
    image: gitlab/gitlab-ce:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
      - "2222:22"
    environment:
      - GITLAB_OMNIBUS_CONFIG=external_url 'http://localhost'
    volumes:
      - gitlab_config:/etc/gitlab
      - gitlab_data:/var/opt/gitlab
volumes:
  gitlab_config:
  gitlab_data:
`,
    affiliateLinks,
    features: ["CI/CD integrado sin herramientas externas", "Registro de contenedores propio", "Gestión de issues y epics"],
    techStack: ["Ruby on Rails", "PostgreSQL", "Redis"],
    pros: ["Todo el ciclo DevOps en una sola plataforma"],
    cons: ["Requiere bastante más RAM que Gitea (4GB+ recomendado)"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "jenkins",
    name: "Jenkins",
    slug: "jenkins",
    replaces: ["CircleCI"],
    category: "DevTools",
    description:
      "Jenkins es el servidor de automatización de CI/CD más extendido y extensible mediante plugins, para equipos que quieren control total de sus pipelines sin depender de un SaaS.",
    shortDescription: "Servidor de CI/CD extensible, alternativa auto-hospedada a CircleCI.",
    websiteUrl: "https://www.jenkins.io",
    githubUrl: "https://github.com/jenkinsci/jenkins",
    starsCount: 23000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  jenkins:
    image: jenkins/jenkins:lts
    restart: unless-stopped
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_data:/var/jenkins_home
volumes:
  jenkins_data:
`,
    affiliateLinks,
    features: ["Miles de plugins de la comunidad", "Pipelines como código (Jenkinsfile)", "Soporte para cualquier lenguaje o runner"],
    techStack: ["Java"],
    pros: ["El ecosistema de plugins más grande de CI/CD"],
    cons: ["Configuración inicial más manual que las SaaS modernas"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "portainer",
    name: "Portainer",
    slug: "portainer",
    replaces: ["Docker Desktop"],
    category: "DevTools",
    description:
      "Portainer ofrece un panel visual para gestionar contenedores, stacks e imágenes Docker o Kubernetes, ideal para administrar tus servidores sin memorizar comandos de Docker CLI.",
    shortDescription: "Panel visual para gestionar Docker/Kubernetes, alternativa a la CLI de Docker.",
    websiteUrl: "https://www.portainer.io",
    githubUrl: "https://github.com/portainer/portainer",
    starsCount: 30000,
    license: "Zlib",
    dockerCompose: `version: "3.9"
services:
  portainer:
    image: portainer/portainer-ce:latest
    restart: unless-stopped
    ports:
      - "9443:9443"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - portainer_data:/data
volumes:
  portainer_data:
`,
    affiliateLinks,
    features: ["Gestión visual de contenedores y stacks", "Soporta Docker, Swarm y Kubernetes", "Control de acceso por equipos"],
    techStack: ["Go", "Angular"],
    pros: ["Reduce muchísimo la fricción de administrar Docker por SSH"],
    cons: ["Requiere acceso al socket de Docker del host, cuidar permisos"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "directus",
    name: "Directus",
    slug: "directus",
    replaces: ["Contentful"],
    category: "DevTools",
    description:
      "Directus convierte cualquier base de datos SQL en un backend headless con API REST/GraphQL y un panel de administración auto-generado, como alternativa auto-hospedable a Contentful.",
    shortDescription: "CMS headless sobre tu propia base de datos, alternativa a Contentful.",
    websiteUrl: "https://directus.io",
    githubUrl: "https://github.com/directus/directus",
    starsCount: 29000,
    license: "BUSL-1.1",
    dockerCompose: `version: "3.9"
services:
  directus:
    image: directus/directus:latest
    restart: unless-stopped
    ports:
      - "8055:8055"
    environment:
      - KEY=change-me-key
      - SECRET=change-me-secret
      - DB_CLIENT=pg
      - DB_HOST=directus-db
      - DB_DATABASE=directus
      - DB_USER=directus
      - DB_PASSWORD=directus
    depends_on:
      - directus-db
  directus-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=directus
      - POSTGRES_PASSWORD=directus
      - POSTGRES_DB=directus
    volumes:
      - directus_pg_data:/var/lib/postgresql/data
volumes:
  directus_pg_data:
`,
    affiliateLinks,
    features: ["API REST y GraphQL autogeneradas", "Panel de administración configurable", "Se conecta a bases de datos SQL existentes"],
    techStack: ["Node.js", "Vue.js", "PostgreSQL"],
    pros: ["No bloquea tus datos en un formato propietario"],
    cons: ["Licencia BUSL-1.1 restringe ofrecerlo como SaaS competidor"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "strapi",
    name: "Strapi",
    slug: "strapi",
    replaces: ["Contentful"],
    category: "DevTools",
    description:
      "Strapi es el CMS headless open source más popular en Node.js, con tipos de contenido personalizables y una API REST/GraphQL lista para consumir desde cualquier frontend.",
    shortDescription: "El CMS headless open source más popular, alternativa a Contentful.",
    websiteUrl: "https://strapi.io",
    githubUrl: "https://github.com/strapi/strapi",
    starsCount: 64000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  strapi:
    image: strapi/strapi:latest
    restart: unless-stopped
    ports:
      - "1337:1337"
    environment:
      - DATABASE_CLIENT=postgres
      - DATABASE_HOST=strapi-db
      - DATABASE_NAME=strapi
      - DATABASE_USERNAME=strapi
      - DATABASE_PASSWORD=strapi
    volumes:
      - strapi_data:/srv/app
    depends_on:
      - strapi-db
  strapi-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=strapi
      - POSTGRES_PASSWORD=strapi
      - POSTGRES_DB=strapi
    volumes:
      - strapi_pg_data:/var/lib/postgresql/data
volumes:
  strapi_data:
  strapi_pg_data:
`,
    affiliateLinks,
    features: ["Tipos de contenido 100% personalizables", "API REST y GraphQL", "Marketplace de plugins"],
    techStack: ["Node.js", "React", "PostgreSQL"],
    pros: ["Licencia MIT y la comunidad más grande de CMS headless JS"],
    cons: ["Migraciones entre versiones mayores requieren cuidado"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "pocketbase",
    name: "PocketBase",
    slug: "pocketbase",
    replaces: ["Firebase"],
    category: "DevTools",
    description:
      "PocketBase es un backend-as-a-service en un solo archivo binario: base de datos SQLite, autenticación, storage de archivos y API en tiempo real, ideal para MVPs y apps pequeñas.",
    shortDescription: "Backend-as-a-service en un solo binario, alternativa mínima a Firebase.",
    websiteUrl: "https://pocketbase.io",
    githubUrl: "https://github.com/pocketbase/pocketbase",
    starsCount: 40000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    restart: unless-stopped
    ports:
      - "8090:8090"
    volumes:
      - pocketbase_data:/pb/pb_data
volumes:
  pocketbase_data:
`,
    affiliateLinks,
    features: ["Auth, storage y base de datos en un binario", "API en tiempo real vía WebSockets", "Panel de administración incluido"],
    techStack: ["Go", "SQLite"],
    pros: ["El despliegue más simple de toda la categoría backend-as-a-service"],
    cons: ["SQLite limita la escalabilidad horizontal a gran volumen"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "hasura",
    name: "Hasura",
    slug: "hasura",
    replaces: ["Firebase", "AWS AppSync"],
    category: "DevTools",
    description:
      "Hasura genera una API GraphQL y REST en tiempo real instantáneamente a partir de tu base de datos PostgreSQL, con permisos granulares, como alternativa a Firebase o AWS AppSync.",
    shortDescription: "API GraphQL instantánea sobre PostgreSQL, alternativa a Firebase/AppSync.",
    websiteUrl: "https://hasura.io",
    githubUrl: "https://github.com/hasura/graphql-engine",
    starsCount: 31000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  hasura:
    image: hasura/graphql-engine:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - HASURA_GRAPHQL_DATABASE_URL=postgres://hasura:hasura@hasura-db:5432/hasura
      - HASURA_GRAPHQL_ADMIN_SECRET=change-me-super-secret
    depends_on:
      - hasura-db
  hasura-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=hasura
      - POSTGRES_PASSWORD=hasura
      - POSTGRES_DB=hasura
    volumes:
      - hasura_pg_data:/var/lib/postgresql/data
volumes:
  hasura_pg_data:
`,
    affiliateLinks,
    features: ["GraphQL y REST instantáneos sobre PostgreSQL", "Suscripciones en tiempo real", "Permisos a nivel de fila"],
    techStack: ["Haskell", "PostgreSQL"],
    pros: ["No requiere escribir resolvers manualmente"],
    cons: ["Pensado principalmente para PostgreSQL/algunas otras BD, no NoSQL"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "meilisearch",
    name: "Meilisearch",
    slug: "meilisearch",
    replaces: ["Algolia"],
    category: "DevTools",
    description:
      "Meilisearch es un motor de búsqueda rápido y tolerante a errores tipográficos, fácil de integrar en cualquier app, pensado como alternativa auto-hospedable a Algolia.",
    shortDescription: "Motor de búsqueda rápido y tolerante a errores, alternativa a Algolia.",
    websiteUrl: "https://www.meilisearch.com",
    githubUrl: "https://github.com/meilisearch/meilisearch",
    starsCount: 46000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  meilisearch:
    image: getmeili/meilisearch:latest
    restart: unless-stopped
    ports:
      - "7700:7700"
    environment:
      - MEILI_MASTER_KEY=change-me-super-secret
    volumes:
      - meilisearch_data:/meili_data
volumes:
  meilisearch_data:
`,
    affiliateLinks,
    features: ["Búsqueda tolerante a errores tipográficos", "Resultados en menos de 50ms", "Filtros, sinónimos y geobúsqueda"],
    techStack: ["Rust"],
    pros: ["Extremadamente rápido de instalar y sin costo por búsquedas"],
    cons: ["Menos features de analítica de búsqueda que Algolia"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "typesense",
    name: "Typesense",
    slug: "typesense",
    replaces: ["Algolia"],
    category: "DevTools",
    description:
      "Typesense es un motor de búsqueda open source enfocado en simplicidad y velocidad, con búsqueda federada y geosearch, como alternativa directa a Algolia sin coste por request.",
    shortDescription: "Motor de búsqueda simple y veloz, otra alternativa open source a Algolia.",
    websiteUrl: "https://typesense.org",
    githubUrl: "https://github.com/typesense/typesense",
    starsCount: 21000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  typesense:
    image: typesense/typesense:latest
    restart: unless-stopped
    ports:
      - "8108:8108"
    environment:
      - TYPESENSE_API_KEY=change-me-super-secret
      - TYPESENSE_DATA_DIR=/data
    volumes:
      - typesense_data:/data
volumes:
  typesense_data:
`,
    affiliateLinks,
    features: ["Búsqueda federada entre múltiples colecciones", "Geosearch y filtros facetados", "Alta disponibilidad con clustering"],
    techStack: ["C++"],
    pros: ["Documentación y DX muy cuidadas"],
    cons: ["Comunidad algo más pequeña que Meilisearch"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "novu",
    name: "Novu",
    slug: "novu",
    replaces: ["OneSignal"],
    category: "DevTools",
    description:
      "Novu es una infraestructura de notificaciones que unifica email, SMS, push y in-app en una sola API con plantillas y flujos visuales, como alternativa auto-hospedable a OneSignal.",
    shortDescription: "Infraestructura de notificaciones multicanal, alternativa a OneSignal.",
    websiteUrl: "https://novu.co",
    githubUrl: "https://github.com/novuhq/novu",
    starsCount: 34000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  novu:
    image: novuhq/novu-api:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - MONGO_URL=mongodb://novu-db:27017/novu
      - REDIS_HOST=novu-redis
    depends_on:
      - novu-db
      - novu-redis
  novu-db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - novu_mongo_data:/data/db
  novu-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  novu_mongo_data:
`,
    affiliateLinks,
    features: ["Email, SMS, push e in-app en una API", "Editor visual de flujos de notificación", "Centro de notificaciones embebible"],
    techStack: ["NestJS", "MongoDB", "Redis"],
    pros: ["Unifica todos los canales de notificación en un solo lugar"],
    cons: ["Aún necesitas conectar tus propios proveedores de envío (SMTP, SMS)"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "windmill",
    name: "Windmill",
    slug: "windmill",
    replaces: ["Retool"],
    category: "DevTools",
    description:
      "Windmill combina automatización de scripts, flujos y paneles internos generados a partir de código Python, TypeScript o Go, como alternativa auto-hospedable a Retool.",
    shortDescription: "Scripts, flujos y paneles internos, alternativa auto-hospedable a Retool.",
    websiteUrl: "https://www.windmill.dev",
    githubUrl: "https://github.com/windmill-labs/windmill",
    starsCount: 9000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  windmill:
    image: ghcr.io/windmill-labs/windmill:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://windmill:windmill@windmill-db:5432/windmill
    depends_on:
      - windmill-db
  windmill-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=windmill
      - POSTGRES_PASSWORD=windmill
      - POSTGRES_DB=windmill
    volumes:
      - windmill_pg_data:/var/lib/postgresql/data
volumes:
  windmill_pg_data:
`,
    affiliateLinks,
    features: ["Scripts en Python, TypeScript y Go", "Paneles internos autogenerados", "Flujos y triggers programados"],
    techStack: ["Rust", "TypeScript", "PostgreSQL"],
    pros: ["Ejecuta código real, no solo low-code visual"],
    cons: ["Curva de aprendizaje mayor si el equipo no programa"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "unleash",
    name: "Unleash",
    slug: "unleash",
    replaces: ["LaunchDarkly"],
    category: "DevTools",
    description:
      "Unleash es una plataforma de feature flags open source con segmentación de usuarios, rollouts graduales y SDKs para todos los lenguajes populares, alternativa a LaunchDarkly.",
    shortDescription: "Feature flags open source, alternativa auto-hospedable a LaunchDarkly.",
    websiteUrl: "https://www.getunleash.io",
    githubUrl: "https://github.com/Unleash/unleash",
    starsCount: 13000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  unleash:
    image: unleashorg/unleash-server:latest
    restart: unless-stopped
    ports:
      - "4242:4242"
    environment:
      - DATABASE_URL=postgres://unleash:unleash@unleash-db:5432/unleash
    depends_on:
      - unleash-db
  unleash-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=unleash
      - POSTGRES_PASSWORD=unleash
      - POSTGRES_DB=unleash
    volumes:
      - unleash_pg_data:/var/lib/postgresql/data
volumes:
  unleash_pg_data:
`,
    affiliateLinks,
    features: ["Rollouts graduales y segmentación", "SDKs para +20 lenguajes", "Estrategias de activación personalizadas"],
    techStack: ["Node.js", "PostgreSQL"],
    pros: ["Sin cobro por número de flags o usuarios evaluados"],
    cons: ["El panel de analítica de flags es más básico que LaunchDarkly"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "listmonk",
    name: "listmonk",
    slug: "listmonk",
    replaces: ["Mailchimp"],
    category: "DevTools",
    description:
      "listmonk es un gestor de newsletters y campañas de email de alto rendimiento, con listas, plantillas y estadísticas, auto-hospedable como alternativa a Mailchimp sin coste por suscriptor.",
    shortDescription: "Newsletters y campañas de email, alternativa a Mailchimp sin coste por suscriptor.",
    websiteUrl: "https://listmonk.app",
    githubUrl: "https://github.com/knadh/listmonk",
    starsCount: 7000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  listmonk:
    image: listmonk/listmonk:latest
    restart: unless-stopped
    ports:
      - "9000:9000"
    environment:
      - LISTMONK_db__host=listmonk-db
      - LISTMONK_db__user=listmonk
      - LISTMONK_db__password=listmonk
      - LISTMONK_db__database=listmonk
    depends_on:
      - listmonk-db
  listmonk-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=listmonk
      - POSTGRES_PASSWORD=listmonk
      - POSTGRES_DB=listmonk
    volumes:
      - listmonk_pg_data:/var/lib/postgresql/data
volumes:
  listmonk_pg_data:
`,
    affiliateLinks,
    features: ["Listas y segmentación de suscriptores", "Plantillas de campaña con estadísticas", "Alto rendimiento de envío"],
    techStack: ["Go", "Vue.js", "PostgreSQL"],
    pros: ["Sin límites artificiales de suscriptores ni envíos"],
    cons: ["Necesitas tu propio proveedor SMTP para el envío"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "documenso",
    name: "Documenso",
    slug: "documenso",
    replaces: ["DocuSign"],
    category: "DevTools",
    description:
      "Documenso es la alternativa open source a DocuSign para firmar documentos electrónicamente, con flujos de firma, plantillas y verificación, todo auto-hospedable.",
    shortDescription: "Firma electrónica de documentos, alternativa open source a DocuSign.",
    websiteUrl: "https://documenso.com",
    githubUrl: "https://github.com/documenso/documenso",
    starsCount: 8000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  documenso:
    image: documenso/documenso:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NEXTAUTH_SECRET=change-me-super-secret
      - NEXT_PUBLIC_WEBAPP_URL=http://localhost:3000
      - DATABASE_URL=postgresql://documenso:documenso@documenso-db:5432/documenso
    depends_on:
      - documenso-db
  documenso-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=documenso
      - POSTGRES_PASSWORD=documenso
      - POSTGRES_DB=documenso
    volumes:
      - documenso_pg_data:/var/lib/postgresql/data
volumes:
  documenso_pg_data:
`,
    affiliateLinks,
    features: ["Flujos de firma con múltiples firmantes", "Plantillas de documentos reutilizables", "Verificación criptográfica de firmas"],
    techStack: ["Next.js", "PostgreSQL"],
    pros: ["Sin coste por documento firmado al auto-hospedarlo"],
    cons: ["Validez legal de la firma varía según jurisdicción, revisar normativa local"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "uptime-kuma",
    name: "Uptime Kuma",
    slug: "uptime-kuma",
    replaces: ["UptimeRobot", "Pingdom"],
    category: "DevTools",
    description:
      "Uptime Kuma monitoriza la disponibilidad de tus sitios y servicios con notificaciones a más de 90 canales distintos, en una interfaz limpia y muy fácil de auto-hospedar.",
    shortDescription: "Monitor de disponibilidad autohospedado, alternativa a UptimeRobot.",
    websiteUrl: "https://github.com/louislam/uptime-kuma",
    githubUrl: "https://github.com/louislam/uptime-kuma",
    starsCount: 57000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  uptime-kuma:
    image: louislam/uptime-kuma:latest
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - uptime_kuma_data:/app/data
volumes:
  uptime_kuma_data:
`,
    affiliateLinks,
    features: ["Monitoreo HTTP(s), TCP, DNS y más", "Notificaciones a +90 servicios", "Páginas de estado públicas"],
    techStack: ["Node.js", "Vue.js", "SQLite"],
    pros: ["Uno de los proyectos self-hosted más queridos por la comunidad"],
    cons: ["No incluye monitoreo de infraestructura profundo (CPU/RAM) de forma nativa"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
    featured: true,
  },
  {
    id: "grafana",
    name: "Grafana",
    slug: "grafana",
    replaces: ["Datadog"],
    category: "DevTools",
    description:
      "Grafana visualiza métricas, logs y trazas de casi cualquier fuente de datos en dashboards altamente personalizables, siendo el estándar de facto para observabilidad auto-hospedada frente a Datadog.",
    shortDescription: "Dashboards de observabilidad, alternativa auto-hospedada a Datadog.",
    websiteUrl: "https://grafana.com",
    githubUrl: "https://github.com/grafana/grafana",
    demoUrl: "https://play.grafana.org",
    starsCount: 66000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  grafana:
    image: grafana/grafana:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=change-me
    volumes:
      - grafana_data:/var/lib/grafana
volumes:
  grafana_data:
`,
    affiliateLinks,
    features: ["Dashboards conectados a decenas de fuentes de datos", "Alertas multicanal", "Explorador de logs y trazas"],
    techStack: ["Go", "React"],
    pros: ["El estándar de la industria en dashboards de observabilidad"],
    cons: ["Necesitas Prometheus/Loki/Tempo aparte para la recolección de datos"],
    tags: ["docker-ready", "1-click-deploy"],
  },

  // ---------- CRM ----------
  {
    id: "espocrm",
    name: "EspoCRM",
    slug: "espocrm",
    replaces: ["Salesforce"],
    category: "CRM",
    description:
      "EspoCRM es un CRM open source con gestión de leads, oportunidades y automatización de ventas, personalizable mediante un editor visual de entidades, como alternativa a Salesforce.",
    shortDescription: "CRM de ventas personalizable, alternativa open source a Salesforce.",
    websiteUrl: "https://www.espocrm.com",
    githubUrl: "https://github.com/espocrm/espocrm",
    starsCount: 3000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  espocrm:
    image: espocrm/espocrm:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - ESPOCRM_DATABASE_HOST=espocrm-db
      - ESPOCRM_DATABASE_USER=espocrm
      - ESPOCRM_DATABASE_PASSWORD=espocrm
    depends_on:
      - espocrm-db
  espocrm-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=espocrm
      - MYSQL_USER=espocrm
      - MYSQL_PASSWORD=espocrm
    volumes:
      - espocrm_db_data:/var/lib/mysql
volumes:
  espocrm_db_data:
`,
    affiliateLinks,
    features: ["Editor visual de entidades personalizadas", "Automatización de flujos de ventas", "Gestión de leads y oportunidades"],
    techStack: ["PHP", "MySQL"],
    pros: ["Muy personalizable sin escribir código"],
    cons: ["Interfaz menos moderna que los CRM SaaS actuales"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "suitecrm",
    name: "SuiteCRM",
    slug: "suitecrm",
    replaces: ["Salesforce"],
    category: "CRM",
    description:
      "SuiteCRM es un CRM empresarial maduro con ventas, marketing y soporte integrados, nacido como fork de SugarCRM Community, pensado para reemplazar Salesforce en organizaciones grandes.",
    shortDescription: "CRM empresarial completo, alternativa madura a Salesforce.",
    websiteUrl: "https://suitecrm.com",
    githubUrl: "https://github.com/salesagility/SuiteCRM",
    starsCount: 5000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  suitecrm:
    image: bitnami/suitecrm:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - SUITECRM_DATABASE_HOST=suitecrm-db
      - SUITECRM_DATABASE_USER=suitecrm
      - SUITECRM_DATABASE_PASSWORD=suitecrm
    depends_on:
      - suitecrm-db
  suitecrm-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=suitecrm
      - MYSQL_USER=suitecrm
      - MYSQL_PASSWORD=suitecrm
    volumes:
      - suitecrm_db_data:/var/lib/mysql
volumes:
  suitecrm_db_data:
`,
    affiliateLinks,
    features: ["Módulos de ventas, marketing y soporte", "Flujos de trabajo (workflows) visuales", "Amplio ecosistema de extensiones"],
    techStack: ["PHP", "MySQL"],
    pros: ["Muy completo para procesos comerciales complejos"],
    cons: ["Interfaz y stack técnico se sienten algo más antiguos"],
    tags: ["docker-ready"],
  },
  {
    id: "krayin-crm",
    name: "Krayin CRM",
    slug: "krayin-crm",
    replaces: ["Zoho CRM"],
    category: "CRM",
    description:
      "Krayin es un CRM open source construido sobre Laravel, con gestión de leads, pipeline visual de ventas y correo integrado, como alternativa moderna y ligera a Zoho CRM.",
    shortDescription: "CRM ligero sobre Laravel, alternativa moderna a Zoho CRM.",
    websiteUrl: "https://krayincrm.com",
    githubUrl: "https://github.com/krayin/laravel-crm",
    starsCount: 2000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  krayin:
    image: krayin/laravel-crm:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - DB_HOST=krayin-db
      - DB_DATABASE=krayin
      - DB_USERNAME=krayin
      - DB_PASSWORD=krayin
    depends_on:
      - krayin-db
  krayin-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=krayin
      - MYSQL_USER=krayin
      - MYSQL_PASSWORD=krayin
    volumes:
      - krayin_db_data:/var/lib/mysql
volumes:
  krayin_db_data:
`,
    affiliateLinks,
    features: ["Pipeline visual de ventas", "Correo integrado por lead", "Extensible con paquetes Laravel"],
    techStack: ["PHP", "Laravel", "MySQL"],
    pros: ["Licencia MIT y stack Laravel muy conocido"],
    cons: ["Comunidad más pequeña que EspoCRM o SuiteCRM"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "monica",
    name: "Monica",
    slug: "monica",
    replaces: ["Clay"],
    category: "CRM",
    description:
      "Monica es un CRM personal para llevar registro de tus relaciones: contactos, recordatorios de cumpleaños, notas de conversaciones e interacciones importantes con amigos y familia.",
    shortDescription: "CRM personal para tus relaciones, alternativa a Clay.",
    websiteUrl: "https://www.monicahq.com",
    githubUrl: "https://github.com/monicahq/monica",
    starsCount: 21000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  monica:
    image: monica/monica:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - DB_HOST=monica-db
      - DB_DATABASE=monica
      - DB_USERNAME=monica
      - DB_PASSWORD=monica
      - APP_KEY=base64:change-me-32-char-key
    depends_on:
      - monica-db
  monica-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=monica
      - MYSQL_USER=monica
      - MYSQL_PASSWORD=monica
    volumes:
      - monica_db_data:/var/lib/mysql
volumes:
  monica_db_data:
`,
    affiliateLinks,
    features: ["Recordatorios de fechas importantes", "Notas de conversaciones e interacciones", "Registro de regalos y actividades"],
    techStack: ["PHP", "Laravel", "MySQL"],
    pros: ["Pensado para relaciones personales, no solo ventas B2B"],
    cons: ["No sustituye un CRM de ventas B2B con pipeline comercial"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "odoo",
    name: "Odoo",
    slug: "odoo",
    replaces: ["Salesforce", "HubSpot"],
    category: "CRM",
    description:
      "Odoo es una suite empresarial modular que incluye CRM, ventas, inventario, contabilidad y más, todo integrado, como alternativa auto-hospedable a Salesforce o HubSpot en su edición Community.",
    shortDescription: "Suite empresarial modular con CRM, alternativa a Salesforce/HubSpot.",
    websiteUrl: "https://www.odoo.com",
    githubUrl: "https://github.com/odoo/odoo",
    starsCount: 39000,
    license: "LGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  odoo:
    image: odoo:17
    restart: unless-stopped
    ports:
      - "8069:8069"
    environment:
      - HOST=odoo-db
      - USER=odoo
      - PASSWORD=odoo
    depends_on:
      - odoo-db
  odoo-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=odoo
      - POSTGRES_PASSWORD=odoo
      - POSTGRES_DB=postgres
    volumes:
      - odoo_pg_data:/var/lib/postgresql/data
volumes:
  odoo_pg_data:
`,
    affiliateLinks,
    features: ["CRM, ventas e inventario integrados", "Cientos de módulos oficiales y de terceros", "Automatizaciones entre módulos"],
    techStack: ["Python", "PostgreSQL"],
    pros: ["Cubre mucho más que CRM: ERP completo si lo necesitas"],
    cons: ["Muchos módulos avanzados solo en la edición Enterprise de pago"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "mautic",
    name: "Mautic",
    slug: "mautic",
    replaces: ["HubSpot"],
    category: "CRM",
    description:
      "Mautic es una plataforma de automatización de marketing con campañas, landing pages, scoring de leads y email marketing, como alternativa open source a las funciones de marketing de HubSpot.",
    shortDescription: "Automatización de marketing, alternativa open source a HubSpot Marketing.",
    websiteUrl: "https://www.mautic.org",
    githubUrl: "https://github.com/mautic/mautic",
    starsCount: 9000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  mautic:
    image: mautic/mautic:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - MAUTIC_DB_HOST=mautic-db
      - MAUTIC_DB_USER=mautic
      - MAUTIC_DB_PASSWORD=mautic
      - MAUTIC_DB_NAME=mautic
    depends_on:
      - mautic-db
  mautic-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=mautic
      - MYSQL_USER=mautic
      - MYSQL_PASSWORD=mautic
    volumes:
      - mautic_db_data:/var/lib/mysql
volumes:
  mautic_db_data:
`,
    affiliateLinks,
    features: ["Campañas de automatización visuales", "Landing pages y formularios", "Scoring y segmentación de leads"],
    techStack: ["PHP", "Symfony", "MySQL"],
    pros: ["Sin coste por número de contactos, a diferencia de HubSpot"],
    cons: ["Requiere más configuración inicial de servidores de correo"],
    tags: ["docker-ready"],
  },
  {
    id: "zammad",
    name: "Zammad",
    slug: "zammad",
    replaces: ["Zendesk"],
    category: "CRM",
    description:
      "Zammad es un sistema de tickets de soporte con bandeja multicanal, base de conocimiento y automatizaciones, ofrecido como alternativa auto-hospedable a Zendesk.",
    shortDescription: "Sistema de tickets de soporte, alternativa auto-hospedable a Zendesk.",
    websiteUrl: "https://zammad.org",
    githubUrl: "https://github.com/zammad/zammad",
    starsCount: 8000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  zammad:
    image: zammad/zammad:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - POSTGRESQL_HOST=zammad-db
      - POSTGRESQL_USER=zammad
      - POSTGRESQL_PASS=zammad
    depends_on:
      - zammad-db
  zammad-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=zammad
      - POSTGRES_PASSWORD=zammad
      - POSTGRES_DB=zammad_production
    volumes:
      - zammad_pg_data:/var/lib/postgresql/data
volumes:
  zammad_pg_data:
`,
    affiliateLinks,
    features: ["Bandeja de tickets multicanal", "Base de conocimiento integrada", "Automatizaciones y SLAs"],
    techStack: ["Ruby on Rails", "PostgreSQL", "Elasticsearch"],
    pros: ["Interfaz moderna comparada con otros helpdesks open source"],
    cons: ["Elasticsearch añade un servicio más que mantener"],
    tags: ["docker-ready"],
  },
  {
    id: "freescout",
    name: "FreeScout",
    slug: "freescout",
    replaces: ["Help Scout"],
    category: "CRM",
    description:
      "FreeScout es una bandeja de soporte al cliente ligera y gratuita inspirada en Help Scout, con múltiples bandejas compartidas, notas privadas y automatizaciones.",
    shortDescription: "Bandeja de soporte ligera, alternativa gratuita a Help Scout.",
    websiteUrl: "https://freescout.net",
    githubUrl: "https://github.com/freescout-helpdesk/freescout",
    starsCount: 2000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  freescout:
    image: tiredofit/freescout:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - DB_HOST=freescout-db
      - DB_NAME=freescout
      - DB_USER=freescout
      - DB_PASS=freescout
    depends_on:
      - freescout-db
  freescout-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=freescout
      - MYSQL_USER=freescout
      - MYSQL_PASSWORD=freescout
    volumes:
      - freescout_db_data:/var/lib/mysql
volumes:
  freescout_db_data:
`,
    affiliateLinks,
    features: ["Múltiples bandejas compartidas", "Notas privadas entre agentes", "Módulos gratuitos y de pago de la comunidad"],
    techStack: ["PHP", "Laravel", "MySQL"],
    pros: ["Muy ligero comparado con Zendesk o Help Scout"],
    cons: ["Algunos módulos útiles son de pago (aunque económicos)"],
    tags: ["docker-ready"],
  },
  {
    id: "yetiforce-crm",
    name: "YetiForce CRM",
    slug: "yetiforce-crm",
    replaces: ["Salesforce"],
    category: "CRM",
    description:
      "YetiForce es un CRM open source muy completo con más de 50 módulos (ventas, proyectos, inventario, soporte) integrados en una sola plataforma, como alternativa gratuita a Salesforce.",
    shortDescription: "CRM con más de 50 módulos integrados, alternativa gratuita a Salesforce.",
    websiteUrl: "https://www.yetiforce.com",
    githubUrl: "https://github.com/YetiForceCompany/YetiForceCRM",
    starsCount: 2000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  yetiforce:
    image: yetiforce/yetiforce:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - DB_HOST=yetiforce-db
      - DB_NAME=yetiforce
      - DB_USER=yetiforce
      - DB_PASS=yetiforce
    depends_on:
      - yetiforce-db
  yetiforce-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=yetiforce
      - MYSQL_USER=yetiforce
      - MYSQL_PASSWORD=yetiforce
    volumes:
      - yetiforce_db_data:/var/lib/mysql
volumes:
  yetiforce_db_data:
`,
    affiliateLinks,
    features: ["Más de 50 módulos integrados", "Gestión de proyectos e inventario incluida", "100% gratuito, sin ediciones de pago"],
    techStack: ["PHP", "MySQL"],
    pros: ["Totalmente gratuito, sin versión Enterprise oculta"],
    cons: ["Tantos módulos pueden abrumar en la configuración inicial"],
    tags: ["docker-ready"],
  },

  // ---------- Inteligencia Artificial ----------
  {
    id: "ollama",
    name: "Ollama",
    slug: "ollama",
    replaces: ["OpenAI API"],
    category: "AI",
    description:
      "Ollama permite descargar y ejecutar modelos de lenguaje open source (Llama, Mistral, Gemma...) en tu propio servidor con una API compatible, sin enviar tus datos a terceros.",
    shortDescription: "Ejecuta LLMs open source localmente, alternativa a la API de OpenAI.",
    websiteUrl: "https://ollama.com",
    githubUrl: "https://github.com/ollama/ollama",
    starsCount: 99000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  ollama:
    image: ollama/ollama:latest
    restart: unless-stopped
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
volumes:
  ollama_data:
`,
    affiliateLinks,
    features: ["Descarga modelos con un solo comando", "API compatible con múltiples clientes", "Soporte GPU y CPU"],
    techStack: ["Go", "Llama.cpp"],
    pros: ["Tus datos nunca salen de tu servidor"],
    cons: ["La calidad depende del modelo y del hardware disponible"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
    featured: true,
  },
  {
    id: "localai",
    name: "LocalAI",
    slug: "localai",
    replaces: ["OpenAI API"],
    category: "AI",
    description:
      "LocalAI expone una API 100% compatible con la de OpenAI (chat, imágenes, embeddings, audio) pero ejecutando modelos open source en tu propia infraestructura, sin claves de API externas.",
    shortDescription: "API compatible con OpenAI corriendo modelos locales, sin costes por token.",
    websiteUrl: "https://localai.io",
    githubUrl: "https://github.com/mudler/LocalAI",
    starsCount: 26000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  localai:
    image: localai/localai:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - localai_models:/models
volumes:
  localai_models:
`,
    affiliateLinks,
    features: ["API compatible con el SDK de OpenAI", "Chat, imágenes, embeddings y audio", "Corre modelos GGUF, GGML y más"],
    techStack: ["Go", "C++"],
    pros: ["Migración casi directa desde código que ya usa la API de OpenAI"],
    cons: ["Requiere hardware decente (idealmente GPU) para modelos grandes"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "khoj",
    name: "Khoj",
    slug: "khoj",
    replaces: ["ChatGPT Plus"],
    category: "AI",
    description:
      "Khoj es un asistente de IA personal auto-hospedable que busca y responde preguntas sobre tus propios documentos, notas y navegación web, como una segunda memoria aumentada por IA.",
    shortDescription: "Asistente de IA personal sobre tus documentos, alternativa a ChatGPT Plus.",
    websiteUrl: "https://khoj.dev",
    githubUrl: "https://github.com/khoj-ai/khoj",
    starsCount: 15000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  khoj:
    image: ghcr.io/khoj-ai/khoj:latest
    restart: unless-stopped
    ports:
      - "42110:42110"
    environment:
      - KHOJ_DJANGO_SECRET_KEY=change-me-super-secret
    volumes:
      - khoj_data:/root/.khoj
volumes:
  khoj_data:
`,
    affiliateLinks,
    features: ["Búsqueda semántica sobre tus notas y documentos", "Chat con tus propios PDFs y markdown", "Integración con Obsidian y Notion"],
    techStack: ["Python", "Django"],
    pros: ["Combina tus propios datos con modelos locales o remotos"],
    cons: ["Configurar la indexación inicial de documentos toma algo de tiempo"],
    tags: ["docker-ready"],
  },
  {
    id: "vllm",
    name: "vLLM",
    slug: "vllm",
    replaces: ["OpenAI API"],
    category: "AI",
    description:
      "vLLM es un motor de inferencia de alto rendimiento para servir modelos de lenguaje a gran escala con máximo throughput, exponiendo una API compatible con OpenAI para producción.",
    shortDescription: "Motor de inferencia LLM de alto rendimiento, alternativa a la API de OpenAI en producción.",
    websiteUrl: "https://docs.vllm.ai",
    githubUrl: "https://github.com/vllm-project/vllm",
    starsCount: 29000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  vllm:
    image: vllm/vllm-openai:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    command: ["--model", "mistralai/Mistral-7B-Instruct-v0.2"]
    volumes:
      - vllm_cache:/root/.cache/huggingface
volumes:
  vllm_cache:
`,
    affiliateLinks,
    features: ["Throughput muy superior gracias a PagedAttention", "API compatible con OpenAI", "Soporta decenas de arquitecturas de modelos"],
    techStack: ["Python", "CUDA"],
    pros: ["Pensado específicamente para servir LLMs en producción a escala"],
    cons: ["Requiere GPU con VRAM suficiente para el modelo elegido"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "anythingllm",
    name: "AnythingLLM",
    slug: "anythingllm",
    replaces: ["ChatGPT Plus"],
    category: "AI",
    description:
      "AnythingLLM convierte cualquier documento en una base de conocimiento consultable por chat (RAG), con soporte multiusuario y múltiples proveedores de modelos, local o en la nube.",
    shortDescription: "Chat RAG sobre tus documentos con multiusuario, alternativa a ChatGPT Plus.",
    websiteUrl: "https://anythingllm.com",
    githubUrl: "https://github.com/Mintplex-Labs/anything-llm",
    starsCount: 24000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  anythingllm:
    image: mintplexlabs/anythingllm:latest
    restart: unless-stopped
    ports:
      - "3001:3001"
    volumes:
      - anythingllm_data:/app/server/storage
volumes:
  anythingllm_data:
`,
    affiliateLinks,
    features: ["RAG sobre tus propios documentos", "Multiusuario con permisos por workspace", "Compatible con Ollama, OpenAI y más proveedores"],
    techStack: ["Node.js", "React", "SQLite"],
    pros: ["Funciona tanto con modelos locales como con APIs externas"],
    cons: ["La calidad de las respuestas depende del modelo que conectes"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "flowise",
    name: "Flowise",
    slug: "flowise",
    replaces: ["Voiceflow"],
    category: "AI",
    description:
      "Flowise permite construir agentes y flujos de IA arrastrando y soltando bloques (LLMs, herramientas, memoria) sin escribir código, como alternativa visual a Voiceflow.",
    shortDescription: "Constructor visual de agentes de IA, alternativa a Voiceflow.",
    websiteUrl: "https://flowiseai.com",
    githubUrl: "https://github.com/FlowiseAI/Flowise",
    starsCount: 34000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  flowise:
    image: flowiseai/flowise:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - flowise_data:/root/.flowise
volumes:
  flowise_data:
`,
    affiliateLinks,
    features: ["Editor visual drag-and-drop de flujos de IA", "Soporta agentes, herramientas y memoria", "API y widget embebible"],
    techStack: ["Node.js", "React"],
    pros: ["No requiere saber programar para construir agentes básicos"],
    cons: ["Flujos muy complejos pueden volverse difíciles de depurar visualmente"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "langflow",
    name: "LangFlow",
    slug: "langflow",
    replaces: ["Voiceflow"],
    category: "AI",
    description:
      "LangFlow es un editor visual construido sobre LangChain para diseñar flujos de IA con LLMs, agentes y bases vectoriales, exportables como API, alternativa a Voiceflow.",
    shortDescription: "Editor visual sobre LangChain para flujos de IA, alternativa a Voiceflow.",
    websiteUrl: "https://www.langflow.org",
    githubUrl: "https://github.com/langflow-ai/langflow",
    starsCount: 44000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  langflow:
    image: langflowai/langflow:latest
    restart: unless-stopped
    ports:
      - "7860:7860"
    volumes:
      - langflow_data:/app/langflow
volumes:
  langflow_data:
`,
    affiliateLinks,
    features: ["Basado en el ecosistema LangChain", "Flujos exportables como API REST", "Soporta múltiples proveedores de LLM y vectores"],
    techStack: ["Python", "React"],
    pros: ["Aprovecha directamente el ecosistema de integraciones de LangChain"],
    cons: ["Puede sentirse más técnico que Flowise para no desarrolladores"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "dify",
    name: "Dify",
    slug: "dify",
    replaces: ["OpenAI API"],
    category: "AI",
    description:
      "Dify es una plataforma para diseñar, probar y desplegar aplicaciones de IA (chatbots, agentes, flujos) con un editor visual y observabilidad integrada, como alternativa a construir todo sobre la API de OpenAI a mano.",
    shortDescription: "Plataforma para crear apps de IA con editor visual y observabilidad.",
    websiteUrl: "https://dify.ai",
    githubUrl: "https://github.com/langgenius/dify",
    starsCount: 54000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  dify-api:
    image: langgenius/dify-api:latest
    restart: unless-stopped
    ports:
      - "5001:5001"
    environment:
      - DB_HOST=dify-db
      - DB_USERNAME=dify
      - DB_PASSWORD=dify
      - REDIS_HOST=dify-redis
    depends_on:
      - dify-db
      - dify-redis
  dify-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=dify
      - POSTGRES_PASSWORD=dify
      - POSTGRES_DB=dify
    volumes:
      - dify_pg_data:/var/lib/postgresql/data
  dify-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  dify_pg_data:
`,
    affiliateLinks,
    features: ["Editor visual de agentes y flujos de IA", "Observabilidad y logs de cada conversación", "Multi-modelo: OpenAI, Anthropic, locales"],
    techStack: ["Python", "Next.js", "PostgreSQL"],
    pros: ["Reduce mucho el código necesario para lanzar un producto de IA"],
    cons: ["El stack completo en producción tiene varios servicios (Weaviate/Redis)"],
    tags: ["docker-ready", "permissive-license"],
    featured: true,
  },
  {
    id: "automatic1111-sd-webui",
    name: "Stable Diffusion WebUI (AUTOMATIC1111)",
    slug: "automatic1111-sd-webui",
    replaces: ["Midjourney"],
    category: "AI",
    description:
      "La WebUI de AUTOMATIC1111 es la interfaz más popular para generar imágenes con Stable Diffusion localmente, con control total de modelos, LoRAs y extensiones, sin límite de generaciones.",
    shortDescription: "Interfaz completa para Stable Diffusion local, alternativa a Midjourney.",
    websiteUrl: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    githubUrl: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    starsCount: 145000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  sd-webui:
    image: universonic/stable-diffusion-webui:latest
    restart: unless-stopped
    ports:
      - "7860:7860"
    volumes:
      - sd_webui_models:/app/models
    # Requiere GPU NVIDIA con soporte CUDA
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
volumes:
  sd_webui_models:
`,
    affiliateLinks,
    features: ["Miles de extensiones de la comunidad", "Soporte para LoRAs y modelos personalizados", "Control total de parámetros de generación"],
    techStack: ["Python", "PyTorch"],
    pros: ["Sin límite de imágenes generadas ni suscripción mensual"],
    cons: ["Requiere GPU NVIDIA con VRAM suficiente"],
    tags: ["docker-ready"],
  },
  {
    id: "comfyui",
    name: "ComfyUI",
    slug: "comfyui",
    replaces: ["Midjourney"],
    category: "AI",
    description:
      "ComfyUI es una interfaz de nodos para Stable Diffusion que permite construir pipelines de generación de imágenes muy avanzados y reproducibles, popular entre usuarios técnicos.",
    shortDescription: "Generación de imágenes por nodos, alternativa avanzada a Midjourney.",
    websiteUrl: "https://github.com/comfyanonymous/ComfyUI",
    githubUrl: "https://github.com/comfyanonymous/ComfyUI",
    starsCount: 58000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  comfyui:
    image: yanwk/comfyui-boot:latest
    restart: unless-stopped
    ports:
      - "8188:8188"
    volumes:
      - comfyui_data:/root/ComfyUI/models
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
volumes:
  comfyui_data:
`,
    affiliateLinks,
    features: ["Pipelines de generación por nodos", "Flujos de trabajo reproducibles y compartibles", "Soporta ControlNet, LoRAs y modelos custom"],
    techStack: ["Python", "PyTorch"],
    pros: ["Máximo control sobre cada paso del pipeline de generación"],
    cons: ["Curva de aprendizaje más alta que interfaces simples de prompt"],
    tags: ["docker-ready"],
  },
  {
    id: "invokeai",
    name: "InvokeAI",
    slug: "invokeai",
    replaces: ["Midjourney"],
    category: "AI",
    description:
      "InvokeAI ofrece una interfaz pulida y orientada a creadores para Stable Diffusion, con lienzo unificado, inpainting y gestión de modelos, como alternativa local a Midjourney.",
    shortDescription: "Interfaz pulida para Stable Diffusion con lienzo unificado, alternativa a Midjourney.",
    websiteUrl: "https://invoke.ai",
    githubUrl: "https://github.com/invoke-ai/InvokeAI",
    starsCount: 24000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  invokeai:
    image: ghcr.io/invoke-ai/invokeai:latest
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - invokeai_data:/invokeai
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
volumes:
  invokeai_data:
`,
    affiliateLinks,
    features: ["Lienzo unificado con inpainting/outpainting", "Gestión visual de modelos y LoRAs", "Interfaz pensada para artistas, no solo devs"],
    techStack: ["Python", "React", "PyTorch"],
    pros: ["La interfaz más amigable para no técnicos entre las opciones locales"],
    cons: ["Requiere GPU NVIDIA con VRAM suficiente"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "bolt-diy",
    name: "Bolt.diy",
    slug: "bolt-diy",
    replaces: ["Bolt.new"],
    category: "AI",
    description:
      "Bolt.diy es la versión open source y auto-hospedable de Bolt.new: genera y ejecuta apps web completas a partir de un prompt, conectando el proveedor de IA que elijas.",
    shortDescription: "Genera apps web completas por prompt, alternativa open source a Bolt.new.",
    websiteUrl: "https://github.com/stackblitz-labs/bolt.diy",
    githubUrl: "https://github.com/stackblitz-labs/bolt.diy",
    starsCount: 14000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  bolt-diy:
    image: ghcr.io/stackblitz-labs/bolt.diy:latest
    restart: unless-stopped
    ports:
      - "5173:5173"
    environment:
      - GROQ_API_KEY=
      - OPENAI_API_KEY=
volumes: {}
`,
    affiliateLinks,
    features: ["Genera y ejecuta apps completas desde un prompt", "Conecta el proveedor de IA que prefieras", "Editor de código integrado en el navegador"],
    techStack: ["Remix", "TypeScript"],
    pros: ["Eliges tú qué proveedor de IA usar (o uno local)"],
    cons: ["Sigue necesitando una API de LLM potente para buenos resultados"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "rasa",
    name: "Rasa",
    slug: "rasa",
    replaces: ["Dialogflow"],
    category: "AI",
    description:
      "Rasa es un framework open source para construir chatbots y asistentes conversacionales con control total sobre el NLU y los flujos de diálogo, como alternativa a Dialogflow.",
    shortDescription: "Framework de chatbots conversacionales, alternativa open source a Dialogflow.",
    websiteUrl: "https://rasa.com",
    githubUrl: "https://github.com/RasaHQ/rasa",
    starsCount: 19000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  rasa:
    image: rasa/rasa:latest
    restart: unless-stopped
    ports:
      - "5005:5005"
    command: ["run", "--enable-api"]
    volumes:
      - rasa_data:/app
volumes:
  rasa_data:
`,
    affiliateLinks,
    features: ["Control total del modelo de NLU", "Flujos de diálogo como código versionable", "Integraciones con Slack, web, WhatsApp y más"],
    techStack: ["Python"],
    pros: ["Máximo control técnico sobre el comportamiento del bot"],
    cons: ["Requiere más conocimiento técnico que herramientas no-code"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "typebot",
    name: "Typebot",
    slug: "typebot",
    replaces: ["Typeform"],
    category: "AI",
    description:
      "Typebot combina formularios conversacionales con bloques de IA, lógica condicional e integraciones, permitiendo crear chatbots y encuestas visuales como alternativa a Typeform.",
    shortDescription: "Formularios conversacionales con IA, alternativa a Typeform.",
    websiteUrl: "https://typebot.io",
    githubUrl: "https://github.com/baptisteArno/typebot.io",
    starsCount: 9000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  typebot-builder:
    image: baptistearno/typebot-builder:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://typebot:typebot@typebot-db:5432/typebot
      - ENCRYPTION_SECRET=change-me-32-char-secret
    depends_on:
      - typebot-db
  typebot-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=typebot
      - POSTGRES_PASSWORD=typebot
      - POSTGRES_DB=typebot
    volumes:
      - typebot_pg_data:/var/lib/postgresql/data
volumes:
  typebot_pg_data:
`,
    affiliateLinks,
    features: ["Editor visual de flujos conversacionales", "Bloques de IA integrados (OpenAI y otros)", "Widget embebible en cualquier web"],
    techStack: ["Next.js", "PostgreSQL"],
    pros: ["Combina la UX de Typeform con lógica conversacional e IA"],
    cons: ["El editor visual completo requiere el servicio builder + viewer"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "librechat",
    name: "LibreChat",
    slug: "librechat",
    replaces: ["ChatGPT Plus"],
    category: "AI",
    description:
      "LibreChat es una interfaz de chat que conecta con múltiples proveedores de IA (OpenAI, Anthropic, modelos locales) en una sola app con historial, plugins y múltiples usuarios.",
    shortDescription: "Chat multi-proveedor con historial y plugins, alternativa a ChatGPT Plus.",
    websiteUrl: "https://www.librechat.ai",
    githubUrl: "https://github.com/danny-avila/LibreChat",
    starsCount: 22000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  librechat:
    image: ghcr.io/danny-avila/librechat:latest
    restart: unless-stopped
    ports:
      - "3080:3080"
    environment:
      - MONGO_URI=mongodb://librechat-db:27017/LibreChat
    depends_on:
      - librechat-db
  librechat-db:
    image: mongo:7
    restart: unless-stopped
    volumes:
      - librechat_mongo_data:/data/db
volumes:
  librechat_mongo_data:
`,
    affiliateLinks,
    features: ["Conecta OpenAI, Anthropic, Google y modelos locales", "Multiusuario con historial de conversaciones", "Plugins y búsqueda web integrada"],
    techStack: ["Node.js", "React", "MongoDB"],
    pros: ["Cambia de proveedor de IA sin cambiar de interfaz"],
    cons: ["Necesitas tus propias claves de API de los proveedores que uses"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "text-generation-webui",
    name: "Text Generation WebUI",
    slug: "text-generation-webui",
    replaces: ["OpenAI API"],
    category: "AI",
    description:
      "Text Generation WebUI (oobabooga) es una interfaz muy completa para ejecutar modelos de texto open source con múltiples backends, extensiones y una API compatible, todo local.",
    shortDescription: "Interfaz avanzada para modelos de texto locales, alternativa a la API de OpenAI.",
    websiteUrl: "https://github.com/oobabooga/text-generation-webui",
    githubUrl: "https://github.com/oobabooga/text-generation-webui",
    starsCount: 42000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  text-generation-webui:
    image: atinoda/text-generation-webui:latest
    restart: unless-stopped
    ports:
      - "7860:7860"
    volumes:
      - tgw_models:/app/models
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
volumes:
  tgw_models:
`,
    affiliateLinks,
    features: ["Soporta múltiples backends (llama.cpp, ExLlama, Transformers)", "Extensiones de la comunidad", "API compatible con OpenAI"],
    techStack: ["Python", "PyTorch"],
    pros: ["Muy flexible para experimentar con distintos formatos de modelo"],
    cons: ["Requiere GPU potente para los modelos más grandes"],
    tags: ["docker-ready"],
  },
  {
    id: "privategpt",
    name: "PrivateGPT",
    slug: "privategpt",
    replaces: ["ChatGPT Plus"],
    category: "AI",
    description:
      "PrivateGPT permite hacer preguntas sobre tus propios documentos usando LLMs, ejecutándose 100% en tu infraestructura sin que ningún dato salga de tu red.",
    shortDescription: "Pregunta a tus documentos con LLMs 100% privados, alternativa a ChatGPT+docs.",
    websiteUrl: "https://privategpt.dev",
    githubUrl: "https://github.com/zylon-ai/private-gpt",
    starsCount: 55000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  privategpt:
    image: zylonai/private-gpt:latest
    restart: unless-stopped
    ports:
      - "8001:8001"
    volumes:
      - privategpt_data:/home/worker/app/local_data
volumes:
  privategpt_data:
`,
    affiliateLinks,
    features: ["Preguntas y respuestas sobre tus PDFs y documentos", "100% offline, sin llamadas a APIs externas", "API REST propia para integrarlo"],
    techStack: ["Python", "LlamaIndex"],
    pros: ["Ideal para datos sensibles que no pueden salir de tu red"],
    cons: ["El rendimiento depende del hardware local disponible"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "perplexica",
    name: "Perplexica",
    slug: "perplexica",
    replaces: ["Perplexity AI"],
    category: "AI",
    description:
      "Perplexica es un motor de búsqueda con IA de código abierto que combina un buscador web (SearXNG) con un LLM para dar respuestas con fuentes citadas, como alternativa a Perplexity AI.",
    shortDescription: "Buscador con IA y fuentes citadas, alternativa open source a Perplexity AI.",
    websiteUrl: "https://github.com/ItzCrazyKns/Perplexica",
    githubUrl: "https://github.com/ItzCrazyKns/Perplexica",
    starsCount: 20000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  perplexica:
    image: itzcrazykns1337/perplexica:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - SEARXNG_API_URL=http://perplexica-searxng:8080
    depends_on:
      - perplexica-searxng
  perplexica-searxng:
    image: searxng/searxng:latest
    restart: unless-stopped
volumes: {}
`,
    affiliateLinks,
    features: ["Respuestas con fuentes citadas como Perplexity", "Usa SearXNG para búsqueda web privada", "Conecta con modelos locales o en la nube"],
    techStack: ["Next.js", "SearXNG"],
    pros: ["Búsqueda web sin depender de la API de ningún buscador comercial"],
    cons: ["La calidad de resultados depende de los motores configurados en SearXNG"],
    tags: ["docker-ready", "permissive-license"],
  },

  // ---------- Almacenamiento ----------
  {
    id: "seafile",
    name: "Seafile",
    slug: "seafile",
    replaces: ["Dropbox"],
    category: "Storage",
    description:
      "Seafile sincroniza y comparte archivos con cifrado opcional de extremo a extremo y control de versiones eficiente, ofreciendo un rendimiento muy sólido como alternativa a Dropbox.",
    shortDescription: "Sincronización de archivos cifrada y eficiente, alternativa a Dropbox.",
    websiteUrl: "https://www.seafile.com",
    githubUrl: "https://github.com/haiwen/seafile",
    starsCount: 12000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  seafile:
    image: seafileltd/seafile-mc:latest
    restart: unless-stopped
    ports:
      - "80:80"
    environment:
      - DB_HOST=seafile-db
      - DB_ROOT_PASSWD=root
    depends_on:
      - seafile-db
  seafile-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - seafile_db_data:/var/lib/mysql
volumes:
  seafile_db_data:
`,
    affiliateLinks,
    features: ["Cifrado de extremo a extremo opcional por biblioteca", "Control de versiones eficiente en espacio", "Clientes de sincronización para todos los SO"],
    techStack: ["C", "Python", "MySQL"],
    pros: ["Rendimiento de sincronización notablemente superior con muchos archivos"],
    cons: ["Interfaz menos moderna que Nextcloud"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "owncloud",
    name: "ownCloud",
    slug: "owncloud",
    replaces: ["Google Drive"],
    category: "Storage",
    description:
      "ownCloud ofrece almacenamiento de archivos, sincronización y colaboración con un ecosistema de apps propio, siendo el proyecto original del que nació Nextcloud.",
    shortDescription: "Almacenamiento y sincronización de archivos, alternativa a Google Drive.",
    websiteUrl: "https://owncloud.com",
    githubUrl: "https://github.com/owncloud/ocis",
    starsCount: 8000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  owncloud:
    image: owncloud/ocis:latest
    restart: unless-stopped
    ports:
      - "9200:9200"
    environment:
      - OCIS_URL=https://localhost:9200
    volumes:
      - owncloud_data:/var/lib/ocis
volumes:
  owncloud_data:
`,
    affiliateLinks,
    features: ["Sincronización de archivos multiplataforma", "Compartición con enlaces y permisos", "Arquitectura moderna (Infinite Scale)"],
    techStack: ["Go"],
    pros: ["Nueva arquitectura Infinite Scale muy ligera"],
    cons: ["Ecosistema de apps más reducido que Nextcloud"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "syncthing",
    name: "Syncthing",
    slug: "syncthing",
    replaces: ["Dropbox"],
    category: "Storage",
    description:
      "Syncthing sincroniza archivos directamente entre tus dispositivos vía P2P cifrado, sin pasar por un servidor central en la nube, como alternativa descentralizada a Dropbox.",
    shortDescription: "Sincronización P2P cifrada entre dispositivos, alternativa descentralizada a Dropbox.",
    websiteUrl: "https://syncthing.net",
    githubUrl: "https://github.com/syncthing/syncthing",
    starsCount: 65000,
    license: "MPL-2.0",
    dockerCompose: `version: "3.9"
services:
  syncthing:
    image: syncthing/syncthing:latest
    restart: unless-stopped
    ports:
      - "8384:8384"
      - "22000:22000/tcp"
      - "22000:22000/udp"
    volumes:
      - syncthing_config:/var/syncthing/config
      - syncthing_data:/var/syncthing/data
volumes:
  syncthing_config:
  syncthing_data:
`,
    affiliateLinks,
    features: ["Sincronización P2P sin servidor central", "Cifrado de extremo a extremo por diseño", "Control de versiones de archivos"],
    techStack: ["Go"],
    pros: ["No depende de ningún servidor en la nube de terceros"],
    cons: ["No es almacenamiento centralizado: cada dispositivo guarda su copia"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "garage",
    name: "Garage",
    slug: "garage",
    replaces: ["Amazon S3"],
    category: "Storage",
    description:
      "Garage es un almacenamiento de objetos distribuido y compatible con S3, diseñado para ejecutarse en varios nodos pequeños (incluso geo-distribuidos) con alta resiliencia.",
    shortDescription: "Almacenamiento de objetos distribuido compatible con S3, alternativa a Amazon S3.",
    websiteUrl: "https://garagehq.deuxfleurs.fr",
    githubUrl: "https://git.deuxfleurs.fr/Deuxfleurs/garage",
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  garage:
    image: dxflrs/garage:latest
    restart: unless-stopped
    ports:
      - "3900:3900"
      - "3903:3903"
    volumes:
      - garage_meta:/var/lib/garage/meta
      - garage_data:/var/lib/garage/data
volumes:
  garage_meta:
  garage_data:
`,
    affiliateLinks,
    features: ["API 100% compatible con S3", "Pensado para clusters geo-distribuidos", "Muy bajo consumo de recursos por nodo"],
    techStack: ["Rust"],
    pros: ["Excelente para clusters caseros con hardware modesto"],
    cons: ["Configuración de clustering requiere algo más de curva de aprendizaje"],
    tags: ["docker-ready"],
  },
  {
    id: "seaweedfs",
    name: "SeaweedFS",
    slug: "seaweedfs",
    replaces: ["Amazon S3"],
    category: "Storage",
    description:
      "SeaweedFS es un sistema de archivos distribuido optimizado para servir miles de millones de archivos pequeños rápidamente, con una capa de compatibilidad S3 incluida.",
    shortDescription: "Almacenamiento distribuido para millones de archivos, alternativa a Amazon S3.",
    websiteUrl: "https://github.com/seaweedfs/seaweedfs",
    githubUrl: "https://github.com/seaweedfs/seaweedfs",
    starsCount: 23000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  seaweedfs:
    image: chrislusf/seaweedfs:latest
    restart: unless-stopped
    ports:
      - "9333:9333"
      - "8888:8888"
      - "8333:8333"
    command: server -s3
    volumes:
      - seaweedfs_data:/data
volumes:
  seaweedfs_data:
`,
    affiliateLinks,
    features: ["Optimizado para archivos pequeños a gran escala", "Capa de compatibilidad S3 incluida", "Replicación y erasure coding configurables"],
    techStack: ["Go"],
    pros: ["Rendimiento excelente con volúmenes masivos de archivos pequeños"],
    cons: ["Documentación menos pulida que MinIO para empezar"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "immich",
    name: "Immich",
    slug: "immich",
    replaces: ["Google Photos"],
    category: "Storage",
    description:
      "Immich hace copia de seguridad automática de fotos y videos desde tu móvil a tu propio servidor, con reconocimiento facial, búsqueda inteligente y álbumes compartidos, como alternativa a Google Photos.",
    shortDescription: "Backup de fotos y video con IA, alternativa auto-hospedada a Google Photos.",
    websiteUrl: "https://immich.app",
    githubUrl: "https://github.com/immich-app/immich",
    starsCount: 50000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  immich-server:
    image: ghcr.io/immich-app/immich-server:release
    restart: unless-stopped
    ports:
      - "2283:2283"
    environment:
      - DB_HOSTNAME=immich-db
      - DB_USERNAME=immich
      - DB_PASSWORD=immich
      - REDIS_HOSTNAME=immich-redis
    volumes:
      - immich_uploads:/usr/src/app/upload
    depends_on:
      - immich-db
      - immich-redis
  immich-db:
    image: tensorchord/pgvecto-rs:pg15-v0.2.0
    restart: unless-stopped
    environment:
      - POSTGRES_USER=immich
      - POSTGRES_PASSWORD=immich
      - POSTGRES_DB=immich
    volumes:
      - immich_pg_data:/var/lib/postgresql/data
  immich-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  immich_uploads:
  immich_pg_data:
`,
    affiliateLinks,
    features: ["Backup automático desde apps móviles", "Reconocimiento facial y búsqueda por objetos", "Álbumes compartidos y timeline familiar"],
    techStack: ["NestJS", "Flutter", "PostgreSQL"],
    pros: ["La app móvil rivaliza en calidad con Google Photos"],
    cons: ["El reconocimiento facial y de objetos se beneficia de tener GPU"],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "photoprism",
    name: "PhotoPrism",
    slug: "photoprism",
    replaces: ["Google Photos"],
    category: "Storage",
    description:
      "PhotoPrism organiza tu biblioteca de fotos con etiquetado automático por IA, mapas y búsqueda semántica, dejando los archivos originales siempre en tu propio sistema de ficheros.",
    shortDescription: "Gestor de fotos con etiquetado por IA, alternativa a Google Photos.",
    websiteUrl: "https://www.photoprism.app",
    githubUrl: "https://github.com/photoprism/photoprism",
    starsCount: 37000,
    license: "Source-available (non-OSI)",
    dockerCompose: `version: "3.9"
services:
  photoprism:
    image: photoprism/photoprism:latest
    restart: unless-stopped
    ports:
      - "2342:2342"
    environment:
      - PHOTOPRISM_ADMIN_PASSWORD=change-me
      - PHOTOPRISM_ORIGINALS_PATH=/photoprism/originals
    volumes:
      - photoprism_originals:/photoprism/originals
      - photoprism_storage:/photoprism/storage
volumes:
  photoprism_originals:
  photoprism_storage:
`,
    affiliateLinks,
    features: ["Etiquetado automático de fotos por IA", "Búsqueda semántica y por ubicación", "Los archivos originales quedan intactos"],
    techStack: ["Go", "TensorFlow"],
    pros: ["Nunca modifica ni mueve tus archivos originales"],
    cons: ["Licencia source-available, no es OSI-open source puro"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "filestash",
    name: "Filestash",
    slug: "filestash",
    replaces: ["Google Drive"],
    category: "Storage",
    description:
      "Filestash es una interfaz web tipo explorador de archivos que se conecta a S3, FTP, SFTP, WebDAV, Google Drive y más, dando una experiencia unificada tipo Google Drive sobre tu propio backend.",
    shortDescription: "Explorador web universal de archivos, alternativa de interfaz a Google Drive.",
    websiteUrl: "https://www.filestash.app",
    githubUrl: "https://github.com/mickael-kerjean/filestash",
    starsCount: 12000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  filestash:
    image: machines/filestash:latest
    restart: unless-stopped
    ports:
      - "8334:8334"
    volumes:
      - filestash_data:/app/data/state
volumes:
  filestash_data:
`,
    affiliateLinks,
    features: ["Se conecta a S3, FTP, SFTP, WebDAV y más", "Editor de archivos y vista previa integrada", "Autenticación SSO configurable"],
    techStack: ["Go", "React"],
    pros: ["Una sola interfaz para múltiples backends de almacenamiento existentes"],
    cons: ["No es almacenamiento en sí, sino una capa de interfaz sobre otro backend"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "pydio-cells",
    name: "Pydio Cells",
    slug: "pydio-cells",
    replaces: ["Dropbox"],
    category: "Storage",
    description:
      "Pydio Cells es una plataforma de compartición de archivos de nivel empresarial con flujos de trabajo, control de versiones y auditoría, pensada para organizaciones que necesitan gobernanza estricta.",
    shortDescription: "Compartición de archivos empresarial con auditoría, alternativa a Dropbox Business.",
    websiteUrl: "https://pydio.com",
    githubUrl: "https://github.com/pydio/cells",
    starsCount: 2000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  pydio-cells:
    image: pydio/cells:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - CELLS_BIND=0.0.0.0:8080
    volumes:
      - pydio_data:/var/cells
volumes:
  pydio_data:
`,
    affiliateLinks,
    features: ["Flujos de trabajo de aprobación de archivos", "Auditoría detallada de accesos", "Control de versiones y papelera"],
    techStack: ["Go", "React"],
    pros: ["Pensado para cumplimiento y gobernanza empresarial estricta"],
    cons: ["Configuración más compleja que soluciones más simples como Seafile"],
    tags: ["docker-ready"],
  },

  // ---------- DevTools (extra) ----------
  {
    id: "searxng",
    name: "SearXNG",
    slug: "searxng",
    replaces: ["Google Search"],
    category: "DevTools",
    description:
      "SearXNG es un motor de metabúsqueda que combina resultados de decenas de buscadores sin rastrear ni perfilar al usuario, ideal como puerta de entrada privada a la búsqueda web.",
    shortDescription: "Metabuscador privado que agrega decenas de motores, sin rastreo.",
    websiteUrl: "https://searxng.org",
    githubUrl: "https://github.com/searxng/searxng",
    starsCount: 18000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  searxng:
    image: searxng/searxng:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - searxng_data:/etc/searxng
volumes:
  searxng_data:
`,
    affiliateLinks,
    features: ["Agrega resultados de +70 motores de búsqueda", "Sin perfiles ni historial de búsquedas", "Totalmente personalizable por categorías"],
    techStack: ["Python", "Flask"],
    pros: ["Cero rastreo publicitario de tus búsquedas"],
    cons: ["La calidad de resultados depende de los motores fuente disponibles"],
    tags: ["docker-ready", "1-click-deploy"],
  },

  // ---------- E-commerce ----------
  {
    id: "medusa",
    name: "Medusa",
    slug: "medusa",
    replaces: ["Shopify"],
    category: "Ecommerce",
    description:
      "Medusa es una plataforma de comercio headless en Node.js con módulos de pedidos, inventario y precios totalmente personalizables por código, pensada como alternativa a Shopify para desarrolladores.",
    shortDescription: "E-commerce headless en Node.js, alternativa a Shopify para developers.",
    websiteUrl: "https://medusajs.com",
    githubUrl: "https://github.com/medusajs/medusa",
    starsCount: 26000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  medusa:
    image: medusajs/medusa:latest
    restart: unless-stopped
    ports:
      - "9000:9000"
    environment:
      - DATABASE_URL=postgres://medusa:medusa@medusa-db:5432/medusa
      - REDIS_URL=redis://medusa-redis:6379
      - JWT_SECRET=change-me-super-secret
      - COOKIE_SECRET=change-me-super-secret
    depends_on:
      - medusa-db
      - medusa-redis
  medusa-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=medusa
      - POSTGRES_PASSWORD=medusa
      - POSTGRES_DB=medusa
    volumes:
      - medusa_pg_data:/var/lib/postgresql/data
  medusa-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  medusa_pg_data:
`,
    affiliateLinks,
    features: ["Módulos de pedidos, inventario y precios personalizables", "API REST y admin panel incluidos", "Multi-región y multi-moneda nativo"],
    techStack: ["Node.js", "PostgreSQL", "Redis"],
    pros: ["Sin comisión por venta, a diferencia de Shopify"],
    cons: ["Requiere conocimientos de desarrollo para personalizarlo a fondo"],
    tags: ["docker-ready", "permissive-license"],
    featured: true,
  },
  {
    id: "saleor",
    name: "Saleor",
    slug: "saleor",
    replaces: ["Shopify Plus"],
    category: "Ecommerce",
    description:
      "Saleor es una plataforma de comercio headless GraphQL-first, con checkout personalizable y arquitectura orientada a eventos, pensada para tiendas de gran escala como alternativa a Shopify Plus.",
    shortDescription: "E-commerce headless GraphQL para gran escala, alternativa a Shopify Plus.",
    websiteUrl: "https://saleor.io",
    githubUrl: "https://github.com/saleor/saleor",
    starsCount: 21000,
    license: "BSD-3-Clause",
    dockerCompose: `version: "3.9"
services:
  saleor:
    image: ghcr.io/saleor/saleor:latest
    restart: unless-stopped
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://saleor:saleor@saleor-db:5432/saleor
      - REDIS_URL=redis://saleor-redis:6379
      - SECRET_KEY=change-me-super-secret
    depends_on:
      - saleor-db
      - saleor-redis
  saleor-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=saleor
      - POSTGRES_PASSWORD=saleor
      - POSTGRES_DB=saleor
    volumes:
      - saleor_pg_data:/var/lib/postgresql/data
  saleor-redis:
    image: redis:7-alpine
    restart: unless-stopped
volumes:
  saleor_pg_data:
`,
    affiliateLinks,
    features: ["API GraphQL completa", "Checkout totalmente personalizable", "Arquitectura orientada a eventos (webhooks)"],
    techStack: ["Python", "Django", "GraphQL", "PostgreSQL"],
    pros: ["Pensado desde el diseño para tiendas de tráfico muy alto"],
    cons: ["Curva de aprendizaje mayor que plataformas todo-en-uno"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "vendure",
    name: "Vendure",
    slug: "vendure",
    replaces: ["Shopify"],
    category: "Ecommerce",
    description:
      "Vendure es un framework de comercio headless en TypeScript con un sistema de plugins muy flexible, pensado para desarrolladores que quieren extender cada parte de su tienda como código.",
    shortDescription: "Framework de e-commerce en TypeScript, alternativa a Shopify para devs.",
    websiteUrl: "https://www.vendure.io",
    githubUrl: "https://github.com/vendure-ecommerce/vendure",
    starsCount: 6000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  vendure:
    image: vendureio/server:latest
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=vendure-db
      - DB_NAME=vendure
      - DB_USERNAME=vendure
      - DB_PASSWORD=vendure
      - COOKIE_SECRET=change-me-super-secret
    depends_on:
      - vendure-db
  vendure-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=vendure
      - POSTGRES_PASSWORD=vendure
      - POSTGRES_DB=vendure
    volumes:
      - vendure_pg_data:/var/lib/postgresql/data
volumes:
  vendure_pg_data:
`,
    affiliateLinks,
    features: ["Sistema de plugins en TypeScript", "API GraphQL autogenerada", "Multi-tienda y multi-canal de venta"],
    techStack: ["TypeScript", "NestJS", "PostgreSQL"],
    pros: ["Experiencia de desarrollador muy cuidada (TypeScript end-to-end)"],
    cons: ["Ecosistema de plugins más pequeño que Shopify App Store"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "bagisto",
    name: "Bagisto",
    slug: "bagisto",
    replaces: ["Shopify"],
    category: "Ecommerce",
    description:
      "Bagisto es una plataforma de e-commerce construida sobre Laravel y Vue.js, con multi-tienda, multi-idioma y un marketplace de extensiones, como alternativa gratuita a Shopify.",
    shortDescription: "E-commerce sobre Laravel, alternativa gratuita a Shopify.",
    websiteUrl: "https://bagisto.com",
    githubUrl: "https://github.com/bagisto/bagisto",
    starsCount: 9000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  bagisto:
    image: webkul/bagisto:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=bagisto-db
      - DB_DATABASE=bagisto
      - DB_USERNAME=bagisto
      - DB_PASSWORD=bagisto
    depends_on:
      - bagisto-db
  bagisto-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=bagisto
      - MYSQL_USER=bagisto
      - MYSQL_PASSWORD=bagisto
    volumes:
      - bagisto_db_data:/var/lib/mysql
volumes:
  bagisto_db_data:
`,
    affiliateLinks,
    features: ["Multi-tienda y multi-idioma", "Marketplace de extensiones", "Panel de administración en Vue.js"],
    techStack: ["PHP", "Laravel", "Vue.js", "MySQL"],
    pros: ["100% gratuito, sin ediciones de pago ocultas"],
    cons: ["Comunidad más pequeña que Shopify o WooCommerce"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "prestashop",
    name: "PrestaShop",
    slug: "prestashop",
    replaces: ["Shopify"],
    category: "Ecommerce",
    description:
      "PrestaShop es una de las plataformas de tienda online open source más establecidas, con miles de módulos y plantillas, muy popular en Europa como alternativa a Shopify.",
    shortDescription: "Plataforma de tienda online establecida, alternativa europea a Shopify.",
    websiteUrl: "https://www.prestashop.com",
    githubUrl: "https://github.com/PrestaShop/PrestaShop",
    starsCount: 8000,
    license: "OSL-3.0",
    dockerCompose: `version: "3.9"
services:
  prestashop:
    image: prestashop/prestashop:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - DB_SERVER=prestashop-db
      - DB_NAME=prestashop
      - DB_USER=prestashop
      - DB_PASSWD=prestashop
    depends_on:
      - prestashop-db
  prestashop-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=prestashop
      - MYSQL_USER=prestashop
      - MYSQL_PASSWORD=prestashop
    volumes:
      - prestashop_db_data:/var/lib/mysql
volumes:
  prestashop_db_data:
`,
    affiliateLinks,
    features: ["Miles de módulos y plantillas", "Gestión multi-tienda", "Fuerte adopción en el mercado europeo"],
    techStack: ["PHP", "Symfony", "MySQL"],
    pros: ["Ecosistema maduro con muchos años de desarrollo"],
    cons: ["Interfaz de administración se siente menos moderna que Shopify"],
    tags: ["docker-ready", "1-click-deploy"],
  },
  {
    id: "sylius",
    name: "Sylius",
    slug: "sylius",
    replaces: ["Shopify"],
    category: "Ecommerce",
    description:
      "Sylius es un framework de e-commerce construido sobre Symfony, orientado a desarrolladores que necesitan máxima flexibilidad para tiendas B2B o B2C complejas.",
    shortDescription: "Framework de e-commerce sobre Symfony, alternativa flexible a Shopify.",
    websiteUrl: "https://sylius.com",
    githubUrl: "https://github.com/Sylius/Sylius",
    starsCount: 8000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  sylius:
    image: ghcr.io/sylius/sylius:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - DATABASE_URL=mysql://sylius:sylius@sylius-db:3306/sylius
    depends_on:
      - sylius-db
  sylius-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=sylius
      - MYSQL_USER=sylius
      - MYSQL_PASSWORD=sylius
    volumes:
      - sylius_db_data:/var/lib/mysql
volumes:
  sylius_db_data:
`,
    affiliateLinks,
    features: ["Arquitectura Symfony extensible", "Soporta tiendas B2B y B2C", "API REST completa"],
    techStack: ["PHP", "Symfony", "MySQL"],
    pros: ["Máxima flexibilidad para lógica de negocio compleja"],
    cons: ["Requiere experiencia sólida en Symfony para sacarle partido"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "shopware",
    name: "Shopware",
    slug: "shopware",
    replaces: ["Shopify", "Magento"],
    category: "Ecommerce",
    description:
      "Shopware es una plataforma de e-commerce alemana con un núcleo open source potente, editor visual de tienda y arquitectura orientada a APIs, como alternativa a Shopify o Magento.",
    shortDescription: "E-commerce con editor visual y API-first, alternativa a Shopify/Magento.",
    websiteUrl: "https://www.shopware.com",
    githubUrl: "https://github.com/shopware/shopware",
    starsCount: 7000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  shopware:
    image: dockware/play:latest
    restart: unless-stopped
    ports:
      - "80:80"
    volumes:
      - shopware_data:/var/www/html
volumes:
  shopware_data:
`,
    affiliateLinks,
    features: ["Editor visual de tienda (Shopping Experiences)", "API-first con administración desacoplada", "Marketplace de extensiones"],
    techStack: ["PHP", "Symfony", "Vue.js", "MySQL"],
    pros: ["Editor visual muy potente para landing pages de producto"],
    cons: ["Algunas funciones avanzadas solo en la edición Commercial"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "magento-open-source",
    name: "Magento Open Source",
    slug: "magento-open-source",
    replaces: ["Shopify Plus", "BigCommerce"],
    category: "Ecommerce",
    description:
      "Magento Open Source (Adobe Commerce Community Edition) es una de las plataformas de e-commerce más potentes y personalizables, usada por grandes catálogos, como alternativa a Shopify Plus.",
    shortDescription: "E-commerce empresarial muy personalizable, alternativa a Shopify Plus.",
    websiteUrl: "https://business.adobe.com/products/magento/magento-open-source.html",
    githubUrl: "https://github.com/magento/magento2",
    starsCount: 10000,
    license: "OSL-3.0",
    dockerCompose: `version: "3.9"
services:
  magento:
    image: markoshust/magento-nginx:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - MYSQL_HOST=magento-db
    depends_on:
      - magento-db
  magento-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=magento
    volumes:
      - magento_db_data:/var/lib/mysql
volumes:
  magento_db_data:
`,
    affiliateLinks,
    features: ["Catálogos masivos con atributos complejos", "Multi-tienda y multi-idioma nativo", "Ecosistema de extensiones muy amplio"],
    techStack: ["PHP", "MySQL", "Elasticsearch"],
    pros: ["El más potente para catálogos B2B/B2C muy grandes"],
    cons: ["Requisitos de servidor considerablemente más altos"],
    tags: ["docker-ready"],
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    slug: "woocommerce",
    replaces: ["Shopify"],
    category: "Ecommerce",
    description:
      "WooCommerce convierte cualquier WordPress en una tienda online completa, con el ecosistema de plugins más grande del mundo, como alternativa gratuita a Shopify para quien ya usa WordPress.",
    shortDescription: "E-commerce sobre WordPress, alternativa gratuita a Shopify.",
    websiteUrl: "https://woocommerce.com",
    githubUrl: "https://github.com/woocommerce/woocommerce",
    starsCount: 9000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  wordpress:
    image: wordpress:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - WORDPRESS_DB_HOST=woocommerce-db
      - WORDPRESS_DB_USER=woocommerce
      - WORDPRESS_DB_PASSWORD=woocommerce
      - WORDPRESS_DB_NAME=woocommerce
    volumes:
      - woocommerce_data:/var/www/html
    depends_on:
      - woocommerce-db
  woocommerce-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=woocommerce
      - MYSQL_USER=woocommerce
      - MYSQL_PASSWORD=woocommerce
    volumes:
      - woocommerce_db_data:/var/lib/mysql
volumes:
  woocommerce_data:
  woocommerce_db_data:
`,
    affiliateLinks,
    features: ["El ecosistema de plugins más grande del mundo", "Se integra con cualquier tema de WordPress", "Miles de pasarelas de pago soportadas"],
    techStack: ["PHP", "WordPress", "MySQL"],
    pros: ["Ideal si tu sitio ya corre sobre WordPress"],
    cons: ["El rendimiento depende mucho de los plugins que instales"],
    tags: ["docker-ready", "1-click-deploy"],
  },

  // ---------- Videoconferencia ----------
  {
    id: "jitsi-meet",
    name: "Jitsi Meet",
    slug: "jitsi-meet",
    replaces: ["Zoom", "Google Meet"],
    category: "VideoConferencing",
    description:
      "Jitsi Meet es la plataforma de videollamadas open source más popular, sin límite de tiempo ni participantes, sin necesidad de cuenta para unirse, como alternativa directa a Zoom.",
    shortDescription: "Videollamadas sin límites ni cuenta, alternativa directa a Zoom.",
    websiteUrl: "https://jitsi.org",
    githubUrl: "https://github.com/jitsi/jitsi-meet",
    starsCount: 24000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  jitsi-web:
    image: jitsi/web:latest
    restart: unless-stopped
    ports:
      - "8443:443"
    environment:
      - PUBLIC_URL=https://localhost:8443
    depends_on:
      - jitsi-prosody
  jitsi-prosody:
    image: jitsi/prosody:latest
    restart: unless-stopped
  jitsi-jicofo:
    image: jitsi/jicofo:latest
    restart: unless-stopped
  jitsi-jvb:
    image: jitsi/jvb:latest
    restart: unless-stopped
    ports:
      - "10000:10000/udp"
`,
    affiliateLinks,
    features: ["Sin límite de tiempo ni participantes", "No requiere cuenta para unirse", "Grabación y streaming a YouTube"],
    techStack: ["React", "WebRTC", "XMPP"],
    pros: ["Gratis y sin límites artificiales de la versión SaaS"],
    cons: ["El stack completo tiene 4 servicios que coordinar"],
    tags: ["docker-ready"],
    featured: true,
  },
  {
    id: "bigbluebutton",
    name: "BigBlueButton",
    slug: "bigbluebutton",
    replaces: ["Zoom"],
    category: "VideoConferencing",
    description:
      "BigBlueButton es una plataforma de videoconferencia orientada a educación, con pizarra colaborativa, salas de grupo y encuestas integradas, como alternativa a Zoom para instituciones educativas.",
    shortDescription: "Videoconferencia enfocada en educación, alternativa a Zoom.",
    websiteUrl: "https://bigbluebutton.org",
    githubUrl: "https://github.com/bigbluebutton/bigbluebutton",
    starsCount: 5000,
    license: "LGPL-3.0",
    dockerCompose: `# BigBlueButton requiere su instalador oficial (bbb-install.sh) sobre
# Ubuntu para producción; no es un docker-compose de un solo comando.
version: "3.9"
services:
  bigbluebutton:
    image: bigbluebutton/bbb-install:latest
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - bbb_data:/var/bigbluebutton
volumes:
  bbb_data:
`,
    affiliateLinks,
    features: ["Pizarra colaborativa multiusuario", "Salas de grupo (breakout rooms)", "Encuestas y grabación de clases"],
    techStack: ["Java", "HTML5", "WebRTC"],
    pros: ["El más completo para casos de uso educativos"],
    cons: ["Instalación de producción más compleja que un simple docker-compose"],
    tags: [],
  },
  {
    id: "livekit",
    name: "LiveKit",
    slug: "livekit",
    replaces: ["Twilio Video"],
    category: "VideoConferencing",
    description:
      "LiveKit es una infraestructura WebRTC open source para desarrolladores que quieren construir sus propias apps de video/audio en tiempo real, como alternativa a Twilio Video o Zoom SDK.",
    shortDescription: "Infraestructura WebRTC para desarrolladores, alternativa a Twilio Video.",
    websiteUrl: "https://livekit.io",
    githubUrl: "https://github.com/livekit/livekit",
    starsCount: 14000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  livekit:
    image: livekit/livekit-server:latest
    restart: unless-stopped
    ports:
      - "7880:7880"
      - "7881:7881"
      - "50000-50100:50000-50100/udp"
    command: ["--dev"]
    volumes:
      - livekit_data:/data
volumes:
  livekit_data:
`,
    affiliateLinks,
    features: ["SDKs para web, móvil y backend", "Escalable a miles de participantes", "Grabación y streaming compuesto"],
    techStack: ["Go", "WebRTC"],
    pros: ["Pensado para integrarse dentro de tu propio producto"],
    cons: ["Requiere desarrollo propio, no es una app de videollamadas lista para usar"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "openvidu",
    name: "OpenVidu",
    slug: "openvidu",
    replaces: ["Twilio Video"],
    category: "VideoConferencing",
    description:
      "OpenVidu simplifica la integración de videollamadas WebRTC en tus propias aplicaciones, con SDKs de alto nivel y un servidor auto-hospedable, como alternativa a Twilio Video o Zoom SDK.",
    shortDescription: "Plataforma WebRTC fácil de integrar, alternativa a Twilio Video.",
    websiteUrl: "https://openvidu.io",
    githubUrl: "https://github.com/OpenVidu/openvidu",
    starsCount: 3000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  openvidu:
    image: openvidu/openvidu-server:latest
    restart: unless-stopped
    ports:
      - "4443:4443"
    environment:
      - OPENVIDU_SECRET=change-me-super-secret
      - OPENVIDU_DOMAIN_OR_PUBLIC_IP=localhost
volumes: {}
`,
    affiliateLinks,
    features: ["SDKs de alto nivel para web y móvil", "Grabación de sesiones incluida", "Despliegue con un solo contenedor para empezar"],
    techStack: ["Java", "WebRTC"],
    pros: ["Más rápido de integrar que construir sobre WebRTC puro"],
    cons: ["Escalar a producción real requiere arquitectura adicional (media nodes)"],
    tags: ["docker-ready", "permissive-license"],
  },
  {
    id: "galene",
    name: "Galène",
    slug: "galene",
    replaces: ["Zoom"],
    category: "VideoConferencing",
    description:
      "Galène es un servidor de videoconferencia SFU extremadamente ligero, capaz de correr en hardware modesto y soportar cientos de participantes, ideal para clases o reuniones grandes auto-hospedadas.",
    shortDescription: "Servidor de videoconferencia ultraligero, alternativa a Zoom en hardware modesto.",
    websiteUrl: "https://galene.org",
    githubUrl: "https://github.com/jech/galene",
    starsCount: 2000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  galene:
    image: dscheirer/galene:latest
    restart: unless-stopped
    ports:
      - "8443:8443"
    volumes:
      - galene_data:/opt/galene/data
volumes:
  galene_data:
`,
    affiliateLinks,
    features: ["Extremadamente ligero (un solo binario en Go)", "Soporta cientos de participantes por sala", "Grabación local de sesiones"],
    techStack: ["Go", "WebRTC"],
    pros: ["Corre en servidores muy modestos comparado con Jitsi/BBB"],
    cons: ["Interfaz más básica, menos features que Zoom"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },
  {
    id: "jami",
    name: "Jami",
    slug: "jami",
    replaces: ["Skype"],
    category: "VideoConferencing",
    description:
      "Jami ofrece videollamadas, mensajería y llamadas de voz totalmente descentralizadas (P2P), sin ningún servidor central que intermedie tus comunicaciones, como alternativa privada a Skype.",
    shortDescription: "Videollamadas y chat 100% P2P sin servidor central, alternativa a Skype.",
    websiteUrl: "https://jami.net",
    githubUrl: "https://github.com/savoirfairelinux/jami-daemon",
    starsCount: 2000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  jami-daemon:
    image: savoirfairelinux/jami-daemon:latest
    restart: unless-stopped
    network_mode: host
    volumes:
      - jami_data:/root/.local/share/jami
volumes:
  jami_data:
`,
    affiliateLinks,
    features: ["Comunicación 100% P2P, sin servidor central", "Video, voz, mensajería y compartir pantalla", "Apps para escritorio y móvil"],
    techStack: ["C++", "QML"],
    pros: ["Ningún servidor (ni siquiera propio) puede ver tus llamadas"],
    cons: ["No pensado para webinars o reuniones masivas de empresa"],
    tags: [],
  },
  {
    id: "neko",
    name: "Neko",
    slug: "neko",
    replaces: ["Zoom"],
    category: "VideoConferencing",
    description:
      "Neko crea una sala de navegador compartida en streaming donde varias personas ven y controlan el mismo navegador virtual a la vez, ideal para watch parties o navegación colaborativa.",
    shortDescription: "Navegador virtual compartido en streaming, para watch parties y colaboración.",
    websiteUrl: "https://neko.m1k1o.net",
    githubUrl: "https://github.com/m1k1o/neko",
    starsCount: 9000,
    license: "Apache-2.0",
    dockerCompose: `version: "3.9"
services:
  neko:
    image: m1k1o/neko:firefox
    restart: unless-stopped
    ports:
      - "8080:8080"
      - "52000-52100:52000-52100/udp"
    environment:
      - NEKO_SCREEN=1920x1080@30
      - NEKO_PASSWORD=change-me
      - NEKO_PASSWORD_ADMIN=change-me-admin
    shm_size: "2gb"
`,
    affiliateLinks,
    features: ["Navegador compartido en tiempo real", "Chat de voz y texto integrado", "Ideal para watch parties o soporte técnico remoto"],
    techStack: ["Go", "WebRTC", "GStreamer"],
    pros: ["Caso de uso único que Zoom no cubre bien (navegador compartido real)"],
    cons: ["No es un sustituto general de videollamadas de trabajo"],
    tags: ["docker-ready", "1-click-deploy", "permissive-license"],
  },

  // ---------- Gestores de Contraseñas ----------
  {
    id: "vaultwarden",
    name: "Vaultwarden",
    slug: "vaultwarden",
    replaces: ["1Password", "LastPass"],
    category: "PasswordManagers",
    description:
      "Vaultwarden es una implementación ligera y no oficial del servidor de Bitwarden en Rust, compatible con todos los clientes oficiales de Bitwarden, ideal para auto-hospedar tu propio gestor de contraseñas.",
    shortDescription: "Servidor Bitwarden ligero en Rust, alternativa auto-hospedada a 1Password.",
    websiteUrl: "https://github.com/dani-garcia/vaultwarden",
    githubUrl: "https://github.com/dani-garcia/vaultwarden",
    starsCount: 40000,
    license: "GPL-3.0",
    dockerCompose: `version: "3.9"
services:
  vaultwarden:
    image: vaultwarden/server:latest
    restart: unless-stopped
    ports:
      - "8080:80"
    environment:
      - ADMIN_TOKEN=change-me-super-secret
      - SIGNUPS_ALLOWED=false
    volumes:
      - vaultwarden_data:/data
volumes:
  vaultwarden_data:
`,
    affiliateLinks,
    features: ["Compatible con todos los clientes oficiales de Bitwarden", "Uso de recursos mínimo (ideal para VPS pequeños)", "Panel de administración propio"],
    techStack: ["Rust", "SQLite"],
    pros: ["El gestor de contraseñas auto-hospedado más ligero y popular"],
    cons: ["No es el servidor oficial de Bitwarden, es una reimplementación de la comunidad"],
    tags: ["docker-ready", "1-click-deploy"],
    featured: true,
  },
  {
    id: "bitwarden-self-hosted",
    name: "Bitwarden (self-hosted)",
    slug: "bitwarden-self-hosted",
    replaces: ["1Password", "LastPass"],
    category: "PasswordManagers",
    description:
      "Bitwarden ofrece su servidor oficial completo para auto-hospedar, con todas las funciones de la versión cloud (organizaciones, SSO, informes de seguridad) bajo tu propia infraestructura.",
    shortDescription: "Servidor oficial de Bitwarden auto-hospedado, alternativa completa a 1Password.",
    websiteUrl: "https://bitwarden.com/host",
    githubUrl: "https://github.com/bitwarden/server",
    starsCount: 16000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  bitwarden:
    image: bitwarden/self-host:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - globalSettings__baseServiceUri=http://localhost:8080
    volumes:
      - bitwarden_data:/etc/bitwarden
volumes:
  bitwarden_data:
`,
    affiliateLinks,
    features: ["Organizaciones y grupos empresariales", "Informes de seguridad y SSO", "Todas las funciones de la versión cloud oficial"],
    techStack: [".NET", "SQL Server"],
    pros: ["Es el servidor oficial, con soporte directo de Bitwarden"],
    cons: ["Bastante más pesado en recursos que Vaultwarden"],
    tags: ["docker-ready"],
  },
  {
    id: "passbolt",
    name: "Passbolt",
    slug: "passbolt",
    replaces: ["1Password Business"],
    category: "PasswordManagers",
    description:
      "Passbolt es un gestor de contraseñas para equipos con cifrado OpenPGP, permisos granulares por carpeta y auditoría, diseñado específicamente para organizaciones que necesitan control fino.",
    shortDescription: "Gestor de contraseñas en equipo con cifrado OpenPGP, alternativa a 1Password Business.",
    websiteUrl: "https://www.passbolt.com",
    githubUrl: "https://github.com/passbolt/passbolt_api",
    starsCount: 4000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  passbolt:
    image: passbolt/passbolt:latest
    restart: unless-stopped
    ports:
      - "443:443"
    environment:
      - DATASOURCES_DEFAULT_HOST=passbolt-db
      - DATASOURCES_DEFAULT_USERNAME=passbolt
      - DATASOURCES_DEFAULT_PASSWORD=passbolt
    depends_on:
      - passbolt-db
  passbolt-db:
    image: mariadb:11
    restart: unless-stopped
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=passbolt
      - MYSQL_USER=passbolt
      - MYSQL_PASSWORD=passbolt
    volumes:
      - passbolt_db_data:/var/lib/mysql
volumes:
  passbolt_db_data:
`,
    affiliateLinks,
    features: ["Cifrado OpenPGP de extremo a extremo", "Permisos granulares por carpeta y grupo", "Auditoría completa de accesos"],
    techStack: ["PHP", "CakePHP", "MySQL"],
    pros: ["Pensado específicamente para el control de acceso en equipos"],
    cons: ["La configuración de GPG inicial es más técnica que Vaultwarden"],
    tags: ["docker-ready"],
  },
  {
    id: "psono",
    name: "Psono",
    slug: "psono",
    replaces: ["LastPass Teams"],
    category: "PasswordManagers",
    description:
      "Psono es un gestor de contraseñas para equipos con cifrado de extremo a extremo, gestión de secretos de API y extensiones de navegador, como alternativa auto-hospedable a LastPass Teams.",
    shortDescription: "Gestor de contraseñas y secretos para equipos, alternativa a LastPass Teams.",
    websiteUrl: "https://psono.com",
    githubUrl: "https://github.com/psono/psono-server",
    starsCount: 2000,
    license: "AGPL-3.0",
    dockerCompose: `version: "3.9"
services:
  psono:
    image: psono/psono-server:latest
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      - DATABASE_HOST=psono-db
      - DATABASE_USER=psono
      - DATABASE_PASSWORD=psono
    depends_on:
      - psono-db
  psono-db:
    image: postgres:15-alpine
    restart: unless-stopped
    environment:
      - POSTGRES_USER=psono
      - POSTGRES_PASSWORD=psono
      - POSTGRES_DB=psono
    volumes:
      - psono_pg_data:/var/lib/postgresql/data
volumes:
  psono_pg_data:
`,
    affiliateLinks,
    features: ["Gestión de secretos y claves de API además de contraseñas", "Cifrado de extremo a extremo", "Extensiones para todos los navegadores"],
    techStack: ["Python", "Django", "PostgreSQL"],
    pros: ["Cubre también secretos de infraestructura, no solo contraseñas personales"],
    cons: ["Comunidad más pequeña que Vaultwarden o Bitwarden"],
    tags: ["docker-ready"],
  },
  {
    id: "keeweb",
    name: "KeeWeb",
    slug: "keeweb",
    replaces: ["LastPass"],
    category: "PasswordManagers",
    description:
      "KeeWeb es un cliente web y de escritorio para bases de datos KeePass (.kdbx), que puedes auto-hospedar como una app estática conectada a tu propio almacenamiento en la nube o servidor.",
    shortDescription: "Cliente web para bóvedas KeePass, alternativa ligera a LastPass.",
    websiteUrl: "https://keeweb.info",
    githubUrl: "https://github.com/keeweb/keeweb",
    starsCount: 10000,
    license: "MIT",
    dockerCompose: `version: "3.9"
services:
  keeweb:
    image: antelle/keeweb:latest
    restart: unless-stopped
    ports:
      - "8080:80"
volumes: {}
`,
    affiliateLinks,
    features: ["Compatible con bóvedas .kdbx de KeePass", "Se conecta a Dropbox, Google Drive o WebDAV propio", "Funciona offline como PWA"],
    techStack: ["JavaScript", "Electron"],
    pros: ["Aprovecha el formato KeePass, muy auditado y maduro"],
    cons: ["Es un cliente, no un servidor: la sincronización depende de otro backend"],
    tags: ["docker-ready", "permissive-license"],
  },
];

export function getToolBySlug(slug: string): OpenSourceTool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: string) {
  return tools.filter((t) => t.category === category);
}

export function getFeaturedTools() {
  return tools.filter((t) => t.featured);
}
