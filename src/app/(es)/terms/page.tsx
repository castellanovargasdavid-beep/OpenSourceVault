import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: `Condiciones de uso de ${siteConfig.name}.`,
  alternates: {
    canonical: `${siteConfig.url}/terms`,
    languages: { es: `${siteConfig.url}/terms`, en: `${siteConfig.url}/en/terms` },
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Términos de Uso</h1>
      <p className="mt-3 text-sm text-slate-600">Última actualización: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Aceptación de los términos</h2>
          <p>
            Al usar {siteConfig.name} ({siteConfig.url}) aceptas estos términos. Si no estás de acuerdo,
            simplemente no uses el sitio.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Qué es {siteConfig.name}</h2>
          <p>
            {siteConfig.name} es un catálogo informativo e independiente de alternativas de código
            abierto y auto-hospedables al software SaaS más popular. No somos los desarrolladores de
            las herramientas listadas, ni estamos afiliados oficialmente a ellas ni a las empresas de
            SaaS a las que sustituyen, salvo que se indique expresamente.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Uso permitido</h2>
          <p>
            Puedes navegar, leer y compartir el contenido del sitio libremente. No puedes copiar el
            catálogo completo para republicarlo como propio, ni usar técnicas automatizadas (scraping
            masivo) que sobrecarguen el servicio.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Marcas y enlaces a terceros</h2>
          <p>
            Los nombres, logotipos y marcas de las herramientas y servicios SaaS mencionados en este
            sitio pertenecen a sus respectivos propietarios y se usan únicamente con fines
            identificativos e informativos (uso nominativo). Los enlaces a sitios web, repositorios de
            GitHub y demos de terceros te llevan fuera de {siteConfig.name}; no controlamos ni nos
            hacemos responsables del contenido, la seguridad o la disponibilidad de esos sitios.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Exactitud de la información</h2>
          <p>
            Nos esforzamos por mantener la información del catálogo (licencias, características,
            precios de referencia, comandos de despliegue) actualizada y correcta, pero puede quedar
            desactualizada sin previo aviso. Verifica siempre los datos críticos (licencia, precio,
            requisitos técnicos) en la fuente oficial de cada herramienta antes de tomar una decisión.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Enlaces de afiliado</h2>
          <p>
            Algunos enlaces hacia proveedores de hosting son enlaces de afiliado. Consulta la{" "}
            <Link href="/affiliate-disclosure" className="font-medium text-emerald-700 hover:underline">
              Divulgación de afiliados
            </Link>{" "}
            para más información.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Limitación de responsabilidad</h2>
          <p>
            El sitio se ofrece &quot;tal cual&quot;, sin garantías de ningún tipo. No nos hacemos responsables de
            pérdidas o daños derivados de decisiones tomadas a partir de la información publicada aquí,
            de la instalación de software de terceros, ni del uso de los enlaces de afiliado.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">8. Cambios en estos términos</h2>
          <p>
            Podemos actualizar estos términos ocasionalmente. La fecha de &quot;última actualización&quot; al
            principio de esta página siempre indicará la versión vigente.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">9. Contacto</h2>
          <p>
            Para cualquier duda sobre estos términos, escríbenos a{" "}
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
