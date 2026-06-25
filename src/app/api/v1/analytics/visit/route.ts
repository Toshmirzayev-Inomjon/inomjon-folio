import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { recordSiteVisit } from "@/lib/portfolio-db";

export const dynamic = "force-dynamic";

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLength);
}

function hashIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  const ip = forwardedFor || realIp;
  if (!ip) return null;

  const salt = process.env.JWT_SECRET || "portfolio-analytics";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const visitorKey = cleanText(body?.visitor_key, 128);
  const path = cleanText(body?.path, 256) ?? "/";

  if (!visitorKey || visitorKey.length < 8) {
    return NextResponse.json({ detail: "visitor_key kerak." }, { status: 400 });
  }

  await recordSiteVisit({
    visitorKey,
    path: path.startsWith("/") ? path : "/",
    referrer: cleanText(body?.referrer, 512),
    userAgent: cleanText(request.headers.get("user-agent"), 512),
    ipHash: hashIp(request),
  });

  return NextResponse.json({ ok: true });
}
