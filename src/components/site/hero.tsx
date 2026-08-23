import { SearchBar } from "@/components/site/search-bar";

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
          +18 alternativas open source auditadas
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Deja de pagar por SaaS.
          <br />
          <span className="text-emerald-600">Auto-hospeda lo que ya usas.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Encuentra la mejor alternativa de código abierto a Notion, Slack, Airtable, Google
          Analytics y decenas de herramientas más — con licencia, docker-compose y guía de
          despliegue incluidos.
        </p>
        <div className="mx-auto mt-10 max-w-2xl">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
