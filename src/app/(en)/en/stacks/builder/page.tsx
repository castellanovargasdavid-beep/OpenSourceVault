import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { toStackToolProfile } from "@/lib/stack-resources";
import { StackBuilderContent } from "@/components/pages/stack-builder-content";

const t = getDictionary("en");

// Same reasoning as the ES page: the canonical below already protects any
// `?tools=` shared-stack variant without needing to read `searchParams` in
// metadata (which would turn this static page into a per-request dynamic
// one — see DATA_QUALITY_AUDIT.md for why that trade-off was declined).
export const metadata: Metadata = {
  title: t.stackBuilder.metaTitle,
  description: t.stackBuilder.metaDescription,
  alternates: {
    canonical: `${siteConfig.url}/en/stacks/builder`,
    languages: { es: `${siteConfig.url}/stacks/builder`, en: `${siteConfig.url}/en/stacks/builder`, "x-default": `${siteConfig.url}/stacks/builder` },
  },
};

export default function EnglishStackBuilderPage() {
  const toolCards = tools.map(toToolCardData);
  const profiles = Object.fromEntries(tools.map((tool) => [tool.slug, toStackToolProfile(tool)]));
  return (
    <Suspense>
      <StackBuilderContent
        tools={toolCards}
        profiles={profiles}
        locale="en"
        t={t.stackBuilder}
        hardwareT={t.hardwareFit}
        hostingTierT={t.hostingTier}
      />
    </Suspense>
  );
}
