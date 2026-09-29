/**
 * Auditoría de transparencia/reproducibilidad del sistema de despliegue de
 * /tool/* — `npm run audit:deployment`. Complementa a validate-data.ts (que
 * audita la integridad de los DATOS del catálogo) con un chequeo específico
 * de cómo se presenta el despliegue de cada herramienta: tags de imagen
 * móviles, scripts `curl|bash` sin paso de inspección previo, valores que
 * parecen secretos hardcodeados reales (no un placeholder `change-me`), y
 * docker-compose incompletos.
 *
 * OJO — esto NO es una auditoría de seguridad del software catalogado: no
 * analiza vulnerabilidades de ninguna imagen ni de ningún proyecto. Solo
 * comprueba si ESTE catálogo describe su propio despliegue con lenguaje
 * preciso ("compose checked", "mutable tag", "official image"...) en vez de
 * dar una falsa sensación de que todo está verificado o es reproducible.
 *
 * Sale con código 1 si encuentra algo que sí es un problema real (secreto
 * con pinta de hardcodeado, `curl|bash` directo sin inspección, o un
 * docker-compose sin ninguna imagen declarada) — no falla solo por tener
 * tags móviles o por no tener `dockerStatus` fijado a mano, que son hechos
 * normales de la mayoría de proyectos upstream, no errores de este catálogo.
 */
import { allTools } from "../src/data/tools";
import { auditToolDeployment, findSuspiciousSecretAssignments } from "../src/lib/deployment-audit";

interface Finding {
  toolId: string;
  message: string;
}

function main(): void {
  const findings: Finding[] = [];

  let hardcodedSecrets = 0;
  let mutableTagTools = 0;
  let fullyPinnedTools = 0;
  let directPipeToShell = 0;
  let brokenCompose = 0;
  const stateCounts: Record<string, number> = {
    verified: 0,
    partially_verified: 0,
    unverified: 0,
    external_script: 0,
    manual_setup: 0,
  };

  for (const tool of allTools) {
    const audit = auditToolDeployment(tool);
    stateCounts[audit.state]++;

    if (audit.hasMutableTag) mutableTagTools++;
    if (audit.method === "compose" && audit.images.length > 0 && !audit.hasMutableTag && !audit.hasUnknownTag) {
      fullyPinnedTools++;
    }
    if (audit.method === "compose" && audit.images.length === 0) {
      brokenCompose++;
      findings.push({ toolId: tool.id, message: "docker-compose sin ninguna línea `image:` — compose incompleto o mal formado" });
    }
    if (audit.usesDirectPipeToShell) {
      directPipeToShell++;
      findings.push({
        toolId: tool.id,
        message: "usa `curl|bash` (o `wget|bash`) directo, sin paso de descarga/inspección previo — ver Fase 4",
      });
    }

    const suspicious = findSuspiciousSecretAssignments(tool.dockerCompose);
    if (suspicious.length > 0) {
      hardcodedSecrets += suspicious.length;
      for (const s of suspicious) {
        findings.push({ toolId: tool.id, message: `posible secreto hardcodeado (no lleva marcador de placeholder reconocible): ${s}` });
      }
    }
  }

  console.log("DEPLOYMENT SECURITY AUDIT");
  console.log(`Total tools checked: ${allTools.length}`);
  console.log(`Hardcoded secrets: ${hardcodedSecrets}`);
  console.log(`Mutable tags: ${mutableTagTools} tools with >=1 mutable/floating tag`);
  console.log(`Pinned images: ${fullyPinnedTools} tools with 100% pinned/digest tags`);
  console.log(`curl|bash (direct pipe, no inspection step): ${directPipeToShell}`);
  console.log(`Broken compose: ${brokenCompose}`);
  console.log(`Unverified deployments: ${stateCounts.unverified}`);
  console.log(`Verified deployments: ${stateCounts.verified}`);
  console.log(`Partially verified deployments: ${stateCounts.partially_verified}`);
  console.log(`External script deployments (official installer, uses Docker): ${stateCounts.external_script}`);
  console.log(`Manual setup (no Docker at all): ${stateCounts.manual_setup}`);

  if (findings.length === 0) {
    console.log("\n\x1b[32m✔ Sin problemas bloqueantes.\x1b[0m");
    process.exit(0);
  }

  console.error(`\n\x1b[31m✘ ${findings.length} problema(s) encontrado(s):\x1b[0m\n`);
  for (const f of findings) {
    console.error(`  [${f.toolId}] ${f.message}`);
  }
  console.error("\n\x1b[31m✘ Auditoría de despliegue fallida.\x1b[0m");
  process.exit(1);
}

main();
