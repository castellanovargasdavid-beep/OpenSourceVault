import type { IntentPageContent } from "./intent-pages";

/** English translation of intent-pages.ts. Same keys, same claims — never a looser or stronger claim than the Spanish original. */
export const INTENT_PAGE_CONTENT: Record<string, IntentPageContent> = {
  "Notion→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosting your Notion alternative means your notes, wikis and Notion-style databases live on your own server, not in Notion's cloud — no free-tier block limit, no risk of a price hike affecting you.",
    operationalNotes:
      "All 5 catalog alternatives ship a docker-compose.yml and need between 1GB and 2GB of RAM (AppFlowy and Huly are the lightest; Outline, Docmost and AFFiNE need more for their built-in search/whiteboard engine). Updating is a docker compose pull && docker compose up -d — back up the data volume first, same as any database.\n\nMigrating from Notion depends on which alternative you pick: each one imports different formats (Markdown, HTML, CSV) with varying fidelity for databases, page relations and embedded blocks — check the alternative's own import documentation before assuming your whole workspace will carry over untouched. None of them guarantees an automatic 1:1 migration. Before migrating, export a full backup directly from Notion (Settings → Export all workspace content) and keep it separately, regardless of how the import goes.",
    tradeoffsVsSaas:
      "You won't get Notion's polished real-time collaboration without extra infrastructure work (websockets, CDN), and maintenance (backups, updates) becomes yours. In exchange, your notes don't depend on Notion staying in business, raising prices, or changing its free-tier limits.",
  },
  "Slack→self-hosted": {
    intent: "self-hosted",
    intro:
      "With self-hosted team chat, your organization's message history lives on your server — no free-plan visible-message limit, no blocked export.",
    operationalNotes:
      "Real range across the 4 alternatives: from 512MB (Zulip, the lightest) to 1GB (Rocket.Chat, Mattermost, Huly). Mobile push notifications usually need your own Firebase/APNs project configured — they don't come ready out of the box like Slack's.\n\nThe real server requirement isn't fixed — it grows with how many people are connected at once, your message/history volume, the files you upload, and how many integrations/bots you run. Database and file storage are usually the first bottlenecks as a team grows, not CPU — and mobile push notifications (mentioned above) may need separate tuning as volume grows. We're not giving a \"supports up to X users\" figure per tool here: the catalog doesn't have that verified data, and a number without a real source would be a promise we can't back.",
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
      "The widest RAM range in the catalog for this intent: GoatCounter runs on 256MB (a single binary), Umami and Matomo need 1GB, and Plausible needs 2GB since it runs ClickHouse underneath — the right choice depends on the traffic volume you want to analyze, not just your server budget.\n\nMigrating your Google Analytics history isn't equivalent across tools: some can import historical data with varying fidelity, while others simply start measuring from scratch the day you install them — it helps to separate \"keeping what you already have\" (export your GA reports separately, as a backup) from \"measuring going forward\" with the new tool. Custom events, goals/conversions and integrations (Google Ads, Search Console) usually need to be rebuilt by hand in whichever alternative you choose — none of these tools currently offers a verified automatic migration from Google Analytics.",
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
  "Dropbox→self-hosted": {
    intent: "self-hosted",
    intro:
      "Setting up self-hosted file storage raises a network fork right from the start: a centralized node your devices connect to, or direct replication between them with no server in between. The catalog's Dropbox alternatives fall squarely into one camp or the other, and that fork changes how you share files, how you back up, and what you need to leave running.",
    operationalNotes:
      "Nextcloud, Seafile and Pydio Cells are client-server: you run a server (with its own database — MySQL/MariaDB in all three cases) that your devices connect to, same as Dropbox. Syncthing is different: it syncs your devices directly with each other, encrypted, with no central server for you to maintain.\n\nThe difference shows up most in backups and sharing with outsiders. With a central server, the backup is one thing — the server — and sharing a file externally is a link. With Syncthing there's no single point: a real backup copy means you configuring a device yourself that stays on holding a copy, and sharing with someone outside your own devices requires that person to also run Syncthing. Within the client-server group, Seafile stands out for optional per-library encryption and stronger performance with large file counts; Pydio Cells adds approval workflows and access auditing built for organizations with governance needs, not personal use.",
    tradeoffsVsSaas:
      "Choosing P2P (Syncthing) doesn't mean \"no infrastructure to maintain\" — it just moves where that infrastructure lives: onto each of your own devices instead of a server. You gain that your files never pass through any third party at all; you lose the convenience of a single access point from anywhere without another one of your own devices being on. With the client-server model (Nextcloud/Seafile/Pydio) you keep the experience closest to Dropbox — a server reachable from anywhere — in exchange for being the one who runs and backs it up.",
  },
  "Datadog→self-hosted": {
    intent: "self-hosted",
    intro:
      "\"Datadog\" is a brand that bundles several distinct functions — dashboards, error tracking, traces, infrastructure monitoring — as one product. None of this catalog's alternatives covers all of them with the same depth, so the real question isn't \"which one replaces Datadog\" but \"which part of Datadog do I need to replace.\"",
    operationalNotes:
      "Grafana is just the visualization layer — the project itself says so: you need Prometheus, Loki or Tempo separately to have any data to show. Sentry (self-hosted) is the official error-tracking and application performance (APM) server, with a heavy stack behind it (Postgres, Redis, Kafka and ClickHouse) installed via its own script, not a loose Docker image. SigNoz unifies metrics, traces and logs in one panel, built on OpenTelemetry, also on top of ClickHouse. Beszel covers only infrastructure — CPU, RAM, disk, network across your servers — as a single binary with no dependencies; the project itself is clear that it does no application error tracking.\n\nIf what you want from Datadog is \"see errors in production,\" Sentry is the direct match. If it's \"see metrics and traces,\" SigNoz. If it's \"a dashboard over data I already collect some other way,\" Grafana. If it's \"know when a server is running low on RAM,\" Beszel — these are different pieces, not different sizes of the same thing.",
    tradeoffsVsSaas:
      "About Sentry: even though its code is publicly available, its license (FSL-1.1) isn't a classic FOSS or Open-Core license — it carries its own conditions around distribution. It isn't \"just open source,\" and if you need to know exactly what it permits before using it, check the full terms at the official source rather than assuming anything from the name. About the rest: none of the 4 replaces Datadog wholesale — combining several is normal, and picking \"the most complete one\" (SigNoz) doesn't spare you from deciding whether you also need the error tracking that only Sentry covers.",
  },
  "Shopify→self-hosted": {
    intent: "self-hosted",
    intro:
      "Replacing Shopify with a self-hosted alternative splits projects by where the storefront's frontend lives: already built into the platform, or assembled separately and connected over an API. The catalog's 7 alternatives fall exactly along that line.",
    operationalNotes:
      "Medusa and Vendure are headless commerce: both are, per their own projects, a commerce engine with an API — orders, inventory, pricing — with no visual storefront included; you build or connect the frontend yourself. Medusa is 100% FOSS (Node.js); Vendure is Open-Core (TypeScript/NestJS). The other five — Bagisto, PrestaShop, Sylius, Shopware, WooCommerce — are platforms with a storefront included: install, pick a theme, and you have a visible store without writing a separate frontend. All PHP, all MySQL, all Open-Core. WooCommerce has a quirk of its own within the group: it isn't a standalone platform, it's a plugin — it needs WordPress installed and running before it can be used at all.\n\nWithin the five with a storefront, Sylius and PrestaShop share a technical base (PHP/Symfony), but Sylius is built for more complex B2B/B2C business logic while PrestaShop has more years in the market, especially in Europe; Bagisto uses Laravel instead of Symfony; Shopware adds its own visual storefront editor.",
    tradeoffsVsSaas:
      "The choice comes down to team capacity: the headless model requires maintaining and deploying the frontend yourself, in exchange for full freedom over how the store looks and behaves; a platform with a storefront included cuts that operational overhead, at the cost of less room to go beyond what the theme allows. If your priority is a working store without writing frontend code, Bagisto, PrestaShop, Sylius, Shopware or WooCommerce fit better; if you have a dev team and want full control over that layer, Medusa or Vendure.",
  },
  "GitHub→self-hosted": {
    intent: "self-hosted",
    // Internal editorial note (never publish on the page): the exact reason
    // and full details of Forgejo's MIT→GPL-3.0-or-later relicensing (August
    // 2024) are pending verification against Forgejo's own announcement —
    // blocked by this environment's network egress proxy at the time of
    // writing. The text below uses only what the catalog itself already
    // documents (date + "open governance with no commercial entity"),
    // without adding any new unverified specifics.
    intro:
      "Self-hosting your code forge means deciding first how much platform you actually want to stand up: just Git repos, or a full DevOps cycle with integrated CI/CD and a container registry. And if you're after the former, there's still a second question left — who governs the project you're about to depend on.",
    operationalNotes:
      "Gitea and GitLab CE cover very different scopes. Gitea is a lightweight Git forge — repos, issues, PRs, wiki and Actions compatible with GitHub Actions syntax — and runs, as the project itself documents, perfectly on a 1GB-RAM VPS. GitLab CE is a full DevOps platform: besides Git it includes CI/CD with no external tools and its own container registry — but that has a real resource cost: 4GB+ of RAM recommended per its own deployment requirements, notably more than Gitea.\n\nForgejo is a special case: it's a community fork of Gitea, born specifically for 100% open governance with no company behind it — it shares most of the same codebase, so its resource footprint is similarly light. One fact worth knowing if licensing matters to you: Forgejo moved from MIT to GPL-3.0-or-later in August 2024, while Gitea remains MIT — check the implications if you plan to distribute a modified version of either one.",
    tradeoffsVsSaas:
      "If all you need is hosting code with issues and PRs, Gitea or Forgejo cover that with a fraction of the resources GitLab CE asks for — the difference isn't cosmetic, it's a full DevOps platform versus a focused Git forge. Choosing between Gitea and Forgejo is less a technical question (they start from the same code) and more a question of which governance model you prefer: Gitea has a commercial offering behind it (Open-Core in our classification); Forgejo is explicitly community-run, with no commercial entity.",
  },
  "LastPass→open-source": {
    intent: "open-source",
    intro:
      "Adding \"open-source\" to \"LastPass alternative\" usually means you're already wary of trusting closed software — you want to audit the code holding your passwords, not just save money. Of the catalog's 3 LastPass alternatives, only 2 are 100% FOSS.",
    licenseAngle:
      "Vaultwarden is a reimplementation of the Bitwarden server — unofficial, not affiliated with the Bitwarden project, written in Rust, compatible with the official Bitwarden apps. Per the project's own documentation, it implements most of the Bitwarden API's functionality, including organizations, Sends and emergency access — features that on Bitwarden's official cloud sit behind paid plans. This is a side effect of protocol compatibility, not a stated goal of the project to bypass any commercial plan. Bitwarden (self-hosted) — the official server — does offer those same features, but its model is Open-Core, so it doesn't make this page's cut: the selection here is specifically 100% FOSS.\n\nKeeWeb is a different case: it isn't a server, it's a web/desktop client for KeePass .kdbx vaults. Self-hosting it means hosting a static app that connects to external storage of your own (Dropbox, Google Drive, your own WebDAV) — syncing depends on that backend, not on KeeWeb.",
    tradeoffsVsSaas:
      "It's worth being precise about what each option actually offers: Vaultwarden isn't \"Bitwarden Premium for free\" — it's a community-maintained compatible implementation, not the official server. And KeeWeb doesn't replace a traditional self-hosted server — without a sync backend of your own, you don't have a centralized vault reachable from any device. If you want a password server of your own with mobile apps, Vaultwarden is the piece that covers that; if you already use or want to use the KeePass format with storage you already have, KeeWeb is the piece that makes it accessible from the browser.",
  },
  "Auth0→open-source": {
    intent: "open-source",
    intro:
      "Auth0 is identity infrastructure — someone specifically searching for an open-source alternative usually wants to audit the code that manages credentials, not just cut cost. Of the catalog's 6 Auth0 alternatives, 4 are 100% FOSS, and they aren't interchangeable: each is built for a different case.",
    licenseAngle:
      "Keycloak (Apache-2.0) is the most mature and battle-tested in enterprise environments, with LDAP/Active Directory federation built in — in our own deployment audit it's the only one of the 4 with a verified Docker state. Ory (Apache-2.0) is 100% API-first: it ships no login UI of its own, you design and build the frontend yourself, in exchange for full control of the flow — it has a steeper learning curve for exactly that reason. Zitadel (AGPL-3.0, with Apache-2.0/MIT exceptions in some directories) is built from the ground up for multi-tenancy: isolating each customer's identity without deploying one instance per customer, aimed at B2B SaaS. Logto (MPL-2.0) targets small teams who want something as simple to set up as Clerk but self-hosted, with the most polished admin panel of the group.\n\nIf your case is offering the identity service itself to third parties (not just using it internally), it's worth reviewing the implications of Zitadel's AGPL-3.0 license for your specific distribution or service case before deciding — this isn't a limitation unique to Zitadel in the open-source ecosystem, but it is the only strong-copyleft license in this group.",
    tradeoffsVsSaas:
      "None of the 4 is \"the Auth0 alternative\" in general — they're 4 tools with different design goals. If you need battle-tested enterprise SSO, Keycloak. If you want to build your own login frontend with no constraints, Ory. If your product is a B2B SaaS with multiple customers needing isolated identity, Zitadel. If you're a small team that values a simple setup experience, Logto.",
  },
  "Mixpanel→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosted product analytics has two decision axes that a plain \"Mixpanel alternatives\" search doesn't resolve: do you need analytics only, or a broader product platform? And, operationally, which database engine are you willing to maintain?",
    operationalNotes:
      "PostHog goes beyond pure analytics — the project itself describes it as product analytics, session replay, feature flags, A/B testing and surveys in one platform, on PostgreSQL + ClickHouse. OpenPanel combines web and product analytics in a simpler dashboard, also on PostgreSQL + ClickHouse, though it's a considerably younger project with a still-small community. Countly uses a completely different engine — MongoDB instead of PostgreSQL/ClickHouse — and has the strongest native mobile-SDK support in the group.\n\nThe choice of data engine isn't just technical: running a ClickHouse (PostHog, OpenPanel) involves a different kind of backup and expertise than running a MongoDB (Countly) — neither is better in the abstract, they're different operations depending on what your team already knows how to run. On licensing: PostHog and Countly are Open-Core — Countly's own listing states its community edition has fewer features than the paid (Enterprise) one, though we can't pin down exactly which ones here without checking its official edition comparison. OpenPanel is the only 100% FOSS one of the 3.",
    tradeoffsVsSaas:
      "If all you need from Mixpanel is product analytics and nothing else, Countly or OpenPanel cover that without the rest of PostHog's scope. If you also want feature flags and A/B experiments in the same tool, PostHog is the only one that ships them out of the box — but that also means operating a larger platform, not just \"analytics with more RAM.\"",
  },
  "Heroku→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosting a Heroku alternative isn't self-hosting an application — it's self-hosting the platform that will deploy and manage all of your future applications. That difference changes what you need to know before installing any of the catalog's 4 options.",
    operationalNotes:
      "None of the 4 installs with a simple docker-compose.yml — all 4 install via their own official script, which takes control of Docker across the whole server (Coolify and Dokploy say so explicitly: inspect the script before running it, never pipe it directly and blindly). That's shared across all 4, and it's the first thing to understand: you're trusting this software with managing everything you deploy afterward, not just one app.\n\nCoolify is the most polished and broadest in scope — one-click Git deploys, managed databases, multi-server management from one panel. CapRover is the lightest: a Docker Swarm-based PaaS built for modest VPS specs, with a one-click app marketplace and automatic HTTPS. Dokku is the original \"mini-Heroku\": a single command line, deploys with git push, no official web panel — the most minimalist of the group. Dokploy is the newest: Docker Swarm with native Traefik integration for domains and HTTPS, one-click templates for dozens of apps — its community is growing fast but it has fewer years in production than Coolify or CapRover.",
    tradeoffsVsSaas:
      "Two of the four (Coolify and Dokploy) also cover Vercel-like use cases besides Heroku — not because Heroku and Vercel are the same thing, but because these two specifically support the pattern of deploying frontend apps with per-branch preview well. If that's exactly what you're after, it's worth knowing; if you're specifically looking to replace Heroku for deploying backend apps with classic buildpacks, Dokku is the option closest to the original model.",
  },
  "Heroku→open-source": {
    intent: "open-source",
    intro:
      "Of the 4 self-hosted Heroku alternatives, only Coolify and Dokku are 100% FOSS — CapRover and Dokploy are Open-Core. Here the auditability argument carries more weight than in other categories: a PaaS manages the credentials and secrets of every application you deploy through it, not just its own.",
    licenseAngle:
      "Coolify (Apache-2.0) and Dokku (MIT) are fully FOSS projects, with no paid \"Cloud\" tier holding exclusive features. Dokploy is the clearest case of what's traded away by choosing Open-Core in this category: its own listing states Dokploy Cloud (the managed version) is paid, while the self-hosted version requires your own server — an explicit business incentive behind the project. The full installation and scope details for all 4 tools (Coolify, CapRover, Dokku, Dokploy) live on Heroku's self-hosted page — here we focus on why licensing matters specifically for this kind of software.",
    tradeoffsVsSaas:
      "Within the 100% FOSS subset, Coolify and Dokku are still very different from each other: Coolify is the more complete, polished option (one-click deploys, multi-server panel); Dokku is the more minimalist approach, no official web panel, deploying with a plain git push. FOSS licensing doesn't erase that scope difference — choosing \"FOSS only\" still leaves you deciding between a complete platform and a deliberately small tool.",
  },
  "Google Drive→self-hosted": {
    intent: "self-hosted",
    intro:
      "Replacing Google Drive with something self-hosted means deciding first what role the server should play in your files' lifecycle: storing and managing them end to end, or simply giving you one unified window over storage that already exists somewhere else. The catalog's 3 alternatives answer that question in completely different ways.",
    operationalNotes:
      "Nextcloud is the broadest-scope option: besides files it includes calendar, contacts, collaborative document editing and video calls — a productivity suite, not just storage. ownCloud is, as the project itself frames it, the origin Nextcloud grew out of, but the version the catalog tracks is its recent rewrite (Infinite Scale / oCIS): a new architecture with a smaller app ecosystem than Nextcloud's. Filestash is a completely different case: it stores nothing — it's a web interface that connects to backends you already have (S3, FTP, SFTP, WebDAV, your own Google Drive) and gives you one unified browsing experience over them.\n\nThat last distinction matters for deciding: if you don't already have storage to connect, Filestash won't work as a Google Drive replacement on its own — it needs a backend behind it. Nextcloud and ownCloud are full storage systems in their own right, with their own database and their own files.",
    tradeoffsVsSaas:
      "Nothing in the catalog supports the claim that ownCloud is faster or lighter than Nextcloud — the only verified fact is that its app ecosystem is smaller, a consequence of being a more recent, more focused rewrite. There's no data either on how secure Filestash's interface is compared to hosting your own storage — these are different architectures, not a trust scale. Choosing between the 3 comes down to whether you already have something to connect (Filestash), want the broadest suite (Nextcloud), or prefer a smaller, more recent base (ownCloud).",
  },
  "Google Photos→self-hosted": {
    intent: "self-hosted",
    intro:
      "Self-hosting your photo library splits the problem into two different moments: capture, with your phone backing up on its own with no intervention from you, or the library you already have, organizing and making it searchable without anything touching it. The catalog's 2 alternatives address each moment separately — they aren't the same tool under a different name.",
    operationalNotes:
      "Immich is centered on automatic backup: its mobile apps upload photos and videos to your server as soon as you take them, with facial recognition and object search to find them later. Per its own notes, it supports optional hardware acceleration for both video transcoding and facial recognition — neither is required, both are enabled separately if you have a GPU available. PhotoPrism is centered on organizing a library you already have: it auto-tags via AI and supports semantic search, but — as the catalog documents — it never modifies or moves the original files.\n\nPhotoPrism's license is worth being precise about: the catalog classifies it as \"Source-available (non-OSI)\" — the code is visible, but the license itself isn't OSI-approved as open source. That's a different category from Immich, which is fully FOSS (AGPL-3.0).",
    tradeoffsVsSaas:
      "Being FOSS isn't a guarantee of privacy or security — it's a property of the code's license, not a measure of how well it protects your photos. If what you need is your phone backing up automatically without thinking about it, Immich addresses that directly. If you already have a photo library and just want to organize it without anything touching it, PhotoPrism covers that case — with the caveat of its source-available license.",
  },
  "Google Docs→self-hosted": {
    intent: "self-hosted",
    intro:
      "Moving collaborative document editing to a server of your own means fixing the data's scope first: real-time text only, or the full office cycle with spreadsheets and presentations included? And in this specific case there's a second axis that matters too: what that server can actually read of the content it hosts.",
    operationalNotes:
      "Etherpad covers real-time collaborative text editing specifically — as the project itself specifies, \"it has no spreadsheets or presentations, just text.\" It isn't an incomplete office suite — it's a tool with a deliberately narrower scope, built for quick shared notes, not for replacing all of Google Workspace. CryptPad covers much more: documents, spreadsheets, presentations, forms and kanban boards on the same platform.\n\nThe second difference is architectural: CryptPad encrypts content end-to-end, so the server hosting it can't read what's inside the documents — that's a design fact, verifiable in that CryptPad doesn't even use a traditional database (it stores everything as encrypted files). Etherpad has no such design: its server can read the content, stored in a normal relational database.",
    tradeoffsVsSaas:
      "This isn't a claim that CryptPad is \"more secure\" in the abstract — it's a concrete architectural fact (the server can't read the content in the clear) that may or may not matter for your case. If all you need is quick collaborative notes, Etherpad is simpler to deploy and maintain. If you need a full suite and want encryption built into the server's design, CryptPad is the option that offers it.",
  },
  "Zendesk→self-hosted": {
    intent: "self-hosted",
    intro:
      "Replacing Zendesk with a self-hosted alternative means fixing the support model first: real-time conversation through one shared inbox, or a ticket queue with SLAs and a knowledge base behind it. The catalog's 2 alternatives aren't variants of the same product — each is built around a different model.",
    operationalNotes:
      "Chatwoot centers its product on a shared omnichannel inbox — web, email, WhatsApp, Instagram — with chatbots and automated replies, built for real-time conversation with customers. Zammad centers its on traditional support tickets, with a built-in knowledge base and SLA-driven automations — a queue model, not immediate conversation. Zammad also runs Elasticsearch alongside PostgreSQL, an extra service Chatwoot doesn't require.\n\nThere's a licensing nuance worth not glossing over: Chatwoot carries an MIT license — one of the most permissive that exists — but in our classification it's Open-Core, not FOSS, because, as the project specifies, \"some AI integrations are cloud-plan only.\" The code's license and the Open-Core business model are two different things: a permissive license doesn't stop a project from reserving features for its paid tier. Zammad, by contrast, is fully FOSS (AGPL-3.0).",
    tradeoffsVsSaas:
      "Fit depends on which channel carries most of your customer conversations: if it's live chat or social media, Chatwoot's shared-inbox model fits that directly. If your support runs mostly on ticket queues with service-level agreements, Zammad's model — with its knowledge base and automations — is the one built for that flow.",
  },
  "Retool→self-hosted": {
    intent: "self-hosted",
    intro:
      "Replacing a self-hosted internal-tools builder splits teams by their actual workflow: code-first, or visual-interface-first. The catalog's 3 alternatives split exactly along that line.",
    operationalNotes:
      "Windmill, as the project itself specifies, \"runs real code, not just visual low-code\": you write scripts in Python, TypeScript or Go, and it generates panels and flows from there. Budibase and Appsmith are visual drag-and-drop editors — Appsmith, in fact, is described in the catalog as \"very similar to Retool\" in how it works.\n\nAs a practical consequence of those different architectures, each uses a different database engine for its own metadata: Windmill on PostgreSQL, Budibase on CouchDB (a document database uncommon in this catalog), and Appsmith on MongoDB — running each means getting familiar with a different engine, not just a different tool interface.",
    tradeoffsVsSaas:
      "The choice comes down to what profile the team has: real code (Windmill) requires someone who can program, in exchange for full control over what gets built; a purely visual editor (Budibase, Appsmith) lets you prototype without writing code, at the cost of hitting a wall when you need something the editor doesn't cover.",
  },
  "Shopify Plus→self-hosted": {
    intent: "self-hosted",
    intro:
      "Taking the self-hosted route as an alternative to an enterprise tier like Shopify Plus means taking on full control of the infrastructure to work around API limits, fully customize the checkout, or run complex B2B catalogs that standardized SaaS plans aren't built to cover.",
    operationalNotes:
      "The two options reflect different scaling strategies. Magento Open Source (PHP) offers a dense, years-proven monolithic engine, built for massive catalogs with complex attributes and native B2B/B2C structures — its own listing calls it \"the most powerful for very large B2B/B2C catalogs,\" in exchange for considerably higher server requirements than the rest of the catalog's e-commerce alternatives. Saleor (Python/Django) leans into composable commerce: an API-first GraphQL architecture with event-driven webhooks, built to connect with external systems and serve multiple frontends at once — the project itself describes it as designed for very high-traffic stores, which is a design claim from the project, not a performance guarantee measured by us.\n\nOn infrastructure: Saleor runs on PostgreSQL and Redis; Magento runs on MySQL and Elasticsearch for catalog search — both engines come back up in the maintenance discussion below.",
    tradeoffsVsSaas:
      "The real cost of leaving an enterprise SaaS isn't the initial build, it's ongoing maintenance. You gain full sovereignty over your data and stop depending on fees tied to your plan's sales volume, but you inherit the critical responsibility for performance: your team has to configure load balancers, tune caching layers (Redis on Saleor, Elasticsearch on Magento) to survive traffic spikes like Black Friday, and secure the payment infrastructure to maintain PCI-DSS compliance — on the SaaS, Shopify carries that responsibility; here, it's yours.",
  },
  "Jira→self-hosted": {
    intent: "self-hosted",
    intro:
      "Jira is known for its configurable complexity, and the catalog's 3 self-hosted alternatives aren't interchangeable with each other — each is built for a different level of that complexity, not as a general Jira replacement.",
    operationalNotes:
      "Taiga covers agile management with Scrum and Kanban, backlog and user stories — documented in its own catalog entry with a \"much smaller learning curve than Jira,\" built for teams who want that simplicity without the rest of Jira's machinery. OpenProject goes the opposite direction: besides agile backlogs it adds interactive Gantt charts and time tracking with budgets — the project specifies it's \"the most complete for traditional + agile project management,\" built for larger teams with more formal planning needs than standard Jira usage.\n\nPlane sits in between the two: cycles, modules and Kanban/list/calendar/Gantt views with a more modern interface, without reaching OpenProject's depth on budgets and time tracking, and without staying at Taiga's deliberate simplicity. All 3 tools are self-hostable with Docker and use PostgreSQL as their database.",
    tradeoffsVsSaas:
      "Fit depends on the team's own way of working: one that ran basic Kanban/Scrum in Jira will likely find everything OpenProject adds overkill; one that relied on Gantt charts and budgets in Jira probably does need it, and Taiga wouldn't give them that.",
  },
};
