import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getAllReplaceMappings } from "@/lib/replace";
import { ReplaceWizardContent } from "@/components/pages/replace-wizard-content";

const t = getDictionary("es");

export const metadata: Metadata = {
  title: t.replaceFlow.metaTitle,
  description: t.replaceFlow.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/replace`,
    languages: { es: `${siteConfig.url}/replace`, en: `${siteConfig.url}/en/replace` },
  },
};

export default function ReplacePage() {
  const mappings = getAllReplaceMappings("es");
  return <ReplaceWizardContent mappings={mappings} locale="es" />;
}
