# OpenSourceVault

Plataforma que recopila las mejores alternativas de código abierto y auto-hospedables frente al software SaaS más popular (Notion, Slack, Airtable, Google Analytics, Salesforce...), con ficha técnica, `docker-compose.yml` listo para copiar y monetización mediante enlaces de afiliado de hosting (DigitalOcean, Hetzner, Railway).

## Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- Componentes UI estilo shadcn/ui escritos a mano (`src/components/ui`) + **Lucide Icons**
- Datos locales en TypeScript (`src/data`) — sin base de datos
- **Vercel Analytics**

## Estructura del proyecto

```
src/
  app/
    page.tsx                    → Homepage (hero, categorías, destacadas, explorador con filtros)
    [slug]/page.tsx             → /alternativa-a-[slug] (comparativa de alternativas a un SaaS)
    tool/[slug]/page.tsx        → Ficha completa de cada herramienta
    categoria/[category]/page.tsx
    hosting-deals/page.tsx
    sitemap.ts / robots.ts
  components/
    ui/                         → Button, Card, Badge, Input, Separator
    site/                       → Header, Footer, Hero, SearchBar, ToolCard, ToolExplorer, etc.
  data/
    tools.ts                    → Catálogo de herramientas (edita aquí para añadir/quitar)
    categories.ts
    hosting-providers.ts
  lib/
    types.ts                    → Interfaz OpenSourceTool
    alternatives.ts             → Agrupa herramientas por SaaS que reemplazan
    site-config.ts              → URL del sitio y enlaces de afiliado (desde env vars)
```

### Nota sobre la ruta `/alternativa-a-[slug]`

El App Router de Next.js no permite mezclar texto estático con un segmento dinámico dentro del mismo nombre de carpeta (una carpeta `alternativa-a-[slug]` no enruta). Para lograr la URL exacta `/alternativa-a-notion`, la ruta vive en `src/app/[slug]/page.tsx` y el prefijo `alternativa-a-` se parsea en código.

## Cómo añadir una nueva herramienta

Edita `src/data/tools.ts` y añade un nuevo objeto al array `tools` siguiendo la interfaz `OpenSourceTool` (`src/lib/types.ts`). Las páginas `/tool/[slug]`, `/categoria/[category]`, `/alternativa-a-[slug]` y el `sitemap.xml` se generan automáticamente a partir de esos datos — no hace falta tocar nada más.

## Variables de entorno

**Ninguna variable es obligatoria.** El proyecto compila y despliega sin configurar nada; todas caen a un valor placeholder seguro. Cópialas cuando las tengas:

```bash
cp .env.example .env.local
```

| Variable | Para qué sirve | Si no se define |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Metadata SEO, Open Graph, canonical URLs, sitemap.xml | Usa `https://opensourcevault.dev` |
| `NEXT_PUBLIC_AFFILIATE_DIGITALOCEAN` | Enlace de afiliado en los botones "Desplegar en DigitalOcean" | El botón apunta a `#` |
| `NEXT_PUBLIC_AFFILIATE_HETZNER` | Enlace de afiliado de Hetzner | El botón apunta a `#` |
| `NEXT_PUBLIC_AFFILIATE_RAILWAY` | Enlace de afiliado de Railway | El botón apunta a `#` |

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run build
npm run start
```

## Desplegar en Vercel

1. Importa el repositorio en [vercel.com/new](https://vercel.com/new). Vercel detecta Next.js automáticamente — no requiere configuración adicional.
2. (Opcional) En **Settings → Environment Variables**, añade `NEXT_PUBLIC_SITE_URL` con tu dominio real y los tres enlaces de afiliado cuando los tengas.
3. Despliega. El build usa `npm run build` y no depende de ninguna base de datos ni servicio externo, así que no debería fallar por falta de configuración.

## Licencia

MIT
