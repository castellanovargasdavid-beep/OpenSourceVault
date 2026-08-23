import type { Metadata } from "next";
import { Check, ExternalLink } from "lucide-react";
import { hostingProviders } from "@/data/hosting-providers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hosting & Descuentos para Auto-hospedar tus Herramientas",
  description:
    "Compara DigitalOcean, Hetzner y Railway para auto-hospedar tus alternativas open source favoritas, con créditos y descuentos exclusivos.",
  alternates: { canonical: `${siteConfig.url}/hosting-deals` },
};

export default function HostingDealsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Hosting & Descuentos
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Estos son los proveedores de VPS que recomendamos para auto-hospedar cualquier
          herramienta del catálogo. Todos soportan Docker y Docker Compose sin fricción.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {hostingProviders.map((provider) => (
          <Card key={provider.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{provider.name}</CardTitle>
              <CardDescription>{provider.tagline}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
              <div>
                <p className="text-2xl font-bold text-slate-900">{provider.startingPrice}</p>
                {provider.freeCredit && (
                  <p className="mt-1 text-sm font-medium text-emerald-700">
                    {provider.freeCredit}
                  </p>
                )}
              </div>
              <p className="text-sm text-slate-500">Ideal para: {provider.bestFor}</p>
              <ul className="flex-1 space-y-2">
                {provider.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={provider.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={cn(buttonVariants({ size: "lg" }), "w-full justify-between")}
              >
                {provider.ctaLabel}
                <ExternalLink size={16} />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="mt-16 overflow-x-auto">
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Comparativa rápida</h2>
        <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-xl border border-slate-200 text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Proveedor</th>
              <th className="px-4 py-3">Precio desde</th>
              <th className="px-4 py-3">Crédito gratis</th>
              <th className="px-4 py-3">Mejor para</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {hostingProviders.map((provider) => (
              <tr key={provider.id}>
                <td className="px-4 py-3 font-medium text-slate-900">{provider.name}</td>
                <td className="px-4 py-3 text-slate-600">{provider.startingPrice}</td>
                <td className="px-4 py-3 text-slate-600">{provider.freeCredit ?? "—"}</td>
                <td className="px-4 py-3 text-slate-600">{provider.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <p className="mt-8 text-xs text-slate-400">
        Divulgación: algunos de los enlaces anteriores son enlaces de afiliado. Si te registras a
        través de ellos, podemos recibir una comisión sin coste adicional para ti. Esto nos ayuda a
        mantener OpenSourceVault gratuito.
      </p>
    </div>
  );
}
