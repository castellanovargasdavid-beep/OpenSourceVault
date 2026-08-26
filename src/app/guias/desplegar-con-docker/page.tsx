import type { Metadata } from "next";
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
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Cómo desplegar cualquier herramienta open source con Docker en ${siteConfig.year}`,
  description:
    "Guía paso a paso para desplegar cualquier herramienta del catálogo en tu propio VPS: crear el servidor, instalar Docker, subir el docker-compose.yml y poner tu dominio con HTTPS.",
  alternates: { canonical: `${siteConfig.url}/guias/desplegar-con-docker` },
};

const steps = [
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

export default function DeployGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          Guía práctica
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Cómo desplegar cualquier herramienta con Docker
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          El mismo proceso de 6 pasos sirve para cualquiera de las {`100+`} herramientas del
          catálogo: solo cambia el <code className="rounded bg-slate-100 px-1.5 py-0.5">docker-compose.yml</code> que copias en el paso 3.
        </p>
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
        <p className="font-semibold text-slate-900">¿Listo para desplegar tu primera herramienta?</p>
        <p className="mt-1 text-sm text-slate-600">
          Elige un proveedor con crédito gratis y empieza en minutos.
        </p>
        <Link
          href="/hosting-deals"
          className={cn(buttonVariants({ size: "lg" }), "mt-4 gap-1.5")}
        >
          Ver hosting recomendado <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
