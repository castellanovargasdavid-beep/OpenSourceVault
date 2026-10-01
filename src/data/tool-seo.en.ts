import type { ToolSeoOverride } from "./tool-seo";

/**
 * English copy for the same priority tool pages overridden in tool-seo.ts —
 * same keys (OpenSourceTool.id), same fallback rule: a tool with no entry
 * here falls back to the Spanish override (getToolSeo), and a tool with no
 * entry in either falls back to the generic t.toolPage template.
 */
export const toolSeoEn: Partial<Record<string, ToolSeoOverride>> = {
  vikunja: {
    metaTitle: "Vikunja: open source task manager with 4 views (2026)",
    metaDescription:
      "What Vikunja is, the open source task manager that replaces Todoist and Asana: List, Kanban, Gantt and Table views, AGPL-3.0 license, and Docker deployment in minutes.",
    faqs: [
      {
        q: "What is Vikunja?",
        a: "An open source task and project manager (AGPL-3.0 license) written in Go, built as a lightweight alternative to Todoist and Asana for small teams. It runs fine even on SQLite, with no separate database required.",
      },
      {
        q: "What views does Vikunja offer?",
        a: "Four: List, Kanban, Gantt and Table. Switch between them depending on the task — Table for comparing many fields at once, Kanban for workflow stages, Gantt for scheduling by date.",
      },
      {
        q: "Is Vikunja fully free, or are some features paid?",
        a: "It's Open-Core: the self-hosted core is real, free AGPL-3.0. Vikunja Cloud (the official SaaS) is the paid tier, but it isn't required to run it on your own server.",
      },
    ],
  },
  typesense: {
    metaTitle: "Typesense: open source search engine, Algolia alternative (2026)",
    metaDescription:
      "Typesense is an open source search engine in C++ with federated search and geosearch, no per-request cost unlike Algolia. Official Docker image and deploy guide.",
    faqs: [
      {
        q: "What is Typesense?",
        a: "An open source search engine (GPL-3.0 license) written in C++, focused on simplicity and speed, with federated search, geosearch, and faceted filtering — built as a direct alternative to Algolia with no per-request cost.",
      },
      {
        q: "How do you deploy Typesense with Docker?",
        a: "With a single official image (`typesense/typesense`) and a volume for the data — no external database needed. This page's docker-compose includes the minimal config with the API key and data directory.",
      },
      {
        q: "Is Typesense as mature as Algolia or Meilisearch?",
        a: "Its docs and developer experience are very polished, though its community is somewhat smaller than Meilisearch's — for most catalog or content-site search use cases, it covers what Algolia does without the per-request cost.",
      },
    ],
  },
  vendure: {
    metaTitle: "Vendure: headless e-commerce framework in TypeScript (open source)",
    metaDescription:
      "Vendure is a headless e-commerce framework in TypeScript with plugins and a GraphQL API, GPL-3.0 licensed (Open-Core). What it includes, how to deploy it, and a Shopify alternative.",
    faqs: [
      {
        q: "Is Vendure open source?",
        a: "Yes, the core is GPL-3.0 (Open-Core) — it moved from MIT to GPLv3 at v3.0, with an optional commercial license (VCL) only for teams that need different terms than GPL. Self-hosting it requires no paid license.",
      },
      {
        q: "Does Vendure ship an official Docker image?",
        a: "No. Vendure doesn't publish a ready-to-use Docker image — the documented path from the project itself is generating your project with @vendure/create and building your own Dockerfile following its official Docker deployment guide.",
      },
      {
        q: "Who is Vendure for, compared to Shopify?",
        a: "Teams with development capacity who want to control every part of their store as code (auto-generated GraphQL API, TypeScript plugin system). The plugin ecosystem is smaller than Shopify's App Store, so something that's a one-click plugin there may mean writing your own plugin here.",
      },
    ],
  },
  wikijs: {
    metaTitle: "Wiki.js: open source wiki with Git-based version control (Confluence alternative)",
    metaDescription:
      "Wiki.js is an open source wiki (AGPL-3.0) with Markdown or visual editing, Git-style history, and multiple auth providers — a flexible alternative to Confluence.",
    faqs: [
      {
        q: "What is Wiki.js?",
        a: "A modern open source wiki (AGPL-3.0 license) with a Markdown or visual editor, Git-style change history, and support for multiple authentication providers — built as a flexible alternative to Confluence.",
      },
      {
        q: "What do you need to deploy Wiki.js?",
        a: "The official `requarks/wiki` image plus a PostgreSQL database — this page's docker-compose includes both services ready to copy.",
      },
      {
        q: "Does Wiki.js have as many integrations as Confluence?",
        a: "Not as many enterprise-catalog integrations, but it's very configurable in authentication and storage — for teams who want a self-hosted wiki without depending on the Atlassian ecosystem, it covers the main use case.",
      },
    ],
  },
  bagisto: {
    metaTitle: "Bagisto: open source e-commerce on Laravel (free Shopify alternative)",
    metaDescription:
      "Bagisto is a 100% free (MIT) e-commerce platform on Laravel and Vue.js, with multi-store and multi-language support — no hidden paid tiers. Docker deployment.",
    faqs: [
      {
        q: "What is Bagisto?",
        a: "An open source e-commerce platform (MIT license) built on Laravel and Vue.js, with multi-store and multi-language support and a marketplace of extensions — built as a free alternative to Shopify.",
      },
      {
        q: "Bagisto vs WooCommerce: which should you pick?",
        a: "WooCommerce is a plugin on top of WordPress (it lives inside an existing CMS); Bagisto is a standalone Laravel application built from the ground up as a store platform, with its own API and Vue.js admin panel — it makes sense if you don't need WordPress and prefer a dedicated PHP/Laravel e-commerce stack.",
      },
      {
        q: "Does Bagisto have hidden costs or paid tiers?",
        a: "The core is 100% free, with no hidden paid tiers — the real cost is the server you deploy it on and, optionally, third-party marketplace extensions if you need something the core doesn't cover.",
      },
    ],
  },
  "gitlab-ce": {
    metaTitle: "GitLab CE: full self-hosted DevOps platform (Git + CI/CD)",
    metaDescription:
      "GitLab Community Edition bundles Git, CI/CD, issues, and a container registry into one platform, free and self-hostable. RAM requirements and a Gitea comparison.",
    faqs: [
      {
        q: "What is GitLab CE?",
        a: "GitLab Community Edition: the free, self-hostable version of GitLab (MIT license), with Git repositories, built-in CI/CD, issue tracking, and a container registry in one DevOps platform.",
      },
      {
        q: "How much RAM does a GitLab CE server need?",
        a: "Noticeably more than Gitea — this page recommends at least 4GB for a comfortable instance, versus Gitea installs that run on much less. If you only need to host Git repos without built-in CI/CD, Gitea is the lighter option.",
      },
      {
        q: "GitLab CE vs Gitea: which should you pick?",
        a: "GitLab CE covers the full DevOps cycle (CI/CD, container registry, epics) in one platform, at the cost of more RAM and more operational complexity. Gitea is much lighter but focuses on hosting Git repos, leaving CI/CD to external tools.",
      },
    ],
  },
  focalboard: {
    metaTitle: "Focalboard: open source Kanban boards under the MIT license (Trello alternative)",
    metaDescription:
      "Focalboard offers Kanban, table, gallery, and calendar views under the MIT license, standalone or as a Mattermost plugin. How to deploy it with Docker and what to expect.",
    faqs: [
      {
        q: "What is Focalboard?",
        a: "An open source Kanban board tool (MIT license) with table, gallery, and calendar views on top of Kanban — usable as a standalone app or as a Mattermost plugin. A lightweight alternative to Trello.",
      },
      {
        q: "How do you deploy Focalboard with Docker?",
        a: "With the official `mattermost/focalboard` image and a volume for its data — it supports SQLite or PostgreSQL. This page's docker-compose uses the minimal SQLite setup.",
      },
      {
        q: "Is Focalboard still actively developed?",
        a: "Development has slowed since Mattermost acquired it, with fewer automation features than Trello's Power-Ups. It's still a solid pick if you want something lightweight with a permissive license, but don't expect the release pace of a commercial tool.",
      },
    ],
  },
  immich: {
    metaTitle: "Immich: self-hosted AI photo backup (Google Photos alternative)",
    metaDescription:
      "Immich automatically backs up photos and videos from your phone to your own server, with facial recognition and shared albums. AGPL-3.0 license, Docker, optional GPU.",
    faqs: [
      {
        q: "What is Immich?",
        a: "An open source tool (AGPL-3.0) that automatically backs up photos and videos from your phone to your own server, with facial recognition, smart search, and shared albums — a self-hosted alternative to Google Photos.",
      },
      {
        q: "Does Immich need a GPU?",
        a: "No, it's optional. It supports optional hardware acceleration for both video transcoding (NVENC, Quick Sync, VAAPI, RKMPP) and facial recognition/smart search (CUDA, OpenVINO, ROCm) — both are enabled separately in Settings; everything still works on CPU without them.",
      },
      {
        q: "How do you deploy Immich with Docker?",
        a: "With several services: the main server, a machine-learning container, PostgreSQL (with the pgvecto-rs extension for vector search), and Redis. The upload volume should point to a disk with real space for your whole photo library, not the system disk.",
      },
    ],
  },
  garage: {
    metaTitle: "Garage: distributed S3 storage for home clusters (open source)",
    metaDescription:
      "Garage is S3-compatible object storage built for small, geo-distributed clusters with very low per-node resource use. AGPL-3.0 license, Docker in minutes.",
    faqs: [
      {
        q: "What is Garage?",
        a: "An open source object storage system (AGPL-3.0), S3 API-compatible, written in Rust and designed to run on several small nodes, even geo-distributed, with high resilience.",
      },
      {
        q: "Is Garage compatible with the Amazon S3 API?",
        a: "Yes, its API is 100% S3-compatible, so most clients and tools that already speak S3 work against Garage with no code changes.",
      },
      {
        q: "What kind of cluster is Garage built for?",
        a: "Home or self-hosted clusters of several small nodes with modest hardware, even geographically distributed, with very low resource use per node. Its clustering setup has a somewhat steeper learning curve in exchange.",
      },
    ],
  },
  wekan: {
    metaTitle: "Wekan: open source Kanban board under the MIT license (Trello alternative)",
    metaDescription:
      "Wekan is an open source Kanban board with swimlanes, checklists, and webhook integrations, MIT licensed. How to deploy it with Docker and what to expect vs. Trello.",
    faqs: [
      {
        q: "What is Wekan?",
        a: "An open source Kanban board (MIT license) with lists, cards, labels, and checklists, very similar in experience to Trello, with active community support.",
      },
      {
        q: "Wekan vs Trello: what changes?",
        a: "The experience is very similar (lists, cards, swimlanes), but Wekan's interface is somewhat less polished than Trello's — in exchange, it's free, self-hostable, and under a very permissive MIT license, with no free-SaaS-account limits.",
      },
      {
        q: "How do you deploy Wekan with Docker?",
        a: "With the official `wekanteam/wekan` image and a MongoDB database — this page's docker-compose includes both services ready to copy.",
      },
    ],
  },
  saleor: {
    metaTitle: "Saleor: open source headless GraphQL e-commerce (Shopify Plus alternative)",
    metaDescription:
      "Saleor is a headless e-commerce platform with a full GraphQL API and event-driven architecture, built for high-traffic stores. BSD-3-Clause license.",
    faqs: [
      {
        q: "What is Saleor?",
        a: "A GraphQL-first headless commerce framework (BSD-3-Clause license), with a fully customizable checkout and event-driven architecture (webhooks) — built for large-scale stores as an alternative to Shopify Plus.",
      },
      {
        q: "Saleor vs Shopify Plus: who is each one for?",
        a: "Saleor is for teams with development capacity who want to control every part of checkout and storefront through its GraphQL API. Shopify Plus is a managed service with no infrastructure to maintain — in exchange for giving up that control and paying the subscription.",
      },
      {
        q: "Is Saleor actually free?",
        a: "The core is open source (BSD-3-Clause) and self-hosts at no license cost. It's Open-Core: there's an optional paid managed cloud plan, but it isn't required to run it yourself.",
      },
    ],
  },
  appwrite: {
    metaTitle: "Appwrite: open source backend-as-a-service (Firebase alternative)",
    metaDescription:
      "Appwrite covers auth, databases, storage, and serverless functions with SDKs for every framework. BSD-3-Clause license, verified pinned Docker image.",
    faqs: [
      {
        q: "What is Appwrite?",
        a: "A backend-as-a-service platform (BSD-3-Clause license) with SDKs for all popular frameworks, covering auth, databases, storage, serverless functions, and messaging — a Firebase alternative focused on developer experience.",
      },
      {
        q: "Appwrite vs PocketBase: which should you pick?",
        a: "Appwrite is a full BaaS with messaging, multiple function runtimes, and a very complete dashboard, at the cost of a multi-container stack (MariaDB + Redis) that's heavier to audit. PocketBase is a single Go binary with embedded SQLite — much simpler to deploy, built for small projects or MVPs.",
      },
      {
        q: "Is Appwrite's Docker image reliable?",
        a: "Yes — it's marked `VERIFIED_PINNED` in our deployment audit: a version-pinned, verified image, not a floating tag.",
      },
    ],
  },
  redash: {
    metaTitle: "Redash: open source SQL queries and dashboards (Looker alternative)",
    metaDescription:
      "Redash connects to your data sources to write SQL, visualize results, and share dashboards. BSD-2-Clause license, Docker deployment in minutes.",
    faqs: [
      {
        q: "What is Redash?",
        a: "An open source tool (BSD-2-Clause license) that connects to multiple data sources to write SQL queries, visualize them, and share them in dashboards — a lightweight alternative to Looker for data teams.",
      },
      {
        q: "Is Redash still actively developed?",
        a: "Its development pace has slowed compared to Metabase over the past few years. It's still a solid choice with a very permissive license, but don't expect the release pace of tools with commercial backing.",
      },
      {
        q: "How do you deploy Redash with Docker?",
        a: "With the official `redash/redash` image plus PostgreSQL and Redis — this page's docker-compose includes all three services ready to copy.",
      },
    ],
  },
  zammad: {
    metaTitle: "Zammad: open source ticketing system (self-hostable Zendesk alternative)",
    metaDescription:
      "Zammad offers a multichannel ticket inbox, knowledge base, and SLA automations, AGPL-3.0 licensed. What you need to deploy it with Docker.",
    faqs: [
      {
        q: "What is Zammad?",
        a: "A support ticketing system (AGPL-3.0 license) with a multichannel inbox, built-in knowledge base, and SLA automations — offered as a self-hostable alternative to Zendesk.",
      },
      {
        q: "What do you need to deploy Zammad?",
        a: "PostgreSQL and Elasticsearch — one more service to maintain than other helpdesks in this catalog, since Zammad depends on Elasticsearch for its search.",
      },
      {
        q: "Zammad vs Zendesk: what changes?",
        a: "Zammad is free and self-hostable (AGPL-3.0), with a modern interface compared to other open source helpdesks. In exchange for not paying a license, you maintain the infrastructure yourself (including Elasticsearch).",
      },
    ],
  },
  headscale: {
    metaTitle: "Headscale: self-hosted coordination server compatible with Tailscale",
    metaDescription:
      "Headscale reimplements Tailscale's control plane so you can use its official clients without depending on its commercial service. BSD-3-Clause, WireGuard underneath.",
    faqs: [
      {
        q: "What is Headscale?",
        a: "An open source implementation (BSD-3-Clause) of Tailscale's coordination server: it builds your own encrypted mesh network with WireGuard using the same official clients, with no dependency on Tailscale Inc.'s commercial control plane.",
      },
      {
        q: "Do I need Headscale's own client, or Tailscale's?",
        a: "You use the official Tailscale clients on all your devices — Headscale only replaces the coordination server (control plane) they connect to, not the client.",
      },
      {
        q: "Does Headscale support ACLs and exit nodes like the commercial service?",
        a: "Yes, it supports ACLs, exit nodes, and subnets just like Tailscale Inc. In exchange, it requires editing a YAML config file — not everything is controlled through environment variables alone.",
      },
    ],
  },
  umami: {
    metaTitle: "Umami: minimal, privacy-friendly web analytics (Google Analytics alternative)",
    metaDescription:
      "Umami is lightweight, privacy-respecting web analytics with a single container and database. MIT license. How it compares to Plausible and Matomo.",
    faqs: [
      {
        q: "What is Umami?",
        a: "A web analytics tool (MIT license) that's simple, fast, and privacy-respecting, with a single Node.js binary and a database — ideal for anyone who wants minimal operational overhead.",
      },
      {
        q: "Umami vs Plausible vs Matomo: which should you pick?",
        a: "Umami is the lightest to deploy (a single container plus a database) for basic multi-site analytics. Matomo is the most complete (heatmaps, session recordings, funnels, GA4-level detail) at the cost of more operational complexity. Plausible focuses on data minimization and a very simple, cookie-free dashboard.",
      },
      {
        q: "Does Umami fully replace Google Analytics?",
        a: "It covers the essentials — multi-site traffic, custom events, its own reporting API — but its reports are less detailed than GA4's or Matomo's, as we note honestly on its page.",
      },
    ],
  },
  neko: {
    metaTitle: "Neko (n.eko): streamed shared browser via Docker (open source)",
    metaDescription:
      "Neko creates a streamed shared browser room where multiple people watch and control the same virtual browser at once. Apache-2.0 license, one Docker command.",
    faqs: [
      {
        q: "What is Neko (n.eko)?",
        a: "An open source tool (Apache-2.0) that creates a streamed shared browser room: multiple people watch and control the same virtual browser at once, ideal for watch parties or collaborative browsing.",
      },
      {
        q: "Is Neko a replacement for Zoom?",
        a: "No. It covers a unique, specific use case Zoom doesn't solve well — a genuinely shared browser, not just screen sharing — but it isn't a general replacement for work video calls, as we note on its page.",
      },
      {
        q: "How do you deploy Neko with Docker?",
        a: "With the `m1k1o/neko` image in whichever browser variant you prefer (e.g. `m1k1o/neko:firefox`) — a single Docker service, no external database.",
      },
    ],
  },
  hasura: {
    metaTitle: "Hasura: instant GraphQL API over PostgreSQL (open source)",
    metaDescription:
      "Hasura generates a real-time GraphQL and REST API from your PostgreSQL database, with row-level permissions. Apache-2.0 license, Docker Compose included.",
    faqs: [
      {
        q: "What is Hasura?",
        a: "An engine (Apache-2.0 license) that instantly generates a real-time GraphQL and REST API from your PostgreSQL database, with granular row-level permissions — an alternative to Firebase or AWS AppSync.",
      },
      {
        q: "Is Hasura actually free?",
        a: "The engine (Community Edition) is Apache-2.0 and self-hosts for free. It's Open-Core: Hasura Cloud is the paid managed plan, optional and not required to run it yourself.",
      },
      {
        q: "Does Hasura work with NoSQL databases?",
        a: "It's built primarily for PostgreSQL and a few other relational databases, not NoSQL — already noted honestly on its page.",
      },
    ],
  },
};
