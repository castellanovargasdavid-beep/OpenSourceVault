import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllReplaceMappings } from "@/lib/replace";
import { ReplaceWizardContent } from "@/components/pages/replace-wizard-content";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.replaceFlow.metaTitle,
  description: t.replaceFlow.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/en/replace`,
    languages: { es: `${siteConfig.url}/replace`, en: `${siteConfig.url}/en/replace` },
  },
};

export default function EnglishReplacePage() {
  const mappings = getAllReplaceMappings("en");
  return <ReplaceWizardContent mappings={mappings} locale="en" />;
}
