import { HeroSection } from "@/components/home/HeroSection";
import { ProfileCard } from "@/components/home/ProfileCard";

export default function HomePage() {
  return (
    <main className="min-h-screen px-4 pt-28 pb-16">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
        <HeroSection />
        <ProfileCard />
      </div>
    </main>
  );
}
