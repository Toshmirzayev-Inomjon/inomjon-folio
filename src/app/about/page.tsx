import { AboutContent } from "@/components/about/AboutContent";
import { getPortfolioStats } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About | Inomjon Toshmirzayev",
  description: "Backend Developer from Qashqadaryo, Uzbekistan.",
};

export default async function AboutPage() {
  const stats = await getPortfolioStats();

  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <AboutContent stats={stats} />
      </div>
    </main>
  );
}
