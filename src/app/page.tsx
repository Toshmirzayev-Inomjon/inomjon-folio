import { TabbedPortfolio } from "@/components/TabbedPortfolio";
import { siteIdentity } from "@/data/siteData";
import { getLocationView, getProfileView, getProjectViews, getSkillViews } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, projects, skills, location] = await Promise.all([
    getProfileView(),
    getProjectViews(),
    getSkillViews(),
    getLocationView()
  ]);

  if (!profile || !location) {
    return (
      <main className="grid h-screen place-items-center bg-[#050812] px-4 text-white">
        <div className="max-w-xl rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-lg">
          <h1 className="text-3xl font-black">{siteIdentity.setupTitle}</h1>
          <p className="mt-4 leading-7 text-slate-300">{siteIdentity.setupDescription}</p>
        </div>
      </main>
    );
  }

  return <TabbedPortfolio profile={profile} projects={projects} skills={skills} location={location} />;
}
