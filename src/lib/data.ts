import { prisma } from "@/lib/prisma";
import { findProfile, listProjects, listSkills } from "@/lib/portfolio-db";
import {
  calculateExperienceYears,
  serializeProfile,
  serializeProject,
  serializeSkill,
} from "@/lib/portfolio-serializers";

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type ProfileView = {
  id: string;
  name: string;
  headline_uz: string | null;
  headline_en: string | null;
  headline_ru: string | null;
  bio_uz: string | null;
  bio_en: string | null;
  bio_ru: string | null;
  phone_number: string | null;
  contact_email: string | null;
  location: string | null;
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
  id: string;
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
  id: string;
  name: string;
  group: string | null;
  sort_order: number;
};

export type PortfolioStatsView = {
  project_count: number;
  experience_years: number;
  happy_clients_count: number;
};

export async function getProfileView(): Promise<ProfileView | null> {
  const profile = await findProfile();
  return profile ? serializeProfile(profile) : null;
}

export async function getProjectViews(limit = 100): Promise<ProjectView[]> {
  const projects = await listProjects(limit);
  return projects.map(serializeProject);
}

export async function getSkillViews(): Promise<SkillView[]> {
  const skills = await listSkills();
  return skills.map(serializeSkill);
}

export async function getPortfolioStats(): Promise<PortfolioStatsView> {
  const [projectRows, profile] = await Promise.all([
    prisma.$queryRaw<Array<{ count: bigint | number }>>`
      SELECT COUNT(*) AS count FROM Project
    `,
    findProfile(),
  ]);
  const projectCount = Number(projectRows[0]?.count ?? 0);

  return {
    project_count: projectCount,
    experience_years: calculateExperienceYears(profile?.careerStartDate ?? null),
    happy_clients_count: profile?.happyClientsCount ?? 0,
  };
}

export async function getSiteData() {
  const [profile, projects, skills, stats] = await Promise.all([
    getProfileView(),
    getProjectViews(),
    getSkillViews(),
    getPortfolioStats(),
  ]);
  return { profile, projects, skills, stats };
}
