/**
 * Detecta si un docker-compose.yml reserva una GPU NVIDIA de verdad (bloque
 * `deploy.resources.reservations.devices` con `driver: nvidia` o
 * `capabilities: [gpu]`), no solo si la herramienta "se beneficia" de tener
 * una. Deliberadamente estricto: varias herramientas de IA del catálogo
 * (Ollama, LocalAI...) corren perfectamente en CPU y solo recomiendan GPU
 * para ir más rápido — esas NO deben marcarse como bloqueadas aquí.
 */
const GPU_RESERVATION_PATTERN = /driver:\s*nvidia|capabilities:\s*\[[^\]]*gpu[^\]]*\]/i;

export function detectGpuRequirement(dockerCompose: string): boolean {
  return GPU_RESERVATION_PATTERN.test(dockerCompose);
}

/**
 * Usa `gpuRequired` si está fijado a mano en el catálogo (ver OpenSourceTool
 * en src/lib/types.ts); si no, infiere de dockerCompose vía
 * detectGpuRequirement() — mismo patrón override-o-infiere que
 * resolveToolResourceProfile() en tool-difficulty.ts.
 */
export function resolveGpuRequirement(tool: { dockerCompose: string; gpuRequired?: boolean }): boolean {
  return tool.gpuRequired ?? detectGpuRequirement(tool.dockerCompose);
}
