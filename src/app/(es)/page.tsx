import { Hero } from "@/components/site/hero";
import { CategoryGrid } from "@/components/site/category-grid";
import { FeaturedTools } from "@/components/site/featured-tools";
import { RecentlyAddedTools } from "@/components/site/recently-added-tools";
import { CatalogTeaser } from "@/components/site/catalog-teaser";
import { tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";

export default function HomePage() {
  const publishedToolCards = tools.map(toToolCardData);

  return (
    <>
      <Hero tools={publishedToolCards} />
      <CategoryGrid />
      <FeaturedTools />
      <RecentlyAddedTools />
      <CatalogTeaser />
    </>
  );
}
