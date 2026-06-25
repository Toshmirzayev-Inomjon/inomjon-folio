import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-api-auth";
import { createTag, listTags } from "@/lib/portfolio-db";
import { serializeTag } from "@/lib/portfolio-serializers";

export const dynamic = "force-dynamic";

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }
  const tags = await listTags();
  return NextResponse.json(tags.map(serializeTag));
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: string; slug?: string }
    | null;
  const name = body?.name?.trim() ?? "";
  const slug = normalizeSlug(body?.slug || name);
  if (name.length < 2 || !slug) {
    return NextResponse.json({ detail: "Teg nomi va slug majburiy." }, { status: 400 });
  }

  try {
    const tag = await createTag(name, slug);
    return NextResponse.json(serializeTag(tag), { status: 201 });
  } catch {
    return NextResponse.json({ detail: "Bu teg yoki slug mavjud." }, { status: 409 });
  }
}
