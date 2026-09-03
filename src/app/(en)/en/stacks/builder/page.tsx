import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { StackBuilderContent } from "@/components/pages/stack-builder-content";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.stackBuilder.metaTitle,
  description: t.stackBuilder.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/en/stacks/builder`,
    languages: { es: `${siteConfig.url}/stacks/builder`, en: `${siteConfig.url}/en/stacks/builder` },
  },
};

export default function EnglishStackBuilderPage() {
  const toolCards = tools.map(toToolCardData);
  return (
    <Suspense>
      <StackBuilderContent tools={toolCards} locale="en" t={t.stackBuilder} hardwareT={t.hardwareFit} />
    </Suspense>
  );
}
