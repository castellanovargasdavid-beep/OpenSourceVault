import { Hero } from "@/components/site/hero";
import { CategoryGrid } from "@/components/site/category-grid";
import { FeaturedTools } from "@/components/site/featured-tools";
import { RecentlyAddedTools } from "@/components/site/recently-added-tools";
import { ToolExplorer } from "@/components/site/tool-explorer";
import { allTools } from "@/data/tools";
import { toToolCardData } from "@/lib/tool-card-data";
import { isPublished } from "@/lib/types";
import { getDictionary } from "@/i18n/get-dictionary";

export default function HomePage() {
  const t = getDictionary("es");
  // Un único map() sobre allTools, reutilizado por referencia en ambos
  // props: antes tools.map()/allTools.map() por separado creaban dos
  // objetos ToolCardData distintos (aunque con el mismo contenido) para
  // cada una de las 150 herramientas publicadas, y el flight payload de
  // React solo deduplica por identidad de referencia, no por valor — el
  // filter() aquí reutiliza las mismas referencias, así el payload serializa
  // esas 150 tarjetas una sola vez en vez de dos (~61KB menos por carga).
  const allToolCards = allTools.map(toToolCardData);
  const publishedToolCards = allToolCards.filter(isPublished);

  return (
    <>
      <Hero tools={publishedToolCards} />
      <CategoryGrid />
      <FeaturedTools />
      <RecentlyAddedTools />
      <ToolExplorer
        tools={allToolCards}
        t={t.toolExplorer}
        toolCardT={t.toolCard}
        comingSoonBadge={t.comingSoon.badge}
        difficultyT={t.difficulty}
        stackBuilderT={t.stackBuilder}
      />
    </>
  );
}
