import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { JsonLd } from "@/components/site/json-ld";
import { siteConfig } from "@/lib/site-config";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const zhDescription =
  "AltFreeStack 中文版（试点）——AI/LLM 与 self-hosting 领域的开源 SaaS 替代方案，包含许可证、Docker 部署方式与真实配置要求。";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.zhTagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: zhDescription,
  alternates: {
    canonical: `${siteConfig.url}/zh`,
    languages: { es: siteConfig.url, en: `${siteConfig.url}/en`, "zh-CN": `${siteConfig.url}/zh`, "x-default": siteConfig.url },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `${siteConfig.url}/zh`,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.zhTagline}`,
    description: zhDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.zhTagline}`,
    description: zhDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Deliberadamente SIN StackBuilderProvider/StackBuilderWidget: ninguna
 * página del piloto zh-CN (ver lib/zh-mvp.ts) usa el Stack Builder, así
 * que no tiene sentido cargar ese contexto/widget flotante aquí — reduce
 * el bundle de cliente en vez de cargar una funcionalidad sin ruta real a
 * la que llevar (sección 20 del encargo).
 */
export default function ChineseRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: siteConfig.name,
            url: siteConfig.url,
            description: zhDescription,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: `${siteConfig.url}/zh`,
            inLanguage: "zh-CN",
          }}
        />
        <Header locale="zh" />
        <main className="flex-1">{children}</main>
        <Footer locale="zh" />
        <Analytics />
      </body>
    </html>
  );
}
