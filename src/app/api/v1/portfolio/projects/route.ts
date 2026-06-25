import { NextRequest, NextResponse } from "next/server";
import { getProjectViews } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const parsed = Number(request.nextUrl.searchParams.get("limit") ?? 100);
  const limit = Number.isFinite(parsed) ? parsed : 100;
  return NextResponse.json(await getProjectViews(limit));
}
