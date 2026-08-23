import { Cloud, Server, Rocket, Gift } from "lucide-react";
import type { OpenSourceTool } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AffiliateHostingWidget({ tool }: { tool: OpenSourceTool }) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Gift className="text-emerald-600" size={20} />
        <h3 className="font-semibold text-slate-900">
          Despliega {tool.name} en minutos
        </h3>
      </div>
      <p className="mb-5 text-sm text-slate-600">
        Usa el <code className="rounded bg-white px-1.5 py-0.5 text-xs">docker-compose.yml</code>{" "}
        de abajo en cualquiera de estos proveedores auto-hospedados.
      </p>
      <div className="flex flex-col gap-3">
        <a
          href={tool.affiliateLinks.digitalOceanUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={cn(buttonVariants({ variant: "default", size: "lg" }), "h-auto w-full flex-col items-start gap-0.5 whitespace-normal px-4 py-3")}
        >
          <span className="flex items-center gap-2">
            <Cloud size={18} /> Desplegar en DigitalOcean
          </span>
          <span className="pl-6 text-xs font-normal opacity-90">$200 de crédito gratis</span>
        </a>
        <a
          href={tool.affiliateLinks.hetznerUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "w-full justify-start gap-2")}
        >
          <Server size={18} /> Desplegar en Hetzner
        </a>
        <a
          href={tool.affiliateLinks.railwayUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full justify-start gap-2")}
        >
          <Rocket size={18} /> Desplegar en Railway
        </a>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Enlaces de afiliado: si compras a través de ellos podemos recibir una comisión sin coste
        extra para ti.
      </p>
    </div>
  );
}
