import { TabbedPortfolio } from "@/components/TabbedPortfolio";
import { locationSeed, personalProfile, projectSeeds } from "@/data/siteData";
import type { LocationView, ProfileView, ProjectView } from "@/lib/data";

export const dynamic = "force-static";

const profile: ProfileView = {
  name: personalProfile.name,
  headline: personalProfile.headline,
  bio: personalProfile.bio,
  heroImage: personalProfile.heroImage,
  cvUrl: personalProfile.cvUrl,
  telegramUrl: personalProfile.telegramUrl,
  githubUrl: personalProfile.githubUrl,
  linkedinUrl: personalProfile.linkedinUrl,
  instagramUrl: personalProfile.instagramUrl
};

const projects: ProjectView[] = projectSeeds.map((project, index) => ({
  id: `static-project-${index + 1}`,
  ...project
}));

const location: LocationView = {
  latitude: locationSeed.latitude,
  longitude: locationSeed.longitude,
  iframeUrl: locationSeed.iframeUrl
};

export default function HomePage() {
  return <TabbedPortfolio profile={profile} projects={projects} location={location} />;
}
