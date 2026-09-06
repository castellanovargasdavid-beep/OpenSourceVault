import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { saasPricing } from "@/data/saas-pricing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "How we audit each tool",
  description: `The real methodology behind the "audited" label on ${siteConfig.name}: what we check, how, and what we can't guarantee.`,
  alternates: {
    canonical: `${siteConfig.url}/en/how-we-audit`,
    languages: { es: `${siteConfig.url}/como-auditamos`, en: `${siteConfig.url}/en/how-we-audit` },
  },
  robots: { index: true, follow: true },
};

const fossCount = tools.filter((t) => t.fossModel === "FOSS").length;
const openCoreCount = tools.filter((t) => t.fossModel === "OpenCore").length;
const dockerCount = tools.filter((t) => t.tags.includes("docker-ready")).length;

export default function HowWeAuditPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">How we audit each tool</h1>
      <p className="mt-3 text-sm text-slate-600">Last updated: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <p>
            When we say a tool is &quot;audited&quot; on {siteConfig.name}, it&apos;s not a marketing
            phrase: it means it goes through this specific checklist. This page explains exactly what
            we check, where each data point comes from and — just as important — what we{" "}
            <strong>can&apos;t</strong> guarantee.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What we check on every tool page</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-medium text-slate-900">✅ License</p>
              <p>
                Taken directly from the official GitHub repository. Every tool page links to the
                repository so you can verify it yourself — don&apos;t just take our word for it.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ FOSS vs. Open-Core</p>
              <p>
                We explicitly distinguish between 100% free software (&quot;FOSS&quot;, {fossCount} tools
                in the catalog) and projects where the core is free but advanced features or enterprise
                plans stay paid (&quot;Open-Core&quot;, {openCoreCount} tools). We never blend the two
                under the same &quot;100% free&quot; claim.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Docker Ready</p>
              <p>
                {dockerCount} out of {tools.length} tools ship a real docker-compose.yml on their page. We
                check that its syntax is valid with our own{" "}
                <Link href="/en/doctor" className="font-medium text-emerald-700 hover:underline">
                  Doctor Compose
                </Link>{" "}
                tool, but that validates the file&apos;s syntax — it doesn&apos;t replace deploying it
                yourself and checking it fits your specific environment.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Estimated minimum RAM</p>
              <p>
                This is an estimate, not a production measurement: we calculate it from the number of
                services in the docker-compose.yml and the database engine it uses (a SQLite or embedded
                database weighs less than Postgres or Elasticsearch, for example). Treat it as a starting
                point for picking a server, not a guaranteed exact figure.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ GitHub stars and activity</p>
              <p>
                Read live from the public GitHub API. If the API doesn&apos;t respond while a page is
                generated, we don&apos;t silently keep a stale number: we simply don&apos;t show it until
                it&apos;s available again.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Latest project update</p>
              <p>
                Our &quot;Is it safe to update?&quot; tool checks the real latest release published on
                GitHub — it&apos;s not a date we maintain by hand that goes stale.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Official SaaS pricing it replaces</p>
              <p>
                We only show a price figure when we&apos;ve manually verified it against the SaaS&apos;s
                official website ({saasPricing.length} SaaS verified right now). For the rest, we show an
                honest message without making up a number — and we always link to the official site for
                the current price, since these providers change them often.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">What we don&apos;t do</h2>
          <p className="mb-2">Just as important as the above — so &quot;audited&quot; doesn&apos;t become an empty promise:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>We haven&apos;t deployed all {tools.length} tools in the catalog to real production ourselves.</li>
            <li>We don&apos;t audit source code for security vulnerabilities.</li>
            <li>We don&apos;t guarantee a docker-compose.yml works unmodified on every environment or Docker version.</li>
            <li>We don&apos;t accept payment from listed projects in exchange for inclusion or a more favorable review.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Found outdated or incorrect data?</h2>
          <p>
            Report it on{" "}
            <a
              href={`${siteConfig.links.github}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:underline"
            >
              our GitHub repository
            </a>{" "}
            and we&apos;ll fix it.
          </p>
        </section>
      </div>
    </div>
  );
}
