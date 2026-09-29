import type { ReplaceMappingContent } from "./replace-mappings";

/** English translation of replace-mappings.ts. Same keys, same claims — never a looser or stronger equivalence than the Spanish original. */
export const replaceMappingContentEn: Record<string, ReplaceMappingContent> = {
  // --- Notion ---
  "Notion→appflowy": {
    fit: "good",
    useCase: "Can replace Notion for notes, documents and Notion-style databases — same block model and views.",
    limitation: "Plugin and integration ecosystem is still smaller than Notion's.",
  },
  "Notion→affine": {
    fit: "good",
    useCase: "Can replace Notion for documents and databases, adding an infinite whiteboard Notion doesn't offer natively.",
    limitation: "The official self-host build still evolves quickly between versions, so updates need a bit more attention.",
  },
  "Notion→outline": {
    fit: "partial",
    useCase: "Can replace Notion for your team's internal wiki (docs, policies, guides) — not for its databases or Kanban/Calendar views.",
    limitation: "BUSL-1.1 license: you can't offer it as a SaaS competing with Outline itself.",
  },
  "Notion→docmost": {
    fit: "partial",
    useCase: "Can replace Notion for your team's internal wiki, with real-time collaborative editing — doesn't cover Notion's databases or views.",
    limitation: "Still a young project compared to more mature alternatives like Confluence.",
  },
  "Notion→huly": {
    fit: "partial",
    useCase: "Can replace Notion for collaborative documents, inside a broader suite that also covers projects and team chat.",
    limitation: "Young project, with a still-limited integration ecosystem.",
  },

  // --- Slack ---
  "Slack→rocketchat": {
    fit: "good",
    useCase: "Can replace Slack for team channels, threads and video calls, with no message history limit.",
    limitation: "Needs MongoDB with a replica set in production, which adds operational complexity compared to a single-container deploy.",
  },
  "Slack→mattermost": {
    fit: "good",
    useCase: "Can replace Slack for team chat and collaboration, with a focus on security and regulatory compliance.",
    limitation: "The free Team edition has fewer features than the paid Enterprise one.",
  },
  "Slack→zulip": {
    fit: "good",
    useCase: "Can replace Slack for team chat, organizing each channel into topic threads instead of a single chronological stream.",
    limitation: "The topic-threading model has a learning curve for teams used to Slack's format.",
  },
  "Slack→huly": {
    fit: "partial",
    useCase: "Can replace Slack for team chat, inside a broader suite that also covers projects and documents.",
    limitation: "Young project, with a still-limited integration ecosystem.",
  },

  // --- Airtable ---
  "Airtable→nocodb": {
    fit: "good",
    useCase: "Can replace Airtable for smart spreadsheets with Grid, Kanban, Gallery and Form views, on top of a real SQL database.",
    limitation: "Somewhat steeper learning curve than Airtable, and its AGPL-3.0 license requires you to release your code if you modify and offer it as a service.",
  },
  "Airtable→baserow": {
    fit: "good",
    useCase: "Can replace Airtable for no-code databases, with a drag-and-drop interface very similar to it.",
    limitation: "More advanced automations require the paid premium edition.",
  },

  // --- Google Drive ---
  "Google Drive→nextcloud": {
    fit: "good",
    useCase: "Can replace Google Drive for file sync and collaborative document editing, with calendar, contacts and video calls included.",
    limitation: "Can feel heavy on small instances if you enable many apps at once.",
  },
  "Google Drive→owncloud": {
    fit: "good",
    useCase: "Can replace Google Drive for syncing and sharing files, on a modern, lighter architecture (Infinite Scale).",
    limitation: "Smaller app ecosystem than Nextcloud.",
  },
  "Google Drive→filestash": {
    fit: "specialized",
    useCase: "Can replace Google Drive's web interface to browse and edit files you already have in another storage backend (S3, FTP, SFTP, WebDAV).",
    limitation: "It isn't storage itself — you also need to deploy the storage backend it connects to.",
  },

  // --- Zapier ---
  "Zapier→n8n": {
    fit: "good",
    useCase: "Can replace Zapier for automating workflows with 400+ nodes, with no execution limit once self-hosted.",
    limitation: "Its Fair-code license restricts offering it as your own SaaS competing with n8n Cloud.",
  },
  "Zapier→activepieces": {
    fit: "good",
    useCase: "Can replace Zapier for no-code workflow automation, with 200+ ready-made integrations.",
    limitation: "Integration ecosystem still smaller than Zapier's, and some team features (SSO, analytics) are Enterprise-only.",
  },

  // --- Firebase ---
  "Firebase→supabase": {
    fit: "good",
    useCase: "Can replace Firebase for database, authentication, file storage and realtime subscriptions, on top of standard PostgreSQL.",
    limitation: "The full self-hosted stack has quite a few internal services to maintain.",
  },
  "Firebase→appwrite": {
    fit: "good",
    useCase: "Can replace Firebase for authentication, database, storage and serverless functions, with SDKs for Flutter, Swift, Android and Web.",
    limitation: "Stack with several internal containers, heavier to audit than a single-binary alternative.",
  },
  "Firebase→pocketbase": {
    fit: "good",
    useCase: "Can replace Firebase for authentication, database and storage on small-to-medium projects, all in a single binary.",
    limitation: "Uses SQLite, which limits horizontal scalability at high volume.",
  },
  "Firebase→hasura": {
    fit: "specialized",
    useCase: "Can replace Firebase's instant API layer (GraphQL/REST over your database, with row-level permissions) if you already use or plan to use PostgreSQL.",
    limitation: "Doesn't include authentication or file storage like Firebase — it only covers the data-access layer.",
  },

  // --- Google Analytics ---
  "Google Analytics→plausible": {
    fit: "good",
    useCase: "Can replace Google Analytics for site traffic and visits with no cookies or consent banner, with importable history from GA.",
    limitation: "Needs ClickHouse, somewhat heavier to self-host, and offers less analytical depth than GA4 for complex ecommerce.",
  },
  "Google Analytics→umami": {
    fit: "good",
    useCase: "Can replace Google Analytics for basic multi-site traffic analytics from a single dashboard.",
    limitation: "Less detailed reports than GA4 or Matomo.",
  },
  "Google Analytics→matomo": {
    fit: "good",
    useCase: "Can replace Google Analytics with the most complete coverage among the open source alternatives: heatmaps, session recording, funnels and advanced segments.",
    limitation: "Heavier interface, needs more resources than Plausible or Umami.",
  },
  "Google Analytics→ackee": {
    fit: "good",
    useCase: "Can replace Google Analytics for a minimalist dashboard of visits and custom events.",
    limitation: "Much more basic reports than GA4.",
  },
  "Google Analytics→goatcounter": {
    fit: "good",
    useCase: "Can replace Google Analytics for visits and referrers, with the lightest deploy in the whole category (a single binary).",
    limitation: "Not built for complex product analytics.",
  },

  // --- Calendly ---
  "Calendly→cal-com": {
    fit: "good",
    useCase: "Can replace Calendly for 1-on-1 and team booking pages, with your own domain and branding.",
    limitation: "Initial setup is more technical than just signing up for Calendly.",
  },
  "Calendly→rallly": {
    fit: "specialized",
    useCase: "Can replace Calendly only for group availability polls (Doodle-style), where voters don't need to create an account.",
    limitation: "Doesn't cover Calendly's 1-on-1 scheduling, only group date polls.",
  },
};
