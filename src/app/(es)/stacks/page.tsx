import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { StacksPageContent } from "@/components/pages/stacks-page-content";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.stacksPage.metaTitle,
  description: t.stacksPage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/stacks`,
    languages: { es: `${siteConfig.url}/stacks`, en: `${siteConfig.url}/en/stacks` },
  },
};

export default function StacksPage() {
  return <StacksPageContent locale="es" />;
}
