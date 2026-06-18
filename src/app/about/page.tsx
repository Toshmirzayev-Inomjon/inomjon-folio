import { AboutContent } from "@/components/about/AboutContent";

export const metadata = {
  title: "About | Inomjon Toshmirzayev",
  description: "Backend / Full-stack developer from Qashqadaryo, Uzbekistan.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <AboutContent />
      </div>
    </main>
  );
}
