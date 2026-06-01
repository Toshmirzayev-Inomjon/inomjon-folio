import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validators";
import { assertRealisticEmail } from "@/lib/email-reputation";
import { sendVerificationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

function getVerificationExpiryDate() {
  const minutes = Number(process.env.EMAIL_VERIFICATION_EXPIRY ?? 15);
  const safeMinutes = Number.isFinite(minutes) && minutes > 0 ? minutes : 15;
  return new Date(Date.now() + safeMinutes * 60 * 1000);
}

export async function POST(request: Request) {
  try {
    const input = authSchema.parse(await request.json());
    assertRealisticEmail(input.email);

    const passwordHash = await bcrypt.hash(input.password, 12);
    const user = await prisma.user.upsert({
      where: { email: input.email },
      update: { passwordHash },
      create: { email: input.email, passwordHash }
    });

    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await prisma.verificationToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: getVerificationExpiryDate()
      }
    });

    await sendVerificationEmail(input.email, token);
    return NextResponse.json({ ok: true, message: "Tasdiqlash emaili yuborildi." });
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Sign up failed." },
      { status: 400 }
    );
  }
}
