import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How to contribute to the catalog",
  description: `How to add a tool, fix outdated data, or propose a change on ${siteConfig.name} — no database, everything goes through a GitHub Pull Request.`,
  alternates: {
    canonical: `${siteConfig.url}/en/contribute`,
    languages: { es: `${siteConfig.url}/contribuir`, en: `${siteConfig.url}/en/contribute`, "x-default": `${siteConfig.url}/contribuir` },
  },
  robots: { index: true, follow: true },
};

const REPO = siteConfig.links.github;

export default function ContributePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How to contribute</h1>
      <p className="mt-3 text-lg text-slate-600">
        {siteConfig.name} has no database and no admin panel: the whole catalog lives in versioned code
        files on GitHub. Contributing means editing those files and opening a Pull Request — or, if you
        would rather not touch code, opening an Issue with the matching template.
      </p>

      <div className="mt-10 space-y-10 text-slate-600">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Where the catalog lives</h2>
          <p>
            Every tool is an entry in{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/data/tools.ts</code>.
            The English translation of that same entry (description, features, pros/cons) goes in{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/data/tools.en.ts</code>,
            keyed by the same <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">id</code>.
            There is no other place data is stored — what you see on the site is literally that file&apos;s content
            as of the last build.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Adding a new tool</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Fork the repo and open{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/data/tools.ts</code>.
            </li>
            <li>Copy an existing entry from a similar category as a template and add yours to the array.</li>
            <li>
              Add the English translation (same <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">id</code>) in{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">tools.en.ts</code>.
            </li>
            <li>
              Run <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run dev</code> and check
              the tool&apos;s page renders correctly, then{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run build</code> to confirm
              nothing is broken.
            </li>
            <li>Open a Pull Request. If you would rather not touch code, open an Issue instead (see below) and we will add it.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Fields on a listing</h2>
          <p className="mb-3">
            The <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">OpenSourceTool</code> type (in{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/lib/types.ts</code>) requires
            these fields for the build to compile:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">id</code> /{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">slug</code> — the same
              lowercase, hyphenated string (e.g. <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;n8n&quot;</code>). Must be unique across the whole catalog.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">name</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">description</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">shortDescription</code>.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">replaces</code> — array of the
              SaaS product(s) it replaces, e.g. <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">[&quot;Notion&quot;, &quot;Slite&quot;]</code>.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">category</code> — one of the
              existing categories in <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">ToolCategory</code> (src/lib/types.ts). If none fits, say so in the PR/Issue and we will discuss it.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">websiteUrl</code> /{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">githubUrl</code>.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">license</code> — the real
              license exactly as it appears in the repo&apos;s LICENSE file (e.g.{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;MIT&quot;</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;AGPL-3.0&quot;</code>, &quot;Sustainable
              Use License (Fair-code)&quot;), not a generic &quot;open source&quot;.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">dockerCompose</code> — the
              project&apos;s real docker-compose.yml, with images on a fixed version whenever the project publishes one
              (avoid <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">:latest</code> if a
              stable tag exists). If it genuinely does not deploy via docker-compose (its own installer script like{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">curl | bash</code>), put that
              script there instead with a comment explaining what it does.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">affiliateLinks</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">features</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">techStack</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">pros</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">cons</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">tags</code>.
            </li>
          </ul>
          <p className="mt-4 mb-3">
            These other fields are optional for the build to compile, but we expect them on any new tool now
            that we enforce them systematically:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">fossModel</code> —{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;FOSS&quot;</code> (OSI license, no
              paid feature), <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;OpenCore&quot;</code>{" "}
              (OSI core + paid features), <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;FairCode&quot;</code>{" "}
              (no usage limits but a non-OSI license banning resale) or{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;SourceAvailable&quot;</code> (public
              code, non-OSI license). Do not set it if you are not sure — we will review it before publishing.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">minRamMb</code> /{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">difficulty</code> — if you
              omit these, they are inferred automatically by counting your{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">dockerCompose</code>&apos;s
              services. Only set them by hand if you know the project&apos;s real RAM requirement and want it more
              precise than the estimate.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">dockerStatus</code> —{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;VERIFIED_PINNED&quot;</code> if
              you have checked the image actually exists under that exact tag on its real registry. Do not set it
              if you have not verified it yourself.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What we accept</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Self-hosted software that genuinely works — not a product announcement or an idea-stage project.</li>
            <li>A public, reachable source repository (GitHub, GitLab, Codeberg...).</li>
            <li>An identifiable, verifiable license in that repository — not just &quot;it&apos;s open source&quot;.</li>
            <li>
              Recognizable recent activity (commits, releases, or answered issues in the last few months). We do
              not have an exact day threshold — if the project has had no movement at all for a long time,
              say so in the PR and we will judge it case by case; we do not auto-reject on a specific date.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Reporting outdated data</h2>
          <p className="mb-3">
            If you spot a license that changed, a Docker image still on{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">:latest</code> that should now
            be pinned, a dead link, or any other stale data, open an Issue with the template below — you do not
            need to know how to fix it, just point it out with a link to the real source (the repo&apos;s LICENSE
            file, the registry&apos;s tags page, etc.).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Direct links</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`${REPO}/issues/new?template=add_tool.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center font-medium text-emerald-800 hover:bg-emerald-100"
            >
              + Suggest a new tool
            </a>
            <a
              href={`${REPO}/issues/new?template=report_outdated_data.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center font-medium text-amber-800 hover:bg-amber-100"
            >
              ⚠ Report outdated data
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-medium text-slate-700 hover:bg-slate-100"
            >
              Open a Pull Request
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
