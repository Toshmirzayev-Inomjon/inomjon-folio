import { NextResponse } from "next/server";
import { getProfileView } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getProfileView();
  if (!profile) {
    return NextResponse.json({ detail: "Profil topilmadi." }, { status: 404 });
  }
  return NextResponse.json(profile);
}
