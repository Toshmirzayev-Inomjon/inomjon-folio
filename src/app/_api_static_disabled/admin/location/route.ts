import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { locationSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  await requireAdmin();
  const data = locationSchema.parse(await request.json());
  const location = await prisma.locationSetting.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data }
  });
  return NextResponse.json({ location });
}
