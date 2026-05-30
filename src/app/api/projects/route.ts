import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] });
  return NextResponse.json({ projects });
}
