import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { createAdminToken } from "@/lib/admin-api-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  const email = body?.email?.trim().toLowerCase() ?? "";
  const password = body?.password ?? "";
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";

  if (!email || !password || !adminEmail || email !== adminEmail) {
    return NextResponse.json({ detail: "Email yoki parol noto'g'ri." }, { status: 401 });
  }

  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  const databasePasswordMatches =
    admin?.role === "ADMIN" && (await bcrypt.compare(password, admin.passwordHash));
  const environmentPasswordMatches =
    Boolean(process.env.ADMIN_PASSWORD) && password === process.env.ADMIN_PASSWORD;

  if (!databasePasswordMatches && !environmentPasswordMatches) {
    return NextResponse.json({ detail: "Email yoki parol noto'g'ri." }, { status: 401 });
  }

  return NextResponse.json({
    access_token: await createAdminToken(adminEmail),
    token_type: "bearer",
  });
}
