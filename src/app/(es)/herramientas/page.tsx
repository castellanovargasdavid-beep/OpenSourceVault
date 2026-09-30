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
  const t = getDictionary("es");
  const published = catalogStats.totalTools;
  const comingSoon = catalogStats.totalNotYetPublished;
  const title = t.toolsCatalogPage.metaTitle(siteConfig.year);
  const description = t.toolsCatalogPage.metaDescription(published, comingSoon, catalogStats.totalInCatalogFile);
  const url = `${siteConfig.url}/herramientas`;
  const { openGraphImages, twitterImages } = await inheritedSocialImages(parent);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: url, en: `${siteConfig.url}/en/tools`, "x-default": url },
    },
    openGraph: { title, description, url, images: openGraphImages },
    twitter: { card: "summary_large_image", title, description, images: twitterImages },
  };
}

export default function ToolsCatalogPage() {
  const t = getDictionary("es");
  const allToolCards = allTools.map(toToolCardData);

  return (
    <>
      <ToolExplorer
        tools={allToolCards}
        t={t.toolExplorer}
        toolCardT={t.toolCard}
        comingSoonBadge={t.comingSoon.badge}
        difficultyT={t.difficulty}
        stackBuilderT={t.stackBuilder}
      />
      {/* ToolExplorer es un client component que solo pinta INITIAL_VISIBLE_COUNT
          (24) tarjetas en el DOM hasta que alguien pulsa "Mostrar más" — una
          auditoría externa señaló que no podía confirmar si el resto de
          herramientas (hasta 196) son rastreables o solo existen tras JS. Este
          bloque, renderizado en el servidor, enlaza SIEMPRE las fichas de las
          herramientas publicadas en el HTML inicial (sr-only: no afecta al
          layout visible ni reintroduce el problema de peso móvil que motivó
          la paginación de ToolExplorer), para que un rastreador las descubra
          sin depender de interacción ni de JS. */}
      <nav className="sr-only">
        <h2>{t.toolsCatalogPage.fullIndexHeading}</h2>
        <ul>
          {tools.map((tool) => (
            <li key={tool.slug}>
              <Link href={`/tool/${tool.slug}`}>{tool.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
