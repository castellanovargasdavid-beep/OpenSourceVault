import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { inheritedSocialImages } from "@/lib/metadata";
import { allTools, tools } from "@/data/tools";
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
      languages: { es: `${siteConfig.url}/herramientas`, en: url, "x-default": `${siteConfig.url}/herramientas` },
    },
    openGraph: { title, description, url, images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default function ToolsCatalogPageEn() {
  const t = getDictionary("en");
  const allToolCards = allTools.map(toToolCardData);

  return (
    <>
      <ToolExplorer
        tools={allToolCards}
        locale="en"
        t={t.toolExplorer}
        toolCardT={t.toolCard}
        comingSoonBadge={t.comingSoon.badge}
        difficultyT={t.difficulty}
        stackBuilderT={t.stackBuilder}
      />
      {/* ToolExplorer is a client component that only paints INITIAL_VISIBLE_COUNT
          (24) cards into the DOM until someone clicks "Show more" — an external
          audit flagged that it could not confirm whether the rest of the
          catalog (up to 196 tools) is crawlable or only exists after JS runs.
          This block, rendered on the server, always links every published
          tool page in the initial HTML (sr-only: no effect on visible layout,
          so it doesn't reintroduce the mobile payload-weight issue that the
          pagination was added to fix), so a crawler can discover them without
          depending on interaction or client JS. */}
      <nav className="sr-only">
        <h2>{t.toolsCatalogPage.fullIndexHeading}</h2>
        <ul>
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link href={`/en/tool/${tool.slug}`}>{tool.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
