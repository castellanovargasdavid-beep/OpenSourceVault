export interface GithubStats {
  stars: number;
  openIssues: number;
  forks: number;
  updatedAt: string;
}

/**
 * active: commit en los últimos 60 días.
 * maintained: entre 60 y 180 días (2-6 meses) sin actividad.
 * stale: más de 180 días (6 meses) sin actividad — posible abandono.
 */
export type RepoHealthStatus = "active" | "maintained" | "stale";

export function getRepoHealthStatus(updatedAtIso: string): RepoHealthStatus {
  const days = Math.floor((Date.now() - new Date(updatedAtIso).getTime()) / (1000 * 60 * 60 * 24));
  if (days < 60) return "active";
  if (days <= 180) return "maintained";
  return "stale";
}

function parseGithubUrl(githubUrl: string): { owner: string; repo: string } | null {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

function githubFetch(path: string) {
  return fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate: 86400 },
  });
}

/**
 * Consulta la API pública de GitHub para mostrar datos en vivo (estrellas,
 * última actualización, issues abiertos). Si no hay GITHUB_TOKEN configurado
 * el límite gratuito es de 60 req/hora por IP, así que con 100+ fichas es
 * fácil agotarlo durante el build — por eso esto SIEMPRE degrada en
 * silencio a `null` (la ficha cae de vuelta a las estrellas estimadas) en
 * vez de romper el build.
 */
export async function getGithubStats(githubUrl: string): Promise<GithubStats | null> {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) return null;

  try {
    const res = await githubFetch(`/repos/${parsed.owner}/${parsed.repo}`);
    if (!res.ok) return null;

    const data = (await res.json()) as {
      stargazers_count: number;
      open_issues_count: number;
      forks_count: number;
      pushed_at: string;
    };

    return {
      stars: data.stargazers_count,
      openIssues: data.open_issues_count,
      forks: data.forks_count,
      updatedAt: data.pushed_at,
    };
  } catch {
    return null;
  }
}

export interface LatestRelease {
  /** Nombre real del tag/versión tal como lo publicó el proyecto, ej. "v2.4.1". */
  tag: string;
  /** Enlace directo a las notas de esa versión en GitHub — nunca resumimos ni inventamos qué cambió. */
  url: string;
  publishedAt: string | null;
}

/**
 * Última versión publicada de verdad en GitHub: usa GitHub Releases si el
 * proyecto los publica, y si no cae al tag más reciente. Deliberadamente NO
 * intenta resumir ni clasificar qué cambió entre versiones — eso requeriría
 * inventar contenido específico por herramienta que no podemos verificar.
 * Se degrada a null en cualquier fallo (límite de peticiones, repo sin
 * releases ni tags, sin conexión), igual que getGithubStats().
 */
export async function getLatestRelease(githubUrl: string): Promise<LatestRelease | null> {
  const parsed = parseGithubUrl(githubUrl);
  if (!parsed) return null;
  const { owner, repo } = parsed;

  try {
    const res = await githubFetch(`/repos/${owner}/${repo}/releases/latest`);
    if (res.ok) {
      const data = (await res.json()) as { tag_name: string; html_url: string; published_at: string };
      return { tag: data.tag_name, url: data.html_url, publishedAt: data.published_at };
    }

    // Muchos proyectos solo publican tags de git, sin usar "Releases" de GitHub.
    const tagsRes = await githubFetch(`/repos/${owner}/${repo}/tags`);
    if (!tagsRes.ok) return null;
    const tags = (await tagsRes.json()) as { name: string }[];
    if (!Array.isArray(tags) || tags.length === 0) return null;
    return { tag: tags[0].name, url: `https://github.com/${owner}/${repo}/releases/tag/${encodeURIComponent(tags[0].name)}`, publishedAt: null };
  } catch {
    return null;
  }
}

/** Página real de releases del repo en GitHub — para "lee las notas antes de actualizar". */
export function getReleasesPageUrl(githubUrl: string): string | null {
  const parsed = parseGithubUrl(githubUrl);
  return parsed ? `https://github.com/${parsed.owner}/${parsed.repo}/releases` : null;
}

/** Feed Atom real que GitHub expone gratis para cualquier repo público — cero infraestructura propia. */
export function getReleasesFeedUrl(githubUrl: string): string | null {
  const parsed = parseGithubUrl(githubUrl);
  return parsed ? `https://github.com/${parsed.owner}/${parsed.repo}/releases.atom` : null;
}

/** locale es opcional y por defecto "es" para no romper otras llamadas existentes. */
export function formatRelativeDate(iso: string, locale: "es" | "en" = "es"): string {
  const date = new Date(iso);
  const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (locale === "en") {
    if (days < 1) return "today";
    if (days === 1) return "1 day ago";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} ${months === 1 ? "month" : "months"} ago`;
    const years = Math.floor(months / 12);
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  if (days < 1) return "hoy";
  if (days === 1) return "hace 1 día";
  if (days < 30) return `hace ${days} días`;
  const months = Math.floor(days / 30);
  if (months < 12) return `hace ${months} ${months === 1 ? "mes" : "meses"}`;
  const years = Math.floor(months / 12);
  return `hace ${years} ${years === 1 ? "año" : "años"}`;
}
