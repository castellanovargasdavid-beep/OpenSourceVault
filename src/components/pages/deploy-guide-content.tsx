import Link from "next/link";
import {
  Server,
  Terminal,
  FileCode,
  Rocket,
  Globe,
  RefreshCw,
  Clock,
  ArrowRight,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import { localeHref } from "@/lib/locale-href";
import type { Locale } from "@/i18n/config";

const stepsEs = [
  {
    icon: Server,
    title: "1. Crea tu servidor (VPS)",
    time: "~5 min",
    body: (
      <>
        <p>
          Elige un proveedor de la página de{" "}
          <Link href="/hosting-deals" className="font-medium text-emerald-700 hover:underline">
            Hosting &amp; Descuentos
          </Link>{" "}
          y crea un servidor Ubuntu 22.04 o superior. Con 1 vCPU y 1-2GB de RAM sobra para la
          mayoría de herramientas del catálogo; revisa la ficha técnica de la tuya si necesitas
          más (por ejemplo, herramientas con IA generativa suelen pedir más RAM o GPU).
        </p>
        <p className="mt-2">
          Guarda la IP pública que te asigne el proveedor — la necesitarás en el siguiente paso.
        </p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "2. Conéctate por SSH e instala Docker",
    time: "~5 min",
    body: (
      <>
        <p>Desde tu terminal, conéctate al servidor:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>ssh root@TU_IP_DEL_SERVIDOR</code>
        </pre>
        <p className="mt-3">Instala Docker y el plugin de Compose con el script oficial:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>curl -fsSL https://get.docker.com | sh</code>
        </pre>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "3. Copia el docker-compose.yml de tu herramienta",
    time: "~2 min",
    body: (
      <>
        <p>
          Entra a la ficha de la herramienta que quieras desplegar, pulsa <strong>Copiar</strong>{" "}
          en el bloque de código, y crea el archivo en tu servidor:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>{`mkdir mi-app && cd mi-app
nano docker-compose.yml
# pega el contenido, guarda con Ctrl+O y sal con Ctrl+X`}</code>
        </pre>
        <p className="mt-3">
          Antes de continuar, cambia las contraseñas de ejemplo (
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">change-me</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">change-me-super-secret</code>
          ) por valores propios y seguros.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "4. Levanta los contenedores",
    time: "~3 min",
    body: (
      <>
        <p>Desde la misma carpeta, ejecuta:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>docker compose up -d</code>
        </pre>
        <p className="mt-3">
          Docker descargará las imágenes y arrancará todos los servicios en segundo plano.
          Verifica que todo esté corriendo con:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>docker compose ps</code>
        </pre>
      </>
    ),
  },
  {
    icon: Globe,
    title: "5. Apunta tu dominio y activa HTTPS",
    time: "~10 min",
    body: (
      <>
        <p>
          Crea un registro DNS tipo <strong>A</strong> apuntando tu dominio (o subdominio) a la IP
          del servidor. Para HTTPS gratuito, la forma más simple es poner{" "}
          <a
            href="https://caddyserver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 hover:underline"
          >
            Caddy
          </a>{" "}
          delante como proxy inverso — genera y renueva certificados de Let&apos;s Encrypt
          automáticamente con un Caddyfile de 3 líneas:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>{`tudominio.com {
  reverse_proxy localhost:PUERTO_DE_TU_APP
}`}</code>
        </pre>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "6. Mantenimiento: actualizar y hacer backup",
    time: "recurrente",
    body: (
      <>
        <p>Para actualizar tu herramienta a la última versión de forma segura:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>{`docker compose pull
docker compose up -d`}</code>
        </pre>
        <p className="mt-3">
          Haz backup periódico de los volúmenes de datos (los que aparecen bajo{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">volumes:</code> en cada
          docker-compose.yml) — son los que contienen tu base de datos y archivos.
        </p>
      </>
    ),
  },
];

const stepsEn = [
  {
    icon: Server,
    title: "1. Create your server (VPS)",
    time: "~5 min",
    body: (
      <>
        <p>
          Choose a provider from the{" "}
          <Link href="/en/hosting-deals" className="font-medium text-emerald-700 hover:underline">
            Hosting &amp; Deals
          </Link>{" "}
          page and create an Ubuntu 22.04+ server. 1 vCPU and 1-2GB RAM is enough for most tools
          in the catalog; check your tool&apos;s technical profile if you need more (for example,
          generative AI tools usually need more RAM or a GPU).
        </p>
        <p className="mt-2">Save the public IP the provider gives you — you&apos;ll need it in the next step.</p>
      </>
    ),
  },
  {
    icon: Terminal,
    title: "2. Connect via SSH and install Docker",
    time: "~5 min",
    body: (
      <>
        <p>From your terminal, connect to the server:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>ssh root@YOUR_SERVER_IP</code>
        </pre>
        <p className="mt-3">Install Docker and the Compose plugin with the official script:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>curl -fsSL https://get.docker.com | sh</code>
        </pre>
      </>
    ),
  },
  {
    icon: FileCode,
    title: "3. Copy your tool's docker-compose.yml",
    time: "~2 min",
    body: (
      <>
        <p>
          Go to the profile of the tool you want to deploy, click <strong>Copy</strong> on the code
          block, and create the file on your server:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>{`mkdir my-app && cd my-app
nano docker-compose.yml
# paste the content, save with Ctrl+O and exit with Ctrl+X`}</code>
        </pre>
        <p className="mt-3">
          Before continuing, change the example passwords (
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">change-me</code>,{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">change-me-super-secret</code>)
          to your own secure values.
        </p>
      </>
    ),
  },
  {
    icon: Rocket,
    title: "4. Start the containers",
    time: "~3 min",
    body: (
      <>
        <p>From the same folder, run:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>docker compose up -d</code>
        </pre>
        <p className="mt-3">Docker will pull the images and start all services in the background. Check everything is running with:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>docker compose ps</code>
        </pre>
      </>
    ),
  },
  {
    icon: Globe,
    title: "5. Point your domain and enable HTTPS",
    time: "~10 min",
    body: (
      <>
        <p>
          Create an <strong>A</strong> DNS record pointing your domain (or subdomain) to the
          server&apos;s IP. For free HTTPS, the simplest approach is putting{" "}
          <a
            href="https://caddyserver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-emerald-700 hover:underline"
          >
            Caddy
          </a>{" "}
          in front as a reverse proxy — it generates and renews Let&apos;s Encrypt certificates
          automatically with a 3-line Caddyfile:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>{`yourdomain.com {
  reverse_proxy localhost:YOUR_APP_PORT
}`}</code>
        </pre>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "6. Maintenance: updates and backups",
    time: "recurring",
    body: (
      <>
        <p>To safely update your tool to the latest version:</p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 text-xs text-slate-200">
          <code>{`docker compose pull
docker compose up -d`}</code>
        </pre>
        <p className="mt-3">
          Back up your data volumes periodically (the ones under{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">volumes:</code> in each
          docker-compose.yml) — they hold your database and files.
        </p>
      </>
    ),
  },
];

export function DeployGuideContent({ locale = "es" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const steps = locale === "en" ? stepsEn : stepsEs;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {t.deployGuidePage.badge}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{t.deployGuidePage.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{t.deployGuidePage.subtitle}</p>
      </header>

      <ol className="space-y-8">
        {steps.map((step) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <step.icon size={20} />
              </span>
              <span className="mt-2 h-full w-px bg-slate-200" />
            </div>
            <div className="flex-1 pb-2">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{step.title}</h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                  <Clock size={12} /> {step.time}
                </span>
              </div>
              <div className="text-sm text-slate-600">{step.body}</div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-semibold text-slate-900">{t.deployGuidePage.ctaTitle}</p>
        <p className="mt-1 text-sm text-slate-600">{t.deployGuidePage.ctaSubtitle}</p>
        <Link href={localeHref("/hosting-deals", locale)} className={cn(buttonVariants({ size: "lg" }), "mt-4 gap-1.5")}>
          {t.deployGuidePage.ctaButton} <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
