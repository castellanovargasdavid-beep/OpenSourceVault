import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DeployGuideContent } from "@/components/pages/deploy-guide-content";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.deployGuidePage.metaTitle(siteConfig.year),
  description: t.deployGuidePage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/en/guides/deploy-with-docker`,
    languages: {
      es: `${siteConfig.url}/guias/desplegar-con-docker`,
      en: `${siteConfig.url}/en/guides/deploy-with-docker`,
    },
  },
};

export default function DeployGuidePageEn() {
  return <DeployGuideContent locale="en" />;
}
