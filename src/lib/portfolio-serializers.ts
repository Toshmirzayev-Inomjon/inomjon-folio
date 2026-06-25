export type TagRecord = {
  id: string;
  name: string;
  slug: string;
};

export type ProjectRecord = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string | null;
  visitUrl: string | null;
  featured: boolean | number;
  createdAt: Date | string;
  tags: TagRecord[];
};

export type ProfileRecord = {
  id: string;
  name: string;
  headline: string;
  bio: string;
  heroImage: string;
  headlineUz: string | null;
  headlineEn: string | null;
  headlineRu: string | null;
  bioUz: string | null;
  bioEn: string | null;
  bioRu: string | null;
  phoneNumber: string | null;
  contactEmail: string | null;
  location: string | null;
  telegramUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
  cvUrl: string | null;
  careerStartDate: Date | string | null;
  happyClientsCount: number;
  updatedAt: Date | string;
};

export type SkillRecord = {
  id: string;
  name: string;
  group: string | null;
  sortOrder: number;
};

function iso(value: Date | string) {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

export function serializeTag(tag: TagRecord) {
  return { id: tag.id, name: tag.name, slug: tag.slug };
}

export function serializeProject(project: ProjectRecord) {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    tech_stack: project.techStack
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    github_link: project.githubUrl || null,
    live_link: project.visitUrl || null,
    featured: Boolean(project.featured),
    created_at: iso(project.createdAt),
    tags: project.tags.map(serializeTag),
  };
}

export function serializeProfile(profile: ProfileRecord) {
  return {
    id: profile.id,
    name: profile.name,
    headline_uz: profile.headlineUz,
    headline_en: profile.headlineEn,
    headline_ru: profile.headlineRu,
    bio_uz: profile.bioUz,
    bio_en: profile.bioEn,
    bio_ru: profile.bioRu,
    phone_number: profile.phoneNumber,
    contact_email: profile.contactEmail,
    location: profile.location,
    telegram_url: profile.telegramUrl,
    github_url: profile.githubUrl,
    linkedin_url: profile.linkedinUrl,
    instagram_url: profile.instagramUrl,
    cv_url: profile.cvUrl,
    career_start_date: profile.careerStartDate
      ? iso(profile.careerStartDate).slice(0, 10)
      : null,
    happy_clients_count: profile.happyClientsCount,
    updated_at: iso(profile.updatedAt),
  };
}

export function serializeSkill(skill: SkillRecord) {
  return {
    id: skill.id,
    name: skill.name,
    group: skill.group,
    sort_order: skill.sortOrder,
  };
}

export function calculateExperienceYears(startDate: Date | string | null) {
  if (!startDate) return 0;

  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const now = new Date();
  let years = now.getUTCFullYear() - start.getUTCFullYear();
  const anniversaryPassed =
    now.getUTCMonth() > start.getUTCMonth() ||
    (now.getUTCMonth() === start.getUTCMonth() && now.getUTCDate() >= start.getUTCDate());

  if (!anniversaryPassed) years -= 1;
  return Math.max(0, years);
}
