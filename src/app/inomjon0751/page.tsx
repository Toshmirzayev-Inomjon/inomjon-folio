import { AdminPanel } from "@/components/AdminPanel";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();
  const [profile, projects, location, messages] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "main" } }),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.locationSetting.findUniqueOrThrow({ where: { id: "main" } }),
    prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 100 })
  ]);

  return <AdminPanel profile={profile} projects={projects} location={location} messages={messages} />;
}
