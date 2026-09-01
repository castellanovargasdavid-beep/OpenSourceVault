import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { PromoteContent } from "@/components/pages/promote-content";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.promotePage.metaTitle,
  description: t.promotePage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/promote`,
    languages: { es: `${siteConfig.url}/promote`, en: `${siteConfig.url}/en/promote` },
  },
};

export default function PromotePage() {
  return <PromoteContent locale="es" />;
}
