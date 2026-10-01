# Funnel Analytics

Instrumentation reference for AltFreeStack's product funnel (CRO/monetization
implementation, 2026-10-01). All events use the existing `trackReplaceEvent()`
abstraction in `src/lib/analytics.ts`, backed by `@vercel/analytics` (already
mounted in both locale layouts — no new provider added). No PII is ever sent:
only slugs, counts, provider ids, and `placement` strings.

## North Star Metric — revised 2026-10-01

**The previous version of this section was mathematically wrong** and has
been replaced. It defined the metric as a *sum of raw event counts*
(`tool_add_to_stack` + `stack_created` + `hosting_view` + `stack_shared`)
divided by visitor count — but a single visitor can fire several of those
events in one session (e.g., add 4 tools to a stack = 4
`tool_add_to_stack` events from 1 person), so the numerator silently counted
the same visitor multiple times. That's a volume metric, not a per-visitor
rate, and labeling it "per 1,000 visitors" implied a conversion percentage
it didn't actually measure.

### The conceptual definition we're keeping

> **High-intent stack visitor** = a visitor who, during a session, performs
> at least one high-intent action related to building/deploying a stack.

A visitor who adds 5 tools counts once, not 5 times — that's the whole point
of fixing this.

### The qualifying event set ("High-Intent Stack Action")

`tool_add_to_stack`, `stack_created` (either `placement`), `stack_shared`,
`stack_import_saved`, `calculator_completed` (destination `stack_builder`),
`deploy_click`, `copy_docker_compose`.

**`hosting_view` was deliberately excluded from this set.** Viewing a
hosting recommendation is exposure, not an action the PRD's own definition
asks for ("realiza... una acción") — it belongs in the funnel as a
mid-funnel checkpoint, not as a qualifying action in the North Star.

### The honest limitation — and what we checked before concluding that

**This codebase cannot currently compute "visitors" or "sessions" as a
de-duplicated unit at all.** `trackReplaceEvent()` sends named events with
small properties (slugs, counts, placement) — it does not attach any
anonymous visitor/session identifier, and none exists anywhere else in this
codebase to borrow (the Stack Builder's `localStorage` key stores stack
*contents*, not an analytics identity).

Before concluding this is unfixable without new instrumentation, this
revision explicitly checked whether the analytics infrastructure *already
mounted* (`@vercel/analytics`) can do this for us, since Vercel Web
Analytics' own "Visitors" count for standard page views is itself already a
de-duplicated, cookieless metric computed by the platform (a hashed,
rotating identifier derived from IP + user agent — not something this
code implements or has access to). The open question was whether that same
platform-level deduplication also applies to the custom events we send via
`track()` — i.e., whether the Vercel Analytics dashboard can already show
"N unique visitors fired `stack_created`" (not just "fired N times"), or
let an event be marked as a goal/conversion with a conversion rate.

**We could not verify this with certainty in this session**: confirming it
means reading Vercel's own product documentation and/or the project's live
Analytics dashboard, and this sandboxed environment's network egress policy
blocks `vercel.com` (the same restriction that blocked verifying Vultr's
current pricing in a prior pass — see `DATA_QUALITY_AUDIT.md`). We are not
guessing at an answer. What's certain either way, independent of what the
dashboard UI supports:

- This codebase has no analytics API integration or data export — whatever
  Vercel's dashboard can or can't show, our own code/scripts never see the
  raw per-visitor event data back, so we could never recompute or verify
  this number ourselves regardless.
- We are **not** adding an anonymous UUID/localStorage identifier to work
  around this. That was considered and explicitly rejected: it would mean
  building a parallel, home-grown visitor-identity system next to a
  platform that may already solve this natively, before even checking
  whether the existing infrastructure already provides it.

**Action for whoever has access to the project's live Vercel dashboard**:
open Analytics → Events for one of the qualifying events (e.g.
`stack_created`) and check whether it reports a visitors count (not just an
event count) or supports being marked as a conversion goal. If yes, the
North Star Metric is already computable today, through the dashboard, with
zero code changes — the events are already being sent correctly. If no,
the limitation below stands and the three metrics in the next section are
what's reliably available.

### What we CAN compute reliably, today, with zero new instrumentation

1. **High-Intent Action Volume** — the raw count of events in the
   qualifying set above, over any period. A real, trendable number: if it
   goes up week over week, more of this behavior is happening. It does
   **not** tell you how many distinct people that represents.
