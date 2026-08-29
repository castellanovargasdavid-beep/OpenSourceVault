import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms and conditions for using ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/en/terms`,
    languages: { es: `${siteConfig.url}/terms`, en: `${siteConfig.url}/en/terms` },
  },
  robots: { index: true, follow: true },
};

export default function TermsPageEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Terms of Use</h1>
      <p className="mt-3 text-sm text-slate-400">Last updated: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Acceptance of terms</h2>
          <p>
            By using {siteConfig.name} ({siteConfig.url}) you agree to these terms. If you don&apos;t
            agree, simply don&apos;t use the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. What {siteConfig.name} is</h2>
          <p>
            {siteConfig.name} is an independent, informational catalog of open source, self-hostable
            alternatives to popular SaaS software. We are not the developers of the listed tools, and
            we are not officially affiliated with them or with the SaaS companies they replace, unless
            explicitly stated.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Permitted use</h2>
          <p>
            You may browse, read, and share the site&apos;s content freely. You may not copy the full
            catalog to republish it as your own, or use automated techniques (mass scraping) that
            overload the service.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Trademarks and third-party links</h2>
          <p>
            The names, logos, and trademarks of the tools and SaaS services mentioned on this site
            belong to their respective owners and are used solely for identification and informational
            purposes (nominative use). Links to third-party websites, GitHub repositories, and demos
            take you off {siteConfig.name}; we don&apos;t control and aren&apos;t responsible for the
            content, security, or availability of those sites.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Accuracy of information</h2>
          <p>
            We try to keep the catalog&apos;s information (licenses, features, reference pricing,
            deployment commands) accurate and up to date, but it can become outdated without notice.
            Always verify critical details (license, pricing, technical requirements) with each
            tool&apos;s official source before making a decision.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Affiliate links</h2>
          <p>
            Some links to hosting providers are affiliate links. See the{" "}
            <Link href="/en/affiliate-disclosure" className="font-medium text-emerald-700 hover:underline">
              Affiliate Disclosure
            </Link>{" "}
            for more information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Limitation of liability</h2>
          <p>
            The site is provided &quot;as is,&quot; without warranties of any kind. We aren&apos;t liable for
            losses or damages arising from decisions made based on the information published here,
            from installing third-party software, or from using affiliate links.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Changes to these terms</h2>
          <p>
            We may update these terms occasionally. The &quot;last updated&quot; date at the top of this page
            always reflects the current version.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Contact</h2>
          <p>
            For any question about these terms, email us at{" "}
            <a href="mailto:hola@altfreestack.com" className="font-medium text-emerald-700 hover:underline">
              hola@altfreestack.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
