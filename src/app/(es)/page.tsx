import { Hero } from "@/components/site/hero";
import { DiscoveryStrip } from "@/components/site/discovery-strip";
import { CatalogTeaser } from "@/components/site/catalog-teaser";
import { tools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";

export default function HomePage() {
  const publishedToolCards = tools.map(toToolCardData);

  return (
    <>
      <Hero tools={publishedToolCards} />
      <DiscoveryStrip />
      <CatalogTeaser />
    </>
  );
}
