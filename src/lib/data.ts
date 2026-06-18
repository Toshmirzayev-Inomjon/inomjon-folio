import { prisma } from "@/lib/prisma";

export type ProfileView = {
  name: string;
  headline: string;
  bio: string;
  heroImage: string;
  cvUrl: string | null;
  telegramUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  instagramUrl: string | null;
};

export type ProjectView = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  techStack: string;
  visitUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
};

export type SkillView = {
  id: string;
  name: string;
  group: string | null;
  imageUrl: string;
  sortOrder: number;
};

export type LocationView = {
  latitude: number;
  longitude: number;
  iframeUrl: string | null;
};

export async function getSiteData() {
  const [profile, projects, skills, location] = await Promise.all([
    prisma.profile.findUnique({ where: { id: "main" } }),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] }),
    getSkillViews(),
    prisma.locationSetting.findUnique({ where: { id: "main" } })
  ]);

  return { profile, projects, skills, location };
}

export async function getProfileView() {
  return prisma.profile.findUnique({
    where: { id: "main" },
    select: {
      name: true,
      headline: true,
      bio: true,
      heroImage: true,
      cvUrl: true,
      telegramUrl: true,
      githubUrl: true,
      linkedinUrl: true,
      instagramUrl: true
    }
  });
}

export async function getProjectViews(take?: number) {
  return prisma.project.findMany({
    take,
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      techStack: true,
      visitUrl: true,
      githubUrl: true,
      featured: true
    }
  });
}

export async function getSkillViews() {
  return prisma.$queryRaw<SkillView[]>`
    SELECT id, name, "group", imageUrl, sortOrder
    FROM Skill
    ORDER BY sortOrder ASC, name ASC
  `;
}

export async function getLocationView() {
  return prisma.locationSetting.findUnique({
    where: { id: "main" },
    select: { latitude: true, longitude: true, iframeUrl: true }
  });
}
