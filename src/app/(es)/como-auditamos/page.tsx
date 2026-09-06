import type { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/data/tools";
import { saasPricing } from "@/data/saas-pricing";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cómo auditamos cada herramienta",
  description: `La metodología real detrás de la etiqueta "auditada" en ${siteConfig.name}: qué comprobamos, cómo, y qué no podemos garantizar.`,
  alternates: {
    canonical: `${siteConfig.url}/como-auditamos`,
    languages: { es: `${siteConfig.url}/como-auditamos`, en: `${siteConfig.url}/en/how-we-audit` },
  },
  robots: { index: true, follow: true },
};

const fossCount = tools.filter((t) => t.fossModel === "FOSS").length;
const openCoreCount = tools.filter((t) => t.fossModel === "OpenCore").length;
const dockerCount = tools.filter((t) => t.tags.includes("docker-ready")).length;

export default function ComoAuditamosPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cómo auditamos cada herramienta</h1>
      <p className="mt-3 text-sm text-slate-600">Última actualización: {siteConfig.year}</p>

      <div className="mt-8 space-y-8 text-slate-600">
        <section>
          <p>
            Cuando decimos que una herramienta está &quot;auditada&quot; en {siteConfig.name}, no es una
            frase de marketing: significa que pasa por esta lista concreta de comprobaciones. Esta
            página explica exactamente qué revisamos, de dónde sale cada dato y — igual de
            importante — qué <strong>no</strong> podemos garantizar.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Lo que comprobamos en cada ficha</h2>
          <ul className="space-y-4">
            <li>
              <p className="font-medium text-slate-900">✅ Licencia</p>
              <p>
                Tomada directamente del repositorio oficial en GitHub. Cada ficha enlaza al repositorio
                para que puedas comprobarla tú mismo — no confíes solo en lo que ponemos aquí.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ FOSS vs. Open-Core</p>
              <p>
                Distinguimos explícitamente entre software 100% libre (&quot;FOSS&quot;, {fossCount} herramientas
                del catálogo) y proyectos donde el núcleo es libre pero hay funciones avanzadas o planes
                empresariales de pago (&quot;Open-Core&quot;, {openCoreCount} herramientas). No mezclamos ambos bajo
                la misma promesa de &quot;100% gratis&quot;.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Docker Ready</p>
              <p>
                {dockerCount} de {tools.length} herramientas incluyen un docker-compose.yml real en su ficha.
                Comprobamos que su sintaxis sea válida con nuestra propia herramienta{" "}
                <Link href="/doctor" className="font-medium text-emerald-700 hover:underline">
                  Doctor Compose
                </Link>
                , pero eso valida la sintaxis del archivo — no sustituye a desplegarlo tú mismo y revisar
                que encaja con tu entorno concreto.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ RAM mínima estimada</p>
              <p>
                Es una estimación, no una medición en producción real: la calculamos a partir del número
                de servicios en el docker-compose.yml y del motor de base de datos que usa (por ejemplo,
                una base de datos SQLite o embebida pesa menos que Postgres o Elasticsearch). Trátala como
                un punto de partida para elegir servidor, no como una cifra exacta garantizada.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Estrellas y actividad en GitHub</p>
              <p>
                Se leen en vivo de la API pública de GitHub. Si la API no responde en el momento de
                generar la página, no inventamos ni mantenemos una cifra vieja sin avisar: simplemente no
                mostramos el dato hasta que vuelva a estar disponible.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Última actualización del proyecto</p>
              <p>
                Nuestra herramienta &quot;¿Es seguro actualizar?&quot; consulta el último release real
                publicado en GitHub — no es una fecha que mantengamos a mano y que se quede desactualizada.
              </p>
            </li>
            <li>
              <p className="font-medium text-slate-900">✅ Precio del SaaS oficial que sustituye</p>
              <p>
                Solo mostramos una cifra de precio cuando la hemos verificado a mano contra la web oficial
                del SaaS ({saasPricing.length} SaaS verificados ahora mismo). Para el resto, mostramos un
                mensaje honesto sin inventar un número — y siempre enlazamos a la web oficial para el
                precio vigente, porque estos proveedores los cambian con frecuencia.
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Lo que no hacemos</h2>
          <p className="mb-2">
            Igual de importante que lo anterior — para que &quot;auditado&quot; no se convierta en una
            promesa vacía:
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>No hemos desplegado en producción real las {tools.length} herramientas del catálogo nosotros mismos.</li>
            <li>No auditamos el código fuente en busca de vulnerabilidades de seguridad.</li>
            <li>No garantizamos que un docker-compose.yml funcione sin ajustes en cualquier entorno o versión de Docker.</li>
            <li>No aceptamos pagos de los proyectos listados a cambio de aparecer o de una valoración más favorable.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold text-slate-900">¿Encontraste un dato desactualizado o incorrecto?</h2>
          <p>
            Repórtalo en{" "}
            <a
              href={`${siteConfig.links.github}/issues/new`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-700 hover:underline"
            >
              nuestro repositorio de GitHub
            </a>{" "}
            y lo corregimos.
          </p>
        </section>
      </div>
    </div>
  );
}
