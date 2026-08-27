import type { Metadata } from "next";
import Link from "next/link";
import { Download, FileSpreadsheet, Link2, ListChecks, Clock, ArrowRight } from "lucide-react";
import { LogoImage } from "@/components/site/logo-image";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Cómo migrar de Airtable a Baserow sin perder datos (${siteConfig.year})`,
  description:
    "Guía paso a paso para exportar tus bases de Airtable e importarlas en Baserow: qué se migra automáticamente, qué tienes que rehacer a mano (vistas, automatizaciones) y cómo evitar errores comunes.",
  alternates: {
    canonical: `${siteConfig.url}/guias/migrar-de-airtable-a-baserow`,
  },
};

const steps = [
  {
    icon: Download,
    title: "1. Exporta cada tabla de Airtable a CSV",
    time: "~5 min por base",
    body: (
      <>
        <p>
          Airtable no tiene un &quot;exportar toda la base&quot; nativo — hay que hacerlo tabla por
          tabla. Abre cada tabla → menú <strong>⋯</strong> (arriba a la derecha de la vista) →{" "}
          <strong>Download CSV</strong>.
        </p>
        <p className="mt-2">
          Si tu base tiene muchas tablas relacionadas, exporta primero las tablas &quot;padre&quot;
          (las que no dependen de otras) para poder reconstruir los vínculos después.
        </p>
      </>
    ),
  },
  {
    icon: FileSpreadsheet,
    title: "2. Crea el workspace e importa en Baserow",
    time: "~10 min",
    body: (
      <>
        <p>
          En Baserow, crea una base nueva y usa <strong>Import from CSV</strong> tabla por tabla.
          Baserow detecta automáticamente el tipo de cada columna (texto, número, fecha), pero
          revísalo: los campos calculados y los &quot;linked records&quot; de Airtable{" "}
          <strong>llegan como texto plano</strong>, no como relaciones reales.
        </p>
      </>
    ),
  },
  {
    icon: Link2,
    title: "3. Reconstruye las relaciones entre tablas",
    time: "~20-40 min",
    body: (
      <>
        <p>
          Esta es la parte que no se automatiza: por cada columna que en Airtable era un{" "}
          <strong>Link to another record</strong>, crea un campo tipo <strong>Link to table</strong>{" "}
          en Baserow y vuelve a enlazar los registros. Si los IDs o nombres coinciden exactamente
          entre tablas, puedes apoyarte en &quot;Buscar y reemplazar&quot; para acelerarlo.
        </p>
      </>
    ),
  },
  {
    icon: ListChecks,
    title: "4. Recrea vistas, fórmulas y automatizaciones",
    time: "variable",
    body: (
      <>
        <p>
          Las <strong>vistas filtradas/agrupadas</strong>, las <strong>fórmulas</strong> y
          cualquier <strong>automatización</strong> (Airtable Automations) no se exportan — hay que
          rehacerlas manualmente en Baserow. Es buen momento para simplificar: exporta primero
          solo la vista &quot;Grid&quot; principal y añade el resto después de validar que los
          datos están correctos.
        </p>
      </>
    ),
  },
];

export default function MigrationGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3">
          <LogoImage domain="airtable.com" label="Airtable" size={44} className="rounded-xl grayscale" />
          <ArrowRight size={18} className="text-slate-300" />
          <LogoImage domain="baserow.io" label="Baserow" size={44} className="rounded-xl" fallbackGradient="from-teal-500 to-emerald-600" />
        </div>
        <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Guía de migración
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Cómo migrar de Airtable a Baserow sin perder datos
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          El mayor freno para dejar una SaaS no es instalar la alternativa — es mover tus datos sin
          romper nada. Esto es lo que se migra solo, y lo que tendrás que rehacer a mano.
        </p>
      </header>

      <ol className="space-y-8">
        {steps.map((step) => (
          <li key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-600">
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

      <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-semibold text-amber-800">Antes de borrar tu cuenta de Airtable</p>
        <p className="mt-1 text-sm text-slate-700">
          Verifica en Baserow que: (1) el número total de filas coincide por tabla, (2) los campos
          numéricos/fecha no se convirtieron a texto, y (3) las relaciones clave funcionan en ambos
          sentidos. Exportar de nuevo desde Airtable es gratis mientras la cuenta siga activa —
          no lo es una vez la canceles.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
        <p className="font-semibold text-slate-900">¿Listo para desplegar Baserow?</p>
        <p className="mt-1 text-sm text-slate-600">
          Ficha completa con licencia, stack técnico y docker-compose listo para copiar.
        </p>
        <Link href="/tool/baserow" className={cn(buttonVariants({ size: "lg" }), "mt-4 gap-1.5")}>
          Ver ficha de Baserow <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