2. **Funnel stage ratios** — e.g. `hosting_click` ÷ `hosting_view` (now a
   real viewport-based impression — see below) as a click-through rate on
   the hosting recommendation; `stack_import_saved` ÷ `stack_import_viewed`
   as a shared-stack adoption rate. These are valid because both sides of
   each ratio are counting the same kind of unit (events), not mixing
   events against visitors.
3. **High-Intent Action Intensity** (optional, approximate) — High-Intent
   Action Volume ÷ total Visitors for the same period, read directly off
   the Vercel Analytics dashboard (a real number, not computed by this
   code). This is a traffic-normalized intensity figure, explicitly **not**
   a "% of visitors who converted" — document it that way wherever it's
   reported, since the numerator can include multiple events per visitor
   while the denominator counts each visitor once.

## Full event taxonomy (`src/lib/analytics.ts`)

| Event | Properties | Fired from | Pre-existing? |
|---|---|---|---|
| `replace_started` | — | Replace wizard step 1 | yes |
| `saas_selected` | `saasSlug` | Replace wizard step 1 | yes |
| `alternative_selected` | `saasSlug`, `toolSlug` | Replace wizard step 2 (`ReplaceEntryCard`) | yes |
| `tool_view` | `toolSlug` | Tool page mount (`ViewTracker`) | yes |
| `alternative_view` | `saasSlug` | Alternative hub page mount | yes |
| `replace_view` | `saasSlug` | Replace-guide page mount | yes |
| `stack_builder_opened` | — | Stack Builder page mount | yes |
| `hero_cta_click` | `cta: "build_stack" \| "explore_alternatives"` | Home hero | yes |
| `stack_created` | `toolCount`, `placement: "replace_wizard" \| "stack_builder"` | Replace wizard completion; Stack Builder "new project" | yes (now disambiguated — see below) |
| `compose_downloaded` | `toolCount` | Stack Builder "Download" button | yes |
| `calculator_used` | `calculator: "cost" \| "savings"` | Calculator mount (= "started") | yes |
| `hosting_click` | `provider`, `placement?` | `AffiliateLink` click (= the affiliate-click signal) | yes (now carries `placement`) |
| `tool_add_to_stack` | `toolSlug`, `placement` | `AddToStackButton` (any surface) | **new** |
| `stack_shared` | `toolCount` | Stack Builder "Share" button | **new** |
| `stack_import_viewed` | `toolCount` | Shared-stack `?tools=` preview banner shown | **new** |
| `stack_import_saved` | `toolCount` | Shared-stack preview → "Save to my stack" | **new** |
| `hosting_view` | `providers` (comma-joined ids), `placement` | `HostingTierRecommendation`, **real viewport entry** (IntersectionObserver, threshold 0.4) — not mount | yes (semantics corrected — see below) |
| `deploy_click` | `placement`, `toolCount` | 1-Command Deploy copy button | **new** |
| `copy_docker_compose` | `placement`, `toolCount` | `DockerComposeBlock` / Stack Builder compose copy | **new** |
| `calculator_completed` | `calculator`, `destination: "stack_builder" \| "saas_exit" \| "alternative"` | Calculator's own destination CTA click | **new** |
| `search_submit` | `resultCount`, `placement` | Home hero search (Enter or picking a result) | **new** |

`AnalyticsPlacement` values currently in use: `home`, `tool_page`,
`tool_card`, `stack_builder`, `stack_builder_search`, `stack_result`,
`curated_stack`, `hosting_comparison` *(reserved, not yet rendered anywhere —
see Not Implemented)*, `cost_calculator`, `savings_calculator`, `saas_exit`,
`deployment_guide` *(reserved, see Not Implemented)*, `replace_wizard` *(new
— see below)*.

## Corrections made in this iteration (2026-10-01)

A funnel-analytics review (no new architecture, pure correctness pass)
found two real issues in the previous implementation:

