import { TabbedPortfolio } from "@/components/TabbedPortfolio";
import { siteIdentity } from "@/data/siteData";
import { getLocationView, getProfileView, getProjectViews } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [profile, projects, location] = await Promise.all([
    getProfileView(),
    getProjectViews(),
    getLocationView()
  ]);

  if (!profile || !location) {
    return (
      <main className="grid h-screen place-items-center bg-slate-50 px-4">
        <div className="max-w-xl rounded-[28px] bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-black text-slate-950">{siteIdentity.setupTitle}</h1>
          <p className="mt-4 leading-7 text-slate-600">{siteIdentity.setupDescription}</p>
        </div>
      </main>
    );
  }

  return <TabbedPortfolio profile={profile} projects={projects} location={location} />;
}
