import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Fayl majburiy." }, { status: 400 });
  }

  const safeExt = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "";
  const isPdf = file.type === "application/pdf" || safeExt === "pdf";
  const isImage = file.type.startsWith("image/");

  if (!isImage && !isPdf) {
    return NextResponse.json({ message: "Faqat rasm va PDF fayllarga ruxsat beriladi." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = safeExt || (isPdf ? "pdf" : "jpg");
  const fileName = `${randomUUID()}.${ext}`;
  const publicFolder = isPdf ? "files" : "uploads";
  const uploadDir = path.join(process.cwd(), "public", publicFolder);
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);

  return NextResponse.json({ url: `/${publicFolder}/${fileName}` });
}
