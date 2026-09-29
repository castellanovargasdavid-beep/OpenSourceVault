import type { Metadata, ResolvingMetadata } from "next";
import { inheritedSocialImages } from "@/lib/metadata";
import { allTools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { catalogStats } from "@/lib/catalog-stats";
import { siteConfig } from "@/lib/site-config";
import { getDictionary } from "@/i18n/get-dictionary";
import { ToolExplorer } from "@/components/site/tool-explorer";

export async function generateMetadata(_props: unknown, parent: ResolvingMetadata): Promise<Metadata> {
  const t = getDictionary("en");
  const published = catalogStats.totalTools;
  const comingSoon = catalogStats.totalNotYetPublished;
  const title = t.toolsCatalogPage.metaTitle(siteConfig.year);
  const description = t.toolsCatalogPage.metaDescription(published, comingSoon, catalogStats.totalInCatalogFile);
  const url = `${siteConfig.url}/en/tools`;
  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${siteConfig.url}/herramientas`, en: url },
    },
    openGraph: { title, description, url, images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default function ToolsCatalogPageEn() {
  const t = getDictionary("en");
  const allToolCards = allTools.map(toToolCardData);

  return (
    <ToolExplorer
      tools={allToolCards}
      locale="en"
      t={t.toolExplorer}
      toolCardT={t.toolCard}
      comingSoonBadge={t.comingSoon.badge}
      difficultyT={t.difficulty}
      stackBuilderT={t.stackBuilder}
    />
  );
}
