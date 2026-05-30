import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { authSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const input = authSchema.parse(await request.json());
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user || !(await bcrypt.compare(input.password, user.passwordHash))) {
    return NextResponse.json({ ok: false, message: "Email yoki parol noto'g'ri." }, { status: 401 });
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role as "USER" | "ADMIN",
    emailVerified: Boolean(user.emailVerified)
  });

  return NextResponse.json({ ok: true, user: { email: user.email, role: user.role, emailVerified: Boolean(user.emailVerified) } });
}
