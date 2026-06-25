import { randomUUID } from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type {
  ProfileRecord,
  ProjectRecord,
  SkillRecord,
  TagRecord,
} from "@/lib/portfolio-serializers";

type ProjectRow = Omit<ProjectRecord, "tags">;
type ProjectTagRow = TagRecord & { projectId: string };

export async function findProfile() {
  const rows = await prisma.$queryRaw<ProfileRecord[]>`
    SELECT id, name, headline, bio, heroImage, headlineUz, headlineEn, headlineRu, bioUz, bioEn, bioRu,
           phoneNumber, contactEmail, location, telegramUrl, githubUrl, linkedinUrl,
           instagramUrl, cvUrl, CAST(careerStartDate AS TEXT) AS careerStartDate,
           happyClientsCount, updatedAt
    FROM Profile
    WHERE id = 'main'
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function ensureProfile() {
  await prisma.$executeRaw`
    INSERT OR IGNORE INTO Profile (
      id, name, headline, bio, heroImage, happyClientsCount, updatedAt
    )
    VALUES (
      'main',
      'Inomjon Toshmirzayev',
      'Backend Developer',
      'Zamonaviy web ilovalar va biznes platformalar yarataman.',
      '/uploads/profile-inomjon.webp',
      20,
      datetime('now')
    )
  `;
  return findProfile();
}

export async function updateProfile(input: {
  name: string;
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
  careerStartDate: string | null;
  happyClientsCount: number;
  fallbackHeadline: string;
  fallbackBio: string;
}) {
  await prisma.$executeRaw`
    UPDATE Profile
    SET name = ${input.name},
        headline = ${input.headlineUz ?? input.fallbackHeadline},
        bio = ${input.bioUz ?? input.fallbackBio},
        headlineUz = ${input.headlineUz},
        headlineEn = ${input.headlineEn},
        headlineRu = ${input.headlineRu},
        bioUz = ${input.bioUz},
        bioEn = ${input.bioEn},
        bioRu = ${input.bioRu},
        phoneNumber = ${input.phoneNumber},
        contactEmail = ${input.contactEmail},
        location = ${input.location},
        telegramUrl = ${input.telegramUrl},
        githubUrl = ${input.githubUrl},
        linkedinUrl = ${input.linkedinUrl},
        instagramUrl = ${input.instagramUrl},
        cvUrl = ${input.cvUrl},
        careerStartDate = ${input.careerStartDate},
        happyClientsCount = ${input.happyClientsCount},
        updatedAt = datetime('now')
    WHERE id = 'main'
  `;
  return findProfile();
}

export async function listTags() {
  return prisma.$queryRaw<TagRecord[]>`
    SELECT id, name, slug FROM Tag ORDER BY name ASC
  `;
}

export async function createTag(name: string, slug: string) {
  const id = randomUUID();
  await prisma.$executeRaw`
    INSERT INTO Tag (id, name, slug) VALUES (${id}, ${name}, ${slug})
  `;
  return { id, name, slug } satisfies TagRecord;
}

export async function deleteTag(id: string) {
  await prisma.$transaction([
    prisma.$executeRaw`DELETE FROM "_ProjectToTag" WHERE B = ${id}`,
    prisma.$executeRaw`DELETE FROM Tag WHERE id = ${id}`,
  ]);
}

export async function listSkills() {
  return prisma.$queryRaw<SkillRecord[]>`
    SELECT id, name, "group", sortOrder FROM Skill ORDER BY sortOrder ASC, name ASC
  `;
}

export async function listProjects(limit = 100) {
  const safeLimit = Math.min(100, Math.max(1, Math.trunc(limit)));
  const projects = await prisma.$queryRaw<ProjectRow[]>`
    SELECT id, title, description, techStack, githubUrl, visitUrl, featured, createdAt
    FROM Project
    ORDER BY featured DESC, createdAt DESC
    LIMIT ${safeLimit}
  `;
  if (projects.length === 0) return [];

  const ids = projects.map((project) => project.id);
  const tagRows = await prisma.$queryRaw<ProjectTagRow[]>(Prisma.sql`
    SELECT junction.A AS projectId, tag.id, tag.name, tag.slug
    FROM "_ProjectToTag" AS junction
    JOIN Tag AS tag ON tag.id = junction.B
    WHERE junction.A IN (${Prisma.join(ids)})
    ORDER BY tag.name ASC
  `);
  const tagsByProject = new Map<string, TagRecord[]>();
  for (const tag of tagRows) {
    const tags = tagsByProject.get(tag.projectId) ?? [];
    tags.push({ id: tag.id, name: tag.name, slug: tag.slug });
    tagsByProject.set(tag.projectId, tags);
  }

  return projects.map<ProjectRecord>((project) => ({
    ...project,
    tags: tagsByProject.get(project.id) ?? [],
  }));
}

export async function findProject(id: string) {
  const projects = await prisma.$queryRaw<ProjectRow[]>`
    SELECT id, title, description, techStack, githubUrl, visitUrl, featured, createdAt
    FROM Project
    WHERE id = ${id}
    LIMIT 1
  `;
  const project = projects[0];
  if (!project) return null;

  const tags = await prisma.$queryRaw<TagRecord[]>`
    SELECT tag.id, tag.name, tag.slug
    FROM "_ProjectToTag" AS junction
    JOIN Tag AS tag ON tag.id = junction.B
    WHERE junction.A = ${id}
    ORDER BY tag.name ASC
  `;
  return { ...project, tags } satisfies ProjectRecord;
}

type ProjectWriteInput = {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string | null;
  visitUrl: string | null;
  featured: boolean;
  tagIds: string[];
};

async function replaceProjectTags(
  transaction: Prisma.TransactionClient,
  projectId: string,
  tagIds: string[],
) {
  await transaction.$executeRaw`DELETE FROM "_ProjectToTag" WHERE A = ${projectId}`;
  for (const tagId of tagIds) {
    await transaction.$executeRaw`
      INSERT OR IGNORE INTO "_ProjectToTag" (A, B) VALUES (${projectId}, ${tagId})
    `;
  }
}

export async function createProject(input: ProjectWriteInput) {
  const id = randomUUID();
  await prisma.$transaction(async (transaction) => {
    await transaction.$executeRaw`
      INSERT INTO Project (
        id, title, description, imageUrl, techStack, visitUrl, githubUrl,
        featured, createdAt, updatedAt
      )
      VALUES (
        ${id}, ${input.title}, ${input.description}, '', ${input.techStack},
        ${input.visitUrl}, ${input.githubUrl}, ${input.featured},
        datetime('now'), datetime('now')
      )
    `;
    await replaceProjectTags(transaction, id, input.tagIds);
  });
  return findProject(id);
}

export async function updateProject(id: string, input: ProjectWriteInput) {
  await prisma.$transaction(async (transaction) => {
    await transaction.$executeRaw`
      UPDATE Project
      SET title = ${input.title},
          description = ${input.description},
          techStack = ${input.techStack},
          visitUrl = ${input.visitUrl},
          githubUrl = ${input.githubUrl},
          featured = ${input.featured},
          updatedAt = datetime('now')
      WHERE id = ${id}
    `;
    await replaceProjectTags(transaction, id, input.tagIds);
  });
  return findProject(id);
}

export async function deleteProject(id: string) {
  await prisma.$transaction([
    prisma.$executeRaw`DELETE FROM "_ProjectToTag" WHERE A = ${id}`,
    prisma.$executeRaw`DELETE FROM Project WHERE id = ${id}`,
  ]);
}
