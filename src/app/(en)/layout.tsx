import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const enTagline = "The best Open Source alternatives to the software you already use";
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
    languages: { es: siteConfig.url, en: `${siteConfig.url}/en` },
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
        <Header locale="en" />
        <main className="flex-1">{children}</main>
        <Footer locale="en" />
        <Analytics />
      </body>
    </html>
  );
}
