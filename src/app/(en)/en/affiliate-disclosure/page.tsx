import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description: `How ${siteConfig.name} is funded through affiliate links.`,
  alternates: {
    canonical: `${siteConfig.url}/en/affiliate-disclosure`,
    languages: { es: `${siteConfig.url}/affiliate-disclosure`, en: `${siteConfig.url}/en/affiliate-disclosure` },
  },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePageEn() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Affiliate Disclosure</h1>
      <p className="mt-3 text-sm text-slate-400">Last updated: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">How {siteConfig.name} is funded</h2>
          <p>
            {siteConfig.name} is free for everyone. To keep it that way, we use affiliate links to
            hosting providers: if you sign up with one through a link on this site, we may earn a
            commission, <strong>at no extra cost to you</strong> — you&apos;d pay the same going
            directly to their website.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Current programs</h2>
          <p>We currently participate in the affiliate programs of:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>DigitalOcean</li>
            <li>Vultr</li>
            <li>Railway</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">How to spot an affiliate link</h2>
          <p>
            The &quot;Deploy on DigitalOcean / Vultr / Railway&quot; buttons shown on every tool profile and
            on the{" "}
            <Link href="/en/hosting-deals" className="font-medium text-emerald-700 hover:underline">
              Hosting &amp; Deals
            </Link>{" "}
            page are affiliate links. Every other link on the site (a tool&apos;s official website,
            GitHub repository, demo) is not an affiliate link.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Editorial independence</h2>
          <p>
            Whether a tool is included in the catalog, its category, its pros and cons, and whether it
            appears as featured are decided by editorial criteria (project maturity, active community,
            ease of deployment) — not by whether its recommended hosting provider has an affiliate
            program with us. We don&apos;t accept payment from the listed open source projects in
            exchange for inclusion or a more favorable review.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Contact</h2>
          <p>
            If you have questions about this disclosure, email us at{" "}
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
