# AltFreeStack

**Curated directory of self-hosted alternatives to commercial SaaS.**

Every SaaS tool you pay for monthly probably has an open-source, self-hostable twin — you just have to find it, check its license, and figure out how to run it. AltFreeStack does that legwork: 140+ tools, each with a real license, an honest pros/cons list, and a ready-to-copy `docker-compose.yml` so you can go from "found it" to "running on my own server" in minutes, not hours.

🔗 **Live site:** [altfreestack.com](https://altfreestack.com)

## Why this exists

- **Deploy fast.** Every tool page ships a copy-pasteable `docker-compose.yml` — no digging through a README to figure out the right environment variables.
- **Know the license before you commit.** AGPL, MIT, Apache-2.0, fair-code, source-available — labeled clearly, because "open source" isn't one license.
- **See the real cost difference.** A savings calculator compares what you're paying today per seat against a single $5-6/mo VPS running the self-hosted alternative.
- **Compare, don't guess.** Head-to-head comparison pages and migration guides for the tools that genuinely compete with each other.

## Tech stack

- **Next.js 16** (App Router, Server Components, static generation)
- **TypeScript**
- **Tailwind CSS v4**
- Hand-written shadcn/ui-style components (`src/components/ui`) + [Lucide](https://lucide.dev) icons
- Tool data lives in versioned TypeScript files (`src/data`) — no database, no CMS
- [Vercel Analytics](https://vercel.com/analytics)

## Project structure

```
src/
  app/
    (es)/                        → Spanish routes (default locale, no prefix)
      tool/[slug]/                 /tool/{slug} — tool detail page
      categoria/[category]/        /categoria/{slug} — category listing
      alternativas/[slug]/         /alternativas/{saas} — "alternatives to X"
      comparar/[pair]/             /comparar/{a}-vs-{b} — head-to-head comparison
      guias/                       deployment + migration guides
    (en)/en/                     → English routes, same shape under /en
      tool/[slug]/, categories/[category]/, alternatives/[slug]/, compare/[pair]/, guides/
    api/                        → route handlers (tool-interest, promote)
    sitemap.ts, robots.ts       → generated from the data below

  data/
    tools.ts                    → the catalog: every tool's metadata, license,
                                   docker-compose, pros/cons, tags (English translations
                                   live in tools.en.ts)
    categories.ts               → the 13 categories tools are grouped into
    hosting-providers.ts        → VPS providers shown in the deploy widget

  components/
    site/                        header, footer, tool card, docker-compose block, ...
    pages/                       the content for each route, shared between locales
    ui/                          low-level building blocks (button, card, badge, input)

  lib/                          data helpers: alternatives.ts, comparisons.ts, routes.ts,
                                 category-colors.ts, github-stats.ts, utils.ts
  i18n/                        es/en dictionaries + locale plumbing
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables are required to run the site — everything falls back to a safe placeholder (see [`.env.example`](.env.example) if you want to wire up GitHub live stats or the sponsorship email form).

Other scripts:

```bash
npm run build   # production build (also type-checks and generates the sitemap)
npm run start   # serve the production build
npm run lint    # ESLint
```

## How to contribute

The easiest, most useful contribution is **adding a tool that isn't in the catalog yet**.

1. Fork the repo and open `src/data/tools.ts`.
2. Copy an existing entry that's in a similar category as a template, and add yours to the array. At minimum, fill in:

   ```ts
   {
     id: "your-tool-slug",
     name: "Your Tool",
     slug: "your-tool-slug",
     replaces: ["The SaaS Product It Replaces"],
     category: "DevTools", // see src/lib/types.ts for the full ToolCategory list
     description: "A couple of sentences about what it does and who it's for.",
     shortDescription: "One line, shown on the card.",
     websiteUrl: "https://example.com",
     githubUrl: "https://github.com/org/repo",
     license: "MIT", // the real SPDX-ish license, not just "open source"
     dockerCompose: `version: "3.8"\nservices:\n  app:\n    image: org/tool:latest\n    ports:\n      - "8080:8080"\n`,
     affiliateLinks: { digitalOceanUrl: "", vultrUrl: "", railwayUrl: "" }, // leave empty, filled globally
     features: ["Key feature one", "Key feature two"],
     techStack: ["Node.js", "PostgreSQL"],
     pros: ["Genuinely good thing about it"],
     cons: ["Honest limitation or tradeoff"],
     tags: ["docker-ready"], // "docker-ready" | "1-click-deploy" | "permissive-license"
   }
   ```

3. Add the matching English copy (`description`, `shortDescription`, `features`, `pros`, `cons`) for that same `id` in `src/data/tools.en.ts`.
4. Run `npm run dev` and check the tool's page renders correctly, then `npm run build` to make sure nothing's broken.
5. Open a PR. If you'd rather not touch the code, open an issue instead using the **[Add a tool](.github/ISSUE_TEMPLATE/add_tool.md)** template and we'll add it.

A few things that make a submission easy to merge:

- The `dockerCompose` snippet should actually work — test it if you can.
- Be honest in `cons` — a tool with no listed drawbacks reads as unreviewed, not as perfect.
- Don't invent a `starsCount` or claim a license you haven't verified against the repo's actual `LICENSE` file.
- If the project offers a genuine one-click deploy template (Railway, Coolify, etc.), add its URL as `deployUrl` — otherwise leave it out.

Bug fixes, UI improvements, and correcting outdated info (a license that changed, a stale star count) are just as welcome — no special process, just open a PR.

## License

MIT — see [LICENSE](LICENSE). The catalog data (tool descriptions, license labels, docker-compose snippets) is original content written for this project; it doesn't inherit the license of the tools it describes.
