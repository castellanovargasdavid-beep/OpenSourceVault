# CRO Experiments Log

Every CRO-motivated change gets an entry here, per the PRD's Phase 30/31
requirement to keep SEO and CRO experiments separately attributable. None of
these touch the 30 URLs already covered by `SEO_CHANGELOG.md` (Batch 1/2) —
this log is instrumentation and funnel/conversion surfaces only.

Format: `experiment_id | hypothesis | metric | baseline | change | start_date
| expected_impact | rollback_condition`.

---

### EXP-001 — Instrument the add-to-stack action everywhere it's possible
- **Hypothesis**: `tool_add_to_stack` (the core North Star action) was
  completely untracked — `AddToStackButton`'s `onAdd` callback existed but
  was never wired at any of its 4 call sites. Without this, "Qualified Stack
  Actions" can't be measured at all.
- **Metric**: `tool_add_to_stack` event volume (new metric, no prior data).
- **Baseline**: 0 events (untracked).
- **Change**: `AddToStackButton` now fires `tool_add_to_stack` internally
  using a required `placement` prop, since several call sites are Server
  Components that can't pass an event-handler prop across the RSC boundary.
- **Start date**: 2026-10-01.
- **Expected impact**: Establishes the baseline for the North Star Metric —
  no behavior change for users, pure instrumentation.
- **Rollback condition**: None needed (additive, no UI change). If event
  volume looks implausibly high/low vs. manual QA clicks, re-check the
  `inStack` guard in `add-to-stack-button.tsx` (it should fire only on
  false→true transitions, never on removal).

### EXP-002 — Enrich affiliate-click tracking with placement context
- **Hypothesis**: `hosting_click` already existed but couldn't distinguish
  *where* the click came from (tool page sidebar vs. Stack Builder result vs.
  cost calculator) — Phase 15/18 of the PRD explicitly asks for this.
- **Metric**: `hosting_click` events broken out by `placement`.
- **Baseline**: `hosting_click` with only `provider`, no placement.
- **Change**: `AffiliateLink` and `HostingTierRecommendation` now thread an
  optional/required `placement` through to the event. Also added a paired
  `hosting_view` impression event so click-through-rate per surface becomes
  computable (`hosting_click` / `hosting_view` by placement).
