/**
 * English overrides for the narrative fields of each tool (description,
 * shortDescription, features, pros, cons). Everything else (slug, license,
 * techStack, docker-compose, URLs, stars) is language-neutral and lives only
 * in tools.ts. Missing keys gracefully fall back to the Spanish text via
 * getLocalizedTool().
 */
export interface ToolTranslation {
  description: string;
  shortDescription: string;
  features: string[];
  pros: string[];
  cons: string[];
}

export const toolsEn: Record<string, ToolTranslation> = {
  appflowy: {
    description:
      "AppFlowy is an all-in-one workspace for notes, wikis and databases, built in Rust and Flutter to stay fast even with thousands of pages. It's the most mature open source alternative to Notion for teams who want control over where their data lives.",
    shortDescription: "Notes and database workspace, the open source alternative to Notion.",
    features: [
      "Notion-style block editor with databases",
      "Local-first mode, works offline",
      "Native apps for Windows, macOS, Linux, iOS and Android",
      "Plugins and open API",
    ],
    pros: [
      "Noticeably better performance with large documents",
      "No artificial limits on blocks or members",
      "Self-hostable with full control of your data",
    ],
    cons: [
      "Plugin ecosystem still smaller than Notion's",
      "AGPL-3.0 requires releasing your code if you modify and offer it as a service",
    ],
  },
  plane: {
    description:
      "Plane is a project and issue management platform for product and engineering teams, with cycles, modules and Kanban views in the style of Linear/Jira, but fully self-hostable.",
    shortDescription: "Project and issue management, an alternative to Jira and Asana.",
    features: [
      "Cycles (sprints), modules and roadmaps",
      "Kanban, list, calendar and Gantt views",
      "Public REST API and webhooks",
      "Importers from Jira and Linear",
    ],
    pros: [
      "Much more polished interface than other open source alternatives",
      "No per-seat charge when self-hosted",
    ],
    cons: [
      "Needs more server resources than a simple Kanban board",
      "Some enterprise integrations are cloud-only",
    ],
  },
  focalboard: {
    description:
      "Focalboard offers Kanban boards, tables and calendars in the style of Trello, and can run either as a standalone app or integrated into Mattermost.",
    shortDescription: "Open source Kanban boards, an alternative to Trello.",
    features: [
      "Kanban, table, gallery and calendar boards",
      "Ready-to-use templates",
      "Standalone mode or Mattermost plugin",
    ],
    pros: ["Very permissive MIT license", "Lightweight and easy to deploy"],
    cons: [
      "Fewer automation features than Trello with Power-Ups",
      "Slower development pace since the Mattermost acquisition",
    ],
  },
  nocodb: {
    description:
      "NocoDB turns any SQL database into an Airtable-style smart spreadsheet, with views, forms and automations, without locking your data into a proprietary format.",
    shortDescription: "Smart spreadsheet on top of SQL, an alternative to Airtable.",
    features: [
      "Grid, Kanban, Gallery and Form views",
      "Auto-generated REST and GraphQL APIs",
      "Automations and webhooks",
      "Connects to existing MySQL, PostgreSQL, SQL Server and SQLite",
    ],
    pros: [
      "Runs on real databases, not a proprietary format",
      "No artificial row limits",
    ],
    cons: ["Somewhat steeper learning curve than Airtable", "AGPL-3.0"],
  },
  baserow: {
    description:
      "Baserow is an open source alternative to Airtable with an interface very close to the original product, built for non-technical teams to build no-code databases.",
    shortDescription: "No-code database, a direct alternative to Airtable.",
    features: [
      "Drag-and-drop interface very similar to Airtable",
      "Grid, Kanban, Calendar and Gallery views",
      "Automatic REST API per table",
      "Plugins and snapshots",
    ],
    pros: [
      "Minimal learning curve if you're coming from Airtable",
      "Very simple all-in-one Docker image to deploy",
    ],
    cons: ["Advanced automations require the premium edition"],
  },
  plausible: {
    description:
      "Plausible is a lightweight, privacy-focused web analytics tool: no cookies, native GDPR/CCPA compliance, and a much simpler dashboard than Google Analytics.",
    shortDescription: "Cookie-free web analytics, an alternative to Google Analytics.",
    features: [
      "Under-1KB script, doesn't slow down your site",
      "No cookies or consent banner needed",
      "Single-page dashboard",
      "Imports historical data from Google Analytics",
    ],
    pros: ["Privacy by design", "Far simpler to read than GA4"],
    cons: [
      "Requires ClickHouse, somewhat heavier to self-host",
      "Less analytical depth than GA4 for complex ecommerce",
    ],
  },
  umami: {
    description:
      "Umami is simple, fast, privacy-respecting web analytics with a single Node.js binary and one database, ideal for anyone who wants minimal operational overhead.",
    shortDescription: "Minimalist web analytics, very easy to self-host.",
    features: ["Multi-site from a single dashboard", "Custom events", "Own API for reporting"],
    pros: ["MIT license", "Deploys as a single container + database"],
    cons: ["Less detailed reports than GA4 or Matomo"],
  },
  matomo: {
    description:
      "Matomo is the most complete open source web analytics tool, with heatmaps, session recordings, funnels and the level of detail of GA4, but with your data 100% under your control.",
    shortDescription: "Complete web analytics with heatmaps and sessions, 100% yours.",
    features: [
      "Heatmaps and session recording (official plugin)",
      "Advanced funnels and segments",
      "100% of the data, no sampling",
    ],
    pros: ["The most complete open source alternative to GA4"],
    cons: ["Heavier interface, needs more resources than Plausible or Umami"],
  },
  posthog: {
    description:
      "PostHog combines product analytics, session replay, feature flags, A/B testing and surveys in one self-hostable platform built for product teams.",
    shortDescription: "Product analytics + feature flags + A/B testing, all in one.",
    features: ["Session replay and heatmaps", "Feature flags and A/B experiments", "Funnels, retention and cohorts"],
    pros: ["Replaces several SaaS tools at once"],
    cons: ["Large-scale self-hosted deployment needs more pieces (ClickHouse, Kafka)"],
  },
  "cal-com": {
    description:
      "Cal.com is open source scheduling infrastructure: booking pages, event types, calendar integrations and video calls, fully customizable and self-hostable.",
    shortDescription: "Open source meeting scheduling, an alternative to Calendly.",
    features: [
      "Custom booking pages",
      "Google/Outlook Calendar sync",
      "Built-in video calls (Cal Video)",
      "Team meeting routing",
    ],
    pros: ["Fully white-label, your own domain and brand"],
    cons: ["Initial setup is more technical than signing up for Calendly"],
  },
  rocketchat: {
    description:
      "Rocket.Chat is a team messaging platform with channels, threads, video calls and an extensive API, built for organizations that need full control over their communications.",
    shortDescription: "Self-hostable team chat, an alternative to Slack.",
    features: ["Native channels, threads and video calls", "Bridging with Matrix, Slack and WhatsApp", "Apps and bots via the Rocket.Chat Marketplace"],
    pros: ["MIT license", "No message history limit"],
    cons: ["MongoDB with a replica set adds operational complexity"],
  },
  mattermost: {
    description:
      "Mattermost is a secure collaboration platform widely used by DevOps and government teams, with deep integrations into CI/CD pipelines and incident response.",
    shortDescription: "Security-focused team chat and collaboration, an alt. to Slack.",
    features: ["Playbooks for incident management", "Native CI/CD integrations", "Configurable compliance and retention"],
    pros: ["Widely used in regulated and government environments"],
    cons: ["The Team edition has fewer features than Enterprise"],
  },
  twenty: {
    description:
      "Twenty is a modern CRM built to be the open source equivalent of Salesforce/HubSpot, with a very flexible spreadsheet-like interface and a fully customizable data model.",
    shortDescription: "Modern open source CRM, an alternative to Salesforce.",
    features: ["100% customizable fields and objects", "Table and pipeline Kanban views", "GraphQL and REST API"],
    pros: ["Modern interface, very quick for teams to adopt"],
    cons: ["Still fewer native integrations than Salesforce/HubSpot"],
  },
  chatwoot: {
    description:
      "Chatwoot centralizes live chat, email, social media and WhatsApp into a single customer support inbox, with automations and reporting, as a direct alternative to Intercom or Zendesk.",
    shortDescription: "Omnichannel support inbox, an alternative to Intercom/Zendesk.",
    features: ["Multichannel shared inbox (web, email, WhatsApp, Instagram)", "Chatbots and automated replies", "SLA and satisfaction reports"],
    pros: ["MIT license", "Very lightweight chat widget for your website"],
    cons: ["Some AI integrations are cloud-plan only"],
  },
  supabase: {
    description:
      "Supabase is the open source backend-as-a-service built on PostgreSQL: database, authentication, storage, edge functions and realtime subscriptions, all self-hostable.",
    shortDescription: "Backend-as-a-service on PostgreSQL, an alternative to Firebase.",
    features: ["Full PostgreSQL database (not a subset)", "Auth with OAuth, magic links and RLS", "File storage with CDN", "Realtime subscriptions and Edge Functions"],
    pros: ["Easier migration thanks to standard SQL"],
    cons: ["The full self-hosted stack has quite a few services to maintain"],
  },
  appwrite: {
    description:
      "Appwrite is a backend-as-a-service platform with SDKs for every popular framework, covering auth, databases, storage, functions and messaging, with a strong focus on developer experience.",
    shortDescription: "Multi-language backend-as-a-service, an alternative to Firebase.",
    features: ["SDKs for Flutter, Swift, Android, Web and more", "Serverless functions in multiple runtimes", "Very complete control panel"],
    pros: ["Carefully crafted cross-platform developer experience"],
    cons: ["Stack with several internal containers, heavier to audit"],
  },
  minio: {
    description:
      "MinIO is high-performance object storage, 100% compatible with the S3 API, ideal for anyone who wants their own storage infrastructure without changing a line of code in their AWS SDKs.",
    shortDescription: "S3-compatible object storage, self-hosted.",
    features: ["100% S3-compatible API", "Encryption at rest and object versioning", "Multi-site replication"],
    pros: ["Drop-in S3 replacement, near-frictionless migration"],
    cons: ["Real high availability requires several nodes to configure"],
  },
  nextcloud: {
    description:
      "Nextcloud is the most popular open source productivity and cloud storage suite: files, calendar, contacts, collaborative editing and video calls, all under your own domain.",
    shortDescription: "File cloud and collaboration, an alternative to Google Drive.",
    features: ["Cross-platform file sync", "Collaborative document editing (Collabora/OnlyOffice)", "Calendar, contacts and video calls (Nextcloud Talk)", "Hundreds of official and community apps"],
    pros: ["The widest ecosystem of self-hosted productivity apps"],
    cons: ["Can feel heavy on small instances running many apps"],
  },
  n8n: {
    description:
      "n8n is a workflow automation tool with a visual node editor, 400+ integrations and the ability to write JavaScript/Python code whenever you need it.",
    shortDescription: "Workflow automation, an alternative to Zapier.",
    features: ["Visual flow editor with 400+ nodes", "JavaScript and Python code nodes when you need them", "Self-hosted execution with no task limit"],
    pros: ["No charge per execution when self-hosted"],
    cons: ["The Fair-code license restricts offering it as a SaaS competing with n8n Cloud"],
  },
  "open-webui": {
    description:
      "Open WebUI is an extensible, self-hostable chat interface for local LLMs (via Ollama) or remote OpenAI-API-compatible models, with support for RAG, multiple users and plugins.",
    shortDescription: "Self-hosted chat interface for LLMs, an alternative to ChatGPT Plus.",
    features: ["Compatible with Ollama and any OpenAI-style API", "RAG with your own documents", "User and role management", "Marketplace of community prompts and functions"],
    pros: ["Runs 100% local models, no data sent to third parties"],
    cons: ["Quality depends on the model you choose to run (GPU recommended)"],
  },
  langfuse: {
    description:
      "Langfuse is an open source observability and evaluation platform for LLM applications: traces, per-request costs, evaluation datasets and prompt management, self-hostable alongside your AI stack.",
    shortDescription: "Observability and evals for LLM apps, self-hostable.",
    features: ["Detailed traces for every LLM call", "Prompt management with versioning", "Datasets and automatic evaluations"],
    pros: ["MIT core, with optional separate enterprise features"],
    cons: ["Large-scale deployment adds ClickHouse and Redis"],
  },
  huly: {
    description:
      "Huly is an all-in-one platform that combines project management, team chat and documents, designed as a joint replacement for Linear, Notion and Slack in a single self-hostable app.",
    shortDescription: "Projects + chat + docs in one, an alternative to Linear/Notion/Slack.",
    features: ["Linear-style issues and projects", "Team chat and channels", "Collaborative documents"],
    pros: ["Replaces three different SaaS tools with a single deployment"],
    cons: ["Young project, integration ecosystem still limited"],
  },
  outline: {
    description:
      "Outline is a fast, well-designed team knowledge wiki, with real-time collaborative editing, instant search and a clear collection structure.",
    shortDescription: "Fast, elegant team wiki, an alternative to Confluence.",
    features: ["Real-time collaborative editing", "Instant search", "Collections and team permissions"],
    pros: ["Very polished interface, fast team adoption"],
    cons: ["BUSL-1.1 license restricts offering it as a competing SaaS"],
  },
  bookstack: {
    description:
      "BookStack organizes documentation into books, chapters and pages, with a WYSIWYG or Markdown editor and granular permission control, as a simple, lightweight alternative to Confluence.",
    shortDescription: "Documentation organized into books and pages, an alternative to Confluence.",
    features: ["Books, chapters and pages structure", "WYSIWYG or Markdown editor", "Granular role-based permissions"],
    pros: ["MIT license", "Very lightweight compared to Confluence"],
    cons: ["Fewer third-party plugins than Confluence"],
  },
  wekan: {
    description:
      "Wekan is an open source Kanban board with lists, cards, labels and checklists, very similar in experience to Trello and with active community support.",
    shortDescription: "Classic Kanban board, a direct alternative to Trello.",
    features: ["Kanban boards with labels and checklists", "Swimlanes and multiple views", "Webhook integrations"],
    pros: ["Very permissive MIT license", "Minimal adoption curve"],
    cons: ["Somewhat less polished interface than Trello"],
  },
  vikunja: {
    description:
      "Vikunja is an open source task manager with lists, Kanban, Gantt and reminders, designed as a lightweight alternative to Todoist and Asana for small teams.",
    shortDescription: "Task and project manager, an alternative to Todoist and Asana.",
    features: ["List, Kanban and Gantt views", "Recurring tasks and reminders", "REST API and mobile apps"],
    pros: ["Very lightweight, runs fine even on SQLite"],
    cons: ["Fewer third-party integrations than Asana"],
  },
  taiga: {
    description:
      "Taiga is an agile project management platform with Scrum and Kanban, backlog and user stories, aimed at teams who want Jira's simplicity without its complexity.",
    shortDescription: "Agile management (Scrum/Kanban), a simpler alternative to Jira.",
    features: ["Scrum and Kanban in the same project", "Backlog and user stories", "Epics and sprints"],
    pros: ["Much gentler learning curve than Jira"],
    cons: ["Full production stack needs more pieces (nginx, RabbitMQ)"],
  },
  openproject: {
    description:
      "OpenProject covers classic and agile project management: Gantt charts, backlogs, timesheets and budgets, as a complete alternative to Jira and MS Project for large teams.",
    shortDescription: "Project management with Gantt and budgets, an alternative to Jira/MS Project.",
    features: ["Interactive Gantt charts", "Agile backlogs and sprints", "Timesheets and budgets"],
    pros: ["The most complete option for traditional + agile project management"],
    cons: ["Heavier interface than minimalist alternatives"],
  },
  "trilium-notes": {
    description:
      "Trilium Notes is a hierarchical note-taking app with encryption, versioning and its own scripting, built for large personal knowledge bases in the style of Evernote or OneNote.",
    shortDescription: "Hierarchical, encrypted notes, an alternative to Evernote/OneNote.",
    features: ["Unlimited hierarchical notes", "Encryption for sensitive notes", "Own scripting and automations"],
    pros: ["Excellent for huge personal knowledge bases"],
    cons: ["Less friendly interface for non-technical teams"],
  },
  docmost: {
    description:
      "Docmost is an open source collaborative wiki and documentation tool with spaces, permissions and real-time editing, born as a modern, self-hostable alternative to Confluence.",
    shortDescription: "Modern collaborative wiki, an open source alternative to Confluence.",
    features: ["Spaces and team permissions", "Real-time collaborative editing", "Comments and page versioning"],
    pros: ["Very fast-growing community and feature set"],
    cons: ["Still a young project compared to Confluence"],
  },
  affine: {
    description:
      "AFFiNE combines documents, databases and a visual whiteboard on one canvas, offering an alternative to Notion with a strong focus on local-first editing.",
    shortDescription: "Docs + whiteboard on one canvas, an alternative to Notion.",
    features: ["Notion-style docs and databases", "Integrated infinite whiteboard", "Local-first mode"],
    pros: ["Combines notes and a whiteboard, something Notion doesn't offer natively"],
    cons: ["The official self-host setup still evolves quickly between versions"],
  },
  zulip: {
    description:
      "Zulip organizes team conversations into topic threads within each channel, cutting down on noise compared to Slack in large teams with heavy message volume.",
    shortDescription: "Team chat organized by threads, an alternative to Slack.",
    features: ["Topic threads within each channel", "Powerful search across the whole history", "Native cross-platform apps"],
    pros: ["Much less noise than Slack in very active channels"],
    cons: ["The topic-thread model has a learning curve"],
  },
  etherpad: {
    description:
      "Etherpad is a real-time collaborative text editor, lightweight and very quick to deploy, ideal for quick shared notes in the style of Google Docs without an account or sign-up.",
    shortDescription: "Real-time collaborative editor, a lightweight alternative to Google Docs.",
    features: ["Real-time collaborative editing", "Revision history", "Community plugins"],
    pros: ["Extremely lightweight and quick to deploy"],
    cons: ["No spreadsheets or presentations, text only"],
  },
  wikijs: {
    description:
      "Wiki.js is a modern wiki with a Markdown or visual editor, Git-style version control and support for multiple authentication sources, as a flexible alternative to Confluence.",
    shortDescription: "Modern wiki with version control, an alternative to Confluence.",
    features: ["Markdown and visual editor", "Git-style change history", "Multiple authentication providers"],
    pros: ["Highly configurable authentication and storage"],
    cons: ["Fewer enterprise integrations than Confluence"],
  },
  rallly: {
    description:
      "Rallly lets you create availability polls to find the best meeting date among several people, with no account needed to vote, as an alternative to Doodle.",
    shortDescription: "Availability polls for meetings, an alternative to Doodle.",
    features: ["Date polls with no account required", "Automatic email reminders", "Calendar integration"],
    pros: ["Voters don't need to sign up"],
    cons: ["Doesn't replace Calendly's 1-on-1 scheduling, group polls only"],
  },
  cryptpad: {
    description:
      "CryptPad is a collaborative office suite with end-to-end encryption: documents, spreadsheets, presentations and forms, without the server ever being able to read the content.",
    shortDescription: "End-to-end encrypted office suite, an alternative to Google Docs.",
    features: ["Collaborative documents, sheets and presentations", "End-to-end encryption", "Built-in forms and kanban"],
    pros: ["The server never sees the content in the clear"],
    cons: ["Somewhat lower performance than Google Docs on huge documents"],
  },
  fider: {
    description:
      "Fider collects and prioritizes user feedback through a public idea board people can vote and comment on, as an alternative to Canny for public roadmaps.",
    shortDescription: "Public feedback and roadmap board, an alternative to Canny.",
    features: ["Public idea board with votes", "Customizable roadmap statuses", "Email notifications to voters"],
    pros: ["Very simple to deploy and maintain"],
    cons: ["Fewer user segmentation options than Canny"],
  },
  metabase: {
    description:
      "Metabase lets you build dashboards and queries over your databases with a visual (no-SQL) interface or direct SQL, as an accessible alternative to Looker and Tableau.",
    shortDescription: "Dashboards and BI over your databases, an alternative to Looker/Tableau.",
    features: ["Visual queries without SQL", "Dashboards and scheduled alerts", "Connects to most SQL databases"],
    pros: ["Very low learning curve for non-technical teams"],
    cons: ["Advanced data governance features are Enterprise-edition only"],
  },
  "apache-superset": {
    description:
      "Apache Superset is a data exploration and visualization platform with dozens of chart types and a built-in SQL editor, built to replace Tableau or Power BI at scale.",
    shortDescription: "Large-scale BI and data visualization, an alternative to Tableau/Power BI.",
    features: ["Dozens of chart types", "SQL editor with autocomplete", "Scheduled alerts and reports"],
    pros: ["Apache-2.0 license with no commercial-use restrictions"],
    cons: ["Production setup is more involved (Redis/Celery recommended)"],
  },
  redash: {
    description:
      "Redash connects to multiple data sources to write SQL queries, visualize them and share them in dashboards, as a lightweight alternative to Looker for data teams.",
    shortDescription: "SQL queries and shareable dashboards, an alternative to Looker.",
    features: ["Reusable SQL queries", "Shareable dashboards with filters", "Query-based alerts"],
    pros: ["Very permissive BSD license"],
    cons: ["Slower development pace than Metabase in recent years"],
  },
  countly: {
    description:
      "Countly is a web and mobile product analytics platform with funnels, retention and user segmentation, offered as a self-hostable community edition versus Mixpanel.",
    shortDescription: "Web and mobile product analytics, an alternative to Mixpanel.",
    features: ["User funnels and retention", "Native mobile app analytics", "User segmentation"],
    pros: ["Strong support for native mobile SDKs"],
    cons: ["The community edition has fewer features than the Enterprise one"],
  },
  ackee: {
    description:
      "Ackee is minimalist, self-hostable, privacy-respecting web analytics, with a simple dashboard to measure visits and events without tracking personal data.",
    shortDescription: "Minimalist, private web analytics, an alternative to Google Analytics.",
    features: ["Minimalist visits dashboard", "Custom events", "No tracking cookies"],
    pros: ["MIT license and a very small footprint"],
    cons: ["Much more basic reports than GA4"],
  },
  goatcounter: {
    description:
      "GoatCounter is extremely lightweight web analytics (a single Go binary) focused on privacy, built for blogs and personal sites that don't need a full GA4.",
    shortDescription: "Ultra-lightweight web analytics in a single binary, an alternative to Google Analytics.",
    features: ["Single binary, no external dependencies", "Simple visits and referrers dashboard", "No cookies or fingerprinting"],
    pros: ["The lightest deployment in the whole category"],
    cons: ["Not built for complex product analytics"],
  },
  openreplay: {
    description:
      "OpenReplay records user sessions for replay, along with heatmaps and performance metrics, as a self-hostable alternative to LogRocket and FullStory.",
    shortDescription: "Session recording and heatmaps, an alternative to LogRocket.",
    features: ["Session recording and replay", "Heatmaps and performance metrics", "Console error capture"],
    pros: ["No limit on recorded sessions when self-hosted"],
    cons: ["Real production installation requires several microservices"],
  },
  highlight: {
    description:
      "Highlight combines session recording, error monitoring and backend logs on a single platform, as a self-hostable full-stack alternative to LogRocket.",
    shortDescription: "Sessions, errors and logs in one platform, an alternative to LogRocket.",
    features: ["Full-stack session replay", "Frontend and backend error monitoring", "Centralized logs"],
    pros: ["Unifies frontend and backend in a single tool"],
    cons: ["Production stack has several services to maintain"],
  },
  openpanel: {
    description:
      "OpenPanel combines web and product analytics (events, funnels, user profiles) in a modern dashboard, as a recent, self-hostable alternative to Mixpanel and Amplitude.",
    shortDescription: "Web + product analytics in a modern dashboard, an alternative to Mixpanel.",
    features: ["Product events and funnels", "Unified user profiles", "Modern, fast dashboard"],
    pros: ["Combines web and product analytics in a single tool"],
    cons: ["Young project, still small community"],
  },
  gitea: {
    description:
      "Gitea is a lightweight Git platform with issues, pull requests, wiki and built-in Actions, built for teams who want their own self-hosted GitHub with very few resources.",
    shortDescription: "Lightweight Git platform, a self-hosted alternative to GitHub.",
    features: ["Built-in issues, PRs and wiki", "Gitea Actions compatible with GitHub Actions", "Very low resource usage"],
    pros: ["Runs perfectly on a 1GB RAM VPS"],
    cons: ["Smaller integration ecosystem than GitHub"],
  },
  "gitlab-ce": {
    description:
      "GitLab Community Edition offers Git repositories, CI/CD, issue tracking and a container registry in a single complete DevOps platform, free to self-host.",
    shortDescription: "Complete DevOps platform (Git + CI/CD), an alternative to GitHub.",
    features: ["Built-in CI/CD, no external tools needed", "Own container registry", "Issue and epic management"],
    pros: ["The whole DevOps cycle in a single platform"],
    cons: ["Needs quite a bit more RAM than Gitea (4GB+ recommended)"],
  },
  jenkins: {
    description:
      "Jenkins is the most widely used and plugin-extensible CI/CD automation server, for teams who want full control of their pipelines without relying on a SaaS.",
    shortDescription: "Extensible CI/CD server, a self-hosted alternative to CircleCI.",
    features: ["Thousands of community plugins", "Pipelines as code (Jenkinsfile)", "Support for any language or runner"],
    pros: ["The biggest plugin ecosystem in CI/CD"],
    cons: ["More manual initial setup than modern SaaS tools"],
  },
  portainer: {
    description:
      "Portainer offers a visual panel to manage Docker or Kubernetes containers, stacks and images, ideal for administering your servers without memorizing Docker CLI commands.",
    shortDescription: "Visual panel for managing Docker/Kubernetes, an alternative to the Docker CLI.",
    features: ["Visual management of containers and stacks", "Supports Docker, Swarm and Kubernetes", "Team-based access control"],
    pros: ["Massively reduces the friction of administering Docker over SSH"],
    cons: ["Needs access to the host's Docker socket, watch your permissions"],
  },
  directus: {
    description:
      "Directus turns any SQL database into a headless backend with an auto-generated REST/GraphQL API and admin panel, as a self-hostable alternative to Contentful.",
    shortDescription: "Headless CMS on top of your own database, an alternative to Contentful.",
    features: ["Auto-generated REST and GraphQL APIs", "Configurable admin panel", "Connects to existing SQL databases"],
    pros: ["Doesn't lock your data into a proprietary format"],
    cons: ["BUSL-1.1 license restricts offering it as a competing SaaS"],
  },
  strapi: {
    description:
      "Strapi is the most popular open source headless CMS built on Node.js, with fully customizable content types and a REST/GraphQL API ready to consume from any frontend.",
    shortDescription: "The most popular open source headless CMS, an alternative to Contentful.",
    features: ["100% customizable content types", "REST and GraphQL API", "Plugin marketplace"],
    pros: ["MIT license and the largest headless JS CMS community"],
    cons: ["Major version migrations need care"],
  },
  pocketbase: {
    description:
      "PocketBase is a backend-as-a-service in a single binary file: SQLite database, authentication, file storage and a realtime API, ideal for MVPs and small apps.",
    shortDescription: "Backend-as-a-service in a single binary, a minimal alternative to Firebase.",
    features: ["Auth, storage and database in one binary", "Realtime API over WebSockets", "Admin panel included"],
    pros: ["The simplest deployment in the whole backend-as-a-service category"],
    cons: ["SQLite limits horizontal scalability at high volume"],
  },
  hasura: {
    description:
      "Hasura instantly generates a realtime GraphQL and REST API from your PostgreSQL database, with granular permissions, as an alternative to Firebase or AWS AppSync.",
    shortDescription: "Instant GraphQL API over PostgreSQL, an alternative to Firebase/AppSync.",
    features: ["Instant GraphQL and REST over PostgreSQL", "Realtime subscriptions", "Row-level permissions"],
    pros: ["No need to write resolvers by hand"],
    cons: ["Mainly built for PostgreSQL/a few other databases, not NoSQL"],
  },
  meilisearch: {
    description:
      "Meilisearch is a fast, typo-tolerant search engine that's easy to integrate into any app, built as a self-hostable alternative to Algolia.",
    shortDescription: "Fast, typo-tolerant search engine, an alternative to Algolia.",
    features: ["Typo-tolerant search", "Results in under 50ms", "Filters, synonyms and geosearch"],
    pros: ["Extremely fast to set up, no cost per search"],
    cons: ["Fewer search-analytics features than Algolia"],
  },
  typesense: {
    description:
      "Typesense is an open source search engine focused on simplicity and speed, with federated search and geosearch, as a direct alternative to Algolia with no cost per request.",
    shortDescription: "Simple, fast search engine, another open source alternative to Algolia.",
    features: ["Federated search across multiple collections", "Geosearch and faceted filters", "High availability with clustering"],
    pros: ["Very polished documentation and DX"],
    cons: ["Somewhat smaller community than Meilisearch"],
  },
  novu: {
    description:
      "Novu is a notification infrastructure that unifies email, SMS, push and in-app notifications in a single API with templates and visual workflows, as a self-hostable alternative to OneSignal.",
    shortDescription: "Multichannel notification infrastructure, an alternative to OneSignal.",
    features: ["Email, SMS, push and in-app in one API", "Visual notification workflow editor", "Embeddable notification center"],
    pros: ["Unifies every notification channel in one place"],
    cons: ["You still need to connect your own delivery providers (SMTP, SMS)"],
  },
  windmill: {
    description:
      "Windmill combines script automation, workflows and internal dashboards generated from Python, TypeScript or Go code, as a self-hostable alternative to Retool.",
    shortDescription: "Scripts, workflows and internal dashboards, a self-hostable alternative to Retool.",
    features: ["Scripts in Python, TypeScript and Go", "Auto-generated internal dashboards", "Scheduled flows and triggers"],
    pros: ["Runs real code, not just visual low-code"],
    cons: ["Steeper learning curve if the team doesn't code"],
  },
  unleash: {
    description:
      "Unleash is an open source feature flag platform with user segmentation, gradual rollouts and SDKs for every popular language, an alternative to LaunchDarkly.",
    shortDescription: "Open source feature flags, a self-hostable alternative to LaunchDarkly.",
    features: ["Gradual rollouts and segmentation", "SDKs for 20+ languages", "Custom activation strategies"],
    pros: ["No charge per flag or per evaluated user"],
    cons: ["Flag analytics panel is more basic than LaunchDarkly's"],
  },
  listmonk: {
    description:
      "listmonk is a high-performance newsletter and email campaign manager, with lists, templates and stats, self-hostable as an alternative to Mailchimp with no per-subscriber cost.",
    shortDescription: "Newsletters and email campaigns, an alternative to Mailchimp with no per-subscriber cost.",
    features: ["Subscriber lists and segmentation", "Campaign templates with stats", "High sending throughput"],
    pros: ["No artificial subscriber or send limits"],
    cons: ["You need your own SMTP provider for sending"],
  },
  documenso: {
    description:
      "Documenso is the open source alternative to DocuSign for electronically signing documents, with signing workflows, templates and verification, all self-hostable.",
    shortDescription: "Electronic document signing, an open source alternative to DocuSign.",
    features: ["Multi-signer signing workflows", "Reusable document templates", "Cryptographic signature verification"],
    pros: ["No cost per signed document when self-hosted"],
    cons: ["Legal validity of the signature varies by jurisdiction, check local regulations"],
  },
  "uptime-kuma": {
    description:
      "Uptime Kuma monitors the availability of your sites and services with notifications to 90+ different channels, in a clean interface that's very easy to self-host.",
    shortDescription: "Self-hosted uptime monitor, an alternative to UptimeRobot.",
    features: ["HTTP(s), TCP, DNS and more monitoring", "Notifications to 90+ services", "Public status pages"],
    pros: ["One of the community's most-loved self-hosted projects"],
    cons: ["Doesn't natively include deep infrastructure monitoring (CPU/RAM)"],
  },
  grafana: {
    description:
      "Grafana visualizes metrics, logs and traces from almost any data source in highly customizable dashboards, the de facto standard for self-hosted observability versus Datadog.",
    shortDescription: "Observability dashboards, a self-hosted alternative to Datadog.",
    features: ["Dashboards connected to dozens of data sources", "Multichannel alerting", "Logs and traces explorer"],
    pros: ["The industry standard for observability dashboards"],
    cons: ["You need Prometheus/Loki/Tempo separately for data collection"],
  },
  espocrm: {
    description:
      "EspoCRM is an open source CRM with lead management, opportunities and sales automation, customizable through a visual entity editor, as an alternative to Salesforce.",
    shortDescription: "Customizable sales CRM, an open source alternative to Salesforce.",
    features: ["Visual custom entity editor", "Sales workflow automation", "Lead and opportunity management"],
    pros: ["Highly customizable without writing code"],
    cons: ["Less modern interface than current SaaS CRMs"],
  },
  suitecrm: {
    description:
      "SuiteCRM is a mature enterprise CRM with integrated sales, marketing and support, born as a fork of SugarCRM Community, built to replace Salesforce in large organizations.",
    shortDescription: "Complete enterprise CRM, a mature alternative to Salesforce.",
    features: ["Sales, marketing and support modules", "Visual workflows", "Broad extension ecosystem"],
    pros: ["Very complete for complex sales processes"],
    cons: ["Interface and tech stack feel somewhat dated"],
  },
  "krayin-crm": {
    description:
      "Krayin is an open source CRM built on Laravel, with lead management, a visual sales pipeline and integrated email, as a modern, lightweight alternative to Zoho CRM.",
    shortDescription: "Lightweight CRM on Laravel, a modern alternative to Zoho CRM.",
    features: ["Visual sales pipeline", "Integrated email per lead", "Extensible with Laravel packages"],
    pros: ["MIT license and a well-known Laravel stack"],
    cons: ["Smaller community than EspoCRM or SuiteCRM"],
  },
  monica: {
    description:
      "Monica is a personal CRM for keeping track of your relationships: contacts, birthday reminders, conversation notes and important interactions with friends and family.",
    shortDescription: "Personal CRM for your relationships, an alternative to Clay.",
    features: ["Reminders for important dates", "Conversation and interaction notes", "Gift and activity tracking"],
    pros: ["Built for personal relationships, not just B2B sales"],
    cons: ["Doesn't replace a B2B sales CRM with a commercial pipeline"],
  },
  odoo: {
    description:
      "Odoo is a modular enterprise suite including CRM, sales, inventory, accounting and more, all integrated, as a self-hostable alternative to Salesforce or HubSpot in its Community edition.",
    shortDescription: "Modular enterprise suite with CRM, an alternative to Salesforce/HubSpot.",
    features: ["Integrated CRM, sales and inventory", "Hundreds of official and third-party modules", "Automations across modules"],
    pros: ["Covers far more than CRM: a full ERP if you need it"],
    cons: ["Many advanced modules are Enterprise-edition (paid) only"],
  },
  mautic: {
    description:
      "Mautic is a marketing automation platform with campaigns, landing pages, lead scoring and email marketing, as an open source alternative to HubSpot's marketing features.",
    shortDescription: "Marketing automation, an open source alternative to HubSpot Marketing.",
    features: ["Visual automation campaigns", "Landing pages and forms", "Lead scoring and segmentation"],
    pros: ["No cost per number of contacts, unlike HubSpot"],
    cons: ["Needs more upfront mail server configuration"],
  },
  zammad: {
    description:
      "Zammad is a support ticketing system with a multichannel inbox, knowledge base and automations, offered as a self-hostable alternative to Zendesk.",
    shortDescription: "Support ticketing system, a self-hostable alternative to Zendesk.",
    features: ["Multichannel ticket inbox", "Built-in knowledge base", "Automations and SLAs"],
    pros: ["More modern interface than other open source helpdesks"],
    cons: ["Elasticsearch adds one more service to maintain"],
  },
  freescout: {
    description:
      "FreeScout is a lightweight, free customer support inbox inspired by Help Scout, with multiple shared inboxes, private notes and automations.",
    shortDescription: "Lightweight support inbox, a free alternative to Help Scout.",
    features: ["Multiple shared inboxes", "Private notes between agents", "Free and paid community modules"],
    pros: ["Much lighter than Zendesk or Help Scout"],
    cons: ["Some useful modules are paid (though inexpensive)"],
  },
  "yetiforce-crm": {
    description:
      "YetiForce is a very complete open source CRM with 50+ modules (sales, projects, inventory, support) integrated into one platform, as a free alternative to Salesforce.",
    shortDescription: "CRM with 50+ integrated modules, a free alternative to Salesforce.",
    features: ["50+ integrated modules", "Project and inventory management included", "100% free, no paid editions"],
    pros: ["Completely free, no hidden Enterprise version"],
    cons: ["So many modules can be overwhelming during initial setup"],
  },
  ollama: {
    description:
      "Ollama lets you download and run open source language models (Llama, Mistral, Gemma...) on your own server with a compatible API, without sending your data to third parties.",
    shortDescription: "Run open source LLMs locally, an alternative to the OpenAI API.",
    features: ["Download models with a single command", "API compatible with multiple clients", "GPU and CPU support"],
    pros: ["Your data never leaves your server"],
    cons: ["Quality depends on the model and hardware available"],
  },
  localai: {
    description:
      "LocalAI exposes an API 100% compatible with OpenAI's (chat, images, embeddings, audio) but running open source models on your own infrastructure, with no external API keys.",
    shortDescription: "OpenAI-compatible API running local models, no per-token cost.",
    features: ["API compatible with the OpenAI SDK", "Chat, images, embeddings and audio", "Runs GGUF, GGML and more model formats"],
    pros: ["Near-direct migration from code already using the OpenAI API"],
    cons: ["Needs decent hardware (ideally a GPU) for large models"],
  },
  khoj: {
    description:
      "Khoj is a self-hostable personal AI assistant that searches and answers questions over your own documents, notes and web browsing, like a second AI-augmented memory.",
    shortDescription: "Personal AI assistant over your documents, an alternative to ChatGPT Plus.",
    features: ["Semantic search over your notes and documents", "Chat with your own PDFs and markdown", "Integration with Obsidian and Notion"],
    pros: ["Combines your own data with local or remote models"],
    cons: ["Initial document indexing setup takes some time"],
  },
  vllm: {
    description:
      "vLLM is a high-performance inference engine for serving large-scale language models with maximum throughput, exposing an OpenAI-compatible API for production.",
    shortDescription: "High-performance LLM inference engine, an alternative to the OpenAI API in production.",
    features: ["Much higher throughput thanks to PagedAttention", "OpenAI-compatible API", "Supports dozens of model architectures"],
    pros: ["Purpose-built for serving LLMs in production at scale"],
    cons: ["Requires a GPU with enough VRAM for the chosen model"],
  },
  anythingllm: {
    description:
      "AnythingLLM turns any document into a chat-queryable (RAG) knowledge base, with multi-user support and multiple model providers, local or cloud.",
    shortDescription: "Multi-user RAG chat over your documents, an alternative to ChatGPT Plus.",
    features: ["RAG over your own documents", "Multi-user with per-workspace permissions", "Compatible with Ollama, OpenAI and more providers"],
    pros: ["Works with both local models and external APIs"],
    cons: ["Answer quality depends on the model you connect"],
  },
  flowise: {
    description:
      "Flowise lets you build AI agents and flows by dragging and dropping blocks (LLMs, tools, memory) with no code, as a visual alternative to Voiceflow.",
    shortDescription: "Visual AI agent builder, an alternative to Voiceflow.",
    features: ["Visual drag-and-drop AI flow editor", "Supports agents, tools and memory", "API and embeddable widget"],
    pros: ["No coding needed to build basic agents"],
    cons: ["Very complex flows can become hard to debug visually"],
  },
  langflow: {
    description:
      "LangFlow is a visual editor built on LangChain for designing AI flows with LLMs, agents and vector stores, exportable as an API, an alternative to Voiceflow.",
    shortDescription: "Visual editor on LangChain for AI flows, an alternative to Voiceflow.",
    features: ["Built on the LangChain ecosystem", "Flows exportable as a REST API", "Supports multiple LLM and vector providers"],
    pros: ["Directly leverages the LangChain integration ecosystem"],
    cons: ["Can feel more technical than Flowise for non-developers"],
  },
  dify: {
    description:
      "Dify is a platform for designing, testing and deploying AI applications (chatbots, agents, flows) with a visual editor and built-in observability, instead of building everything on the raw OpenAI API by hand.",
    shortDescription: "Platform for building AI apps with a visual editor and observability.",
    features: ["Visual editor for AI agents and flows", "Observability and logs for every conversation", "Multi-model: OpenAI, Anthropic, local"],
    pros: ["Cuts down a lot of the code needed to ship an AI product"],
    cons: ["Full production stack has several services (Weaviate/Redis)"],
  },
  "automatic1111-sd-webui": {
    description:
      "AUTOMATIC1111's WebUI is the most popular interface for generating images with Stable Diffusion locally, with full control over models, LoRAs and extensions, with no generation limit.",
    shortDescription: "Complete interface for local Stable Diffusion, an alternative to Midjourney.",
    features: ["Thousands of community extensions", "Support for LoRAs and custom models", "Full control over generation parameters"],
    pros: ["No limit on generated images and no monthly subscription"],
    cons: ["Requires an NVIDIA GPU with enough VRAM"],
  },
  comfyui: {
    description:
      "ComfyUI is a node-based interface for Stable Diffusion that lets you build highly advanced, reproducible image-generation pipelines, popular among technical users.",
    shortDescription: "Node-based image generation, an advanced alternative to Midjourney.",
    features: ["Node-based generation pipelines", "Reproducible, shareable workflows", "Supports ControlNet, LoRAs and custom models"],
    pros: ["Maximum control over every step of the generation pipeline"],
    cons: ["Steeper learning curve than simple prompt interfaces"],
  },
  invokeai: {
    description:
      "InvokeAI offers a polished, creator-oriented interface for Stable Diffusion, with a unified canvas, inpainting and model management, as a local alternative to Midjourney.",
    shortDescription: "Polished Stable Diffusion interface with a unified canvas, an alternative to Midjourney.",
    features: ["Unified canvas with inpainting/outpainting", "Visual model and LoRA management", "Interface built for artists, not just devs"],
    pros: ["The friendliest interface for non-technical users among local options"],
    cons: ["Requires an NVIDIA GPU with enough VRAM"],
  },
  "bolt-diy": {
    description:
      "Bolt.diy is the open source, self-hostable version of Bolt.new: it generates and runs complete web apps from a prompt, connecting whichever AI provider you choose.",
    shortDescription: "Generates complete web apps from a prompt, an open source alternative to Bolt.new.",
    features: ["Generates and runs complete apps from a prompt", "Connect the AI provider you prefer", "Built-in in-browser code editor"],
    pros: ["You choose which AI provider to use (or a local one)"],
    cons: ["Still needs a capable LLM API for good results"],
  },
  rasa: {
    description:
      "Rasa is an open source framework for building chatbots and conversational assistants with full control over the NLU and dialogue flows, an alternative to Dialogflow.",
    shortDescription: "Conversational chatbot framework, an open source alternative to Dialogflow.",
    features: ["Full control over the NLU model", "Dialogue flows as versionable code", "Integrations with Slack, web, WhatsApp and more"],
    pros: ["Maximum technical control over the bot's behavior"],
    cons: ["Requires more technical knowledge than no-code tools"],
  },
  typebot: {
    description:
      "Typebot combines conversational forms with AI blocks, conditional logic and integrations, letting you build chatbots and visual surveys as an alternative to Typeform.",
    shortDescription: "AI-powered conversational forms, an alternative to Typeform.",
    features: ["Visual conversational flow editor", "Built-in AI blocks (OpenAI and others)", "Embeddable widget on any website"],
    pros: ["Combines Typeform's UX with conversational logic and AI"],
    cons: ["The full visual editor needs both the builder and viewer services"],
  },
  librechat: {
    description:
      "LibreChat is a chat interface that connects to multiple AI providers (OpenAI, Anthropic, local models) in one app with history, plugins and multiple users.",
    shortDescription: "Multi-provider chat with history and plugins, an alternative to ChatGPT Plus.",
    features: ["Connects OpenAI, Anthropic, Google and local models", "Multi-user with conversation history", "Plugins and built-in web search"],
    pros: ["Switch AI providers without switching interface"],
    cons: ["You need your own API keys for the providers you use"],
  },
  "text-generation-webui": {
    description:
      "Text Generation WebUI (oobabooga) is a very complete interface for running open source text models with multiple backends, extensions and a compatible API, all local.",
    shortDescription: "Advanced interface for local text models, an alternative to the OpenAI API.",
    features: ["Supports multiple backends (llama.cpp, ExLlama, Transformers)", "Community extensions", "OpenAI-compatible API"],
    pros: ["Very flexible for experimenting with different model formats"],
    cons: ["Requires a powerful GPU for the largest models"],
  },
  privategpt: {
    description:
      "PrivateGPT lets you ask questions about your own documents using LLMs, running 100% on your infrastructure with no data ever leaving your network.",
    shortDescription: "Ask your documents with 100% private LLMs, an alternative to ChatGPT+docs.",
    features: ["Q&A over your PDFs and documents", "100% offline, no external API calls", "Own REST API to integrate it"],
    pros: ["Ideal for sensitive data that can't leave your network"],
    cons: ["Performance depends on the local hardware available"],
  },
  perplexica: {
    description:
      "Perplexica is an open source AI search engine that combines a web search engine (SearXNG) with an LLM to give answers with cited sources, as an alternative to Perplexity AI.",
    shortDescription: "AI search with cited sources, an open source alternative to Perplexity AI.",
    features: ["Perplexity-style answers with cited sources", "Uses SearXNG for private web search", "Connects to local or cloud models"],
    pros: ["Web search with no dependency on any commercial search API"],
    cons: ["Result quality depends on the engines configured in SearXNG"],
  },
  seafile: {
    description:
      "Seafile syncs and shares files with optional end-to-end encryption and efficient version control, offering very solid performance as an alternative to Dropbox.",
    shortDescription: "Encrypted, efficient file sync, an alternative to Dropbox.",
    features: ["Optional end-to-end encryption per library", "Space-efficient version control", "Sync clients for every OS"],
    pros: ["Noticeably better sync performance with lots of files"],
    cons: ["Less modern interface than Nextcloud"],
  },
  owncloud: {
    description:
      "ownCloud offers file storage, sync and collaboration with its own app ecosystem, being the original project Nextcloud was forked from.",
    shortDescription: "File storage and sync, an alternative to Google Drive.",
    features: ["Cross-platform file sync", "Link and permission-based sharing", "Modern architecture (Infinite Scale)"],
    pros: ["New, very lightweight Infinite Scale architecture"],
    cons: ["Smaller app ecosystem than Nextcloud"],
  },
  syncthing: {
    description:
      "Syncthing syncs files directly between your devices over encrypted P2P, with no central cloud server involved, as a decentralized alternative to Dropbox.",
    shortDescription: "Encrypted P2P sync between devices, a decentralized alternative to Dropbox.",
    features: ["P2P sync with no central server", "End-to-end encryption by design", "File version control"],
    pros: ["Doesn't depend on any third-party cloud server"],
    cons: ["Not centralized storage: each device keeps its own copy"],
  },
  garage: {
    description:
      "Garage is distributed, S3-compatible object storage, designed to run across several small nodes (even geo-distributed) with high resilience.",
    shortDescription: "Distributed, S3-compatible object storage, an alternative to Amazon S3.",
    features: ["100% S3-compatible API", "Built for geo-distributed clusters", "Very low per-node resource usage"],
    pros: ["Excellent for homelab clusters on modest hardware"],
    cons: ["Cluster configuration has a bit more of a learning curve"],
  },
  seaweedfs: {
    description:
      "SeaweedFS is a distributed file system optimized to serve billions of small files quickly, with an included S3 compatibility layer.",
    shortDescription: "Distributed storage for millions of files, an alternative to Amazon S3.",
    features: ["Optimized for small files at scale", "Included S3 compatibility layer", "Configurable replication and erasure coding"],
    pros: ["Excellent performance with massive volumes of small files"],
    cons: ["Less polished documentation than MinIO to get started"],
  },
  immich: {
    description:
      "Immich automatically backs up photos and videos from your phone to your own server, with facial recognition, smart search and shared albums, as an alternative to Google Photos.",
    shortDescription: "AI-powered photo and video backup, a self-hosted alternative to Google Photos.",
    features: ["Automatic backup from mobile apps", "Facial recognition and object search", "Shared albums and family timeline"],
    pros: ["The mobile app rivals Google Photos in quality"],
    cons: ["Facial and object recognition benefit from having a GPU"],
  },
  photoprism: {
    description:
      "PhotoPrism organizes your photo library with automatic AI tagging, maps and semantic search, always leaving the original files in your own file system.",
    shortDescription: "AI-tagged photo manager, an alternative to Google Photos.",
    features: ["Automatic AI photo tagging", "Semantic and location-based search", "Original files stay untouched"],
    pros: ["Never modifies or moves your original files"],
    cons: ["Source-available license, not pure OSI open source"],
  },
  filestash: {
    description:
      "Filestash is a web file-explorer-style interface that connects to S3, FTP, SFTP, WebDAV, Google Drive and more, giving a unified Google-Drive-like experience over your own backend.",
    shortDescription: "Universal web file explorer, a front-end alternative to Google Drive.",
    features: ["Connects to S3, FTP, SFTP, WebDAV and more", "Built-in file editor and preview", "Configurable SSO authentication"],
    pros: ["One interface for multiple existing storage backends"],
    cons: ["Not storage itself, just an interface layer over another backend"],
  },
  "pydio-cells": {
    description:
      "Pydio Cells is an enterprise-grade file sharing platform with workflows, version control and auditing, built for organizations that need strict governance.",
    shortDescription: "Enterprise file sharing with auditing, an alternative to Dropbox Business.",
    features: ["File approval workflows", "Detailed access auditing", "Version control and trash"],
    pros: ["Built for strict enterprise compliance and governance"],
    cons: ["More complex setup than simpler solutions like Seafile"],
  },
  searxng: {
    description:
      "SearXNG is a metasearch engine that combines results from dozens of search engines without tracking or profiling the user, an ideal private gateway to web search.",
    shortDescription: "Private metasearch engine aggregating dozens of engines, no tracking.",
    features: ["Aggregates results from 70+ search engines", "No profiles or search history", "Fully customizable by category"],
    pros: ["Zero ad tracking of your searches"],
    cons: ["Result quality depends on the available source engines"],
  },
  medusa: {
    description:
      "Medusa is a headless commerce platform in Node.js with fully code-customizable order, inventory and pricing modules, built as a developer-focused alternative to Shopify.",
    shortDescription: "Headless ecommerce in Node.js, an alternative to Shopify for developers.",
    features: ["Customizable order, inventory and pricing modules", "REST API and admin panel included", "Native multi-region and multi-currency"],
    pros: ["No commission per sale, unlike Shopify"],
    cons: ["Requires development skills to fully customize"],
  },
  saleor: {
    description:
      "Saleor is a GraphQL-first headless commerce platform, with a customizable checkout and event-driven architecture, built for large-scale stores as an alternative to Shopify Plus.",
    shortDescription: "GraphQL headless ecommerce at scale, an alternative to Shopify Plus.",
    features: ["Complete GraphQL API", "Fully customizable checkout", "Event-driven architecture (webhooks)"],
    pros: ["Designed from the ground up for very high-traffic stores"],
    cons: ["Steeper learning curve than all-in-one platforms"],
  },
  vendure: {
    description:
      "Vendure is a headless commerce framework in TypeScript with a very flexible plugin system, built for developers who want to extend every part of their store as code.",
    shortDescription: "TypeScript ecommerce framework, an alternative to Shopify for devs.",
    features: ["TypeScript plugin system", "Auto-generated GraphQL API", "Multi-store and multi-channel selling"],
    pros: ["Carefully crafted developer experience (TypeScript end-to-end)"],
    cons: ["Smaller plugin ecosystem than the Shopify App Store"],
  },
  bagisto: {
    description:
      "Bagisto is an ecommerce platform built on Laravel and Vue.js, with multi-store, multi-language and a marketplace of extensions, as a free alternative to Shopify.",
    shortDescription: "Ecommerce on Laravel, a free alternative to Shopify.",
    features: ["Multi-store and multi-language", "Extension marketplace", "Vue.js admin panel"],
    pros: ["100% free, no hidden paid editions"],
    cons: ["Smaller community than Shopify or WooCommerce"],
  },
  prestashop: {
    description:
      "PrestaShop is one of the most established open source online store platforms, with thousands of modules and templates, very popular in Europe as an alternative to Shopify.",
    shortDescription: "Established online store platform, a European alternative to Shopify.",
    features: ["Thousands of modules and templates", "Multi-store management", "Strong adoption in the European market"],
    pros: ["Mature ecosystem with many years of development"],
    cons: ["Admin interface feels less modern than Shopify's"],
  },
  sylius: {
    description:
      "Sylius is an ecommerce framework built on Symfony, aimed at developers who need maximum flexibility for complex B2B or B2C stores.",
    shortDescription: "Symfony ecommerce framework, a flexible alternative to Shopify.",
    features: ["Extensible Symfony architecture", "Supports B2B and B2C stores", "Complete REST API"],
    pros: ["Maximum flexibility for complex business logic"],
    cons: ["Requires solid Symfony experience to get the most out of it"],
  },
  shopware: {
    description:
      "Shopware is a German ecommerce platform with a powerful open source core, a visual store editor and an API-first architecture, as an alternative to Shopify or Magento.",
    shortDescription: "Ecommerce with a visual editor and API-first design, an alternative to Shopify/Magento.",
    features: ["Visual store editor (Shopping Experiences)", "API-first with decoupled admin", "Extension marketplace"],
    pros: ["Very powerful visual editor for product landing pages"],
    cons: ["Some advanced features are Commercial-edition only"],
  },
  "magento-open-source": {
    description:
      "Magento Open Source (Adobe Commerce Community Edition) is one of the most powerful, customizable ecommerce platforms, used for huge catalogs, as an alternative to Shopify Plus.",
    shortDescription: "Highly customizable enterprise ecommerce, an alternative to Shopify Plus.",
    features: ["Massive catalogs with complex attributes", "Native multi-store and multi-language", "Very wide extension ecosystem"],
    pros: ["The most powerful option for very large B2B/B2C catalogs"],
    cons: ["Considerably higher server requirements"],
  },
  woocommerce: {
    description:
      "WooCommerce turns any WordPress site into a complete online store, with the largest plugin ecosystem in the world, as a free alternative to Shopify for anyone already on WordPress.",
    shortDescription: "Ecommerce on WordPress, a free alternative to Shopify.",
    features: ["The largest plugin ecosystem in the world", "Works with any WordPress theme", "Thousands of supported payment gateways"],
    pros: ["Ideal if your site already runs on WordPress"],
    cons: ["Performance depends heavily on the plugins you install"],
  },
  "jitsi-meet": {
    description:
      "Jitsi Meet is the most popular open source video calling platform, with no time or participant limit, and no account needed to join, as a direct alternative to Zoom.",
    shortDescription: "Video calls with no limits or account, a direct alternative to Zoom.",
    features: ["No time or participant limit", "No account needed to join", "Recording and YouTube streaming"],
    pros: ["Free, with none of the SaaS version's artificial limits"],
    cons: ["The full stack has 4 services to coordinate"],
  },
  bigbluebutton: {
    description:
      "BigBlueButton is an education-focused video conferencing platform, with a collaborative whiteboard, breakout rooms and built-in polls, as an alternative to Zoom for educational institutions.",
    shortDescription: "Education-focused video conferencing, an alternative to Zoom.",
    features: ["Multi-user collaborative whiteboard", "Breakout rooms", "Polls and class recording"],
    pros: ["The most complete option for educational use cases"],
    cons: ["Production installation is more complex than a simple docker-compose"],
  },
  livekit: {
    description:
      "LiveKit is open source WebRTC infrastructure for developers who want to build their own realtime video/audio apps, as an alternative to Twilio Video or the Zoom SDK.",
    shortDescription: "WebRTC infrastructure for developers, an alternative to Twilio Video.",
    features: ["SDKs for web, mobile and backend", "Scales to thousands of participants", "Composite recording and streaming"],
    pros: ["Built to be integrated directly into your own product"],
    cons: ["Requires your own development, not a ready-to-use video calling app"],
  },
  openvidu: {
    description:
      "OpenVidu simplifies integrating WebRTC video calls into your own applications, with high-level SDKs and a self-hostable server, as an alternative to Twilio Video or the Zoom SDK.",
    shortDescription: "Easy-to-integrate WebRTC platform, an alternative to Twilio Video.",
    features: ["High-level SDKs for web and mobile", "Session recording included", "Deploy with a single container to get started"],
    pros: ["Faster to integrate than building on raw WebRTC"],
    cons: ["Scaling to real production needs additional architecture (media nodes)"],
  },
  galene: {
    description:
      "Galène is an extremely lightweight SFU video conferencing server, able to run on modest hardware and support hundreds of participants, ideal for self-hosted classes or large meetings.",
    shortDescription: "Ultra-lightweight video conferencing server, an alternative to Zoom on modest hardware.",
    features: ["Extremely lightweight (a single Go binary)", "Supports hundreds of participants per room", "Local session recording"],
    pros: ["Runs on much more modest servers than Jitsi/BBB"],
    cons: ["More basic interface, fewer features than Zoom"],
  },
  jami: {
    description:
      "Jami offers fully decentralized (P2P) video calls, messaging and voice calls, with no central server intermediating your communications, as a private alternative to Skype.",
    shortDescription: "100% P2P video calls and chat with no central server, an alternative to Skype.",
    features: ["100% P2P communication, no central server", "Video, voice, messaging and screen sharing", "Desktop and mobile apps"],
    pros: ["No server (not even your own) can see your calls"],
    cons: ["Not built for webinars or massive company-wide meetings"],
  },
  neko: {
    description:
      "Neko creates a shared streaming browser room where several people watch and control the same virtual browser at once, ideal for watch parties or collaborative browsing.",
    shortDescription: "Shared streaming virtual browser, for watch parties and collaboration.",
    features: ["Real-time shared browser", "Built-in voice and text chat", "Ideal for watch parties or remote tech support"],
    pros: ["A unique use case Zoom doesn't cover well (a real shared browser)"],
    cons: ["Not a general substitute for work video calls"],
  },
  vaultwarden: {
    description:
      "Vaultwarden is a lightweight, unofficial implementation of the Bitwarden server in Rust, compatible with all official Bitwarden clients, ideal for self-hosting your own password manager.",
    shortDescription: "Lightweight Rust Bitwarden server, a self-hosted alternative to 1Password.",
    features: ["Compatible with all official Bitwarden clients", "Minimal resource usage (great for small VPS)", "Own admin panel"],
    pros: ["The lightest, most popular self-hosted password manager"],
    cons: ["Not the official Bitwarden server, it's a community reimplementation"],
  },
  "bitwarden-self-hosted": {
    description:
      "Bitwarden offers its full official server for self-hosting, with all the features of the cloud version (organizations, SSO, security reports) on your own infrastructure.",
    shortDescription: "Official self-hosted Bitwarden server, a complete alternative to 1Password.",
    features: ["Organizations and enterprise groups", "Security reports and SSO", "All the features of the official cloud version"],
    pros: ["It's the official server, with direct support from Bitwarden"],
    cons: ["Considerably heavier on resources than Vaultwarden"],
  },
  passbolt: {
    description:
      "Passbolt is a team password manager with OpenPGP encryption, granular per-folder permissions and auditing, designed specifically for organizations that need fine-grained control.",
    shortDescription: "Team password manager with OpenPGP encryption, an alternative to 1Password Business.",
    features: ["End-to-end OpenPGP encryption", "Granular folder and group permissions", "Full access auditing"],
    pros: ["Specifically built for team access control"],
    cons: ["Initial GPG setup is more technical than Vaultwarden's"],
  },
  psono: {
    description:
      "Psono is a team password and secrets manager with end-to-end encryption, API key management and browser extensions, as a self-hostable alternative to LastPass Teams.",
    shortDescription: "Team password and secrets manager, an alternative to LastPass Teams.",
    features: ["Secret and API key management alongside passwords", "End-to-end encryption", "Extensions for every browser"],
    pros: ["Also covers infrastructure secrets, not just personal passwords"],
    cons: ["Smaller community than Vaultwarden or Bitwarden"],
  },
  keeweb: {
    description:
      "KeeWeb is a web and desktop client for KeePass (.kdbx) databases, which you can self-host as a static app connected to your own cloud storage or server.",
    shortDescription: "Web client for KeePass vaults, a lightweight alternative to LastPass.",
    features: ["Compatible with KeePass .kdbx vaults", "Connects to Dropbox, Google Drive or your own WebDAV", "Works offline as a PWA"],
    pros: ["Builds on the KeePass format, very mature and well-audited"],
    cons: ["It's a client, not a server: sync depends on another backend"],
  },

  // ---------- Coming soon batch ----------
  keycloak: {
    description:
      "Keycloak is the most established open source identity and access solution: SSO, LDAP/AD federation, social login and role management for any app or API.",
    shortDescription: "Open source SSO and identity management, an alternative to Auth0/Okta.",
    features: ["SSO and LDAP/Active Directory federation", "Social login (Google, GitHub...)", "Granular role and permission management"],
    pros: ["The most mature and battle-tested option in enterprise environments"],
    cons: ["Higher memory usage than lighter alternatives"],
  },
  authentik: {
    description:
      "Authentik is a modern, flexible identity platform with visually customizable authentication flows and native support for SSO, MFA and an application proxy.",
    shortDescription: "Flexible identity platform, a modern alternative to Okta/Auth0.",
    features: ["Visual authentication flow editor", "Application proxy with no code changes", "MFA and conditional access policies"],
    pros: ["A much more modern interface than the open source competition"],
    cons: ["Requires Postgres and Redis in addition to the server itself"],
  },
  ory: {
    description:
      "Ory is a composable identity suite (Kratos for users, Hydra for OAuth2/OIDC) designed API-first, for developers who want full control over the flow.",
    shortDescription: "API-first identity suite, an alternative to Auth0/Cognito.",
    features: ["100% API-first, no imposed UI", "Kratos (users) + Hydra (OAuth2/OIDC) separately", "Scales horizontally with a stateless app"],
    pros: ["Maximum flexibility to build your own login frontend"],
    cons: ["Steeper learning curve since it ships with no ready-made UI"],
  },
  zitadel: {
    description:
      "Zitadel is an all-in-one identity platform with native multi-tenancy, built for B2B SaaS that need to isolate each customer's identity without deploying one instance per customer.",
    shortDescription: "All-in-one multi-tenant identity, an alternative to Auth0/Okta.",
    features: ["Native multi-tenancy (organizations)", "SSO, MFA and per-org project management", "Full gRPC and REST APIs"],
    pros: ["Built from the ground up for multi-tenant SaaS"],
    cons: ["Documentation is thinner than Keycloak's for advanced cases"],
  },
  supertokens: {
    description:
      "SuperTokens offers per-language/framework SDKs and a lightweight session server, built to integrate in minutes into existing apps without rewriting the login flow.",
    shortDescription: "Authentication with ready-to-integrate SDKs, an alternative to Auth0/Clerk.",
    features: ["Official SDKs for React, Next.js, Node, Python...", "Secure session management by default", "Social and passwordless login included"],
    pros: ["Very fast integration thanks to the SDKs"],
    cons: ["Less flexible than Ory/Keycloak for very custom flows"],
  },
  logto: {
    description:
      "Logto is a modern identity alternative with a polished admin console, built for small teams who want something as simple as Clerk but self-hosted.",
    shortDescription: "Modern, easy-to-use identity, a self-hosted alternative to Clerk/Auth0.",
    features: ["Very polished admin console", "Multi-tenant and organizations included", "Social login and brand customization"],
    pros: ["The closest experience to a polished SaaS product"],
    cons: ["Smaller community than Keycloak or Authentik"],
  },
  coolify: {
    description:
      "Coolify is a self-hosted deployment platform that replicates the Vercel/Heroku experience: connect your Git repo and deploy apps, databases and services with one click.",
    shortDescription: "Self-hosted PaaS with a Vercel-like experience, a free alternative.",
    features: ["One-click deploy from Git (like Vercel)", "One-click managed databases", "Manage multiple servers from one dashboard"],
    pros: ["The most polished open source alternative to Vercel/Heroku"],
    cons: ["Installs across the whole server, doesn't fit into a single-app docker-compose"],
  },
  caprover: {
    description:
      "CapRover is a lightweight PaaS on top of Docker Swarm with its own web dashboard, one-click apps from its marketplace and automatic HTTPS — built for modest VPS.",
    shortDescription: "Lightweight PaaS on Docker Swarm, a simple alternative to Heroku.",
    features: ["One-click app marketplace", "Automatic HTTPS via Let's Encrypt", "Own web dashboard, light on resources"],
    pros: ["Very lightweight, runs fine on a 1-2GB RAM VPS"],
    cons: ["Fewer advanced features than Coolify"],
  },
  dokku: {
    description:
      "Dokku is the original 'mini-Heroku': a single-command-line PaaS that uses buildpacks or Dockerfiles and deploys with a simple `git push`.",
    shortDescription: "Open source mini-Heroku, deploy with git push.",
    features: ["Deploy with git push, just like Heroku", "Supports buildpacks and Dockerfiles", "Hundreds of community plugins"],
    pros: ["The simplest and most minimal of the whole PaaS group"],
    cons: ["No official web dashboard (third-party plugins exist)"],
  },
  casaos: {
    description:
      "CasaOS turns any Linux server (or Raspberry Pi) into a personal NAS/dashboard with a Synology DSM-style interface, with an App Store to install self-hosted apps in one click.",
    shortDescription: "A Synology DSM-style dashboard for your own server, with a one-click App Store.",
    features: ["One-click App Store with dozens of self-hosted apps", "Built-in web file manager", "Built for Raspberry Pi and mini-PCs"],
    pros: ["The easiest way to turn a Pi into a personal NAS"],
    cons: ["Built more for home use than for production"],
  },
  "sentry-self-hosted": {
    description:
      "The self-hosted version of Sentry itself: error and performance tracking in production with smart exception grouping, for all major languages.",
    shortDescription: "Production error tracking, the official self-hosted version.",
    features: ["Smart grouping of repeated errors", "Performance monitoring traces", "Official SDKs for all major languages"],
    pros: ["It's the original product, with no feature cuts"],
    cons: ["Heavy stack: needs plenty of RAM and several services"],
  },
  glitchtip: {
    description:
      "GlitchTip is compatible with the Sentry SDK but with a much lighter backend — you just change the DSN URL, no app code changes needed.",
    shortDescription: "Compatible with the Sentry SDK but much lighter to self-host.",
    features: ["Compatible with the Sentry SDK with no changes", "Much lighter than Sentry self-hosted", "Email/Slack notifications"],
    pros: ["The ideal balance between lightweight and Sentry-compatible"],
    cons: ["Fewer advanced features than Sentry (no full performance tracing)"],
  },
  signoz: {
    description:
      "SigNoz unifies metrics, traces and logs in a single OpenTelemetry-based platform, as a direct replacement for Datadog/New Relic with your own data.",
    shortDescription: "Unified metrics + traces + logs, an alternative to Datadog/New Relic.",
    features: ["100% built on OpenTelemetry (open standard)", "Metrics, traces and logs in one dashboard", "Configurable alerts"],
    pros: ["The OpenTelemetry standard avoids locking you into a proprietary SDK"],
    cons: ["ClickHouse adds operational complexity"],
  },
  beszel: {
    description:
      "Beszel is an ultra-lightweight infrastructure monitor (a single binary) to see CPU, RAM, disk and network across all your servers in a simple dashboard, without a full stack's complexity.",
    shortDescription: "Ultra-lightweight server monitor, a single binary, a minimal alternative to Datadog.",
    features: ["Single binary/container, no dependencies", "Lightweight agents per monitored server", "CPU/RAM/disk/network usage history"],
    pros: ["The fastest setup of the whole monitoring group"],
    cons: ["No application error tracking, infrastructure only"],
  },
  budibase: {
    description:
      "Budibase is a low-code platform for building internal dashboards and CRUD apps on top of your own data sources (Postgres, MongoDB, APIs), with drag-and-drop components.",
    shortDescription: "Low-code builder for internal apps, an alternative to Retool.",
    features: ["Drag-and-drop visual editor", "Connects Postgres, MongoDB, MySQL, REST APIs", "Zapier-style automations included"],
    pros: ["Very fast for prototyping internal dashboards"],
    cons: ["GPL-3.0 license, check the implications if you redistribute it modified"],
  },
  appsmith: {
    description:
      "Appsmith is another low-code platform for internal dashboards, with an editor very similar to Retool: drag components, connect any database or API and write JS where needed.",
    shortDescription: "Low-code editor for internal dashboards, a direct alternative to Retool.",
    features: ["Visual editor very similar to Retool", "Embedded JS in any field", "Connects more than 25 different data sources"],
    pros: ["The gentlest learning curve if you already know Retool"],
    cons: ["Needs a fair amount of RAM on small instances"],
  },
  "stirling-pdf": {
    description:
      "Stirling PDF is a self-hosted Swiss army knife for PDFs: merge, split, compress, sign, convert and OCR, all from a web interface without uploading your documents to a third party.",
    shortDescription: "Self-hosted PDF Swiss army knife, an alternative to Smallpdf/Adobe Acrobat.",
    features: ["Over 50 different PDF operations", "Built-in OCR (Tesseract)", "Digital signing and password protection"],
    pros: ["Your documents never leave your own server"],
    cons: ["The interface is functional but less polished than commercial tools"],
  },
  forgejo: {
    description:
      "Forgejo is Gitea's community fork focused on open, non-commercial governance: Git repositories, issues, PRs and built-in CI/CD (Forgejo Actions) in one lightweight binary.",
    shortDescription: "Gitea's community fork, a lightweight Git forge with 100% open governance.",
    features: ["Forgejo Actions, compatible with GitHub Actions syntax", "Very lightweight, a single binary", "100% community governance, no company behind it"],
    pros: ["An alternative to Gitea for those who prefer a project with no corporate backing"],
    cons: ["Smaller community and plugin ecosystem than GitLab"],
  },
  infisical: {
    description:
      "Infisical centralizes and encrypts environment variables and secrets across all your projects, with a CLI, SDKs and native CI/CD integration — built to be much simpler than Vault.",
    shortDescription: "Secrets and environment variable management, a simple alternative to Vault/Doppler.",
    features: ["CLI to inject secrets into any process", "Native CI/CD integration (GitHub Actions, etc.)", "Secret version history and rollback"],
    pros: ["Much faster to get running than HashiCorp Vault"],
    cons: ["Fewer advanced PKI/certificate features than Vault"],
  },
  "dub-co": {
    description:
      "Dub is a modern short-link platform with detailed click analytics, built as an open source, self-hostable alternative to Bitly.",
    shortDescription: "Link shortener with analytics, an open source alternative to Bitly.",
    features: ["Real-time click analytics", "Your own custom domains", "API to generate links programmatically"],
    pros: ["The most modern interface and analytics of the open source shorteners"],
    cons: ["Self-hosting it takes more work than a simple docker-compose"],
  },
  formbricks: {
    description:
      "Formbricks combines surveys and embedded forms with in-app user targeting, as an open source alternative to Typeform built especially for product/UX research.",
    shortDescription: "Surveys and forms with in-app targeting, an alternative to Typeform.",
    features: ["In-app surveys targeted by user segment", "Forms embeddable on any site", "Templates for NPS, PMF and more"],
    pros: ["Built specifically for product research, not just generic forms"],
    cons: ["AGPL-3.0 license: check the implications if you offer it as a service to others"],
  },
  ghost: {
    description:
      "Ghost is a publishing and paid-newsletter platform with a modern editor, built-in memberships and payments — the most established open source alternative to Substack.",
    shortDescription: "Blog and paid newsletter, a mature open source alternative to Substack.",
    features: ["Built-in paid memberships and subscriptions", "Modern, Notion-like editor", "Native email newsletters"],
    pros: ["The most mature and production-proven tool in this whole batch"],
    cons: ["MySQL as a dependency adds some weight compared to SQLite-based options"],
  },
};
