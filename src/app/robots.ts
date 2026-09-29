import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /**
       * /api/deploy se enlaza como texto plano desde OneCommandDeployBlock
       * ("Ver qué hace este script →", con parámetros ?stack=...&locale=...)
       * y /api/stack-compose se llama por fetch() desde el Stack Builder —
       * ninguno de los dos es una página, y ambos generarían URLs con
       * parámetros sin valor propio para indexar.
       */
      disallow: "/api/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
