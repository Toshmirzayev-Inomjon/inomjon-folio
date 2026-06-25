import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-api-auth";
import { deleteProject, updateProject } from "@/lib/portfolio-db";
import { serializeProject } from "@/lib/portfolio-serializers";

export const dynamic = "force-dynamic";

type ProjectInput = {
  title?: string;
  description?: string;
  tech_stack?: unknown;
  github_link?: string;
  live_link?: string;
  featured?: boolean;
  tag_ids?: unknown;
};

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json().catch(() => ({}))) as ProjectInput;
  const title = body.title?.trim() ?? "";
  const description = body.description?.trim() ?? "";
  if (title.length < 2 || description.length < 10) {
    return NextResponse.json({ detail: "Sarlavha va tavsifni to'liq kiriting." }, { status: 400 });
  }

  const tagIds = Array.isArray(body.tag_ids)
    ? body.tag_ids.filter((item): item is string => typeof item === "string")
    : [];
  const techStack = Array.isArray(body.tech_stack)
    ? body.tech_stack.filter((item): item is string => typeof item === "string").join(", ")
    : "";

  try {
    const project = await updateProject(id, {
      title,
      description,
      techStack,
      githubUrl: body.github_link?.trim() || null,
      visitUrl: body.live_link?.trim() || null,
      featured: Boolean(body.featured),
      tagIds,
    });
    if (!project) {
      return NextResponse.json({ detail: "Loyiha topilmadi." }, { status: 404 });
    }
    return NextResponse.json(serializeProject(project));
  } catch {
    return NextResponse.json({ detail: "Loyiha topilmadi." }, { status: 404 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  const { id } = await context.params;
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
