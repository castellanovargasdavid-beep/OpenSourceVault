import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
  alternates: {
    canonical: `${siteConfig.url}/en/privacy`,
    languages: { es: `${siteConfig.url}/privacy`, en: `${siteConfig.url}/en/privacy` },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPageEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-400">Last updated: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Who we are</h2>
          <p>
            {siteConfig.name} ({siteConfig.url}) is an informational catalog of open source,
            self-hostable alternatives to popular SaaS software. This site is operated by an
            individual, not a company.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. What data we collect</h2>
          <p>
            {siteConfig.name} doesn&apos;t require an account, has no sign-up forms, and doesn&apos;t
            store personal information in a database. We don&apos;t use our own tracking cookies.
          </p>
          <p className="mt-2">
            We use <strong>Vercel Analytics</strong> to measure aggregate site traffic (page views,
            approximate country, device type). This service doesn&apos;t use cookies and doesn&apos;t
            collect personally identifiable information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Affiliate links and third-party sites</h2>
          <p>
            Some links on this site (to hosting providers like DigitalOcean, Vultr or Railway, or to
            the websites and repositories of the listed tools) are affiliate links or simply external
            links. Clicking them takes you off {siteConfig.name} and subjects you to the destination
            site&apos;s own privacy policy and cookies, which we don&apos;t control. See the{" "}
            <Link href="/en/affiliate-disclosure" className="font-medium text-emerald-700 hover:underline">
              Affiliate Disclosure
            </Link>{" "}
            for more detail on these relationships.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. How we use information</h2>
          <p>
            Aggregate, anonymous analytics data is used only to understand what content is useful and
            to improve the catalog. We don&apos;t sell or share personal data with third parties
            because we simply don&apos;t collect any.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Your rights</h2>
          <p>
            If you ever contact us by email and that message contains personal data (your email
            address, for example), you can ask us at any time to delete it, correct it, or tell you
            what information we have, by writing to the contact address below.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Changes to this policy</h2>
          <p>
            We may update this policy occasionally to reflect changes to the site or applicable law.
            The &quot;last updated&quot; date at the top of this page always reflects the current version.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Contact</h2>
          <p>
            For any question about this policy, email us at{" "}
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
