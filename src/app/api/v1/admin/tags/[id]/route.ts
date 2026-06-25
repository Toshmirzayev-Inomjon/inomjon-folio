import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-api-auth";
import { deleteTag } from "@/lib/portfolio-db";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteTag(id);
  return NextResponse.json({ ok: true });
}
