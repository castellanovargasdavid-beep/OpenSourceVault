import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DeployGuideContent } from "@/components/pages/deploy-guide-content";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.deployGuidePage.metaTitle(siteConfig.year),
  description: t.deployGuidePage.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/en/guias/desplegar-con-docker`,
    languages: {
      es: `${siteConfig.url}/guias/desplegar-con-docker`,
      en: `${siteConfig.url}/en/guias/desplegar-con-docker`,
    },
  },
};

export default function DeployGuidePageEn() {
  return <DeployGuideContent locale="en" />;
}
