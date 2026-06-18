import { getProfileView } from "@/lib/data";
import { ContactPageClient } from "@/components/contact/ContactPageClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const profile = await getProfileView();

  const contactInfo = {
    phone: profile?.phone_number ?? "+998951840751",
    email: profile?.contact_email ?? "toshmirzayevinomjon@gmail.com",
    location: profile?.location ?? "Qashqadaryo, Uzbekistan",
    telegram: profile?.telegram_url ?? null,
    github: profile?.github_url ?? null,
  };

  return <ContactPageClient contactInfo={contactInfo} />;
}
