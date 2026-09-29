import type { ToolCategory } from "@/lib/types";
import type { CategoryFaqEntry } from "./category-faqs";

/** English translation of the fixed technical FAQs in category-faqs.ts. Same keys. */
export const categoryFaqsEn: Partial<Record<ToolCategory, CategoryFaqEntry[]>> = {
  Productivity: [
    {
      q: "What's the minimum server I need to host Productivity tools?",
      a: "Most of these (AppFlowy, Focalboard, Outline...) run comfortably on 1-2 vCPU and 2GB of RAM — a ~$12/month plan on DigitalOcean or Vultr. The ones that ship a heavier stack of their own (Postgres + Redis + extra services, like Huly) feel more comfortable with 4GB.",
    },
    {
      q: "How are backups of the data volumes handled?",
      a: "Almost all of them store their state in Postgres/SQLite plus a Docker volume for attachments. The typical routine is a scheduled database dump (pg_dump, or SQLite's own .backup) plus a copy of the volume via rsync or restic to another disk or an S3-compatible bucket. Since the containers themselves hold no state, backing up the dump and the volume is enough to rebuild the whole stack from the docker-compose.",
    },
    {
      q: "Is it safe to expose these tools to the internet, or is a VPN/Tailscale preferable?",
      a: "Most ship their own login and are meant to be exposed behind a reverse proxy (Caddy/Traefik) with TLS — that's the normal deployment pattern, and it's fine as long as you keep the image updated and use strong passwords (plus 2FA where the tool supports it). If usage is purely internal and doesn't need to be public, putting it behind Tailscale/WireGuard removes the whole \"exposed web app\" attack surface, at the cost of needing the VPN client on every device.",
    },
    {
      q: "How do the costs compare against commercial SaaS alternatives?",
      a: "Compared to Notion ($10/user/month on the Business plan) or Airtable ($20/user/month), a $12/month 2GB VPS covers your whole team with no per-seat cost — the savings grow with team size, not with usage.",
    },
  ],
  Storage: [
    {
      q: "What's the minimum server I need to host Storage tools?",
      a: "A base install of Nextcloud, Immich or Seafile runs fine on 2 vCPU and 4GB of RAM (~$24/month). But the real bottleneck isn't the process's RAM — it's disk. Server size here is dictated by how much you're going to store, not by the app itself.",
    },
    {
      q: "How are backups of the data volumes handled?",
      a: "Backups here have two layers: the database (Postgres/SQLite, with a scheduled dump) and the file library itself, which is usually much bigger — backed up via rsync or restic to a separate disk or an S3-compatible bucket. Since there are real, irreplaceable user files here (not just config), it's worth actually testing a restore now and then instead of just trusting that the cron job ran.",
    },
    {
      q: "Is it safe to expose these tools to the internet, or is a VPN/Tailscale preferable?",
      a: "Sync tools like Nextcloud are built to be reachable from your phone on any network, so exposing them via reverse proxy + TLS + fail2ban is the normal path. For apps holding more sensitive data (family photos in Immich, say), locking down at least the admin panel with VPN/Tailscale and turning on 2FA cuts risk a lot — a compromised storage app can leak everything it holds.",
    },
    {
      q: "How do the costs compare against commercial SaaS alternatives?",
      a: "Compared to Google Drive ($7.20/user/month on Workspace Business Starter) or Dropbox ($15/user/month on the Standard plan), self-hosted storage usually comes out cheaper past a handful of users — though here you're paying for the disk itself, not just the software.",
    },
  ],
  Analytics: [
    {
      q: "What's the minimum server I need to host Analytics tools?",
      a: "Plausible or Umami run comfortably on 1 vCPU and 1GB of RAM even under moderate traffic, since they only aggregate events instead of storing a full session per visitor. The ones shipping a heavier stack (PostHog, with Postgres + Redis) need more headroom — we've already documented that as ~15GB of disk for that case.",
    },
    {
      q: "How are backups of the data volumes handled?",
      a: "Usually it's a single database (Postgres, plus ClickHouse for a full-scale PostHog) — a scheduled dump (pg_dump/pg_basebackup) is enough. Losing this data means losing your historical stats, not a feature your users rely on live, so a daily backup is generally plenty.",
    },
    {
      q: "Is it safe to expose these tools to the internet, or is a VPN/Tailscale preferable?",
      a: "The tracking script and its endpoint have to be public by definition — they receive hits straight from your own visitors' browsers. What you can restrict is the admin dashboard: it already ships with its own login, and if you never need to check it from a network other than your own, putting it behind VPN/Tailscale too costs nothing and shrinks the exposed surface.",
    },
    {
      q: "How do the costs compare against commercial SaaS alternatives?",
      a: "Paid analytics SaaS tools typically charge by event volume or traffic, so the bill grows with your site's success — a $6-12/month VPS running Plausible or Umami doesn't scale that way. We don't have our own verified figure for every paid analytics SaaS to give an exact savings number, so we're not inventing one here: the advantage grows with your traffic, and the privacy benefit for your visitors is real from the very first one.",
    },
  ],
  AI: [
    {
      q: "What's the minimum server I need to host AI tools?",
      a: "It depends on whether you're running models on the server itself. Just the interface (Open WebUI, Flowise, Dify) runs fine on 2 vCPU and 4GB with no GPU. If you're also running local inference with Ollama or LocalAI: CPU-only is viable for models ≤7B (needs ~8GB of free RAM); for 13B+ models or fast inference, a dedicated GPU with 8-12GB+ VRAM is recommended.",
    },
    {
      q: "How are backups of the data volumes handled?",
      a: "It's worth telling apart what's actually irreplaceable here: your configuration, chat history, and any documents you uploaded for RAG do need backing up. The downloaded model weights don't — they can be re-pulled from the model registry (Ollama's library, HuggingFace...), so there's no point including them in the backup.",
    },
    {
      q: "Is it safe to expose these tools to the internet, or is a VPN/Tailscale preferable?",
      a: "Chat interfaces often hold API keys and can trigger expensive (or billable, if they call an external provider) compute, so exposing them without authentication is riskier than a plain static site. Always turn on the built-in login, and if the instance proxies an OpenAI/Anthropic key behind it, consider VPN/Tailscale instead of just a public login page to avoid brute-force attempts or a surprise bill.",
    },
    {
      q: "How do the costs compare against commercial SaaS alternatives?",
      a: "Self-hosting AI doesn't remove the compute cost, it shifts it: running local models means investing in your own RAM/GPU (or renting a GPU VPS), which pays off with heavy, steady usage. For light or occasional use, a subscription like ChatGPT Plus can still be cheaper than maintaining a dedicated GPU — we don't have our own verified figure for hourly cloud GPU pricing, so we're not inventing one here.",
    },
  ],
  PasswordManagers: [
    {
      q: "What's the minimum server I need to host Security tools?",
      a: "Vaultwarden is one of the lightest options in the whole catalog: its own listing describes it as \"ideal for small VPS instances,\" and it runs fine on 1 vCPU and 512MB-1GB of RAM — the entry-level ~$4-6/month plan from any provider.",
    },
    {
      q: "How are backups of the data volumes handled?",
      a: "Your entire vault lives in a single database (SQLite or Postgres) plus the attachments volume — back up both. Treat that backup with the same care as the vault itself: if someone steals an unencrypted backup, they've stolen your whole password manager.",
    },
    {
      q: "Is it safe to expose these tools to the internet, or is a VPN/Tailscale preferable?",
      a: "This is the one category where we'd lean towards NOT exposing it directly if you can avoid it. Even though Vaultwarden requires a master password and supports 2FA, a password vault is the single highest-value target in your whole stack — putting it behind Tailscale/WireGuard (or, at minimum, fail2ban plus a properly configured reverse proxy) is worth the extra friction more here than almost anywhere else in this catalog.",
    },
    {
      q: "How do the costs compare against commercial SaaS alternatives?",
      a: "Compared to 1Password ($7.99/user/month on the Business plan), Vaultwarden on a $4-6/month VPS covers your whole team regardless of size — it comes out cheaper than 1Password from your second user onward, and the gap widens fast with larger teams.",
    },
  ],
};
