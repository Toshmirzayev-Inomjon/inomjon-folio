import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-api-auth";
import { ensureProfile, updateProfile } from "@/lib/portfolio-db";
import { serializeProfile } from "@/lib/portfolio-serializers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }
  const profile = await ensureProfile();
  return NextResponse.json(profile ? serializeProfile(profile) : null);
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body.name !== "string" || body.name.trim().length < 2) {
    return NextResponse.json({ detail: "Ism majburiy." }, { status: 400 });
  }

  const current = await ensureProfile();
  if (!current) {
    return NextResponse.json({ detail: "Profil yaratilmadi." }, { status: 500 });
  }
  const text = (key: string) =>
    typeof body[key] === "string" && body[key] ? String(body[key]).trim() : null;
  const happyClientsCount = Number(body.happy_clients_count ?? current.happyClientsCount);

  const profile = await updateProfile({
    name: body.name.trim(),
    headlineUz: text("headline_uz"),
    headlineEn: text("headline_en"),
    headlineRu: text("headline_ru"),
    bioUz: text("bio_uz"),
    bioEn: text("bio_en"),
    bioRu: text("bio_ru"),
    phoneNumber: text("phone_number"),
    contactEmail: text("contact_email"),
    location: text("location"),
    telegramUrl: text("telegram_url"),
    githubUrl: text("github_url"),
    linkedinUrl: text("linkedin_url"),
    instagramUrl: text("instagram_url"),
    cvUrl: text("cv_url"),
    careerStartDate: text("career_start_date"),
    happyClientsCount: Number.isFinite(happyClientsCount)
      ? Math.max(0, Math.trunc(happyClientsCount))
      : current.happyClientsCount,
    fallbackHeadline: current.headline,
    fallbackBio: current.bio,
  });

  return NextResponse.json(profile ? serializeProfile(profile) : null);
}
