import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { skillIconUrl } from "@/lib/skill-icons";
import { skillSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

function normalizeSkill(payload: unknown) {
  const input = skillSchema.parse(payload);
  return {
    name: input.name,
    group: input.group?.trim() || null,
    imageUrl: input.imageUrl?.trim() || skillIconUrl(input.name),
    sortOrder: input.sortOrder
  };
}

export async function POST(request: Request) {
  await requireAdmin();
  const input = normalizeSkill(await request.json());
  const id = randomUUID();
  await prisma.$executeRaw`
    INSERT INTO Skill (id, name, "group", imageUrl, sortOrder, createdAt, updatedAt)
    VALUES (${id}, ${input.name}, ${input.group}, ${input.imageUrl}, ${input.sortOrder}, datetime('now'), datetime('now'))
  `;
  const [skill] = await prisma.$queryRaw<Array<typeof input & { id: string }>>`
    SELECT id, name, "group", imageUrl, sortOrder FROM Skill WHERE id = ${id}
  `;
  return NextResponse.json({ skill }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await requireAdmin();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Skill ID majburiy." }, { status: 400 });
  const input = normalizeSkill(await request.json());
  await prisma.$executeRaw`
    UPDATE Skill
    SET name = ${input.name}, "group" = ${input.group}, imageUrl = ${input.imageUrl}, sortOrder = ${input.sortOrder}, updatedAt = datetime('now')
    WHERE id = ${id}
  `;
  const [skill] = await prisma.$queryRaw<Array<typeof input & { id: string }>>`
    SELECT id, name, "group", imageUrl, sortOrder FROM Skill WHERE id = ${id}
  `;
  return NextResponse.json({ skill });
}

export async function DELETE(request: NextRequest) {
  await requireAdmin();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Skill ID majburiy." }, { status: 400 });
  await prisma.$executeRaw`DELETE FROM Skill WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}