- **Start date**: 2026-10-01.
- **Expected impact**: Enables per-surface affiliate CTR comparison (e.g., is
  the Stack Builder's hosting recommendation converting better than the cost
  calculator's?) to prioritize future placement work.
- **Rollback condition**: None — additive properties, existing `hosting_click`
  consumers unaffected (new fields are optional).

### EXP-003 — Track the full Stack Builder lifecycle (create/share/import)
- **Hypothesis**: `stack_created` only fired in the unrelated SaaS-Replace
  wizard, never when a user actually creates a new project inside the Stack
  Builder itself; `handleShare`/`handleSaveShared` (both already-shipped
  features) fired no event at all.
- **Metric**: `stack_created`, `stack_shared`, `stack_import_viewed`,
  `stack_import_saved` event volume.
- **Baseline**: 0 events for all four in the Stack Builder context.
- **Change**: Wired all four at their existing call sites in
  `stack-builder-content.tsx` — no new UI, the features (multi-project, share
  link, import-shared-stack banner) already existed and worked.
- **Start date**: 2026-10-01.
- **Expected impact**: Makes Funnel 3 (Share → Rebuild) measurable for the
  first time; lets us see whether shared stacks actually get adopted
  (`stack_import_saved` / `stack_import_viewed` ratio) or just viewed once.
- **Rollback condition**: None — additive.

### EXP-004 — Track deploy/copy actions (1-Command Deploy, docker-compose copy)
- **Hypothesis**: The two concrete "I'm about to deploy this" actions
  (copying the 1-command deploy script, copying a docker-compose.yml) were
  unmeasured, so we couldn't see deployment intent from the data at all.
- **Metric**: `deploy_click`, `copy_docker_compose` by `placement`.
- **Baseline**: 0 events.
- **Change**: `OneCommandDeployBlock` and `DockerComposeBlock` now accept a
  `placement`/`toolCount` and fire on their existing copy handlers (the copy
  action itself — behavior unchanged, no new button).
- **Start date**: 2026-10-01.
- **Expected impact**: Completes Funnel 1 (Discover → Build → Deploy) end to
  end; lets us see the real `hosting_view → deploy_click` conversion rate per
  surface (tool page vs. Stack Builder vs. curated stack).
- **Rollback condition**: None — additive, fires inside an existing
  try/catch so a tracking failure never blocks the actual copy.

### EXP-005 — Calculator completion + explicit Estimate/Verified/Your-input badges
- **Hypothesis**: Both calculators already had excellent disclaimer prose
  (what's included/excluded, "no inventamos" caveats), but the PRD's
  acceptance criterion ("Calculator diferencia verified/estimate/user
  input") asks for an at-a-glance visual distinction, not just a paragraph a
  user has to read. Also, neither calculator tracked whether someone actually
  acted on the result (`calculator_used` only fires on mount = "started").
- **Metric**: `calculator_completed` by `destination`; qualitative — does
  the explicit badge reduce "is this a real quote?" confusion (no way to
  measure this quantitatively without a support/feedback channel, which
  doesn't exist in this repo — noted as a limitation, not fabricated).
- **Baseline**: No completion signal; no visible verified/estimate badges
  (distinction existed only in prose).
- **Change**: Added small inline badges — "Estimado"/"Estimate" next to the
  self-hosted VPS figure (sourced from `hostingProviders[].monthlyUsdApprox`,
  a list price, not a live quote), "Precio de lista"/"List price" next to
  the SaaS annual cost in the savings calculator (sourced from
  `saasPricing`, our own verified entries), and "Tu dato"/"Your input" next
  to the user-editable SaaS-per-seat field in the cost calculator. Also
  fires `calculator_completed` on each destination CTA (Stack Builder,
  SaaS Exit, alternative page).
- **Start date**: 2026-10-01.
- **Expected impact**: Lower bounce/confusion on the result card; a
  measurable calculator→Stack-Builder conversion rate for the first time.
- **Rollback condition**: Purely visual + additive event; revert if the
  badges visually crowd the result cards on small mobile widths (not
  observed in the build inspection done for this task, but worth a real
  device check before the next CRO iteration touches this surface).

### EXP-006 — Public catalog dataset as a linkable asset (`/api/catalog`)
- **Hypothesis**: Per COMPETITOR_GAP.md, neither OpenAlternative nor LibHunt
  publish a first-party structured dataset of resource/RAM/Docker-readiness
  data — this is unclaimed differentiation that AltFreeStack can occupy
  using only data it already audits and publishes per-tool.
- **Metric**: Not a conversion metric — a linkability/authority metric
  (referring domains to `/api/catalog`, external citations). Out of scope to
  measure inside this repo; tracked manually via normal backlink monitoring.
- **Baseline**: No public dataset existed.
- **Change**: New `GET /api/catalog` route (see `src/app/api/catalog/
  route.ts`) serving a JSON array of every published tool's id/slug/name/
  category/license/fossModel/RAM profile/Docker-readiness/deployment-
  verification-state/URLs — every field re-derived from the exact same
  functions (`resolveToolResourceProfile`, `auditToolDeployment`) that
  already render on the public tool page, so it can never silently drift
  from what a human sees. Linked from the footer on both locales (and the
  zh footer) as "Catalog dataset (JSON)" / "Dataset del catálogo (JSON)".
- **Start date**: 2026-10-01.
- **Expected impact**: A plausible, legitimate inclusion target for
  "resource" sections of awesome-list-style repos (see LINK_ACQUISITION.md)
  and homelab-community sharing — genuinely useful, not SEO-bait, since it's
  just machine-readable mirrors of already-public data.
- **Rollback condition**: None — read-only, no user data, cacheable
  (`revalidate: 86400`), statically prerendered (confirmed `○` in the build
  output, not a per-request dynamic route).

---

## Decided NOT to run as an experiment (and why)

- **Hero copy A/B test**: the PRD's suggested new H1 ("Encuentra
  alternativas... Calcula cuánto ahorras... Construye tu stack") largely
  restates what the hero already says since the Task 3 "Stack Builder as
  flagship product" redesign (H1 already rotates Discover→Compare→Build→
  Deploy with Stack Builder as the primary CTA). Rewriting it again without
  a stated reason would violate the PRD's own "no rediseño arbitrario, mejora
  jerarquía" instruction and would muddy attribution for the Task 3 change,
  which hasn't had time to show results yet.
- **Sticky mobile CTA**: Phase 19 allowed it only if it "aporta valor, no
  tapa contenido, no genera CLS, no es intrusivo." No existing sticky-CTA
  component exists to extend, and building one from scratch for every tool
  page without a measured mobile-abandonment problem to justify it would be
  exactly the "overbuilding" Phase 36 warns against — deferred to NEXT 5
  PRIORITIES for a future, measurement-led iteration.
