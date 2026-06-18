import { prisma } from "@/lib/prisma";
import { locationSeed, personalProfile, projectSeeds } from "@/data/siteData";
import { skillIconUrl } from "@/lib/skill-icons";

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

const fallbackProfile: ProfileView = {
  name: personalProfile.name,
  headline: personalProfile.headline,
  bio: personalProfile.bio,
  heroImage: personalProfile.heroImage,
  cvUrl: personalProfile.cvUrl,
  telegramUrl: personalProfile.telegramUrl,
  githubUrl: personalProfile.githubUrl,
  linkedinUrl: personalProfile.linkedinUrl,
  instagramUrl: personalProfile.instagramUrl
};

const fallbackProjects: ProjectView[] = projectSeeds.map((project, index) => ({
  id: `fallback-project-${index}`,
  ...project
}));

const fallbackSkills: SkillView[] = personalProfile.skills.map((name, index) => ({
  id: `fallback-skill-${index}`,
  name,
  group: null,
  imageUrl: skillIconUrl(name),
  sortOrder: index
}));

const fallbackLocation: LocationView = {
  latitude: locationSeed.latitude,
  longitude: locationSeed.longitude,
  iframeUrl: locationSeed.iframeUrl
};

export async function getSiteData() {
  const [profile, projects, skills, location] = await Promise.all([getProfileView(), getProjectViews(), getSkillViews(), getLocationView()]);

  return { profile, projects, skills, location };
}

export async function getProfileView() {
  try {
    return await prisma.profile.findUnique({
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
  } catch (error) {
    console.error("Profile query failed; using fallback content.", error);
    return fallbackProfile;
  }
}

export async function getProjectViews(take?: number) {
  try {
    return await prisma.project.findMany({
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
  } catch (error) {
    console.error("Project query failed; using fallback content.", error);
    return typeof take === "number" ? fallbackProjects.slice(0, take) : fallbackProjects;
  }
}

export async function getSkillViews() {
  try {
    return await prisma.$queryRaw<SkillView[]>`
      SELECT id, name, "group", imageUrl, sortOrder
      FROM Skill
      ORDER BY sortOrder ASC, name ASC
    `;
  } catch (error) {
    console.error("Skill query failed; using fallback content.", error);
    return fallbackSkills;
  }
}

export async function getLocationView() {
  try {
    return await prisma.locationSetting.findUnique({
      where: { id: "main" },
      select: { latitude: true, longitude: true, iframeUrl: true }
    });
  } catch (error) {
    console.error("Location query failed; using fallback content.", error);
    return fallbackLocation;
  }
}
