import { AdminPanel } from "@/components/AdminPanel";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { SkillView } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const [profile, projects, skills, location, messages] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "main" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.$queryRaw<SkillView[]>`
      SELECT id, name, "group", imageUrl, sortOrder
      FROM Skill
      ORDER BY sortOrder ASC, name ASC
    `,
    prisma.locationSetting.findUniqueOrThrow({ where: { id: "main" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
  ]);

  return <AdminPanel profile={profile} projects={projects} skills={skills} location={location} messages={messages} />;
}
