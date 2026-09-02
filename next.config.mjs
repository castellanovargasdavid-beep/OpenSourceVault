// Slug en español -> slug en inglés de cada categoría, para redirigir las
// URLs antiguas /en/categoria/{slug-es} (mezclaban palabras en español en
// una URL en inglés) a las nuevas /en/categories/{slug-en}. Mantener en
// sync con src/data/categories.ts y src/data/categories.en.ts.
const CATEGORY_SLUG_ES_TO_EN = {
  productividad: "productivity",
  analitica: "analytics",
  devtools: "dev-tools",
  crm: "crm",
  ia: "ai",
  almacenamiento: "storage",
  ecommerce: "ecommerce",
  videoconferencia: "video-conferencing",
  "gestores-de-contrasenas": "password-managers",
  "autenticacion-e-identidad": "auth-identity",
  "despliegue-paas-hosting": "deployment-paas-hosting",
  "monitoreo-logs-errores": "monitoring-logs-errors",
  "marketing-formularios-email": "marketing-forms-email",
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Todos los imports de lucide-react en el proyecto ya son nombrados y
  // directos (auditado: sin `import *` ni imports de paquete completo), así
  // que el tree-shaking normal ya los reduce a solo los iconos usados; esto
  // añade una pasada extra específica del compilador para asegurarlo y
  // acelerar el build.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // /en/alternativa-a-notion -> /en/alternatives/notion (el slug del SaaS no cambia)
      {
        source: "/en/alternativa-a-:slug",
        destination: "/en/alternatives/:slug",
        permanent: true,
      },
      // /alternativa-a-notion -> /alternativas/notion: de paso se limpió también
      // el lado español (era un hack de segmento plano con prefijo "alternativa-a-"
      // parseado a mano; /alternativas/[slug] es una ruta anidada normal).
      {
        source: "/alternativa-a-:slug",
        destination: "/alternativas/:slug",
        permanent: true,
      },
      // /en/categoria/{slug-es} -> /en/categories/{slug-en}, una por categoría
      // porque el slug en sí también cambia, no solo el prefijo.
      ...Object.entries(CATEGORY_SLUG_ES_TO_EN).map(([esSlug, enSlug]) => ({
        source: `/en/categoria/${esSlug}`,
        destination: `/en/categories/${enSlug}`,
        permanent: true,
      })),
      // /en/comparar/x-vs-y -> /en/compare/x-vs-y (el slug del par no cambia)
      {
        source: "/en/comparar/:pair",
        destination: "/en/compare/:pair",
        permanent: true,
      },
      // /en/guias/desplegar-con-docker -> /en/guides/deploy-with-docker
      {
        source: "/en/guias/desplegar-con-docker",
        destination: "/en/guides/deploy-with-docker",
        permanent: true,
      },
      // /en/guias/migrar/notion/appflowy -> /en/guides/migrate/notion/appflowy
      {
        source: "/en/guias/migrar/:from/:to",
        destination: "/en/guides/migrate/:from/:to",
        permanent: true,
      },
      // /en/calculadora-ahorro -> /en/savings-calculator
      {
        source: "/en/calculadora-ahorro",
        destination: "/en/savings-calculator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
