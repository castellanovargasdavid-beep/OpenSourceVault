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
};
