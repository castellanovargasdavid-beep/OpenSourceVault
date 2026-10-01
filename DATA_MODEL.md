# Data model

The whole catalog is versioned TypeScript, not a database: every tool is one object
literal in [`src/data/tools.ts`](src/data/tools.ts) (English copy for the same `id`
lives in [`src/data/tools.en.ts`](src/data/tools.en.ts)), typed against
[`src/lib/types.ts`](src/lib/types.ts). This file documents that schema — read it
before editing `tools.ts` by hand, or before running
[`npm run validate:data`](#running-npm-run-validatedata) against a change.

## `OpenSourceTool`

| Field | Type | Required? | Notes |
|---|---|---|---|
| `id` | `string` | yes | Unique across the whole catalog. By convention equal to `slug`, but a couple of legacy entries differ (e.g. `id: "dub-co"` / `slug: "dub"`) — code always uses whichever of the two it actually needs, never assumes they match. |
| `name` | `string` | yes | Display name. |
| `slug` | `string` | yes | Unique across the whole catalog. Used in every `/tool/{slug}` URL — **never change an existing slug**, it's a live, indexed URL. |
| `replaces` | `string[]` | yes | The SaaS product(s) this tool substitutes, e.g. `["Notion", "Slite"]`. Drives `/alternativas/{saas}`, the `ToolExplorer` search (matches on this field too, not just `name`), and `buildSaasExitCatalog()`. |
| `category` | [`ToolCategory`](#toolcategory) | yes | One enum value. |
| `description` / `shortDescription` | `string` | yes | Long-form and card-length copy. |
| `websiteUrl` / `githubUrl` | `string` | yes | Must be real http(s) URLs — `validate:data` checks this. |
| `demoUrl` | `string` | no | Public demo requiring no signup, if the project has one. |
| `starsCount` | `number` | no | A real GitHub star count *as observed once*, used as a fallback when the live GitHub API call (`getGithubStats()`) fails or isn't configured. Never inflate this by hand. |
| `license` | `string` | yes | The *actual* license text, e.g. `"MIT"`, `"AGPL-3.0"`, `"Sustainable Use License (Fair-code)"` — not a generic "open source". This is prose for display; [`fossModel`](#fossmodel-taxonomy) is the machine-readable classification of what it means. |
| `dockerCompose` | `string` | yes | The real deployment snippet. Usually a `docker-compose.yml`; for tools without one, the project's own install script (`curl \| bash`, etc.) with a comment explaining what it does — see [`/contribuir`](src/app/(es)/contribuir/page.tsx) for the full expectations here. |
| `oneClickDeploy` | `{ platform, url }[]` | no | Only for platforms with a verifiable official 1-click template (Railway/Coolify/Render/Elestio/Portainer). |
| `features` / `techStack` / `pros` / `cons` | `string[]` | yes | `cons` should never be empty — a tool with no listed drawback reads as unreviewed, not as perfect. |
| `tags` | [`ToolTag[]`](#toolTag) | yes | Can be `[]`. |
| `database` | `string` | no | e.g. `"PostgreSQL"`, `"SQLite"`, `"None / File-based"`. |
| `language` | `string` | no | Primary backend/core language, e.g. `"Go"`, `"TypeScript (Node.js)"`. |
| `platforms` | `string[]` | no | Where it runs/is used, e.g. `["Web", "Desktop (Mac/Win/Linux)"]`. |
| `fossModel` | [`FossModel`](#fossmodel-taxonomy) | **required by `validate:data`**, optional in the TS type | See below — the type keeps it optional so the build never broke while the whole catalog was being audited for it; `validate:data` now enforces it as a hard requirement for every entry. |
| `dockerStatus` | [`DockerImageStatus`](#dockerstatus) | no | Absent = not audited yet. Never set `VERIFIED_PINNED` without having actually checked the tag exists on the real registry. |
| `difficulty` | [`ToolDifficulty`](#estimated-vs-verified-ram-isestimated) | no | Manual override — see the RAM section below. |
| `minRamMb` | `number` | no | Manual override, in MB — see the RAM section below. |
| `featured` | `boolean` | no | Editorial curation flag, used as the primary tie-break in a few "pick the best alternative" helpers (`sortAlternativeTools`, `buildSaasExitCatalog`) — real stars are the secondary tie-break, nothing is a subjective ranking beyond this one flag. |
| `sponsored` | `boolean` | no | Not used by any entry yet — reserved for when a real sponsorship exists. |
| `status` | `ToolStatus` (`"published" \| "coming_soon" \| "scheduled"`) | no | Absent = published. `"scheduled"` requires `publishDate`. See `isPublished()` in `types.ts` — a static site only reflects a passed `publishDate` once a *new build* runs on or after that date, not in real time. |
| `publishDate` | `string` (ISO 8601) | conditionally | Required when `status === "scheduled"`. |

### `ToolCategory`

```
Productivity | Analytics | DevTools | CRM | AI | Storage | Ecommerce |
VideoConferencing | PasswordManagers | AuthIdentity | CloudPaas |
MonitoringLogs | MarketingForms | SmartHome | MediaAutomation | PersonalFinance
```

### `ToolTag`

```
docker-ready | 1-click-deploy | permissive-license
```

## `fossModel` taxonomy

Four values, chosen to avoid the single most common false claim in this space —
calling something "open source" when the license doesn't actually say that:

| Value | Meaning | License is OSI? | Any usage limit self-hosted? |
|---|---|---|---|
| `FOSS` | 100% free software. | Yes | No |
| `OpenCore` | Core is real OSI-licensed FOSS, but some features/tiers are paid add-ons. | Yes (for the core) | No (core), yes (paid tier) |
| `FairCode` | Code is public, no usage limits self-hosting it — but the license (e.g. n8n's Sustainable Use License) bans reselling it or offering it as your own paid SaaS. | No | No |
| `SourceAvailable` | Code is public and free to self-host, under a different non-OSI license (Elastic License, BSL, SSPL...) with its own conditions beyond the resale ban. | No | Depends on the license |

**Never** classify a tool as `FOSS` or `OpenCore` just because the code is public —
check whether the actual license is OSI-approved. `FairCode` and `SourceAvailable`
exist specifically so a non-OSI license never gets rounded up to "basically FOSS."

## `dockerStatus`

Tracks the *deployability* of what's in `dockerCompose`, verified by hand against
the real registry (Docker Hub / GHCR / Quay) — never inferred, never set
speculatively:

| Value | Meaning |
|---|---|
| `VERIFIED_PINNED` | The image is pinned to a specific, versioned tag that was confirmed to exist on the real registry at verification time (not `:latest`). |
| `LATEST_ONLY` | The upstream project genuinely only publishes/recommends `:latest` or a rolling tag — no stable versioned tag exists to pin to. |
| `ARCHIVED_UPSTREAM` | The image's own repository was archived or marked deprecated/"do not use" on its origin registry. |
| `LEGACY_IMAGE` | The project moved its official image to a different registry/repo; this one still works (usually for older major versions) but isn't the recommended path for a new install. |

`ARCHIVED_UPSTREAM` and `LEGACY_IMAGE` trigger an amber warning banner above the
deploy block on that tool's page (`tool-page-content.tsx`) — see
`dockerStatusArchivedWarning` / `dockerStatusLegacyWarning` in the i18n dictionaries.

Absent `dockerStatus` means **not audited yet**, not "confirmed fine." As of this
file's writing, 164 of the catalog's 306 declared images are still on `:latest`
and unaudited — auditing them (in batches, verifying the real current tag per
project rather than guessing) is tracked as ongoing work, not something to bulk-fix
speculatively.

## Estimated vs. verified RAM (`isEstimated`)

`minRamMb` and `difficulty` on `OpenSourceTool` are **manual overrides**. When a
tool omits them, `resolveToolResourceProfile()` (`src/lib/tool-difficulty.ts`)
infers both by counting services in `dockerCompose` and checking the `database`
field — a heuristic, not a measurement.

Every place that surfaces RAM to a reader (`ToolCardData`, `AlternativeTableRow`,
Stack Builder) carries an `isEstimated: boolean` alongside the number:

- `isEstimated: false` — the catalog entry set `difficulty`/`minRamMb` by hand.
- `isEstimated: true` — heuristic fallback.

`formatMinRam(minRamMb, isEstimated)` prefixes the estimated case with `~` (e.g.
`~512MB`), and every RAM badge in the UI passes that flag through so a reader can
tell a verified number from a guess at a glance — never silently blend the two.

## Running `npm run validate:data`

```bash
npm run validate:data
```

Imports the real `allTools` array (not a re-parse of the source text) and checks,
for every entry:

- Required fields present: `id`, `name`, `slug`, `license`, `category`, `fossModel`.
- `id` and `slug` are each unique across the whole catalog.
- `category`, `fossModel`, `dockerStatus`, `difficulty`, `status`, and every value
  in `tags` match one of the real enum values above (typo/drift guard).
- `websiteUrl` / `githubUrl` are valid `http(s)` URLs.
- `minRamMb`, if set, is a positive, plausible number.
- Every host/container port declared in `dockerCompose` falls inside 1–65535.
- `starsCount`, if set, is a non-negative number.

Exits `0` with a green summary if everything passes, or `1` with the complete list
of problems found (never stops at the first one) otherwise. This runs in CI
(`.github/workflows/ci.yml`) on every push/PR to `main`, alongside `typecheck`,
`lint`, and `build` — a PR that fails any of them doesn't merge.
