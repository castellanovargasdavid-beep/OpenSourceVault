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
    cons: ["Documentation is thinner than Keycloak's for advanced cases", "AGPL-3.0 license: check the implications if you offer it as a service to others"],
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
    cons: ["Smaller community and plugin ecosystem than GitLab", "Recently moved from MIT to GPL-3.0+ (August 2024): check the implications if you distribute a modified version"],
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
  "invoice-ninja": {
    description:
      "Invoice Ninja manages invoices, quotes and recurring expenses with a built-in client portal for online payments, as a self-hostable alternative to FreshBooks or Bill.com for freelancers and small agencies.",
    shortDescription: "Invoicing and quotes with a client portal, an alternative to FreshBooks.",
    features: ["Invoices, quotes and recurring expenses", "Client portal for online payments", "Multiple payment gateways (Stripe, PayPal, etc.)"],
    pros: ["Very complete for freelancers and small agencies", "Client portal included out of the box"],
    cons: ["v5 ships under the Elastic License 2.0, not a classic OSI license", "The admin interface can feel overwhelming at first"],
  },
  activepieces: {
    description:
      "Activepieces is a workflow automation platform with 200+ integrations and a visual no-code builder, built as a modern open source alternative to Zapier or Make.",
    shortDescription: "Workflow automation with 200+ integrations, an alternative to Zapier.",
    features: ["200+ ready-to-use integrations (pieces)", "Visual no-code flow builder", "SDK to build your own pieces/integrations"],
    pros: ["Noticeably more modern interface than n8n's", "MIT-licensed core"],
    cons: ["Some team features (SSO, analytics) are Enterprise-only paid add-ons", "Integration ecosystem still smaller than Zapier's"],
  },
  shlink: {
    description:
      "Shlink is a URL shortener server with a full REST API and per-link/per-domain click analytics, actively maintained as an unrestricted open source alternative to Bitly.",
    shortDescription: "URL shortener server with API and analytics, an alternative to Bitly.",
    features: ["Full REST API for your own integrations", "Click analytics per link and per domain", "Supports multiple custom domains on one instance"],
    pros: ["Unrestricted MIT license", "Very lightweight, maintained by a highly active developer"],
    cons: ["No official web UI bundled (uses a separate client app, Shlink Web Client)", "Requires setting up the web client separately for a visual panel"],
  },
  jellyfin: {
    description:
      "Jellyfin streams your own movie, TV, music and photo collection to any device, with hardware transcoding and zero telemetry, as a fully free alternative to Plex.",
    shortDescription: "Personal media streaming server, a free alternative to Plex.",
    features: ["Streams video, music and photos to any device", "Hardware (GPU) transcoding", "Native TV, mobile and browser apps — no account or telemetry"],
    pros: ["100% free and telemetry-free, unlike Plex", "Very active community, a direct fork of Emby after it went closed-source"],
    cons: ["Hardware transcoding setup requires manual steps depending on your GPU", "No official Smart TV app on some platforms (uses third-party apps)"],
  },
  linkwarden: {
    description:
      "Linkwarden saves links along with an archived copy of each page (screenshots and PDF), organized into collaborative collections, as a self-hostable alternative to Pocket or Raindrop.io.",
    shortDescription: "Bookmark manager with page archiving, an alternative to Raindrop.io.",
    features: ["Saves links plus screenshots and PDF archives of each page", "Organization via collaborative collections and tags", "Browser extension and mobile apps"],
    pros: ["Archives a full copy of the page, not just the link", "Collections shared with other users"],
    cons: ["AGPL-3.0 license: check the implications if you offer it as a service to others", "Full page archiving uses significant storage"],
  },
  wallabag: {
    description:
      "wallabag extracts and saves articles to read later offline, free of ads and distractions, with text-to-speech and an annotatable reading mode, as a mature and free alternative to Pocket.",
    shortDescription: "Save articles to read later offline, an alternative to Pocket.",
    features: ["Save articles to read later, offline", "Extracts clean content, no ads or distractions", "Text-to-speech and annotatable reading mode"],
    pros: ["Very permissive MIT license", "Mature project with over 10 years of active development"],
    cons: ["Interface feels somewhat dated compared to newer alternatives", "Media archiving is more limited than Linkwarden's"],
  },
  headscale: {
    description:
      "Headscale is an open source implementation of Tailscale's coordination server: build your own encrypted WireGuard mesh network using the official clients, without relying on the commercial control plane.",
    shortDescription: "Self-hosted coordination server compatible with Tailscale.",
    features: ["Compatible with official Tailscale clients on every device", "Encrypted WireGuard mesh network under the hood", "Supports ACLs, exit nodes and subnets just like the commercial service"],
    pros: ["Works with the official Tailscale app on every device", "Zero dependency on Tailscale Inc.'s commercial control plane"],
    cons: ["Requires editing a YAML config file, not everything is environment-variable driven", "Some new official client features take time to land in Headscale"],
  },
  "wg-easy": {
    description:
      "WireGuard Easy puts a web panel on top of a full WireGuard server so you can create and manage VPN clients with QR codes in minutes, no command line needed, as a free alternative to a commercial team VPN.",
    shortDescription: "Web panel for your own WireGuard server, no command line needed.",
    features: ["Web panel to create and manage WireGuard clients with QR codes", "Real-time traffic stats per device", "A single container, no external database"],
    pros: ["Sets up a full WireGuard server in minutes", "Much simpler interface than configuring WireGuard by hand"],
    cons: ["Built for a single VPN server, not a multi-node mesh network like Headscale", "Requires opening a UDP port on your firewall/router"],
  },
  pihole: {
    description:
      "Pi-hole blocks ads and trackers network-wide for every device by acting as your DNS server, with a real-time query statistics dashboard, as a free, self-hosted alternative to NextDNS.",
    shortDescription: "Network-wide DNS ad-blocking, an alternative to NextDNS.",
    features: ["Blocks ads and trackers network-wide for every device", "Web dashboard with real-time DNS query stats", "Updatable, customizable blocklists"],
    pros: ["Protects every device on your network without installing anything on each one", "Very lightweight, runs great on a Raspberry Pi"],
    cons: ["Needs to be your primary DNS server to work (requires router configuration)", "No native DNS-over-HTTPS (needs an extra proxy like cloudflared)"],
  },
  "adguard-home": {
    description:
      "AdGuard Home blocks ads and trackers network-wide at the DNS level with native DNS-over-HTTPS/TLS support and parental controls, as a free, self-hosted alternative to NextDNS.",
    shortDescription: "Network-wide DNS ad-blocking with native DoH/DoT, an alternative to NextDNS.",
    features: ["Network-wide ad and tracker blocking at the DNS level", "Native DNS-over-HTTPS and DNS-over-TLS support", "Parental controls and per-client filtering profiles"],
    pros: ["Native DNS-over-HTTPS/TLS without needing an extra proxy, unlike Pi-hole", "More modern statistics dashboard"],
    cons: ["Smaller third-party blocklist community than Pi-hole's"],
  },
  joplin: {
    description:
      "Joplin combines Markdown notes with optional end-to-end encryption and native desktop, mobile and web apps, synced against your own server (Joplin Server), as a free alternative to Evernote.",
    shortDescription: "Cross-platform encrypted notes, a free alternative to Evernote.",
    features: ["Markdown notes with optional end-to-end encryption", "Native desktop, mobile and web apps, all synced", "Community plugins and themes"],
    pros: ["Real end-to-end encryption, not just in transit", "Mature native apps on all 3 major platforms"],
    cons: ["Running your own sync server (Joplin Server) is an extra step compared to the paid cloud", "Interface is more functional than visually polished"],
  },
  discourse: {
    description:
      "Discourse is the most widely used open source forum software in large-scale production, with community trust-level moderation, email notifications and automatic digests.",
    shortDescription: "Large-scale forum and community software, an alternative to Circle.",
    features: ["Forums with threads, categories and unlimited tags", "Moderation via community trust levels", "Email notifications and automatic digests"],
    pros: ["The most widely used open source forum software in large-scale production", "Excellent automatic anti-spam moderation"],
    cons: ["Less straightforward install than a standard docker-compose (uses its own installer)", "Needs at least 2 GB of RAM to run smoothly"],
  },
  erpnext: {
    description:
      "ERPNext (by Frappe) covers accounting, inventory, manufacturing, CRM and HR in a single business management suite, with functional coverage comparable to a full commercial ERP but 100% open source.",
    shortDescription: "Full ERP suite (accounting, inventory, CRM), an alternative to SAP Business One.",
    features: ["Accounting, inventory, CRM and HR in a single suite", "Built-in manufacturing and quality control", "Self-service portal for customers and vendors"],
    pros: ["Functional coverage comparable to a full commercial ERP", "Backed by Frappe, with over a decade of active development"],
    cons: ["Steep learning curve given the number of modules", "Needs more server resources than a simple CRM"],
  },
  dolibarr: {
    description:
      "Dolibarr manages invoicing, accounting, stock, CRM and projects in a tool much lighter than a full ERP, with modules you enable only when you need them, as an alternative to QuickBooks or Sage.",
    shortDescription: "Modular invoicing, accounting and stock, a lightweight alternative to QuickBooks.",
    features: ["Integrated invoicing, accounting and stock management", "CRM and project management included", "Modules you can enable/disable as needed"],
    pros: ["Much lighter than ERPNext, ideal for small businesses", "Simpler interface for anyone who doesn't need a full ERP"],
    cons: ["The official module marketplace includes paid extensions", "Interface feels less modern than newer alternatives"],
  },
  dokploy: {
    description:
      "Dokploy deploys apps, databases and Docker services with a Heroku-like workflow on top of Docker Swarm, with native Traefik integration for domains and automatic HTTPS, as a self-hosted alternative to Heroku or Vercel.",
    shortDescription: "Self-hosted Heroku-like PaaS on Docker Swarm, an alternative to Heroku.",
    features: ["Deploy apps, databases and Docker services with a Heroku-like workflow", "Native Traefik integration for domains and automatic HTTPS", "One-click templates for dozens of open source apps"],
    pros: ["Much simpler onboarding than running your own Kubernetes", "Very active development and fast-growing community"],
    cons: ["Dokploy Cloud (the managed version) is paid; self-hosting requires your own server", "Younger project than Coolify or CapRover, with less time in production"],
  },
  radarr: {
    description:
      "Radarr automatically searches for, downloads and organizes your movie collection, renaming and moving files into your Jellyfin or Plex library so you don't have to do it by hand.",
    shortDescription: "Automatic movie management for your media server.",
    features: ["Automatic search and download of new movies", "File renaming and organization", "Integrates with Jellyfin, Plex and Prowlarr"],
    pros: ["The de facto standard for automating a movie library", "Huge community, tons of guides available"],
    cons: ["You need to set up indexers and a download client separately (or use Prowlarr)"],
  },
  sonarr: {
    description:
      "Sonarr is Radarr's counterpart for TV shows: it tracks your shows, downloads new episodes as soon as they air, and organizes them into your library automatically.",
    shortDescription: "Automatic TV show management for your media server.",
    features: ["Tracks shows and downloads new episodes automatically", "Quality and wanted-list management", "Integrates with Jellyfin, Plex and Prowlarr"],
    pros: ["Same proven engine as Radarr, with years in production", "Very active, frequent updates"],
    cons: ["You need to set up indexers and a download client separately (or use Prowlarr)"],
  },
  prowlarr: {
    description:
      "Prowlarr centralizes indexer management for Radarr, Sonarr and the rest of the 'Arr Stack': set up each indexer once and Prowlarr syncs it across all your apps.",
    shortDescription: "Central indexer manager for Radarr, Sonarr and friends.",
    features: ["Syncs indexers across all your *arr apps at once", "Supports public and private trackers", "Usage stats per indexer"],
    pros: ["Avoids configuring each indexer app by app", "From the same team as Radarr/Sonarr, same integration quality"],
    cons: ["Only makes sense if you already use Radarr/Sonarr/Lidarr — not a standalone app"],
  },
  "paperless-ngx": {
    description:
      "Paperless-ngx digitizes, archives and makes all your paperwork searchable: scan or upload a document and it indexes it by text (OCR), tags and dates automatically, so you never lose an invoice again.",
    shortDescription: "Digital document archive with OCR, no paid scanning app subscription needed.",
    features: ["Automatic OCR with text and language recognition", "Automatic tagging and correspondent matching by rules", "'Consume' folder to scan and forget"],
    pros: ["Turns years of physical paperwork into something searchable in seconds", "Very active community, integrates well with network scanners"],
    cons: ["OCR is CPU-intensive; very long documents can take a while"],
  },
  "home-assistant": {
    description:
      "Home Assistant is the de facto standard for home automation: it connects thousands of different device brands under a single dashboard, with all automations running on your own network, with no dependency on the manufacturer's cloud.",
    shortDescription: "The open source standard for home automation, no brand cloud required.",
    features: ["Compatible with thousands of brands and integrations (Zigbee, Z-Wave, Matter...)", "Local automations, no dependency on the manufacturer's cloud", "Official mobile app with geofencing"],
    pros: ["The largest and most active home automation project that exists", "None of your sensor data leaves your network unless you want it to"],
    cons: ["network_mode: host and privileged: true give the container fairly broad access — review your network security", "Real learning curve at the start, though guides are plentiful"],
  },
  overseerr: {
    description:
      "Overseerr gives your family or friends a simple interface to request movies and shows, connecting to Radarr and Sonarr to download them automatically — without them touching the technical configuration.",
    shortDescription: "Content requests for Jellyfin/Plex, connected to Radarr and Sonarr.",
    features: ["Simple request interface for the whole family", "Connects directly to Radarr/Sonarr", "Per-user permission management"],
    pros: ["The missing piece to let non-technical people use your 'Arr Stack'", "Very polished interface, feels like a commercial app"],
    cons: ["Needs Radarr/Sonarr already running behind it — doesn't download anything on its own"],
  },
  frigate: {
    description:
      "Frigate turns regular IP cameras into a real-time AI object-detection NVR system (people, cars, packages...), with no monthly Ring or Nest subscription and with video that never leaves your network.",
    shortDescription: "AI object-detection NVR, a subscription-free alternative to Ring/Nest Cam.",
    features: ["AI object detection (people, cars, animals...)", "Continuous or event-only recording", "Notifications with a snapshot of the detected object"],
    pros: ["No monthly cloud fee, unlike Ring/Nest/Arlo", "The object detector avoids false alarms from branches or shadows"],
    cons: ["An AI accelerator (Coral USB or GPU) is recommended for smooth performance with several cameras"],
  },
  homepage: {
    description:
      "Homepage is a customizable start page for your HomeLab: it groups links and live-status widgets for all your self-hosted services on a single screen, configured through YAML files.",
    shortDescription: "Start page for your HomeLab with live status of your services.",
    features: ["100+ integrations with live status widgets", "Automatically detects Docker containers", "Fully configurable via YAML, no database"],
    pros: ["Very quick to set up as your browser's start page", "Huge and active integrations catalog"],
    cons: ["Configuration is YAML-based, no visual editor"],
  },
  mealie: {
    description:
      "Mealie stores your recipes (automatically importing them from almost any website by just pasting the URL), plans your weekly menu and generates your shopping list — all on your own server.",
    shortDescription: "Recipes, weekly menu and shopping list, an alternative to paid recipe apps.",
    features: ["Automatically imports recipes by pasting a URL from almost any site", "Drag-and-drop weekly meal planner", "Generates a shopping list from your meal plan"],
    pros: ["One of the best-polished apps in the whole self-hosted ecosystem", "An app for the whole family, not just whoever installed it"],
    cons: ["Automatic import doesn't always work on sites that block scraping"],
  },
  navidrome: {
    description:
      "Navidrome turns your local music collection into a personal streaming service, compatible with existing Subsonic apps, so you can listen to your own music from any device without depending on Spotify.",
    shortDescription: "Stream your own music, a self-hosted alternative to Spotify.",
    features: ["Compatible with existing Subsonic/Airsonic apps (iOS/Android)", "Automatic scanning of your music library", "Streaming with on-the-fly transcoding"],
    pros: ["Very lightweight — runs fine on a Raspberry Pi", "Modern web UI, doesn't feel like an abandoned project"],
    cons: ["You need to already have your music as files (it doesn't download or suggest new music)"],
  },
  audiobookshelf: {
    description:
      "Audiobookshelf organizes and plays your audiobook and podcast collection with progress tracking, bookmarks and native mobile apps — no monthly Audible subscription needed.",
    shortDescription: "Audiobook and podcast server, an alternative to the Audible subscription.",
    features: ["Syncs listening progress across devices", "Automatic download of new podcast episodes", "Native iOS and Android apps"],
    pros: ["Very polished interface and mobile apps for a FOSS project", "Supports both your own audiobooks and podcasts"],
    cons: ["Doesn't include or sell audiobooks — you need to bring your own files"],
  },
  "firefly-iii": {
    description:
      "Firefly III is a complete personal finance manager: accounts, budgets, recurring bills and automatic categorization rules, with your banking data stored only on your own server.",
    shortDescription: "A complete personal finance manager, no third party gets your banking data.",
    features: ["Budgets, recurring bills and automatic rules", "Bank transaction import (CSV, Nordigen/GoCardless)", "Reports and spending charts by category"],
    pros: ["The most complete and mature self-hosted personal finance manager", "Nobody else sees your bank transactions"],
    cons: ["Setting up import rules initially takes some time"],
  },
  excalidraw: {
    description:
      "Excalidraw is a collaborative whiteboard with a deliberately hand-drawn look, great for quick diagrams, wireframes and explaining ideas as a team — self-hostable instead of relying on Miro.",
    shortDescription: "Hand-drawn-style collaborative whiteboard, an alternative to Miro.",
    features: ["Distinctive hand-drawn style, widely used for technical diagrams", "Exports to PNG/SVG with transparent background", "Real-time collaboration mode"],
    pros: ["One of the most popular and beloved open source projects out there", "Integrates as a plugin into Obsidian, VS Code and other apps"],
    cons: ["Full real-time collaboration (shared rooms) requires setting up the collaboration server separately"],
  },
  penpot: {
    description:
      "Penpot is an interface design and collaborative prototyping tool, the most direct open source alternative to Figma, with native SVG support and no proprietary file format locking you in.",
    shortDescription: "Interface design and prototyping, the open source alternative to Figma.",
    features: ["Interface design and prototyping based on standard SVG", "Design systems and reusable components", "Imports existing Figma files"],
    pros: ["Backed by a company (Kaleidos) with active, funded development", "Since it uses SVG, your designs never get trapped in a proprietary format"],
    cons: ["Plugin ecosystem is still smaller than Figma's"],
  },
  homarr: {
    description:
      "Homarr is another HomeLab start page, with drag-and-drop configuration instead of YAML files, built-in authentication and over 20,000 icons included out of the box.",
    shortDescription: "HomeLab start page with drag-and-drop visual configuration.",
    features: ["Drag-and-drop visual configuration, no YAML", "Built-in user authentication out of the box", "20,000+ app icons included"],
    pros: ["More approachable than Homepage for anyone who doesn't want to touch config files", "Very active development"],
    cons: ["Having more built-in features means it uses somewhat more resources than Homepage"],
  },
  netdata: {
    description:
      "Netdata monitors every metric of your server (CPU, RAM, disk, network, hundreds of applications) in real time, per second, with a dashboard that configures itself on startup — no Datadog per-host bill.",
    shortDescription: "Real-time infrastructure monitoring, a self-hosted alternative to Datadog.",
    features: ["Thousands of metrics per second, no sampling", "Automatically detects what's running on the server", "Alerts preconfigured out of the box"],
    pros: ["Zero configuration to start seeing useful metrics", "Per-second detail level is hard to match"],
    cons: ["Requires fairly broad system permissions (host network, ptrace) to see everything it sees"],
  },
  "matrix-synapse": {
    description:
      "Synapse is the reference server of the Matrix protocol: federated, end-to-end encrypted chat, where your server can talk to any other organization's server, with no single central provider like Slack or Discord.",
    shortDescription: "Federated, end-to-end encrypted chat server, Matrix protocol, alternative to Slack/Discord.",
    features: ["Real federation between servers, like email", "Built-in end-to-end encryption", "Compatible with the Element client and dozens of other clients"],
    pros: ["Your team can chat with people from other organizations without leaving the protocol", "No central provider can read your encrypted messages or shut down your account"],
    cons: ["Synapse itself is RAM-heavy; large instances are recommended to use 'worker mode'"],
  },
  tautulli: {
    description:
      "Tautulli monitors your Plex or Jellyfin server: who's watching what, when and from where, with historical stats, notifications and usage charts for your library.",
    shortDescription: "Usage stats and monitoring for your Plex/Jellyfin server.",
    features: ["Complete playback history per user", "Notifications when someone starts watching something", "Usage charts by day, user and device"],
    pros: ["An essential companion if you share your server with others", "Very lightweight, barely uses any resources"],
    cons: ["Needs Plex or Jellyfin already running — not a media server on its own"],
  },
  kavita: {
    description:
      "Kavita is a reading server for comics, manga and ebooks, with progress tracking, collection lists and native reading apps — your own digital library, without a closed store's restrictions.",
    shortDescription: "Comics, manga and ebook server, an alternative to Comixology/Kindle.",
    features: ["Reader optimized for comics/manga and ebooks on the same server", "Reading progress tracking per device", "Automatic library scanning"],
    pros: ["Very polished reading interface, specifically built for comics", "Very active development with broad format support (CBZ, CBR, EPUB, PDF)"],
    cons: ["Doesn't sell or download content — you need your own files"],
  },
  authelia: {
    description:
      "Authelia adds a single sign-on and two-factor verification layer in front of any service already sitting behind a reverse proxy (Nginx, Traefik, Caddy), without having to reprogram each app separately.",
    shortDescription: "SSO and 2FA layer for your reverse proxy, a lightweight alternative to Okta.",
    features: ["SSO and 2FA in front of any app, without touching its code", "Integrates with Traefik, Nginx and Caddy", "Granular access policies per domain/group"],
    pros: ["Much lighter to set up than Keycloak/Authentik if you just need to protect a proxy", "Widely used alongside existing HomeLab stacks"],
    cons: ["Not a full identity server (no advanced user management like Keycloak)"],
  },
  "calibre-web": {
    description:
      "Calibre-Web puts a modern web interface on top of your Calibre library, so you can read, download and manage your ebooks from the browser or send them by email to your Kindle, with no Amazon store in between.",
    shortDescription: "Web interface for your ebook library, an alternative to the Kindle store.",
    features: ["Built-in browser reader (EPUB, PDF, CBR/CBZ)", "Direct send-to-Kindle/Kobo by email", "Metadata and cover management"],
    pros: ["Reuses your existing Calibre library without duplicating files", "Very lightweight, runs fine on any NAS or Raspberry Pi"],
    cons: ["Advanced metadata editing still depends on the desktop Calibre app"],
  },
  "actual-budget": {
    description:
      "Actual Budget is a personal budget based on the envelope budgeting method, with sync across devices, very much in the spirit of YNAB but self-hosted and with no monthly fee.",
    shortDescription: "Envelope budgeting, a subscription-free alternative to YNAB.",
    features: ["Envelope budgeting method", "Encrypted sync across all your devices", "Bank import via file or API"],
    pros: ["Very fast, polished interface, almost identical in philosophy to YNAB", "No YNAB monthly fee (~$100-150/year)"],
    cons: ["Direct bank connections depend on third-party services (GoCardless/SimpleFIN) depending on your country"],
  },
  freshrss: {
    description:
      "FreshRSS is a lightweight, highly configurable RSS reader, with extension support, multiple users and mobile app compatibility via the Google Reader API — a mature, self-hosted alternative to Feedly.",
    shortDescription: "Self-hosted, multi-user RSS reader, an alternative to Feedly.",
    features: ["Multi-user, each with their own feeds", "Compatible with mobile apps via the Google Reader API", "Custom extensions and filters"],
    pros: ["Very mature and stable, with years in production", "Runs well even on very modest hardware"],
    cons: ["The web interface is functional but visually less modern than Miniflux"],
  },
  ntfy: {
    description:
      "ntfy sends push notifications to your phone or desktop from scripts, apps or HomeLab services with a simple HTTP request — no account, no artificial message limit, and no dependency on Pushover.",
    shortDescription: "Push notifications via HTTP for your scripts and services, an alternative to Pushover.",
    features: ["Send notifications with a simple curl/HTTP POST", "Native iOS/Android apps and a web app too", "Public or private authenticated topics"],
    pros: ["Integrating it into any script takes literally one line of curl", "No artificial message limit and no account required"],
    cons: ["For reliable background iOS notifications it's best to use their public server or configure your own well"],
  },
  zabbix: {
    description:
      "Zabbix is an enterprise-grade infrastructure monitoring platform: servers, networks, applications and cloud services, with alerting and dashboards, without the per-host cost of SaaS platforms.",
    shortDescription: "Enterprise-grade infrastructure monitoring, a self-hosted alternative to Datadog.",
    features: ["Monitors servers, network, apps and cloud in one platform", "Lightweight agents for thousands of hosts", "Configurable alerting and auto-remediation"],
    pros: ["Enterprise-level depth, with over 20 years of development", "No per-host cost, unlike Datadog/New Relic"],
    cons: ["Steep learning curve compared to Uptime Kuma or Netdata"],
  },
  homebridge: {
    description:
      "Homebridge bridges devices that aren't natively compatible with Apple HomeKit (proprietary brands, older protocols) into Apple's Home app, through hundreds of community plugins.",
    shortDescription: "Bridge to bring non-compatible devices into Apple HomeKit.",
    features: ["Hundreds of community plugins for non-HomeKit-compatible brands", "Web configuration interface (Config UI X)", "Integrates directly into Apple's Home app"],
    pros: ["The simplest way to get a 'weird' device into HomeKit", "Huge and very active plugin ecosystem"],
    cons: ["network_mode: host is required for discovery, which reduces the container's isolation"],
  },
  litellm: {
    description:
      "LiteLLM is a unified gateway/proxy for 100+ LLM providers (OpenAI, Anthropic, local models via Ollama...) with a single OpenAI-format-compatible API, spend limits and centralized logs.",
    shortDescription: "Unified gateway for LLM APIs, with spend control and centralized logs.",
    features: ["A single OpenAI-compatible API for 100+ providers", "Spend limits and per-team/project keys", "Load balancing and fallback between models"],
    pros: ["Avoids vendor lock-in from depending on a single AI provider", "The proxy core is free; the enterprise dashboard is the paid part"],
    cons: ["Some advanced admin features (SSO, per-team budgets) are in the paid Enterprise plan"],
  },
  karakeep: {
    description:
      "Karakeep (formerly Hoarder) saves links, notes and images with automatic AI tagging and full-text search, even inside saved screenshots — your own smart bookmark manager.",
    shortDescription: "Bookmark manager with automatic AI tagging, an alternative to Raindrop.io.",
    features: ["Automatic AI tagging of links and notes", "Full-text search inside saved screenshots", "Browser extension and mobile apps"],
    pros: ["AI tagging saves a lot of manual organization time", "Very young project but with very active development"],
    cons: ["Automatic AI tagging needs an AI provider key (local or external) configured to work"],
  },
  jan: {
    description:
      "Jan is a desktop app with a ChatGPT-style interface for running language models locally on your own computer, with no internet connection or account required, plus extension support and a local API server.",
    shortDescription: "Chat with local AI models on your desktop, no account or connection, an alternative to ChatGPT.",
    features: ["ChatGPT-style interface over models running 100% on your machine", "Local API server compatible with the OpenAI format", "Works fully offline"],
    pros: ["Nothing you type ever leaves your computer", "Doesn't require a powerful GPU for smaller models"],
    cons: ["Performance and quality depend entirely on the local model you pick and your available hardware"],
  },
  coder: {
    description:
      "Coder spins up remote, reproducible development environments on your own infrastructure, which your team connects to from the browser or their local editor — the self-hosted alternative to GitHub Codespaces.",
    shortDescription: "Remote development environments on your own infrastructure, an alternative to GitHub Codespaces.",
    features: ["Reproducible dev environments as code (Terraform)", "Connect from the browser or local VS Code/JetBrains", "Auto-shutdown of idle environments to save resources"],
    pros: ["Runs on your own cloud or server, no per-hour Codespaces bill", "The core is free with no user limit for the community edition"],
    cons: ["Enterprise governance features (advanced SSO, per-team quotas) require the paid Enterprise license"],
  },
  gotify: {
    description:
      "Gotify is a simple, lightweight push notification server for your own scripts and applications, with a minimalist REST API and an Android app — the simplest option if you don't need everything ntfy offers.",
    shortDescription: "Minimalist push notification server, an alternative to Pushover.",
    features: ["Simple REST API to send notifications from any script", "Official Android app", "Plugins to extend functionality"],
    pros: ["Extremely lightweight and simple to understand", "Great if you only need basic notifications with no frills"],
    cons: ["No official iOS app (unlike ntfy)"],
  },
  openhands: {
    description:
      "OpenHands is an autonomous coding agent that can write code, run commands and browse the web inside a sandbox to complete development tasks end to end — the open alternative to Devin.",
    shortDescription: "Autonomous AI coding agent in a sandbox, an open alternative to Devin.",
    features: ["Writes, runs and debugs code autonomously in a sandbox", "Can browse the web and use terminal tools", "Compatible with local models or external APIs (you pick the model)"],
    pros: ["You're not locked into a single model provider — you choose which to use", "Extremely active development, one of the most followed open source coding agents"],
    cons: ["Needs access to the Docker socket to create its sandboxes — review the security implications"],
  },
  openhab: {
    description:
      "openHAB is a home automation platform focused on interoperability across protocols and manufacturers, with a powerful rules engine aimed at users who want fine-grained control over every automation.",
    shortDescription: "Home automation focused on interoperability, an alternative to Home Assistant.",
    features: ["Very powerful rules engine for complex automations", "Supports hundreds of protocols and bindings (KNX, Z-Wave, MQTT...)", "Configurable historical state persistence"],
    pros: ["Especially strong for 'serious' home automation installs (KNX, built-in wiring)", "Veteran, highly technical community"],
    cons: ["Steeper learning curve than Home Assistant, less modern interface"],
  },
  miniflux: {
    description:
      "Miniflux is a minimalist, fast, distraction-free RSS reader, built for reading lots of feeds with no visual clutter — the lightest self-hosted alternative to Feedly.",
    shortDescription: "Minimalist, very fast RSS reader, an alternative to Feedly.",
    features: ["Minimalist interface built for fast reading, no distractions", "Supports filtering and content-blocking rules", "API compatible with third-party apps (Reeder, etc.)"],
    pros: ["Extremely fast even with thousands of unread articles", "A single binary, very easy to maintain"],
    cons: ["The interface is deliberately plain — not for anyone looking for something visual like Feedly"],
  },
  homebox: {
    description:
      "Homebox is a home inventory: what you own, where it's stored and what it cost, with printable QR labels for every box or shelf — so you never have to ask yourself where you put something again.",
    shortDescription: "Home inventory with QR labels, an alternative to paid inventory apps.",
    features: ["Printable QR labels to locate any item", "Warranty and purchase-value tracking", "Installable web app on your phone (PWA)"],
    pros: ["Very lightweight and quick to set up for a full home inventory", "Free compared to subscription-based inventory apps"],
    cons: ["Loading the initial inventory of a whole house takes time, like with any app of this kind"],
  },
  wallos: {
    description:
      "Wallos tracks all your recurring subscriptions (streaming, software, gym...) in one place, with reminders before every charge and charts of how much that 'silent spending' is costing you each month.",
    shortDescription: "Recurring subscription tracking, an alternative to Rocket Money.",
    features: ["Calendar view of all upcoming charges", "Notifications before every renewal", "Monthly/yearly spending charts by category"],
    pros: ["Helps spot forgotten subscriptions you're still paying for", "Very simple to install, no heavy dependencies"],
    cons: ["Manual tracking only — it doesn't connect to your bank to detect charges automatically"],
  },
  "tandoor-recipes": {
    description:
      "Tandoor Recipes manages recipes, meal planning and shopping lists with a strong focus on shared family cookbooks and automatic quantity scaling.",
    shortDescription: "Recipes, weekly menu and shared cookbooks, an alternative to Paprika.",
    features: ["Cookbooks shared between several users/family", "Automatic ingredient scaling by number of servings", "Import from hundreds of recipe websites"],
    pros: ["Much more geared toward shared/family use than Mealie", "Active community with lots of integrations"],
    cons: ["Its AGPL-3.0 license includes a 'Commons Clause' that restricts offering it as a paid service to third parties"],
  },
  "changedetection-io": {
    description:
      "changedetection.io watches any webpage and alerts you the moment a price, stock availability or any text you care about changes, with no limit on how many sites you watch like Visualping's free plans have.",
    shortDescription: "Website change monitoring, an alternative to Visualping.",
    features: ["Watches prices, stock or any text/CSS on a page", "Notifications to dozens of different services", "Supports JavaScript-heavy pages (via headless browser)"],
    pros: ["No artificial limit on how many sites you watch", "Widely used to catch price drops and restocks"],
    cons: ["Watching JavaScript-heavy pages requires enabling headless browser mode, which uses more resources"],
  },
  firecrawl: {
    description:
      "Firecrawl turns any website into clean Markdown or JSON, ready to feed an AI or RAG pipeline, handling JavaScript, pagination and whole-site crawling for you.",
    shortDescription: "Web scraping for AI pipelines, a self-hosted alternative to Apify.",
    features: ["Converts any website to clean Markdown/JSON for LLMs", "Full-site crawling with depth control", "Renders JavaScript via built-in Playwright"],
    pros: ["Saves a huge amount of manual scraping time for AI/RAG pipelines", "The self-hosted core is free; you only pay if you use their cloud API"],
    cons: ["Some advanced features (built-in AI extraction, rotating proxies) are geared toward their paid cloud version"],
  },
  memos: {
    description:
      "Memos is a lightweight, quick-note app, like a private wall of sticky notes: write, tag with #hashtags and you're done, without the overhead of a full productivity app.",
    shortDescription: "Lightweight quick notes with hashtags, a minimalist alternative to Notion.",
    features: ["Quick notes with #hashtags for on-the-fly organization", "Open, extensible API", "Private or public per note"],
    pros: ["A single lightweight binary, starts in seconds", "Great for capturing ideas fast with no friction"],
    cons: ["Not meant to replace a full wiki — it's deliberately simple"],
  },
  revolt: {
    description:
      "Revolt is a chat platform with servers, voice channels and bots very similar to Discord in user experience, but open source and self-hostable on your own infrastructure.",
    shortDescription: "Discord-style server and voice chat, fully open source and self-hostable.",
    features: ["Servers, text and voice channels, just like Discord", "Bots and a public API for integrations", "Web, mobile and desktop clients"],
    pros: ["Very familiar experience for anyone coming from Discord", "100% of your servers and messages under your control"],
    cons: ["Bot ecosystem and community are still much smaller than Discord's"],
  },
  "speedtest-tracker": {
    description:
      "Speedtest Tracker runs internet speed tests on the schedule you define and keeps the history in charts, so you have real proof if you ever need to complain to your ISP about a slow connection.",
    shortDescription: "Automatic history of your internet connection speed.",
    features: ["Scheduled tests (hourly, daily...)", "Historical upload/download speed charts", "Alerts if speed drops below a threshold"],
    pros: ["Objective, dated proof if your ISP isn't delivering the speed you're paying for", "Very lightweight, runs well on any NAS"],
    cons: ["Each speed test uses some of your bandwidth while it runs"],
  },
  "pocket-id": {
    description:
      "Pocket ID is a lightweight identity server focused on passkeys (passwordless authentication via fingerprint/Face ID/security key), built to protect your own HomeLab services with OIDC.",
    shortDescription: "Lightweight OIDC server focused on passkeys, no passwords.",
    features: ["Login with passkeys only, no passwords to leak", "Standard OIDC protocol, compatible with most apps", "Simple admin panel, built for a single user/family"],
    pros: ["Much lighter than Keycloak/Authentik if you just need basic OIDC with passkeys", "Removes the risk of reused or weak passwords"],
    cons: ["Relying on passkeys means you need compatible devices (most recent phones and computers are)"],
  },
  silverbullet: {
    description:
      "SilverBullet is a personal knowledge base in plain Markdown text, with an editor that behaves more like a programming language for notes (templates, live queries) than a regular text editor.",
    shortDescription: "Personal Markdown knowledge base with templates and live queries.",
    features: ["Everything is stored as plain Markdown files, no database", "Live query language inside your own notes", "Works offline as a PWA"],
    pros: ["Your notes are plain text files — you're never trapped in a proprietary format", "Very lightweight, a single container with no database"],
    cons: ["The templating/query language has its own learning curve"],
  },
  wger: {
    description:
      "wger is a workout and nutrition manager: exercise routines, body weight tracking and a meal diary with an exercise and ingredient database, with no ads or subscription.",
    shortDescription: "Workout and nutrition tracking, an ad-free alternative to MyFitnessPal.",
    features: ["Exercise database with videos and illustrations", "Nutrition diary with a food database", "Routine planning by weeks/mesocycles"],
    pros: ["No ads or features locked behind a subscription", "Official mobile app in addition to the web"],
    cons: ["The food database is smaller than MyFitnessPal's — you may need to add local foods by hand"],
  },
  kestra: {
    description:
      "Kestra orchestrates data pipelines and complex workflows defined in YAML, with a live visual editor and hundreds of plugins — a self-hosted alternative to managed orchestration platforms like Prefect Cloud.",
    shortDescription: "Workflow and data pipeline orchestration, an alternative to Prefect Cloud.",
    features: ["Declarative YAML workflows with a live visual editor", "Hundreds of plugins (databases, APIs, AI, cloud...)", "Retries, cron scheduling and event triggers"],
    pros: ["Not as heavy as infrastructure-as-code nor as limited as drag-and-drop — a comfortable middle ground", "Very active development and good documentation"],
    cons: ["Overkill for very simple pipelines — n8n is faster to get started with"],
  },
  kopia: {
    description:
      "Kopia makes encrypted, deduplicated backups of your files to whatever destination you want (local disk, NAS, S3, Backblaze B2...), with a web UI to manage and restore snapshots.",
    shortDescription: "Encrypted, deduplicated backups to any destination, an alternative to paid backup services.",
    features: ["Deduplication and compression to save backup space", "End-to-end encryption before anything is uploaded", "Supports S3, Backblaze B2, SFTP, local disk and more as a destination"],
    pros: ["You choose the final destination — no dependency on one provider", "Restoring snapshots is as simple as mounting them as a drive"],
    cons: ["The web UI is functional but minimalist, built for technical users"],
  },
  uptrace: {
    description:
      "Uptrace is an OpenTelemetry-native observability platform (traces, metrics and logs in one place) built on ClickHouse, designed as a self-hosted alternative to Datadog or New Relic.",
    shortDescription: "OpenTelemetry observability (traces, metrics, logs), an alternative to Datadog.",
    features: ["Traces, metrics and logs unified in one dashboard", "100% compatible with the OpenTelemetry standard", "Built on ClickHouse for very fast queries at scale"],
    pros: ["Being OpenTelemetry-native, you don't rewrite instrumentation if you switch backends", "Much better query performance than Elasticsearch-based solutions at this data volume"],
    cons: ["ClickHouse adds one more piece of infrastructure to maintain compared to simpler all-in-one solutions"],
  },
  scrutiny: {
    description:
      "Scrutiny monitors the S.M.A.R.T. health of your hard drives and SSDs, with a visual dashboard and alerts before a drive fails — so you don't lose data to a 'surprise' that was actually announced in advance.",
    shortDescription: "S.M.A.R.T. health monitoring for hard drives and SSDs, with early failure alerts.",
    features: ["Visual dashboard of each disk's S.M.A.R.T. health", "Historical temperature and key metrics over time", "Notifications when a S.M.A.R.T. attribute worsens"],
    pros: ["Translates cryptic S.M.A.R.T. data into an easy-to-understand traffic light", "Can warn of a disk failure weeks in advance"],
    cons: ["Needs direct access to disk devices (cap_add SYS_RAWIO), doesn't work well on some NAS with virtualized storage"],
  },
  "faster-whisper-server": {
    description:
      "faster-whisper-server exposes a local Whisper speech-to-text model through an OpenAI-format-compatible API, so you can transcribe audio without sending it to the cloud or paying per token.",
    shortDescription: "Local speech-to-text transcription, OpenAI Whisper-compatible API.",
    features: ["API compatible with OpenAI's transcription endpoint", "Uses faster-whisper (CTranslate2) to transcribe faster than the original Whisper", "Supports GPU (separate image) or CPU"],
    pros: ["None of the audio you transcribe ever leaves your server", "No per-minute cost, unlike the OpenAI API"],
    cons: ["Without a GPU, transcribing long audio can be noticeably slower than the cloud API"],
  },
};
