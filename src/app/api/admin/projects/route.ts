import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await requireAdmin();
  const input = projectSchema.parse(await request.json());
  const project = await prisma.project.create({ data: input });
  return NextResponse.json({ project }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  await requireAdmin();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Loyiha ID majburiy." }, { status: 400 });
  const input = projectSchema.parse(await request.json());
  const project = await prisma.project.update({ where: { id }, data: input });
  return NextResponse.json({ project });
}

export async function DELETE(request: NextRequest) {
  await requireAdmin();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Loyiha ID majburiy." }, { status: 400 });
  await prisma.project.deleteMany({ where: { id } });
  return NextResponse.json({ ok: true });
}
