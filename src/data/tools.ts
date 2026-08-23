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
