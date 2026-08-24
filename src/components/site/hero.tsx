import { SearchBar } from "@/components/site/search-bar";
import { RotatingExamples } from "@/components/site/rotating-examples";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { LogoImage } from "@/components/site/logo-image";
import { tools } from "@/data/tools";
import { categories } from "@/data/categories";
import { getSaasDomain } from "@/lib/saas-domains";

const showcaseSaas = [
  "Notion",
  "Slack",
  "Airtable",
  "Salesforce",
  "Google Analytics",
  "Firebase",
  "Calendly",
  "Zapier",
];

export function Hero() {
  const totalSaas = new Set(tools.flatMap((t) => t.replaces)).size;

  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-emerald-300/40 blur-3xl" />
        <div className="animate-blob-delayed absolute -top-16 right-0 h-80 w-80 rounded-full bg-violet-300/35 blur-3xl" />
        <div className="animate-blob-slow absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          +{tools.length} alternativas open source auditadas
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Deja de pagar por{" "}
          <RotatingExamples
            examples={showcaseSaas}
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent"
          />
          .
          <br />
          Auto-hospeda lo que ya usas.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Encuentra la mejor alternativa de código abierto a Notion, Slack, Airtable, Google
          Analytics y decenas de herramientas más — con licencia, docker-compose y guía de
          despliegue incluidos.
        </p>
        <div className="mx-auto mt-10 max-w-2xl">
          <SearchBar />
        </div>

        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              <AnimatedCounter value={tools.length} suffix="+" />
            </p>
            <p className="text-xs text-slate-500">herramientas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              <AnimatedCounter value={totalSaas} suffix="+" />
            </p>
            <p className="text-xs text-slate-500">SaaS cubiertos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              <AnimatedCounter value={categories.length} />
            </p>
            <p className="text-xs text-slate-500">categorías</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">$0</p>
            <p className="text-xs text-slate-500">costo de licencia</p>
          </div>
        </div>

        <div className="mt-14">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Sustituye herramientas como
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {showcaseSaas.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm text-slate-600 shadow-sm backdrop-blur"
              >
                <LogoImage domain={getSaasDomain(name)} label={name} size={18} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
