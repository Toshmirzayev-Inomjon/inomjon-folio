import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ location: await prisma.locationSetting.findUnique({ where: { id: "main" } }) });
}
