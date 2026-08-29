import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { HostingDealsContent } from "@/components/pages/hosting-deals-content";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.hostingDeals.metaTitle,
  description: t.hostingDeals.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/hosting-deals`,
    languages: { es: `${siteConfig.url}/hosting-deals`, en: `${siteConfig.url}/en/hosting-deals` },
  },
};

export default function HostingDealsPage() {
  return <HostingDealsContent locale="es" />;
}
