import type { MigrationPatternContent } from "./migration-patterns";

/** English translation of the pair-specific migration overrides in migration-pair-overrides.ts. Same keys, same {from}/{to} tokens. */
export const pairOverridesEn: Record<string, MigrationPatternContent> = {
  "Notion→appflowy": {
    intro:
      "Notion's Markdown export is complete at the text level, but relational databases (relations, rollups, formulas) come out as flat CSV — the real work is deciding which relations are worth rebuilding by hand in {to}.",
    steps: [
      {
        title: "Before exporting: audit which pages use relational databases",
        body: "In {from}, check which databases have \"Relation\" or \"Rollup\" type columns — those are the ones that will lose their connection on export. Write down by hand which tables relate to each other; the exported CSV doesn't state this explicitly, it just repeats the related page's title as plain text.",
      },
      {
        title: "Export the full workspace from {from}",
        body: "Go to Settings & members → Settings → Export content → \"Export all workspace content\" (requires a paid plan), choose Markdown & CSV format, and include file attachments. {from} generates a .zip with one folder per top-level page and nested subfolders for sub-pages, plus a .csv for each database.",
      },
      {
        title: "Deploy {to} via AppFlowy Cloud with Docker Compose",
        body: "{to} self-hosts as AppFlowy Cloud, which needs PostgreSQL (see the docker-compose.yml on its page). Before importing anything, start the stack, create your admin account, and confirm the desktop/web client connects correctly by pointing it at your server's URL under Settings → Custom Server.",
      },
      {
        title: "Import the Markdown .zip into {to}",
        body: "With your workspace already open in {to}, use the Markdown import option (space menu → Import) and select the exported .zip. {to} rebuilds the page hierarchy and formatted text, but each database .csv comes in as a new table without the relation columns rebuilt.",
      },
      {
        title: "Rebuild the relations and check attachments",
        body: "Using the list from step 1, manually recreate each relation column between the new databases in {to} and re-link records by title. Also check that images and file attachments were imported — some older {from} exports link attachments by external URL instead of including them in the .zip.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, compare the number of top-level pages between both spaces and open at least one database with relations to confirm no record is missing — rollups and formulas don't rebuild themselves, you'll have to recreate them if you need them.",
  },

  "Google Analytics→plausible": {
    intro:
      "Unlike most analytics migrations, there's a real way to import history here — but it only covers aggregate metrics (visits, pages, sources), not session-level detail or Google Signals demographic profiles.",
    steps: [
      {
        title: "First: enable the Google Analytics Data API",
        body: "In Google Cloud Console, on the project linked to your {from} (GA4) property, enable the \"Google Analytics Data API\" — this is a prerequisite for {to} to be able to read your history; without it, the import fails silently during authorization.",
      },
      {
        title: "Deploy {to} via Docker Compose",
        body: "{to} needs PostgreSQL and ClickHouse (see the docker-compose.yml on its page) — ClickHouse is the real engine where events get aggregated, not a cosmetic option. Set BASE_URL to your final domain first, before generating any tracking script.",
      },
      {
        title: "Replace {from}'s snippet with {to}'s",
        body: "Replace {from}'s gtag.js/analytics.js with {to}'s script (`<script defer data-domain=\"yourdomain.com\" src=\"https://analytics.yourdomain.com/js/script.js\"></script>`). Keep both scripts running in parallel for 2-3 weeks to compare traffic numbers before relying solely on {to}.",
      },
      {
        title: "Import history via the Google Analytics Data API",
        body: "In {to}, go to Site Settings → Import & Export → Import from Google Analytics, authorize OAuth access to the correct GA4 property, and pick the date range. The import brings in visits, top pages, and aggregate traffic sources — it doesn't bring custom events or individual-user-level data.",
      },
      {
        title: "Rewrite custom events by hand",
        body: "Every `gtag('event', ...)` call from {from} in your code needs to be rewritten as {to}'s `plausible('EventName', {props: {...}})` — there's no automatic conversion. Find every custom event you use (conversions, CTA clicks) and add the equivalent call before fully retiring {from}.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, also export the audience/demographic reports (Google Signals) you use for internal reporting — {to} doesn't offer that kind of profiling by design (it's part of why it's more private), so that data has no equivalent and disappears once you close the account.",
  },

  "1Password→vaultwarden": {
    intro:
      "The riskiest moment isn't deploying {to} — it's the window where your entire vault exists as an unencrypted file on your disk. Treat it like your master password itself.",
    steps: [
      {
        title: "Before exporting: set up a trusted environment",
        body: "Do the export and import from the same trusted computer, off public networks, and have a way to securely delete the file (not just move it to the trash) ready as soon as you're done — don't upload it to any cloud service in between.",
      },
      {
        title: "Export your vault from {from} as .1pux",
        body: "From {from}'s desktop app (not the browser extension): File → Export → All Items → .1pux format. This format preserves field types, folders and secure notes better than a flat CSV — only use CSV if your {from} version doesn't offer .1pux.",
      },
      {
        title: "Deploy {to} via Docker Compose and create the first user",
        body: "{to} ships with `SIGNUPS_ALLOWED=false` by default (correct for production). Temporarily enable it (`SIGNUPS_ALLOWED=true`), create your admin account from the official Bitwarden web client pointed at your domain, then disable it again immediately after — {to} has no UI of its own, it uses the official Bitwarden clients configured with your server's URL.",
      },
      {
        title: "Import the .1pux from the Bitwarden web/desktop client",
        body: "With the client already pointed at your {to} server, go to Tools → Import Data, choose \"1Password (1pux)\" as the source format, and select the file. Bitwarden recognizes that format natively — no conversion needed beforehand.",
      },
      {
        title: "Verify, and only then delete the exported file",
        body: "Compare the number of imported items against your original {from} vault and open a handful at random to confirm fields and passwords came through intact. Only once you've verified it, securely delete the .1pux from every disk it touched.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, rotate the passwords for your most critical accounts (primary email, banking, your own domain) already from {to} — not because the export itself is insecure, but to confirm the authentication flow with your new vault works end to end before relying on it alone. Previous password version history for each item in {from} isn't exported — if you need it, it only exists while the account is still active.",
    metaTitle: "Migrate from {from} to {to}: export your .1pux vault safely ({year})",
    metaDescription:
      "Step-by-step guide to migrate from {from} to {to}: export your vault as .1pux, deploy it with Bitwarden, and securely delete the file when you're done.",
    faqs: [
      {
        q: "What client do I use to access Vaultwarden?",
        a: "Vaultwarden has no UI of its own: use the official Bitwarden clients (browser, desktop, mobile) pointed at your server's URL, the same way you would with Bitwarden Cloud.",
      },
      {
        q: "Why is SIGNUPS_ALLOWED disabled by default?",
        a: "For security: in production you don't want anyone with the URL to be able to create an account on your server. Enable it only temporarily to create your first user, then disable it again.",
      },
      {
        q: "Is the exported .1pux file safe?",
        a: "No, the exported file is unencrypted. Do the export and import on a trusted computer off public networks, and securely delete it (not just move it to the trash) as soon as you confirm the import succeeded.",
      },
    ],
  },

  "Notion→affine": {
    intro:
      "Notion's Markdown export carries the text over fine, but relational databases arrive as flat CSV — and {to} adds something {from} doesn't have natively: an infinite whiteboard on the same canvas as your documents.",
    steps: [
      {
        title: "Before exporting: audit which databases use relations",
        body: "In {from}, check which databases have \"Relation\" or \"Rollup\" columns — they'll lose the connection on export. Note which tables are related to each other, since the exported CSV doesn't show it explicitly.",
      },
      {
        title: "Export the full workspace from {from}",
        body: "Go to Settings & members → Settings → Export content → \"Export all workspace content\", choose Markdown & CSV format, and include attachments. {from} generates a .zip with one folder per top-level page.",
      },
      {
        title: "Deploy {to} via Docker Compose",
        body: "{to} needs PostgreSQL and Redis (see its docker-compose.yml). Before importing anything, start the stack and confirm the web/desktop client connects correctly to your server.",
      },
      {
        title: "Import the Markdown .zip into {to}",
        body: "With the workspace already open in {to}, import the exported .zip. Text and page hierarchy are rebuilt, but each database .csv comes in as a new table without the relations reconstructed.",
      },
      {
        title: "Rebuild relations and explore the whiteboard",
        body: "Using the list from step 1, manually recreate each relation between databases in {to}. Then try the built-in infinite whiteboard — it's the feature {from} doesn't offer natively, and the most common reason to migrate, not a conversion of existing content.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, compare the number of top-level pages between both spaces and confirm images and attachments imported correctly. {to}'s official self-host still evolves quickly between versions — review the changelog before each update and keep a recent backup of the Postgres volume.",
    metaTitle: "Migrate from {from} to {to}: docs and whiteboard in one canvas ({year})",
    metaDescription:
      "Step-by-step guide to migrate from {from} to {to}: what Markdown export carries over, how to rebuild relations, and what to expect from self-hosting before cancelling {from}.",
    faqs: [
      {
        q: "Can I import my Notion databases with relations into AFFiNE?",
        a: "Not automatically. The exported CSV arrives as a flat table without relation or rollup columns — you'll need to manually recreate those connections in AFFiNE after importing.",
      },
      {
        q: "What does AFFiNE offer that Notion doesn't?",
        a: "An infinite whiteboard built into the same canvas as your documents, for diagrams or visual brainstorming without leaving the app — Notion has no native equivalent.",
      },
      {
        q: "Is it stable enough for a production team?",
        a: "AFFiNE's official self-host still evolves quickly between versions. It's a solid choice for personal use or small teams that don't depend on a long-term stable API or integration; take frequent backups of the Postgres volume.",
      },
    ],
  },

  "Google Photos→immich": {
    intro:
      "Google Takeout exports your photos, but a meaningful chunk of the metadata (real date, geolocation) lives in a .json next to each photo, not in the file's own EXIF — whatever importer you use needs to know how to read that .json, or dates will come out wrong.",
    steps: [
      {
        title: "Request the export from Google Takeout",
        body: "At takeout.google.com, deselect everything except \"Google Photos\", and pick a maximum archive size (50GB is reasonable) so Google splits the export into several downloadable .zip files instead of one giant one.",
      },
      {
        title: "Deploy {to} via Docker Compose",
        body: "{to} needs PostgreSQL with the pgvector extension (the `tensorchord/pgvecto-rs` image, already in its docker-compose.yml) and Redis. Before uploading anything, mount the upload volume (`immich_uploads`) on a disk with real space for your whole library, not the system disk.",
      },
      {
        title: "Upload with immich-go, not the official CLI alone",
        body: "{to}'s official CLI uploads photo folders, but doesn't parse Takeout's .json files. The community tool `immich-go` does — it reads each .json next to its photo and fixes the real date/geolocation before uploading, and also handles Takeout's \"Photos from YYYY\" folders as albums. Check the exact flags for your version with `immich-go --help`, since they change between releases.",
      },
      {
        title: "Spot-check Motion Photos and shared albums",
        body: "Google/Pixel Motion Photos sometimes import as a separate photo and video instead of the original animated format — check a handful of examples after uploading. Albums shared with other people in {from} don't migrate as shared: you'll need to re-share them manually from {to}.",
      },
      {
        title: "Re-tag faces and check for duplicates",
        body: "{to} runs its own facial recognition from scratch on import — the person names you assigned in {from} don't carry over, you'll need to re-tag people. Also check whether Takeout duplicated any files (happens with edited photos Google stores twice) before considering the migration done.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, compare the total photo/video count between both (Settings → Storage in {to} gives you the count) — with large libraries it's easy for a Takeout .zip to fail partway through downloading without you noticing.",
  },

  "Slack→mattermost": {
    intro:
      "How complete {from}'s export is depends on your plan: Free/Pro plans only export public channels, with no DMs or private channels — if you need that history, you need to be on a Business+ plan or higher before exporting.",
    steps: [
      {
        title: "Confirm your {from} plan's real export scope before promising anything",
        body: "In Workspace Settings → Import/Export Data, check what kind of export your current plan actually offers. If your team expects to recover DMs or private channels and you're on Free/Pro, it's not going to happen — settle this before announcing a cutover date.",
      },
      {
        title: "Export {from}'s history",
        body: "Generate the export from that same panel — {from} delivers a .zip with one .json per channel per day, plus `users.json` and `channels.json` metadata. You don't need to unzip it before uploading it to {to}.",
      },
      {
        title: "Deploy {to} via Docker Compose",
        body: "{to} needs PostgreSQL (see the docker-compose.yml on its page). Before importing, create the accounts for the users you're migrating first — Slack's importer links messages to existing users by email, it doesn't automatically create new accounts in every case.",
      },
      {
        title: "Import with mmctl, not just the web console",
        body: "As a system admin, use the `mmctl` CLI: `mmctl auth login`, then `mmctl import upload slack-export.zip`, `mmctl import list uploads` (note the ID it returns), and `mmctl import process <id>` to kick off the job. One-click import from System Console exists, but in several Mattermost versions it's an Enterprise feature — the CLI path works on the Team/OSS edition.",
      },
      {
        title: "Reconnect integrations and check external shared channels",
        body: "{from}'s webhooks, bots and connected apps don't migrate — you'll need to recreate them pointing at {to}. Slack Connect channels (shared with other companies) also have no automatic equivalent: those conversations stay only in {from}.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, verify the importer brought over threads and emoji reactions correctly in a couple of test channels — mmctl does support them, but it's worth confirming with your own data before migrating the rest of the team.",
  },
};
