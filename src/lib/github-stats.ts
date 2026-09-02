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

/**
 * Consulta la API pública de GitHub para mostrar datos en vivo (estrellas,
 * última actualización, issues abiertos). Si no hay GITHUB_TOKEN configurado
 * el límite gratuito es de 60 req/hora por IP, así que con 100+ fichas es
 * fácil agotarlo durante el build — por eso esto SIEMPRE degrada en
 * silencio a `null` (la ficha cae de vuelta a las estrellas estimadas) en
 * vez de romper el build.
 */
export async function getGithubStats(githubUrl: string): Promise<GithubStats | null> {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?\/?$/);
  if (!match) return null;

  const [, owner, repo] = match;

  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 86400 },
    });

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
