# SEO Roadmap

Short, forward-looking note — the detailed per-URL SEO work and its own
process rules (14–28 day re-entry window, position-tiered strategy, etc.)
live in `SEO_CHANGELOG.md`; this file only tracks what's next and how this
CRO/monetization task intersects with that existing SEO work.

## Status as of 2026-10-01
- Batch 1 (10 URLs) and Batch 2 (20 URLs) of the original 30-URL priority
  list are implemented — see `SEO_CHANGELOG.md`. Both batches are inside
  their 14–28 day no-touch window; this CRO task deliberately did not
  re-open any of those 30 pages' SEO content.
- The remaining URLs from the original Search Console export (below the
  top 30) are still unaddressed — next SEO iteration, not this task.

## How this CRO task intersects with existing SEO work (checked, protected)
- **New `/api/catalog` route**: statically prerendered, has its own
  `Cache-Control` headers, and is not linked from the sitemap or given its
  own `<title>`/metadata — it's a data endpoint, not a page competing for
  any keyword. No canonical/hreflang implications (JSON responses don't
  carry HTML metadata).
- **`/stacks/builder` metadata**: unchanged (stayed static — see
  `DATA_QUALITY_AUDIT.md` §3 for why the considered noindex-on-query-param
  change was declined in favor of keeping static prerendering).
- **New badges/copy in the calculators**: cosmetic/informational only (no
  title/H1/meta change on `/calculadora-costes` or `/calculadora-ahorro`) —
  those two pages weren't part of either SEO batch and nothing here changes
  their indexability or targeting.
- **Comparison-page `tool.notes` rendering** (added during Batch 2 SEO work,
  not this task): still in effect, unrelated to this CRO pass.

## Candidate next SEO moves (not started — flagged for a future iteration)
1. Continue down the original Search Console export past the top 30 URLs,
   same process (SERP research → surgical change → changelog entry).
2. Revisit Batch 1 once its 14–28 day window closes to check actual
   position/CTR movement before deciding whether to iterate further on
   those 10 pages or move on.
3. Decide whether `/api/catalog` warrants its own lightweight landing page
   (e.g., `/api` or `/developers`) describing what it is and how to use it
   — currently it's footer-linked but has no human-readable documentation
   page. Only worth building if the dataset gets real external usage
   first (see LINK_ACQUISITION.md) — avoid building a docs page for an
   audience of zero.
4. If the Headscale internal-linking gap (documented in `SEO_CHANGELOG.md`
   Batch 2 — no other catalog tool replaces "Tailscale", so it has no
   auto-generated comparison page) is still unresolved, consider whether a
   genuinely distinct self-hosted mesh-VPN tool belongs in the catalog
   rather than forcing an artificial comparison.
