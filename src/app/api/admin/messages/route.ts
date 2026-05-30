import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  await requireAdmin();
  const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
  return NextResponse.json({ messages });
}

export async function DELETE(request: NextRequest) {
  await requireAdmin();
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ message: "Xabar ID majburiy." }, { status: 400 });
  await prisma.message.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
