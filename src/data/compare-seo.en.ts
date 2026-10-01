import { AGPL_COPYLEFT_NOTE_EN } from "./license-notes";
import type { CompareSeoOverride } from "./compare-seo";

/**
 * English copy for the same priority comparisons overridden in compare-seo.ts
 * — same keys (pairSlug), same fallback rule as tool-seo.en.ts.
 */
export const compareSeoEn: Partial<Record<string, CompareSeoOverride>> = {
  "garage-vs-seaweedfs": {
    metaTitle: "Garage vs SeaweedFS: self-hosted S3 storage (2026)",
    metaDescription:
      "Garage vs SeaweedFS: we compare license, architecture, and resource use for two open source alternatives to Amazon S3 for self-hosting your own object storage.",
    tldr:
      "Garage fits best in a home cluster of modest, even geo-distributed nodes with very low per-node resource use. SeaweedFS fits best when you need to serve huge numbers of small files at scale with extra features like erasure coding. Both are S3 API-compatible.",
    faqs: [
      {
        q: "Garage or SeaweedFS for a homelab with modest hardware?",
        a: "Garage is built specifically for that: clusters of several small, even geo-distributed nodes, with very low resource use per node. Its clustering setup has a somewhat steeper learning curve in exchange.",
      },
      {
        q: "Which one has more features?",
        a: "SeaweedFS includes configurable replication and erasure coding, and is optimized to serve billions of small files at scale — more features at the cost of a larger project.",
      },
      {
        q: "Are both compatible with the Amazon S3 API?",
        a: "Yes, both include an S3 compatibility layer, so most clients and tools that already speak S3 work against either one without code changes.",
      },
      {
        q: "What's the difference between their licenses?",
        a: `Garage uses ${AGPL_COPYLEFT_NOTE_EN}. SeaweedFS uses Apache-2.0, a permissive license without that network-use obligation. This matters most if you plan to offer the storage as a service to third parties.`,
      },
    ],
  },
  "affine-vs-outline": {
    metaTitle: "AFFiNE vs Outline: docs + whiteboard vs focused team wiki (2026)",
    metaDescription:
      "AFFiNE vs Outline: we compare license, architecture, and focus for two open source alternatives to Notion/Confluence to help you pick your self-hosted wiki or workspace.",
    tldr:
      "AFFiNE combines documents, databases, and an infinite whiteboard on the same canvas — great if you want something more visual than a traditional wiki. Outline is a more focused team wiki, with instant search and clear collections. AFFiNE is MIT licensed; Outline is BUSL-1.1 (not OSI).",
    faqs: [
      {
        q: "AFFiNE or Outline if I only need a team wiki?",
        a: "Outline: it's focused specifically on team documentation, with instant search and a clear collections structure. AFFiNE's whiteboard adds no value if you only need organized text.",
      },
      {
        q: "Which one has a visual whiteboard?",
        a: "Only AFFiNE combines documents, databases, and an infinite whiteboard on the same canvas. Outline doesn't have that feature — it's a wiki focused on text and collections.",
      },
      {
        q: "What license does each use?",
        a: "AFFiNE is MIT, a real OSI license. Outline is BUSL-1.1 (Business Source License): the code is public, but it isn't an OSI-recognized license — this matters most if you plan to offer either one as your own paid SaaS.",
      },
      {
        q: "Which one is more mature for production?",
        a: "Outline has spent more years focused specifically on its use case (team wiki). AFFiNE is more ambitious in combining more features, but its official self-host still evolves quickly between versions, as we note on its page.",
      },
    ],
  },
  "appflowy-vs-outline": {
    metaTitle: "AppFlowy vs Outline: all-in-one workspace vs focused wiki (2026)",
    metaDescription:
      "AppFlowy vs Outline: we compare license, required infrastructure, and focus for two open source alternatives to Notion/Confluence before you pick which to self-host.",
    tldr:
      "AppFlowy is an all-in-one workspace (notes, databases, Kanban) under a real AGPL-3.0 license. Outline is a more focused team wiki under BUSL-1.1 (not OSI). If you only need documentation, Outline is more direct; if you want a full Notion replacement, AppFlowy covers more ground.",
    faqs: [
      {
        q: "AppFlowy or Outline: which is closer to Notion?",
        a: "AppFlowy, because it combines notes, databases, and Kanban boards in one workspace, just like Notion. Outline is more focused on team documentation in a wiki style, with no databases or boards.",
      },
      {
        q: "What license does each use?",
        a: "AppFlowy is AGPL-3.0, a real OSI license. Outline is BUSL-1.1, not OSI-recognized even though its code is public.",
      },
      {
        q: "Which one needs fewer services to self-host?",
        a: "AppFlowy Cloud (AppFlowy's self-hosting path) only needs PostgreSQL. Outline needs PostgreSQL and Redis — one more service to maintain.",
      },
    ],
  },
  "docmost-vs-outline": {
    metaTitle: "Docmost vs Outline: two collaborative wikis, different licenses (2026)",
    metaDescription:
      "Docmost vs Outline: we compare license, infrastructure, and maturity for two modern team wikis before you pick which to self-host as a Confluence alternative.",
    tldr:
      "Docmost and Outline are both modern collaborative wikis with similar infrastructure (PostgreSQL + Redis). The real difference is the license: Docmost is AGPL-3.0 (real open source); Outline is BUSL-1.1 (not OSI, though the code is public) and has more years of development.",
    faqs: [
      {
        q: "Docmost or Outline: which should you pick?",
        a: "Both are modern collaborative wikis with real-time editing. Docmost is a younger project but with a real AGPL-3.0 license; Outline has been around longer with a very polished focus on search and collections, though its BUSL-1.1 license isn't OSI.",
      },
      {
        q: "What do you need to deploy each one?",
        a: "Both need PostgreSQL and Redis — the infrastructure requirements are very similar between the two.",
      },
      {
        q: "Which one is more mature?",
        a: "Outline has spent more years in active development focused on its use case. Docmost is a more recent project, with a good development pace but less time maturing in production.",
      },
    ],
  },
  "minio-vs-seaweedfs": {
    metaTitle: "MinIO vs SeaweedFS: the real state of each Docker image (2026)",
    metaDescription:
      "MinIO vs SeaweedFS for self-hosted S3: we compare license and architecture, including an active security warning about MinIO community edition's Docker image.",
    tldr:
      "Before comparing features: MinIO's community edition no longer has a reliable public Docker image — its repo was archived, the image was pulled from Docker Hub, and the last free version still circulating has an unpatched critical vulnerability. SeaweedFS keeps shipping binaries, with 3.99 as the latest pinnable Docker tag. If you need S3-compatible storage today, SeaweedFS (or Garage) is the safer of the two to deploy.",
    faqs: [
      {
        q: "Is it safe to deploy MinIO today?",
        a: "We don't currently recommend it: its community edition is no longer published as a public Docker image (the repo was archived and the image pulled from Docker Hub and its quay.io mirror), and the last free version still circulating has an unpatched critical authentication vulnerability (CVSS 8.8). Consider SeaweedFS or Garage until MinIO offers an official path again.",
      },
      {
        q: "Is SeaweedFS still getting Docker updates?",
        a: "It's still under active development, but its Docker image hasn't published a new version tag since 3.99 (October 2025) — recent registry activity is just cosign signatures, not new consumable versions. 3.99 is the latest real version you can pin today.",
      },
      {
        q: "Are both compatible with the Amazon S3 API?",
        a: "Yes, both include an S3 compatibility layer, regardless of the image-availability issue affecting MinIO.",
      },
      {
        q: "What license does each use?",
        a: "MinIO is AGPL-3.0 (Open-Core: some advanced features are reserved for an enterprise plan). SeaweedFS is Apache-2.0, fully FOSS with no such model.",
      },
    ],
  },
  "docmost-vs-wikijs": {
    metaTitle: "Docmost vs Wiki.js: real-time editing vs Git-style history (2026)",
    metaDescription:
      "Docmost vs Wiki.js: we compare architecture and infrastructure for two AGPL-3.0 wikis before you pick which to self-host as a Confluence alternative.",
    tldr:
      "Wiki.js and Docmost are both AGPL-3.0, but technically different: Wiki.js only needs PostgreSQL and offers Git-style change history with multiple auth providers; Docmost adds Redis and focuses on real-time collaborative editing in a Notion-like style.",
    faqs: [
      {
        q: "Docmost or Wiki.js: which should you pick?",
        a: "Wiki.js if you want a flexible editor (Markdown or visual) with Git-style change history. Docmost if you prioritize real-time collaborative editing in a more Notion-like style.",
      },
      {
        q: "Which one needs less infrastructure to self-host?",
        a: "Wiki.js, which only needs PostgreSQL. Docmost adds Redis on top of PostgreSQL — one more service to maintain.",
      },
      {
        q: "What license does each use?",
        a: "Both are AGPL-3.0 — in this pair, licensing isn't the real differentiator, architecture and editing style are.",
      },
    ],
  },
};
