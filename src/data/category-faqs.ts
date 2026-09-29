import type { ToolCategory } from "@/lib/types";
import type { Locale } from "@/i18n/config";
import { categoryFaqsEn } from "./category-faqs.en";

export interface CategoryFaqEntry {
  q: string;
  a: string;
}

/**
 * FAQs técnicas fijas (no generadas a partir de los datos del catálogo) para
 * las categorías donde las dudas de infraestructura son lo bastante
 * distintas entre sí como para merecer una respuesta propia: servidor
 * mínimo real, backups de volúmenes, exposición a internet vs VPN/Tailscale,
 * y coste frente a la alternativa SaaS de la categoría. Las categorías que
 * no tienen entrada aquí siguen usando solo las FAQ genéricas (FOSS/GPU/RAM)
 * de CategoryPageContent.
 */
export const categoryFaqs: Partial<Record<ToolCategory, CategoryFaqEntry[]>> = {
  Productivity: [
    {
      q: "¿Qué servidor mínimo necesito para alojar herramientas de Productividad?",
      a: "La mayoría (AppFlowy, Focalboard, Outline...) va sobrada con 1-2 vCPU y 2GB de RAM — un plan de ~$12/mes en DigitalOcean o Vultr. Las que montan un stack más completo (Postgres + Redis + servicios propios, como Huly) se sienten más cómodas con 4GB.",
    },
    {
      q: "¿Cómo se gestionan las copias de seguridad de los volúmenes de datos?",
      a: "Casi todas guardan el estado en Postgres/SQLite más un volumen Docker para adjuntos. La rutina típica es un dump programado de la base de datos (pg_dump o el .backup de SQLite) más una copia del volumen con rsync o restic hacia otro disco o un bucket S3-compatible. Como los contenedores no guardan estado por sí mismos, con el dump y el volumen respaldados puedes reconstruir todo el stack desde el docker-compose.",
    },
    {
      q: "¿Es seguro exponer estas herramientas a internet o es preferible usar VPN/Tailscale?",
      a: "La mayoría trae su propio login y está pensada para exponerse detrás de un proxy inverso (Caddy/Traefik) con TLS — es el despliegue normal si mantienes la imagen actualizada y usas contraseñas fuertes (y 2FA si la herramienta lo soporta). Si el uso es solo interno y no necesitas acceso público, meterla detrás de Tailscale/WireGuard elimina de raíz la superficie de ataque de \"app web expuesta\", a cambio de necesitar el cliente VPN en cada dispositivo.",
    },
    {
      q: "¿Cómo se comparan los costes frente a alternativas comerciales SaaS?",
      a: "Frente a Notion (10$/usuario/mes en el plan Business) o Airtable (20$/usuario/mes), un VPS de 2GB por ~12$/mes cubre a todo el equipo sin coste por asiento — el ahorro crece cuanto más grande es el equipo, no con el uso.",
    },
  ],
  Storage: [
    {
      q: "¿Qué servidor mínimo necesito para alojar herramientas de Almacenamiento?",
      a: "La instalación base de Nextcloud, Immich o Seafile corre bien con 2 vCPU y 4GB de RAM (~24$/mes). Pero el cuello de botella real no es la RAM del proceso: es el disco. El tamaño del servidor lo decide cuántos archivos vas a guardar, no la app en sí.",
    },
    {
      q: "¿Cómo se gestionan las copias de seguridad de los volúmenes de datos?",
      a: "Aquí el backup tiene dos capas: la base de datos (Postgres/SQLite, con un dump programado) y la biblioteca de archivos en sí, que suele ser mucho más grande — se respalda con rsync o restic hacia un disco separado o un bucket S3-compatible. Como aquí sí hay archivos irremplazables de usuarios reales (no solo configuración), conviene probar la restauración de vez en cuando, no solo confiar en que el cron corrió.",
    },
    {
      q: "¿Es seguro exponer estas herramientas a internet o es preferible usar VPN/Tailscale?",
      a: "Herramientas de sincronización como Nextcloud están pensadas para ser accesibles desde el móvil en cualquier red, así que lo habitual es exponerlas con proxy inverso + TLS + fail2ban. Para apps con datos más sensibles (fotos familiares en Immich, por ejemplo), reforzar con VPN/Tailscale al menos para el panel de administración y activar 2FA reduce mucho el riesgo, porque una app de almacenamiento comprometida puede filtrar todo lo que guarda.",
    },
    {
      q: "¿Cómo se comparan los costes frente a alternativas comerciales SaaS?",
      a: "Frente a Google Drive (7,2$/usuario/mes en Workspace Business Starter) o Dropbox (15$/usuario/mes en el plan Standard), el almacenamiento auto-hospedado suele salir más barato a partir de unos pocos usuarios — aunque aquí pagas por el disco en sí, no solo por el software.",
    },
  ],
  Analytics: [
    {
      q: "¿Qué servidor mínimo necesito para alojar herramientas de Analítica?",
      a: "Plausible o Umami corren cómodos con 1 vCPU y 1GB de RAM incluso con tráfico moderado, porque solo agregan eventos, no guardan sesión por sesión. Las que incluyen un stack más pesado (PostHog, con Postgres + Redis) piden más margen — ya lo documentamos como ~15GB de disco para ese caso.",
    },
    {
      q: "¿Cómo se gestionan las copias de seguridad de los volúmenes de datos?",
      a: "Normalmente es una sola base de datos (Postgres, y ClickHouse en el caso de un PostHog a gran escala) — un dump programado (pg_dump/pg_basebackup) es suficiente. Perder estos datos significa perder tu histórico de estadísticas, no una función que tus usuarios usen en directo, así que un backup diario suele bastar.",
    },
    {
      q: "¿Es seguro exponer estas herramientas a internet o es preferible usar VPN/Tailscale?",
      a: "El script de tracking y su endpoint tienen que ser públicos por definición — reciben visitas desde el navegador de tu propia audiencia. Lo que sí puedes restringir es el panel de administración: ya trae su propio login, y si nunca necesitas consultarlo desde una red distinta a la tuya, ponerlo además detrás de VPN/Tailscale no cuesta nada y reduce la superficie expuesta.",
    },
    {
      q: "¿Cómo se comparan los costes frente a alternativas comerciales SaaS?",
      a: "Las SaaS de analítica de pago suelen cobrar según volumen de eventos o tráfico, así que la factura sube con el éxito de tu web — un VPS de 6-12$/mes corriendo Plausible o Umami no escala de esa forma. No tenemos una cifra propia verificada de cada SaaS de analítica de pago para dar un número exacto de ahorro, así que no la inventamos aquí: la ventaja crece cuanto más tráfico tengas, y a nivel de privacidad de tus visitantes es real desde el primer visitante.",
    },
  ],
  AI: [
    {
      q: "¿Qué servidor mínimo necesito para alojar herramientas de IA?",
      a: "Depende de si vas a ejecutar modelos en el propio servidor. Solo la interfaz (Open WebUI, Flowise, Dify) va bien con 2 vCPU y 4GB sin GPU. Si además ejecutas inferencia local con Ollama o LocalAI: en CPU es viable para modelos ≤7B (necesitas ~8GB de RAM libre); para modelos 13B+ o inferencia rápida, conviene una GPU dedicada con 8-12GB+ de VRAM.",
    },
    {
      q: "¿Cómo se gestionan las copias de seguridad de los volúmenes de datos?",
      a: "Aquí conviene distinguir qué es realmente irremplazable: la configuración, tus conversaciones/chats y los documentos que subiste para RAG sí hay que respaldarlos. Los pesos de los modelos descargados no — se pueden volver a descargar desde el registro de modelos (la librería de Ollama, HuggingFace...), así que no merece la pena incluirlos en el backup.",
    },
    {
      q: "¿Es seguro exponer estas herramientas a internet o es preferible usar VPN/Tailscale?",
      a: "Las interfaces de chat suelen guardar claves de API y pueden disparar cómputo caro (o facturable, si llaman a un proveedor externo), así que exponerlas sin autenticación es más arriesgado que una web estática cualquiera. Activa siempre el login integrado, y si la instancia usa una clave de OpenAI/Anthropic por detrás, valora VPN/Tailscale en vez de solo un login público para evitar abuso por fuerza bruta o factura inesperada.",
    },
    {
      q: "¿Cómo se comparan los costes frente a alternativas comerciales SaaS?",
      a: "Auto-hospedar IA no elimina el coste de cómputo, lo traslada: correr modelos locales significa invertir en RAM/GPU propia (o alquilar un VPS con GPU), lo que compensa con un uso alto y constante. Para un uso ligero u ocasional, una suscripción tipo ChatGPT Plus puede seguir siendo más barata que mantener una GPU dedicada — no tenemos una cifra propia verificada del coste de GPU en la nube por hora, así que no la inventamos aquí.",
    },
  ],
  PasswordManagers: [
    {
      q: "¿Qué servidor mínimo necesito para alojar herramientas de Seguridad?",
      a: "Vaultwarden es de las opciones más ligeras de todo el catálogo: su propia ficha lo describe como \"ideal para VPS pequeños\", y funciona bien con 1 vCPU y 512MB-1GB de RAM (el plan de entrada de ~4-6$/mes de cualquier proveedor).",
    },
    {
      q: "¿Cómo se gestionan las copias de seguridad de los volúmenes de datos?",
      a: "Toda tu bóveda vive en una sola base de datos (SQLite o Postgres) más el volumen de adjuntos — respalda ambos. Trata ese backup con el mismo cuidado que la propia bóveda: si alguien roba el backup sin cifrar, ha robado tu gestor de contraseñas entero.",
    },
    {
      q: "¿Es seguro exponer estas herramientas a internet o es preferible usar VPN/Tailscale?",
      a: "Esta es la categoría donde más nos inclinamos por NO exponerla directamente si puedes evitarlo. Aunque Vaultwarden pide contraseña maestra y admite 2FA, un gestor de contraseñas es el objetivo de mayor valor de todo tu stack — ponerlo detrás de Tailscale/WireGuard (o como mínimo fail2ban + un proxy inverso bien configurado) compensa la fricción extra más que en casi cualquier otra categoría de este catálogo.",
    },
    {
      q: "¿Cómo se comparan los costes frente a alternativas comerciales SaaS?",
      a: "Frente a 1Password (7,99$/usuario/mes en el plan Business), Vaultwarden en un VPS de 4-6$/mes cubre a todo el equipo sin importar cuántos seáis — sale más barato que 1Password a partir de un segundo usuario, y la diferencia se dispara con equipos grandes.",
    },
  ],
};

export function getCategoryFaqs(id: ToolCategory, locale: Locale): CategoryFaqEntry[] {
  if (locale === "en") {
    return categoryFaqsEn[id] ?? categoryFaqs[id] ?? [];
  }
  return categoryFaqs[id] ?? [];
}
