import { getProjectViews } from "@/lib/data";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Projects | Inomjon Toshmirzayev",
  description: "Selected backend and full-stack projects by Inomjon Toshmirzayev.",
};

export default async function ProjectsPage() {
  const projects = await getProjectViews();

  return <ProjectsClient projects={projects} />;
}
