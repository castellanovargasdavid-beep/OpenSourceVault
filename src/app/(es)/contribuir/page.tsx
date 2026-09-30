import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cómo contribuir al catálogo",
  description: `Cómo añadir una herramienta, corregir un dato desactualizado o proponer un cambio en ${siteConfig.name} — sin base de datos, todo vía Pull Request en GitHub.`,
  alternates: {
    canonical: `${siteConfig.url}/contribuir`,
    languages: { es: `${siteConfig.url}/contribuir`, en: `${siteConfig.url}/en/contribute`, "x-default": `${siteConfig.url}/contribuir` },
  },
  robots: { index: true, follow: true },
};

const REPO = siteConfig.links.github;

export default function ContribuirPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Cómo contribuir</h1>
      <p className="mt-3 text-lg text-slate-600">
        {siteConfig.name} no tiene base de datos ni panel de administración: todo el catálogo vive en
        archivos de código versionados en GitHub. Contribuir significa editar esos archivos y abrir un
        Pull Request — o, si prefieres no tocar código, abrir un Issue con la plantilla correspondiente.
      </p>

      <div className="mt-10 space-y-10 text-slate-600">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Dónde vive el catálogo</h2>
          <p>
            Cada herramienta es una entrada en{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/data/tools.ts</code>.
            La traducción al inglés de esa misma entrada (descripción, features, pros/cons) va en{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/data/tools.en.ts</code>,
            con el mismo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">id</code>.
            No hay ningún otro sitio donde se guarden los datos — lo que ves en la web es literalmente el
            contenido de ese archivo en el último build.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Añadir una herramienta nueva</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Haz fork del repo y abre{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/data/tools.ts</code>.
            </li>
            <li>Copia una entrada existente de una categoría parecida como plantilla y añade la tuya al array.</li>
            <li>
              Añade la traducción al inglés (mismo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">id</code>) en{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">tools.en.ts</code>.
            </li>
            <li>
              Ejecuta <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run dev</code> y
              comprueba que la ficha se ve bien, luego{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">npm run build</code> para
              confirmar que no rompe nada.
            </li>
            <li>Abre un Pull Request. Si prefieres no tocar código, abre un Issue en su lugar (ver más abajo) y lo añadimos nosotros.</li>
          </ol>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Campos de una ficha</h2>
          <p className="mb-3">
            El tipo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">OpenSourceTool</code> (en{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">src/lib/types.ts</code>) exige estos
            campos para que el build compile:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">id</code> /{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">slug</code> — el mismo string en
              minúsculas y guiones (ej. <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;n8n&quot;</code>). Tiene que ser único en todo el catálogo.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">name</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">description</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">shortDescription</code>.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">replaces</code> — array con el/los
              SaaS al que sustituye, ej. <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">[&quot;Notion&quot;, &quot;Slite&quot;]</code>.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">category</code> — una de las
              categorías existentes en <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">ToolCategory</code> (src/lib/types.ts). Si ninguna encaja, dilo en el PR/Issue y lo discutimos.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">websiteUrl</code> /{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">githubUrl</code>.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">license</code> — la licencia real
              tal cual aparece en el archivo LICENSE del repo (ej. <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;MIT&quot;</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;AGPL-3.0&quot;</code>, &quot;Sustainable Use
              License (Fair-code)&quot;), no un genérico &quot;open source&quot;.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">dockerCompose</code> — el
              docker-compose.yml real del proyecto, con imágenes en una versión fijada cuando el proyecto publique una
              (evita <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">:latest</code> si existe un
              tag estable). Si de verdad no se despliega con docker-compose (instalador propio tipo{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">curl | bash</code>), pon ese
              script en su lugar con un comentario explicando qué hace.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">affiliateLinks</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">features</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">techStack</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">pros</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">cons</code>,{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">tags</code>.
            </li>
          </ul>
          <p className="mt-4 mb-3">
            Estos otros campos son opcionales para que el build compile, pero los esperamos en cualquier
            herramienta nueva desde que empezamos a exigirlos de forma sistemática:
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">fossModel</code> —{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;FOSS&quot;</code> (licencia OSI, sin
              función de pago), <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;OpenCore&quot;</code>{" "}
              (núcleo OSI + funciones de pago), <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;FairCode&quot;</code>{" "}
              (sin límites de uso pero licencia no-OSI que prohíbe revenderlo) o{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;SourceAvailable&quot;</code> (código
              público, licencia no-OSI). No lo pongas si no estás seguro — lo revisamos antes de publicar.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">minRamMb</code> /{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">difficulty</code> — si los omites,
              se infieren automáticamente contando los servicios de tu{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">dockerCompose</code>. Solo fíjalos
              a mano si sabes el requisito real de RAM del proyecto y quieres que sea más preciso que la estimación.
            </li>
            <li>
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">dockerStatus</code> —{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">&quot;VERIFIED_PINNED&quot;</code> si has
              comprobado que la imagen existe con ese tag exacto en su registro real. No lo pongas si no lo has
              verificado tú mismo.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Qué aceptamos</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Software self-hosted que de verdad funcione — no un anuncio de producto ni un proyecto en fase de idea.</li>
            <li>Repositorio de código público y accesible (GitHub, GitLab, Codeberg...).</li>
            <li>Licencia identificable y verificable en ese repositorio — no &quot;es de código abierto&quot; sin más.</li>
            <li>
              Actividad reciente reconocible (commits, releases o issues respondidos en los últimos meses). No
              tenemos un umbral exacto de días — si el proyecto lleva mucho tiempo sin ningún movimiento, dilo en
              el PR y lo valoramos caso por caso; no rechazamos automáticamente por una fecha concreta.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Reportar un dato desactualizado</h2>
          <p className="mb-3">
            Si ves una licencia que cambió, una imagen Docker en{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">:latest</code> que ya debería
            estar fijada a una versión, un enlace roto o cualquier otro dato desactualizado, abre un Issue con la
            plantilla de abajo — no hace falta que sepas resolverlo, solo señalarlo con un enlace a la fuente real
            (el LICENSE del repo, la página de tags del registro, etc.).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-slate-900">Enlaces directos</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`${REPO}/issues/new?template=add_tool.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center font-medium text-emerald-800 hover:bg-emerald-100"
            >
              + Sugerir una herramienta nueva
            </a>
            <a
              href={`${REPO}/issues/new?template=report_outdated_data.md`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center font-medium text-amber-800 hover:bg-amber-100"
            >
              ⚠ Reportar un dato desactualizado
            </a>
            <a
              href={REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center font-medium text-slate-700 hover:bg-slate-100"
            >
              Abrir un Pull Request
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