1. **`hosting_view` fired on mount, not on real exposure.** It lived inside
   `HostingTierRecommendation`, rendered in a sidebar (tool pages, Stack
   Builder result) that's often below the fold — on mobile, sidebars in
   this layout stack *after* the main content, so the event fired the
   instant the page loaded, long before any user had scrolled anywhere near
   it. Fixed by giving `ViewTracker` an opt-in `viewport` mode
   (IntersectionObserver, threshold 0.4 — same pattern and threshold
   already used by `animated-counter.tsx`, no new library) that only fires
   once the element genuinely enters the viewport. The other three
   `ViewTracker` usages (`tool_view`, `alternative_view`, `replace_view`)
   were deliberately left on the default mount-based path — those
   legitimately represent "this page loaded in a real browser," the
   standard pageview concept, not "did the user scroll to see this."
   `hosting_view` keeps its name (a "view" that only fires on real viewport
   entry is now an accurate use of the word — no rename needed).
2. **`stack_created` conflated two unrelated actions.** It fired both when
   someone finished the SaaS-replacement wizard (`toolCount` = however many
   tools they picked) and when someone clicked "new project" inside Stack
   Builder (`toolCount` hardcoded to `0`, since a new project starts
   empty) — with no property to tell the two apart downstream. Fixed by
   adding a required `placement: "replace_wizard" | "stack_builder"` to the
   event.

Everything else in the 10 funnel events explicitly reviewed this iteration
(`tool_add_to_stack`, `hosting_view`, `stack_created`, `stack_shared`,
`stack_import_viewed`, `stack_import_saved`, `copy_docker_compose`,
`deploy_click`, `search_submit`, `calculator_completed`) was checked for
duplicate/double firing, locale-independence (none of these components read
or branch on `locale` before tracking — ES/EN/zh all go through the exact
same `trackReplaceEvent()` call), and PII — all already correct, left
untouched. See the "North Star Metric" section above for the third,
larger correction (the metric's math itself).

## Funnel 1 — Discover → Build → Deploy

```
organic_visitor
  → tool_view
  → tool_add_to_stack
  → stack_created
  → hosting_view
  → hosting_click   (= affiliate click)
  → deploy_click
```

## Funnel 2 — Calculate → Build

```
organic_visitor
  → calculator_used          (started)
  → calculator_completed      (destination=stack_builder)
  → stack_created / tool_add_to_stack
  → hosting_view
  → hosting_click
```

## Funnel 3 — Share → Rebuild

```
organic_visitor
  → stack_import_viewed  (arrived via a shared stack URL)
  → stack_import_saved   (adopted it as their own stack)
  → hosting_view
  → hosting_click
```

## What was NOT implemented, and why

- **A raw `search` (per-keystroke) event**: the PRD's Phase 14 list named
  both `search` and `search_submit`. Tracking every keystroke would be noise,
  not signal, and adds JS execution on every keypress for no analytical
  value beyond what `search_submit`'s `resultCount` already gives — decided
  against per Phase 33 ("no añadir JS innecesario"). `search_submit` fires
  once per completed search (Enter, or picking a result), which is the
  actionable signal.
- **`email_capture_started` / `email_capture_completed` event types**: not
  added to `analytics.ts` at all, because there is no email capture UI (see
  CRO_EXPERIMENTS.md — P2, not built: no email-sending backend exists in this
  repo to receive the submission safely). Adding unused event types for a
  feature that doesn't exist would be dead code.
- **`guide_started` / `guide_completed`** for `HowToDeployGuide`: the PRD
  listed these, but `HowToDeployGuide` is a tabbed how-to reference the user
  dips in and out of (VPS/Coolify/1-Click tabs) with no single linear
  start→finish — there's no reliable "completed" moment to instrument
  without inventing one. Decided not to force a fake completion signal onto
  a component that isn't actually linear. `deployment_guide` stays as a
  reserved `AnalyticsPlacement` value for if this changes.
- **A `hosting_comparison` surface**: reserved in the `AnalyticsPlacement`
  union for symmetry with the PRD's Phase 15 placement list, but nothing in
  the current site renders hosting providers as a dedicated
  comparison-first page (the `/hosting-deals` page already exists and uses
  its own layout) — wiring a placement string to a page that doesn't call
  `HostingTierRecommendation` would be unused. Left as a reserved value, not
  wired to a fabricated usage.
- **Device dimension on `affiliate_click`**: Phase 14 asked for "device
  cuando el sistema actual lo soporte." `@vercel/analytics` already captures
  device/browser at the platform level (visible in the Vercel Analytics
  dashboard itself) — duplicating that into our own event properties would
  be redundant, not missing instrumentation.
