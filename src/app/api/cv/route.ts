import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const file = await readFile(path.join(process.cwd(), "public", "files", "inomjon-toshmirzayev-cv.pdf"));

    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Inomjon-Toshmirzayev-CV.pdf"',
        "Content-Length": String(file.length),
        "Cache-Control": "public, max-age=3600"
      }
    });
  } catch {
    return NextResponse.json({ message: "CV fayli topilmadi." }, { status: 404 });
  }
}
