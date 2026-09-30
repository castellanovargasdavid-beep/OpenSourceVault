import type { IntentPageContent } from "./intent-pages";

/** English translation of intent-pages.ts. Same keys, same claims — never a looser or stronger claim than the Spanish original. */
export const INTENT_PAGE_CONTENT: Record<string, IntentPageContent> = {
  "Notion→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosting your Notion alternative means your notes, wikis and Notion-style databases live on your own server, not in Notion's cloud — no free-tier block limit, no risk of a price hike affecting you.",
    operationalNotes:
      "All 5 catalog alternatives ship a docker-compose.yml and need between 1GB and 2GB of RAM (AppFlowy and Huly are the lightest; Outline, Docmost and AFFiNE need more for their built-in search/whiteboard engine). Updating is a docker compose pull && docker compose up -d — back up the data volume first, same as any database.",
    tradeoffsVsSaas:
      "You won't get Notion's polished real-time collaboration without extra infrastructure work (websockets, CDN), and maintenance (backups, updates) becomes yours. In exchange, your notes don't depend on Notion staying in business, raising prices, or changing its free-tier limits.",
  },
  "Slack→self-hosted": {
    intent: "self-hosted",
    intro:
      "With self-hosted team chat, your organization's message history lives on your server — no free-plan visible-message limit, no blocked export.",
    operationalNotes:
      "Real range across the 4 alternatives: from 512MB (Zulip, the lightest) to 1GB (Rocket.Chat, Mattermost, Huly). Mobile push notifications usually need your own Firebase/APNs project configured — they don't come ready out of the box like Slack's.",
    tradeoffsVsSaas:
      "You lose Slack's catalog of thousands of third-party integrations; you gain full control over how long history is retained and no message limit imposed by a paid plan.",
  },
  "Slack→open-source": {
    intent: "open-source",
    intro:
      "Of the 4 Slack alternatives in the catalog, only Huly and Zulip are 100% FOSS — Rocket.Chat and Mattermost are Open-Core (free core, but with features that can sit behind a paid tier).",
    licenseAngle:
      "With Huly or Zulip the code you run is exactly the code you can audit in their repository, with no separate \"Enterprise\" build with features locked away — if the project ever changes direction, you can always fork it.",
    tradeoffsVsSaas:
      "Huly and Zulip cover real team chat well, but with smaller communities than Rocket.Chat/Mattermost — fewer ready-made third-party plugins, in exchange for zero risk of a feature you use today moving behind a paywall tomorrow.",
  },
  "Zoom→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosted video conferencing means you manage the call infrastructure yourself (WebRTC) — no 40-minute limit, no per-minute cost on a free plan.",
    operationalNotes:
      "The widest RAM range in the catalog for this intent: Galène and Neko run on 256MB on modest hardware, BigBlueButton on 512MB, while Jitsi Meet needs 2GB and more CPU the more people join a call at once — the real requirement depends on how many participants and call-minutes you expect, not a fixed number. You'll need to open UDP ports in your firewall/NAT for calls to work.",
    tradeoffsVsSaas:
      "You won't get Zoom's \"it always connects\" reliability on restrictive corporate networks (Zoom invests heavily in traversing difficult firewalls); in exchange, unlimited-participant calls with no per-minute cost from a plan.",
  },
  "Google Analytics→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosting your web analytics turns \"your visitor data goes to Google\" into \"it stays on your own server\" — several of these alternatives don't even use cookies.",
    operationalNotes:
      "The widest RAM range in the catalog for this intent: GoatCounter runs on 256MB (a single binary), Umami and Matomo need 1GB, and Plausible needs 2GB since it runs ClickHouse underneath — the right choice depends on the traffic volume you want to analyze, not just your server budget.",
    tradeoffsVsSaas:
      "You lose Google Analytics' native integration with Google Ads/Search Console; you gain data that doesn't depend on a visitor accepting a cookie, and full control over how long it's retained.",
  },
  "Airtable→self-hosted": {
    intent: "self-hosted",
    intro:
      "None of the catalog's 3 Airtable alternatives is 100% FOSS (all 3 are Open-Core), so self-hosted is the only intent with its own page for Airtable — there's no separate \"open-source\" version to show.",
    operationalNotes:
      "Range from 256MB (Budibase) to 1GB (NocoDB) of RAM; Baserow and Budibase are the easiest to install (beginner tier). NocoDB is currently the only one of the 3 with a \"Verified\" state in our Docker deployment audit — see the exact detail on its page.",
    tradeoffsVsSaas:
      "The Open-Core model means the core (tables, views, basic automations) is free and self-hostable, but advanced features (SSO, certain granular permissions) may still be paid depending on the project — check each one's license on its page before assuming everything is free.",
  },
};
