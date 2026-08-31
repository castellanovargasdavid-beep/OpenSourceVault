import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: `Cómo ${siteConfig.name} recopila, usa y protege tu información.`,
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
    languages: { es: `${siteConfig.url}/privacy`, en: `${siteConfig.url}/en/privacy` },
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Política de Privacidad</h1>
      <p className="mt-3 text-sm text-slate-400">Última actualización: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">1. Quiénes somos</h2>
          <p>
            {siteConfig.name} ({siteConfig.url}) es un catálogo informativo de alternativas de código
            abierto y auto-hospedables al software SaaS más popular. Este sitio es operado por un
            titular individual, no por una empresa.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">2. Qué datos recopilamos</h2>
          <p>
            {siteConfig.name} no requiere que crees una cuenta, no tiene formularios de registro y no
            almacena información personal en una base de datos. No usamos cookies de seguimiento
            propias.
          </p>
          <p className="mt-2">
            Usamos <strong>Vercel Analytics</strong> para medir el tráfico agregado del sitio (páginas
            vistas, país aproximado, dispositivo). Este servicio no utiliza cookies y no recopila
            información que te identifique personalmente.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">3. Enlaces de afiliado y sitios de terceros</h2>
          <p>
            Algunos enlaces de este sitio (hacia proveedores de hosting como DigitalOcean, Vultr o
            Railway, o hacia los sitios web y repositorios de las herramientas listadas) son enlaces de
            afiliado o simplemente enlaces externos. Al hacer clic en ellos sales de {siteConfig.name} y
            quedas sujeto a la política de privacidad y las cookies del sitio de destino, que no
            controlamos. Consulta la{" "}
            <Link href="/affiliate-disclosure" className="font-medium text-emerald-700 hover:underline">
              Divulgación de afiliados
            </Link>{" "}
            para más detalle sobre estas relaciones.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">4. Uso de la información</h2>
          <p>
            Los datos agregados y anónimos de analítica se usan únicamente para entender qué contenido
            es útil y mejorar el catálogo. No vendemos ni compartimos datos personales con terceros
            porque, sencillamente, no los recopilamos.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">5. Tus derechos</h2>
          <p>
            Si en algún momento nos contactas por email y ese mensaje contiene datos personales (tu
            dirección de correo, por ejemplo), puedes pedirnos en cualquier momento que la
            eliminemos, la corrijamos o te indiquemos qué información tenemos, escribiendo a la
            dirección de contacto de abajo.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">6. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente para reflejar cambios en el sitio o en la
            normativa aplicable. La fecha de &quot;última actualización&quot; al principio de esta página
            siempre indicará la versión vigente.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">7. Contacto</h2>
          <p>
            Para cualquier duda sobre esta política, escríbenos a{" "}
            <a href="mailto:hola@altfreestack.com" className="font-medium text-emerald-700 hover:underline">
              hola@altfreestack.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
