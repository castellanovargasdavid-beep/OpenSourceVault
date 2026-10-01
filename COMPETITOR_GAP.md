# Competitor Gap Analysis

Lightweight research pass (WebSearch only, no scraping/fetching of full
pages) against the two most relevant competitors in this niche:
OpenAlternative.co and LibHunt (specifically its `selfhosted.libhunt.com`
property). Research-only — no outreach sent, no code assumed from this file
alone (see LINK_ACQUISITION.md and CRO_EXPERIMENTS.md EXP-006 for what was
actually implemented as a result).

## OpenAlternative.co
- Curated directory of OSS alternatives to proprietary SaaS (Remix app,
  source at `github.com/piotrkulpinski/openalternative`).
- Page types: tool pages (GitHub health metrics instead of marketing copy),
  "Alternatives to X" listicle pages, category pages with a `/self-hosted`
  filter sub-path (structurally close to AltFreeStack's own category
  pages), blog listicles ("Top 12 Alternatives to GitHub for 2026").
- Submission is via a form or GitHub PR; a third-party source (unverified
  directly) claims a backlink-to-list condition on some directory listings
  — treat as unconfirmed.
- **No public API or downloadable dataset found advertised.** Third parties
  scrape it instead of being given a feed (a now-deprecated Apify scraper
  exists for it).

## LibHunt / selfhosted.libhunt.com
- A trending/discovery engine (tracks Reddit/HN/Dev.to mentions), not an
  independently curated directory for its self-hosted section — the
  `selfhosted.libhunt.com` property is explicitly a frontend over the
  **community-maintained `awesome-selfhosted/awesome-selfhosted-data`**
  GitHub repo (~1,510 projects, 143 categories).
- Page types: category pages, per-project pages with an auto-generated
  "X vs Y" comparison link to same-category projects, topic pages, "X
  alternatives" pages.
- **No first-party public API or dataset of its own** — it re-presents
  someone else's already-open dataset.

## The gap this surfaced
Neither of the two most comparable competitors publishes a structured,
first-party dataset of **resource requirements** (RAM/CPU/Docker-readiness)
or cost data — only the community `awesome-selfhosted-data` repo publishes
structured tool *metadata* (license, language, description), and even that
doesn't track resource requirements or cost.

**A public dataset of self-hosting resource requirements + Docker
compatibility + license, derived from data AltFreeStack already audits and
publishes per-tool, appears to be unclaimed differentiation** — not
something competitors are already doing better. This is the basis for
EXP-006 in `CRO_EXPERIMENTS.md` (the new `/api/catalog` endpoint): it was
chosen specifically because it's the one Phase-26 "linkable asset" idea that
(a) this research found no competitor already doing, and (b) could be built
entirely from data the catalog already has, with zero new research or
fabricated fields.

## What AltFreeStack has that these two don't (worth knowing, not a to-do)
- A working Stack Builder that generates a real, ready-to-deploy
  docker-compose.yml across multiple tools at once — neither OpenAlternative
  nor LibHunt offer anything like this; both are discovery/comparison only,
  with no "build and deploy" product layer.
- Cost/savings calculators tied to real (if self-disclosed-as-approximate)
  VPS pricing tiers, not just "self-hosting is free" messaging.

## What AltFreeStack doesn't have that's worth naming (not built this task)
- Neither OpenAlternative's GitHub-health-metrics-first tool page format
  nor LibHunt's auto-generated "vs" links at the bottom of every project
  page were copied — AltFreeStack's own comparison-page system (already
  much richer: license/stack/FAQ/TL;DR per Batch 1/2 SEO work) covers the
  same intent better, so there was nothing to backport here.
- A `/self-hosted`-style filtered sub-path per category (OpenAlternative's
  pattern) — not built, because AltFreeStack's catalog is self-hosted-only
  by definition (there's no "cloud-only" tools mixed in to filter out), so
  the filter wouldn't carry any real signal here.

## Caveats
This was a WebSearch-based pass (snippets/summaries), not full page fetches
of every competitor page or their footers/docs — a direct visit to both
sites' own API/docs pages would be the next step before treating "no public
dataset" as fully confirmed rather than "not found in available search
results."
