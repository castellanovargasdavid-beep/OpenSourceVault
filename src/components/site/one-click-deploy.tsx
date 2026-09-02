import type { DeployPlatform, OneClickDeployTarget } from "@/lib/types";
import { buttonVariants } from "@/components/ui/button";
import { LogoImage } from "@/components/site/logo-image";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";

const PLATFORM_DOMAIN: Record<DeployPlatform, string> = {
  Railway: "railway.app",
  Coolify: "coolify.io",
  Render: "render.com",
  Elestio: "elest.io",
  Portainer: "portainer.io",
};

/**
 * Fila de botones de despliegue en 1 clic (Railway, Coolify, Render, Elestio,
 * Portainer...). Si la herramienta no tiene ninguna plantilla verificada,
 * no renderiza nada — nunca un botón roto ni un bloque vacío.
 */
export function OneClickDeploy({ targets, locale = "es" }: { targets?: OneClickDeployTarget[]; locale?: Locale }) {
  if (!targets || targets.length === 0) return null;

  const t = getDictionary(locale);

  return (
    <div className="mb-4 flex flex-wrap gap-3">
      {targets.map((target) => (
        <a
          key={target.platform}
          href={target.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 shadow-sm hover:opacity-90"
          )}
        >
          <LogoImage
            domain={PLATFORM_DOMAIN[target.platform]}
            label={target.platform}
            size={20}
            className="rounded bg-white/90 ring-0"
            fallbackGradient="from-white/20 to-white/20"
          />
          {t.toolPage.deployOn(target.platform)}
        </a>
      ))}
    </div>
  );
}
