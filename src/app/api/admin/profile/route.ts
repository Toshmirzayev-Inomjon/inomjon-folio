import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { profileSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  await requireAdmin();
  const data = profileSchema.parse(await request.json());
  const profile = await prisma.profile.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data }
  });
  return NextResponse.json({ profile });
}
