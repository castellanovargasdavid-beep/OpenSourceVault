import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Divulgación de Afiliados",
  description: `Cómo se financia ${siteConfig.name} a través de enlaces de afiliado.`,
  alternates: {
    canonical: `${siteConfig.url}/affiliate-disclosure`,
    languages: { es: `${siteConfig.url}/affiliate-disclosure`, en: `${siteConfig.url}/en/affiliate-disclosure` },
  },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Divulgación de Afiliados</h1>
      <p className="mt-3 text-sm text-slate-400">Última actualización: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Cómo se financia {siteConfig.name}</h2>
          <p>
            {siteConfig.name} es gratuito para todo el mundo. Para mantenerlo así, usamos enlaces de
            afiliado hacia proveedores de hosting: si te registras en uno de ellos a través de un
            enlace de este sitio, podemos recibir una comisión, <strong>sin ningún coste adicional
            para ti</strong> — pagarías lo mismo entrando directamente a su web.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Programas actuales</h2>
          <p>Actualmente participamos en los programas de afiliados de:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>DigitalOcean</li>
            <li>Vultr</li>
            <li>Railway</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Cómo identificar un enlace de afiliado</h2>
          <p>
            Los botones de &quot;Desplegar en DigitalOcean / Vultr / Railway&quot; que aparecen en la ficha de
            cada herramienta y en la página de{" "}
            <Link href="/hosting-deals" className="font-medium text-emerald-700 hover:underline">
              Hosting &amp; Descuentos
            </Link>{" "}
            son enlaces de afiliado. El resto de enlaces del sitio (sitio web oficial de cada
            herramienta, repositorio de GitHub, demo) no son de afiliado.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Independencia editorial</h2>
          <p>
            La inclusión de una herramienta en el catálogo, su categoría, sus pros y contras y si
            aparece como destacada se deciden por criterios editoriales (madurez del proyecto,
            comunidad activa, facilidad de despliegue) — no por si su proveedor de hosting recomendado
            tiene un programa de afiliados con nosotros. No aceptamos pagos de los proyectos open
            source listados a cambio de aparecer o de una valoración más favorable.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Contacto</h2>
          <p>
            Si tienes dudas sobre esta divulgación, escríbenos a{" "}
            <a href="mailto:lecastvarg@gmail.com" className="font-medium text-emerald-700 hover:underline">
              lecastvarg@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
