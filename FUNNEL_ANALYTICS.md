# Funnel Analytics

Instrumentation reference for AltFreeStack's product funnel (CRO/monetization
implementation, 2026-10-01). All events use the existing `trackReplaceEvent()`
abstraction in `src/lib/analytics.ts`, backed by `@vercel/analytics` (already
mounted in both locale layouts — no new provider added). No PII is ever sent:
only slugs, counts, provider ids, and `placement` strings.

## North Star Metric

**Qualified Stack Actions / 1,000 organic visitors**

A Qualified Stack Action is any of: `tool_add_to_stack`, `stack_created`,
`calculator_completed` (destination `stack_builder`), `hosting_view`,
`stack_shared`. Computed as:

```
(count of events in {tool_add_to_stack, stack_created, hosting_view, stack_shared}
 from sessions whose first touch was organic search)
 / (organic visitor sessions / 1000)
```

This repo doesn't run its own analytics warehouse — the computation above is
meant to be run against the Vercel Analytics export (or whatever BI tool
consumes it) once enough volume exists, not inside this codebase. What this
task delivers is the instrumentation, not a dashboard (per the PRD: "No
necesitamos un dashboard complejo si la infraestructura actual no lo
permite... pero la instrumentación debe quedar preparada").

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
| `stack_created` | `toolCount` | Replace wizard completion; **now also** Stack Builder "new project" | yes (extended) |
| `compose_downloaded` | `toolCount` | Stack Builder "Download" button | yes |
| `calculator_used` | `calculator: "cost" \| "savings"` | Calculator mount (= "started") | yes |
| `hosting_click` | `provider`, `placement?` | `AffiliateLink` click (= the affiliate-click signal) | yes (now carries `placement`) |
| `tool_add_to_stack` | `toolSlug`, `placement` | `AddToStackButton` (any surface) | **new** |
| `stack_shared` | `toolCount` | Stack Builder "Share" button | **new** |
| `stack_import_viewed` | `toolCount` | Shared-stack `?tools=` preview banner shown | **new** |
| `stack_import_saved` | `toolCount` | Shared-stack preview → "Save to my stack" | **new** |
| `hosting_view` | `providers` (comma-joined ids), `placement` | `HostingTierRecommendation` mount, any surface | **new** |
| `deploy_click` | `placement`, `toolCount` | 1-Command Deploy copy button | **new** |
| `copy_docker_compose` | `placement`, `toolCount` | `DockerComposeBlock` / Stack Builder compose copy | **new** |
| `calculator_completed` | `calculator`, `destination: "stack_builder" \| "saas_exit" \| "alternative"` | Calculator's own destination CTA click | **new** |
| `search_submit` | `resultCount`, `placement` | Home hero search (Enter or picking a result) | **new** |

`AnalyticsPlacement` values currently in use: `home`, `tool_page`,
`tool_card`, `stack_builder`, `stack_builder_search`, `stack_result`,
`curated_stack`, `hosting_comparison` *(reserved, not yet rendered anywhere —
see Not Implemented)*, `cost_calculator`, `savings_calculator`, `saas_exit`,
`deployment_guide` *(reserved, see Not Implemented)*.

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
