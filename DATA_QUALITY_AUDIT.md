# Data Quality Audit

Scope: `src/data/hosting-providers.ts`, `src/data/saas-pricing.ts`, and the
`/stacks/builder` noindex decision — the surfaces this CRO/monetization task
actually touches or depends on for accuracy. This is not a re-audit of the
~196-tool catalog itself (`tools.ts`'s own license/Docker/RAM data already
has its own established audit trail from prior sessions — see
`SEO_CHANGELOG.md` for the Vendure/Vikunja findings from that line of work).

## Findings

### 1. Vultr is missing `lastVerified` (real gap, not fixed)
`HostingProvider.lastVerified` exists specifically so a stale "starting
price" is visible and revisitable (its own code comment cites the
DigitalOcean "$200/60 days" → "$5/90 days" drift that slipped through
unnoticed before the field existed). DigitalOcean and Railway both carry
`lastVerified: "2026-09-30"`; **Vultr has no `lastVerified` field at all.**

- **Not fixed in this task**: setting `lastVerified` requires actually
  re-checking Vultr's current public pricing page against our copy
  (`startingPrice: "desde $6/mes"`, tier ladder `$6/$12/$24/$48` for
  1/2/4/8GB) — this task's hard rule is "no inventes... si falta un dato,
  no lo inventes," and silently back-dating a `lastVerified` stamp without
  actually re-verifying would be exactly that kind of fabrication, just
  inverted (fabricating confidence instead of fabricating a number).
- **Recommendation**: next maintenance pass, actually open vultr.com/pricing,
  confirm the 4 tier prices and the "$6/mes" starting price are still
  accurate, then set `lastVerified` to that real date.

### 2. `SaasPricingEntry` has no `lastVerified` field at all (systemic gap)
Unlike `HostingProvider`, the `saas-pricing.ts` interface never got a
verification-date field — all 18 entries (Notion, Slack, Airtable,
Salesforce, HubSpot, Zendesk, Calendly, Intercom, 1Password, Jira, Trello,
Asana, Zapier, Mailchimp, + others) carry only a `billingNote` string like
"Plan Business, facturado anual" with no date attached.

- **Not fixed in this task**: adding the field is a one-line type change,
  but it would be dishonest to add `lastVerified` to 18 entries without
  individually re-confirming 18 live SaaS pricing pages — real work this
  task didn't do (the task's actual focus was the funnel/analytics layer,
  not re-auditing SaaS pricing). Flagging the schema gap here instead of
  bolting on fake dates.
- **Mitigation already in place, unaffected by this gap**: both calculators'
  disclaimers already tell the user to verify the current price on the
  SaaS's own site ("verifica el precio vigente en la web oficial de
  {saasName}") — so the *absence* of a verification-date field doesn't
  currently mislead anyone; it's a maintainability gap (we don't know
  which of the 18 are stale), not a live accuracy bug.
- **Recommendation**: add `lastVerified?: string` to `SaasPricingEntry`
  (mirroring `HostingTier`) in a future pass, and re-verify the entries most
  exposed by this task's new badges (`verifiedBadge` now visibly labels
  these numbers "Precio de lista"/"List price" in the savings calculator —
  see CRO_EXPERIMENTS.md EXP-005). Prioritize the SaaS names that appear in
  Batch 1/2 SEO pages (Notion, 1Password, Zendesk) since those pages already
  get more traffic.

### 3. `/stacks/builder?tools=...` noindex — considered, declined, documented
The PRD requires user-generated stack URLs to be noindex by default. The
canonical on `/stacks/builder` already points to the clean URL regardless of
query string, which is the de facto protection Google respects. Making this
explicit via `robots: noindex` would require reading `searchParams` inside
`generateMetadata`, which converts the page from statically prerendered
(`○`) to server-rendered-per-request (`ƒ`) — confirmed by a real build
(`npm run build`) before and after. Declined: the marginal safety gain over
the existing canonical-based protection doesn't justify losing static
prerendering on a page that's otherwise fully static. See the inline comment
in both `(es)/stacks/builder/page.tsx` and `(en)/en/stacks/builder/page.tsx`.

### 4. Things checked and found OK (no action needed)
- **Affiliate URLs** (`src/lib/site-config.ts`): all three
  (DigitalOcean/Vultr/Railway) are real referral-coded URLs, not placeholder
  strings, and are env-var-overridable in production.
- **MinIO's Docker-availability warning**: already correctly flagged
  (`dockerStatus: "ARCHIVED_UPSTREAM"` + a detailed `notes` string about the
  unpatched CVE and the pulled Docker Hub image) from a prior SEO session —
  and as of this task, that warning now also surfaces on any *comparison*
  page MinIO appears on, not just its own tool page (see the `tool.notes`
  rendering added to `comparison-page-content.tsx` in the Batch 2 SEO work —
  unrelated to this CRO task but relevant context for anyone reading this
  audit).
- **`/api/catalog` new dataset accuracy**: every field it serves is computed
  by calling the exact same functions (`resolveToolResourceProfile`,
  `auditToolDeployment`) that already render the public tool page — verified
  by running the built server and diffing the JSON output's `minRamMb`/
  `license`/`deploymentState` for a sample tool against its own `/tool/
  {slug}` page. No separate, driftable copy of this data was created.

## Not audited in this pass (out of scope, flagged for a future task)
- The ~196-tool catalog's own license/Docker/feature accuracy — already has
  its own audit trail from the SEO sessions (`SEO_CHANGELOG.md`).
- Hosting provider *tier* prices beyond the starting price (only the
  starting-price staleness mechanism was reviewed, not every tier number
  independently re-verified against live provider pricing pages).
