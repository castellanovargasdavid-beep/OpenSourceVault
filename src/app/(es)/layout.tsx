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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
    languages: { es: siteConfig.url, en: `${siteConfig.url}/en` },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = getDictionary("es");
  return (
    <html lang="es" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
          }}
        />
        <StackBuilderProvider defaultStackName={t.stackBuilder.defaultProjectName}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StackBuilderWidget locale="es" t={t.stackBuilder} />
        </StackBuilderProvider>
        <Analytics />
      </body>
    </html>
  );
}
