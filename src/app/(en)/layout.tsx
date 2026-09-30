import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { StackBuilderProvider } from "@/lib/stack-builder-store";
import { StackBuilderWidget } from "@/components/site/stack-builder-widget";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const enTagline = siteConfig.enTagline;
const enDescription = getDictionary("en").siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${enTagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: enDescription,
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: { es: siteConfig.url, en: `${siteConfig.url}/en`, "x-default": siteConfig.url },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${siteConfig.url}/en`,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${enTagline}`,
    description: enDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${enTagline}`,
    description: enDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary("en");
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: enDescription,
          }}
        />
        {/* WebSite complements Organization (entity vs. website) — no
            potentialAction/SearchAction since the /en/tools search box is a
            client-side filter with no URL of its own (?q=), not a real
            results page: declaring a SearchAction that doesn't work on click
            would be worse than declaring none. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: `${siteConfig.url}/en`,
            inLanguage: "en",
          }}
        />
        <StackBuilderProvider defaultStackName={t.stackBuilder.defaultProjectName}>
          <Header locale="en" />
          <main className="flex-1">{children}</main>
          <Footer locale="en" />
          <StackBuilderWidget locale="en" t={t.stackBuilder} />
        </StackBuilderProvider>
        <Analytics />
      </body>
    </html>
  );
}
