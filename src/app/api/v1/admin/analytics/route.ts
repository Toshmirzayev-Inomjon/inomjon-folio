import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-api-auth";
import { getVisitAnalytics } from "@/lib/portfolio-db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  return NextResponse.json(await getVisitAnalytics());
}
