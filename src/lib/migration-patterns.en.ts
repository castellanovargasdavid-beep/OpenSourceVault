import type { MigrationPatternContent, MigrationPatternId } from "./migration-patterns";

/** English translation of the 15 migration patterns. Texts use {from} and {to} as replacement tokens at render time. */
export const patternsEn: Record<MigrationPatternId, MigrationPatternContent> = {
  "notes-docs": {
    intro:
      "The hardest part of migrating notes or documentation isn't the text itself — it's the structure (folders, internal links, databases) and team permissions.",
    steps: [
      {
        title: "Export each space/page from {from}",
        body: "Almost every notes app lets you export to Markdown, HTML or PDF from each page's or space's menu. Export root pages first, then subpages, to preserve the hierarchy.",
      },
      {
        title: "Import the content into {to}",
        body: "Most open source alternatives accept bulk Markdown/HTML import. Check {to}'s documentation for the exact format it expects — some require a specific folder structure.",
      },
      {
        title: "Fix internal links",
        body: "Links between pages (wikilinks) almost never migrate automatically between different platforms. After importing, review the most-linked pages and fix broken references.",
      },
      {
        title: "Re-invite your team",
        body: "Workspace permissions and members aren't exported. Create the spaces/teams in {to} and re-invite each person with the right role.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, check that the page count matches and that at least your most-visited pages render correctly — exported Markdown sometimes loses tables or embedded blocks.",
  },
  "team-chat": {
    intro:
      "Chat message history is the hardest thing to migrate between platforms — most teams migrate chat \"going forward\" and leave the old history as read-only reference.",
    steps: [
      {
        title: "Request a data export from {from}",
        body: "On paid plans, {from} usually lets you export the full history (messages, channels, files) as an administrative export, typically in JSON format.",
      },
      {
        title: "Use {to}'s import tool",
        body: "Tools like Mattermost or Rocket.Chat include command-line utilities to import Slack exports directly, preserving channels and threads where possible.",
      },
      {
        title: "Recreate integrations and bots",
        body: "Webhooks, bots and connected apps don't migrate — you'll need to reconfigure every integration (CI/CD, alerts, etc.) to point at {to}.",
      },
      {
        title: "Announce the switch with overlap",
        body: "Keep both platforms active for 1-2 weeks and pin a message in the old channels pointing to the new space, to minimize lost messages during the transition.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, also download shared files separately — history exports don't always include attachments at full resolution.",
  },
  "project-management": {
    intro:
      "Issues and tasks usually migrate fine via CSV; what almost never survives is your automation and custom workflow-state configuration.",
    steps: [
      {
        title: "Export your projects from {from} to CSV",
        body: "Filter by project and export issues/tasks with all fields (status, assignee, labels, due date). Export one project at a time to keep field mapping simple.",
      },
      {
        title: "Map fields when importing into {to}",
        body: "Before importing, create the same statuses and labels in {to} that you used in {from} — if the names don't match exactly, the importer will leave those fields empty.",
      },
      {
        title: "Rebuild your automation workflows",
        body: "Rules like \"notify X when an issue closes\" aren't exported. Write down your current automations before migrating and recreate them one by one in {to}.",
      },
      {
        title: "Migrate team by team, not all at once",
        body: "Start with one pilot team or project for a full sprint before moving the rest — that way you catch mapping issues at low risk.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, also export the comments on your most important issues — some importers only bring over the issue itself, not the comment history.",
  },
  scheduling: {
    intro:
      "Scheduling doesn't really have \"data\" to migrate (beyond future bookings) — the work is in recreating your event types and reconnecting your calendar.",
    steps: [
      {
        title: "Write down your event types in {from}",
        body: "Duration, booking-form questions, buffers between meetings and availability — document every event type before shutting it down, since this configuration has no structured export.",
      },
      {
        title: "Connect your calendar to {to}",
        body: "Authorize access to Google Calendar/Outlook just like you did in {from}, so {to} automatically blocks off slots that are already busy.",
      },
      {
        title: "Recreate your event types",
        body: "Set up each event type in {to} with the same duration and questions. Test it by booking a trial appointment yourself before publishing the new link.",
      },
      {
        title: "Update your published links",
        body: "Replace the {from} link in your email signature, social bios and website with the new {to} link, and leave a temporary redirect if possible.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, reschedule or export already-confirmed bookings — they're lost the moment you close the account.",
  },
  "database-spreadsheet": {
    intro:
      "The biggest blocker to leaving a SaaS database isn't installing the alternative — it's moving the data without breaking the relationships between tables.",
    steps: [
      {
        title: "Export each table from {from} to CSV",
        body: "Most of these tools don't have a native \"export the whole base\" — you have to do it table by table from each view's menu. Export \"parent\" tables (the ones that don't depend on others) first.",
      },
      {
        title: "Import the CSV into {to}",
        body: "{to} usually auto-detects each column's type (text, number, date) when importing a CSV, but double-check it: computed fields and links between tables almost always arrive as plain text.",
      },
      {
        title: "Rebuild the relationships between tables",
        body: "For every column that was a link to another record in {from}, create the equivalent relation field in {to} and re-link the records. If names match exactly between tables, a find-and-replace speeds this up.",
      },
      {
        title: "Recreate views, formulas and automations",
        body: "Filtered views, formulas and automations aren't exported — you'll have to rebuild them by hand. Start with just the main view and add the rest once you've validated the data is correct.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, check that the total row count matches per table and that number/date fields weren't converted to text — re-exporting is free while the account is still active, not after.",
  },
  "crm-contacts": {
    intro:
      "Contacts and deals migrate reasonably well via CSV; what almost always gets lost is activity history (calls, logged emails) and marketing automations.",
    steps: [
      {
        title: "Export contacts, companies and deals from {from}",
        body: "Export each object (contacts, accounts, deals/opportunities) separately to CSV, including each record's unique identifier so you can re-link them afterward.",
      },
      {
        title: "Set up the pipeline in {to} before importing",
        body: "Create the same sales pipeline stages and custom fields in {to} that you used in {from} — if they don't exist at import time, that data will be lost or dumped into a generic field.",
      },
      {
        title: "Import and link the relationships",
        body: "Import companies first, then contacts, then deals last, using the unique identifier so {to} links each deal to its correct contact and company.",
      },
      {
        title: "Recreate marketing/sales automations",
        body: "Email sequences and auto-assignment rules don't migrate — document what you use in {from} and recreate them manually in {to}.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, also export the activity history (calls, notes, logged emails) even if you can't import it directly — it's useful as a reference archive.",
  },
  helpdesk: {
    intro:
      "Historical tickets rarely migrate in full between helpdesks — most teams start on the new platform with only open tickets and leave the rest as a reference archive in {from}.",
    steps: [
      {
        title: "Export open tickets from {from}",
        body: "Export at least your unresolved tickets to CSV (subject, customer, messages, status) — most helpdesks allow this export from the admin panel.",
      },
      {
        title: "Reconnect your inbound channels in {to}",
        body: "Set up the same support email, chat widget and/or social accounts in {to} that you used in {from}, so you don't lose new messages during the transition.",
      },
      {
        title: "Import the open tickets",
        body: "Create the open tickets manually or via CSV import in {to}, marking {from}'s history as read-only for future reference.",
      },
      {
        title: "Update macros and saved replies",
        body: "Canned responses and automation rules aren't exported — recreate your most-used ones in {to} before announcing the change to your team.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, export the full history of closed tickets even if you don't import them — it's your only copy if a customer raises something from the past.",
  },
  "password-vault": {
    intro:
      "Migrating passwords is quick, but the highest security risk is right during the export — the exported file is in plain, unencrypted text.",
    steps: [
      {
        title: "Export your vault from {from}",
        body: "Go to {from}'s export settings and generate a CSV or JSON file with all your items. Most password managers only allow this from the web dashboard, not the browser extension.",
      },
      {
        title: "Import the file into {to}",
        body: "{to} usually has a dedicated importer that recognizes {from}'s export format directly, including folders and secure notes.",
      },
      {
        title: "Verify before deleting the file",
        body: "Check that the number of imported items matches your original vault and that passwords look correct (no truncated characters) before continuing.",
      },
      {
        title: "Securely delete the exported file",
        body: "The exported CSV/JSON is unencrypted — delete it securely (not just to the trash) as soon as you confirm the import was successful.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, update the 2FA and passwords for your most critical accounts from {to} already, to confirm the authentication flow works before relying solely on the new vault.",
  },
  "file-storage": {
    intro:
      "Unlike other migrations, there's no format conversion here — it's mainly a matter of transfer time depending on how many files you have.",
    steps: [
      {
        title: "Sync or download everything from {from}",
        body: "Use {from}'s desktop client to get a full local copy, or download the main folders directly if the volume is manageable.",
      },
      {
        title: "Upload the files to {to}",
        body: "The most reliable approach for large volumes is using {to}'s sync client pointed at the same local folder, rather than uploading through the browser (avoids timeouts).",
      },
      {
        title: "Verify folder structure and permissions",
        body: "Per-folder sharing permissions don't migrate automatically — check which folders were shared in {from} and re-share them with the right people in {to}.",
      },
      {
        title: "Update shared links",
        body: "Any public or internal link pointing to files in {from} will break — replace it with the new {to} link in documentation, wikis or saved emails.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, compare total size (GB) and file count between both to confirm nothing is missing, especially with very large files or special characters in filenames.",
  },
  analytics: {
    intro:
      "Here the bad news is unavoidable: analytics history almost never migrates between different platforms, because each one measures and aggregates data differently.",
    steps: [
      {
        title: "Export a historical summary from {from} as a file",
        body: "First, export your key reports (monthly traffic, top sources, conversions) for the last 12-24 months to CSV/PDF as a reference file — it can't be recovered afterward.",
      },
      {
        title: "Install {to}'s script in parallel",
        body: "Add {to}'s tracking script to your site without removing {from}'s yet, so both measure in parallel for 2-4 weeks and you can validate the numbers make sense.",
      },
      {
        title: "Recreate your goals and conversions",
        body: "{from}'s custom conversion events don't migrate — set them up again in {to} using the same definition (e.g. form submission, purchase completed).",
      },
      {
        title: "Remove the old script",
        body: "Once you confirm {to} is capturing traffic correctly, remove {from}'s script from your site and keep only the exported historical file as reference.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, make sure you've also exported the audience and behavior reports you use for internal reporting — they disappear the moment you close the account.",
  },
  ecommerce: {
    intro:
      "Migrating an online store is one of the trickiest migrations: besides the catalog, you need to protect product-URL SEO and not lose orders in progress.",
    steps: [
      {
        title: "Export the catalog from {from}",
        body: "Export products, variants, images and categories to CSV. Include each product's SKU — you'll need it to avoid duplicating references on import.",
      },
      {
        title: "Import the catalog into {to} in a staging environment",
        body: "Before touching the production store, import the catalog into a separate {to} instance and check that prices, stock and images look correct.",
      },
      {
        title: "Reconnect payment gateway and shipping",
        body: "Payment integrations (Stripe, PayPal) and shipping don't migrate — reconfigure them in {to} and place a real end-to-end test order before launching.",
      },
      {
        title: "Redirect the old URLs",
        body: "Set up 301 redirects from {from}'s product URLs to their equivalents in {to} so you don't lose accumulated SEO ranking.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, export the full order and customer history — many tax obligations require keeping those records for years.",
  },
  "video-conferencing": {
    intro:
      "Video calls don't have \"data\" to migrate beyond past recordings — the real work is reconnecting your calendar and notifying regular participants.",
    steps: [
      {
        title: "Download important recordings from {from}",
        body: "If you record meetings, download the recordings you need to keep — most providers delete them a few months after you cancel the account.",
      },
      {
        title: "Set up {to} on your calendar",
        body: "Install {to}'s integration with Google Calendar/Outlook to automatically generate meeting links when creating an event, just like you did with {from}.",
      },
      {
        title: "Update recurring rooms",
        body: "Replace the {from} link in your recurring meetings (standups, 1:1s) with the new {to} link — also check email signatures and public \"contact\" pages.",
      },
      {
        title: "Do a full-team test call",
        body: "Before relying on {to} for an important meeting, do a test call with the whole team to catch audio/video or firewall issues ahead of time.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, confirm no one on the team has future meetings scheduled with that still-active link.",
  },
  "ai-tools": {
    intro:
      "AI chat conversations rarely migrate between different platforms — what usually matters is your history of useful prompts, not the full conversation.",
    steps: [
      {
        title: "Export your conversation history from {from}",
        body: "If {from} allows it, export your conversations (usually as JSON) before switching — at least as a reference file, even if it can't be re-imported as-is.",
      },
      {
        title: "Set up your model provider in {to}",
        body: "{to} needs you to connect an API key (OpenAI, Anthropic, or a local model) — decide whether to use a cloud provider or local models based on your budget and privacy needs.",
      },
      {
        title: "Recreate your saved prompts and flows",
        body: "Review your exported history and re-save the prompts, templates or \"custom instructions\" you used most often in {to}.",
      },
      {
        title: "Validate response quality with real cases",
        body: "Test {to} with 3-5 real tasks you used to solve in {from} before relying on it fully — quality varies depending on the model you connect.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, confirm you've exported any conversation with information you don't have saved anywhere else.",
  },
  automation: {
    intro:
      "Automation workflows almost never import directly from one platform to another — you'll have to rebuild them, but it's a good time to simplify them.",
    steps: [
      {
        title: "Document every active flow in {from}",
        body: "Make a list of your automations (trigger → actions) exactly as they are in {from}, including the credentials for the apps they connect to.",
      },
      {
        title: "Recreate the most critical flows first in {to}",
        body: "Start with the automations that have the biggest business impact, not the simplest ones — that way you quickly validate that {to} covers your main use case.",
      },
      {
        title: "Test each flow with real data before enabling it",
        body: "Run each migrated automation manually at least once, checking the result, before letting it run automatically in {to}.",
      },
      {
        title: "Disable (don't delete) the flows in {from}",
        body: "Disable the old flows instead of deleting them right away — that way you can quickly re-enable them if something breaks in {to} during the first few weeks.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, export each flow's configuration (even just as a screenshot) in case you need to reference it later.",
  },
  "devtools-generic": {
    intro:
      "Technical infrastructure migrations vary a lot depending on the tool — these are the general steps that apply to most cases.",
    steps: [
      {
        title: "Export your configuration and data from {from}",
        body: "Check {from}'s documentation for exporting projects, configuration and integrations — the exact format depends on the service, but almost all offer some export path for paid accounts.",
      },
      {
        title: "Prepare the {to} environment",
        body: "Deploy {to} in a staging environment first (not production) and replicate the base configuration before moving any real data.",
      },
      {
        title: "Migrate in pieces and validate each one",
        body: "Move one project or integration at a time instead of all at once, checking that each piece works in {to} before moving on to the next.",
      },
      {
        title: "Update integrations that depended on {from}",
        body: "Any external service (CI/CD, webhooks, SDKs) that pointed at {from} needs to be reconfigured to point at your new {to} instance.",
      },
    ],
    beforeYouCancel:
      "Before cancelling {from}, confirm no production service still depends on it by checking recent access logs.",
  },
};
