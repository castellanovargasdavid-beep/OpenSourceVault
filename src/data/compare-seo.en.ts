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
};
