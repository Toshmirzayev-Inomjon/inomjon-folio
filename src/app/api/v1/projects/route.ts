import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-api-auth";
import { createProject, listProjects } from "@/lib/portfolio-db";
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

function parseInput(body: ProjectInput) {
  const title = body.title?.trim() ?? "";
  const description = body.description?.trim() ?? "";
  const techStack = Array.isArray(body.tech_stack)
    ? body.tech_stack.filter((item): item is string => typeof item === "string").join(", ")
    : "";
  const tagIds = Array.isArray(body.tag_ids)
    ? body.tag_ids.filter((item): item is string => typeof item === "string")
    : [];

  if (title.length < 2 || description.length < 10) return null;
  return {
    title,
    description,
    techStack,
    githubUrl: body.github_link?.trim() || null,
    visitUrl: body.live_link?.trim() || null,
    featured: Boolean(body.featured),
    tagIds,
  };
}

export async function GET(request: NextRequest) {
  const parsedLimit = Number(request.nextUrl.searchParams.get("limit") ?? 100);
  const limit = Number.isFinite(parsedLimit) ? Math.min(100, Math.max(1, parsedLimit)) : 100;
  const projects = await listProjects(limit);
  return NextResponse.json(projects.map(serializeProject));
}

export async function POST(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ detail: "Ruxsat yo'q." }, { status: 401 });
  }

  const input = parseInput((await request.json().catch(() => ({}))) as ProjectInput);
  if (!input) {
    return NextResponse.json({ detail: "Sarlavha va tavsifni to'liq kiriting." }, { status: 400 });
  }

  const project = await createProject(input);
  return NextResponse.json(project ? serializeProject(project) : null, { status: 201 });
}
