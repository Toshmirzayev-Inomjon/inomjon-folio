import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { messageSchema } from "@/lib/validators";
import { sendContactNotificationEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ ok: false, message: "Avval tizimga kiring." }, { status: 401 });
  if (!session.emailVerified) return NextResponse.json({ ok: false, message: "Avval emailingizni tasdiqlang." }, { status: 403 });

  const input = messageSchema.parse(await request.json());
  await prisma.message.create({ data: { ...input, userId: session.userId } });
  await sendContactNotificationEmail(input).catch((error) => {
    console.error("Contact notification email failed:", error);
  });
  return NextResponse.json({ ok: true });
}
