/**
 * Data layer — all content fetched from the FastAPI backend.
 * Set BACKEND_URL in .env (server-side only, no NEXT_PUBLIC_ prefix).
 *
 * Example .env:
 *   BACKEND_URL=http://localhost:8000
 */

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";
const API = `${BACKEND_URL}/api/v1`;

// ─── Response types ────────────────────────────────────────────────────────────

export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type ProfileView = {
  id: number;
  name: string;
  headline_uz: string | null;
  headline_en: string | null;
  headline_ru: string | null;
  bio_uz: string | null;
  bio_en: string | null;
  bio_ru: string | null;
  telegram_url: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  cv_url: string | null;
  career_start_date: string | null;
  happy_clients_count: number;
  updated_at: string;
};

export type ProjectView = {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_link: string | null;
  live_link: string | null;
  featured: boolean;
  created_at: string;
  tags: Tag[];
};

export type SkillView = {
  id: number;
  name: string;
  group: string | null;
  sort_order: number;
};

export type PortfolioStatsView = {
  project_count: number;
  experience_years: number;
  happy_clients_count: number;
};

// ─── Fetch helpers ─────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      next: { revalidate: 0 }, // force-dynamic equivalent for fetch cache
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error(`[data] fetch ${path} failed:`, err);
    return null;
  }
}

// ─── Public API ────────────────────────────────────────────────────────────────

export async function getProfileView(): Promise<ProfileView | null> {
  return apiFetch<ProfileView>("/portfolio/profile");
}

export async function getProjectViews(limit?: number): Promise<ProjectView[]> {
  const url = limit ? `/portfolio/projects?limit=${limit}` : "/portfolio/projects";
  return (await apiFetch<ProjectView[]>(url)) ?? [];
}

export async function getSkillViews(): Promise<SkillView[]> {
  return (await apiFetch<SkillView[]>("/portfolio/skills")) ?? [];
}

export async function getPortfolioStats(): Promise<PortfolioStatsView> {
  const fallback: PortfolioStatsView = {
    project_count: 0,
    experience_years: 0,
    happy_clients_count: 0,
  };
  return (await apiFetch<PortfolioStatsView>("/portfolio/stats")) ?? fallback;
}

/** Convenience: fetch all portfolio data in parallel. */
export async function getSiteData() {
  const [profile, projects, skills, stats] = await Promise.all([
    getProfileView(),
    getProjectViews(),
    getSkillViews(),
    getPortfolioStats(),
  ]);
  return { profile, projects, skills, stats };
}
