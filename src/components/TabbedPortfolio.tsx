"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Github,
  Home,
  Instagram,
  Layers3,
  Linkedin,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  Monitor,
  Rocket,
  Send,
  Sparkles,
  UserRound,
  X,
  Zap,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import type { LocationView, ProfileView, ProjectView } from "@/lib/data";
import {
  expertAreas,
  languages,
  portfolioTabs,
  serviceCards,
  siteIdentity,
  socialLinks,
  translations,
  type Language,
  type TabId,
  type Translation
} from "@/data/siteData";

type SocialLink = { href: string; label: string; icon: LucideIcon };

const tabIconMap: Record<(typeof portfolioTabs)[number]["icon"], LucideIcon> = {
  home: Home,
  user: UserRound,
  briefcase: BriefcaseBusiness,
  mail: Mail
};

const socialIconMap: Record<(typeof socialLinks)[number]["icon"], LucideIcon> = {
  send: Send,
  instagram: Instagram,
  github: Github,
  linkedin: Linkedin
};

const serviceIconMap: Record<(typeof serviceCards)[number]["icon"], LucideIcon> = {
  monitor: Monitor,
  code: Code2,
  dashboard: Layers3,
  rocket: Rocket
};

const pageMotion = {
  initial: { opacity: 0, y: 12, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
  transition: { duration: 0.25, ease: "easeOut" as const }
};

export function TabbedPortfolio({
  profile,
  projects,
  location
}: {
  profile: ProfileView;
  projects: ProjectView[];
  location: LocationView;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [language, setLanguage] = useState<Language>("uz");
  const [authOpen, setAuthOpen] = useState(false);
  const t = translations[language];
  const socials = socialLinks
    .map((item) => ({ href: profile[item.field], label: item.label, icon: socialIconMap[item.icon] }))
    .filter((item): item is SocialLink => Boolean(item.href));

  return (
    <main className="min-h-screen overflow-x-hidden text-[#f8f1df]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(42,211,144,0.22),transparent_30rem),radial-gradient(circle_at_86%_10%,rgba(199,151,66,0.18),transparent_28rem),linear-gradient(135deg,#021b1b_0%,#063936_46%,#0b5c49_100%)]" />
      <div className="fixed inset-0 -z-10 neural-grid opacity-60" />
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 pb-10 sm:px-6 sm:py-5 lg:px-8">
        <FloatingNav activeTab={activeTab} language={language} onChangeLanguage={setLanguage} onChangeTab={setActiveTab} t={t} />

        <section className="mt-5 min-w-0 sm:mt-7">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} {...pageMotion} className="min-w-0">
              {activeTab === "home" && <HomeTab t={t} language={language} profile={profile} socials={socials} projects={projects} onContact={() => setActiveTab("contact")} onOpenPortfolio={() => setActiveTab("portfolio")} />}
              {activeTab === "about" && <AboutTab t={t} profile={profile} projectCount={projects.length} />}
              {activeTab === "portfolio" && <PortfolioTab t={t} language={language} projects={projects} />}
              {activeTab === "contact" && <ContactTab t={t} location={location} onAuthRequired={() => setAuthOpen(true)} />}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>

      <AuthModal t={t} open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}

function FloatingNav({
  activeTab,
  language,
  onChangeLanguage,
  onChangeTab,
  t
}: {
  activeTab: TabId;
  language: Language;
  onChangeLanguage: (language: Language) => void;
  onChangeTab: (tab: TabId) => void;
  t: Translation;
}) {
  return (
    <header className="sticky top-3 z-50 rounded-[16px] border border-[#f8f1df]/15 bg-[#062f2d]/70 px-3 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-2xl sm:top-4 sm:px-4">
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={() => onChangeTab("home")} className="flex min-w-0 flex-shrink-0 items-center gap-2 text-left sm:gap-3">
          <span className="premium-icon grid h-9 w-9 place-items-center rounded-xl text-sm font-black text-[#fff8e8]">IT</span>
          <span className="hidden text-lg font-black leading-none text-[#f8f1df] sm:inline">
            {siteIdentity.brandBase}<span className="text-[#d8aa52]">{siteIdentity.brandAccent}</span>
          </span>
        </button>

        <div className="content-scroll flex min-w-0 items-center justify-end gap-2 overflow-x-auto pb-1">
          <nav className="flex flex-shrink-0 items-center gap-1 text-sm font-bold text-[#c8d3bf]">
            {portfolioTabs.map(({ id, icon, labelKey }) => {
              const Icon = tabIconMap[icon];
              const active = activeTab === id;

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onChangeTab(id)}
                  className={`inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-lg px-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8aa52] ${active ? "bg-[#f8f1df] text-[#063936] shadow-sm" : "hover:bg-[#f8f1df]/10 hover:text-[#f8f1df]"}`}
                >
                  <Icon size={16} />
                  <span>{t[labelKey]}</span>
                </button>
              );
            })}
          </nav>

          {languages.length > 1 && (
            <div className="flex flex-shrink-0 items-center rounded-xl bg-[#f8f1df]/10 p-1 text-xs font-black uppercase text-[#c8d3bf]">
              {languages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onChangeLanguage(lang)}
                  className={`h-8 rounded-lg px-2.5 transition ${language === lang ? "bg-[#f8f1df] text-[#063936] shadow-sm" : "hover:text-[#f8f1df]"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}

          <button type="button" onClick={() => onChangeTab("contact")} className="btn-primary h-10 min-h-10 flex-shrink-0 px-3 text-sm sm:px-4">
            {t.letstalk}
          </button>
        </div>
      </div>
    </header>
  );
}

function ProfileCard({
  profile,
  socials,
  t,
  onContact
}: {
  profile: ProfileView;
  socials: SocialLink[];
  t: Translation;
  onContact: () => void;
}) {
  const cvHref = profile.cvUrl && !profile.cvUrl.includes("example.com") ? profile.cvUrl : "/api/cv";
  const isExternalCv = /^https?:\/\//.test(cvHref);

  return (
    <aside>
      <div className="clay-card rounded-[18px] p-4">
        <div className="relative overflow-hidden rounded-[16px] bg-[#082b29]">
          <Image src={profile.heroImage} width={620} height={760} alt={profile.name} className="aspect-[4/5] w-full object-cover object-top" priority unoptimized />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(2,27,27,0.74)_100%)]" />
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg border border-[#f8f1df]/15 bg-[#062f2d]/75 px-3 py-2 text-xs font-black text-[#f8f1df] backdrop-blur-xl">
            <BadgeCheck size={14} className="text-[#d8aa52]" /> {t.availableForHire}
          </div>
        </div>

        <div className="pt-4">
          <h1 className="text-2xl font-black leading-tight text-[#f8f1df]">{profile.name}</h1>
          <p className="mt-3 leading-7 text-[#c8d3bf]">
            <span className="font-black text-[#f4d68f]">{t.profileHeadline}</span>
          </p>
          <p className="mt-1 line-clamp-4 leading-7 text-[#c8d3bf]">{t.profileBio}</p>

          <div className="mt-6 grid gap-3 min-[420px]:grid-cols-2">
            <button type="button" onClick={onContact} className="btn-primary h-12 px-4 text-sm">
              <MessageCircle size={17} /> {t.bookCall}
            </button>
            <a href={cvHref} download={isExternalCv ? undefined : "Inomjon-Toshmirzayev-CV.pdf"} target={isExternalCv ? "_blank" : undefined} rel={isExternalCv ? "noreferrer" : undefined} className="btn-secondary h-12 px-4 text-sm">
              <Download size={17} /> {t.downloadCv}
            </a>
          </div>

          {socials.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} aria-label={label} className="grid h-9 w-9 place-items-center rounded-lg border border-[#f8f1df]/15 bg-[#f8f1df]/10 text-[#f8f1df] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d8aa52]/50 hover:text-[#f4d68f]">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function AboutSnapshotCard({ t, projectCount }: { t: Translation; projectCount: number }) {
  return (
    <section className="clay-card rounded-[18px] p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d8aa52]">{t.about}</p>
      <h2 className="mt-3 text-2xl font-black leading-tight text-[#f8f1df]">{t.heroTitle}</h2>
      <p className="mt-4 leading-7 text-[#c8d3bf]">{t.aboutText}</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-[14px] border border-[#f8f1df]/10 bg-[#f8f1df]/10 p-4">
          <p className="text-3xl font-black text-[#f4d68f]">3+</p>
          <p className="mt-1 text-xs font-bold text-[#c8d3bf]">{t.yearsExperience}</p>
        </div>
        <div className="rounded-[14px] border border-[#f8f1df]/10 bg-[#f8f1df]/10 p-4">
          <p className="text-3xl font-black text-[#f4d68f]">{Math.max(projectCount, 1)}+</p>
          <p className="mt-1 text-xs font-bold text-[#c8d3bf]">{t.projectsCompleted}</p>
        </div>
      </div>
    </section>
  );
}

function HomeTab({
  t,
  language,
  profile,
  socials,
  projects,
  onContact,
  onOpenPortfolio
}: {
  t: Translation;
  language: Language;
  profile: ProfileView;
  socials: SocialLink[];
  projects: ProjectView[];
  onContact: () => void;
  onOpenPortfolio: () => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)_minmax(300px,0.95fr)] lg:items-start">
      <div className="grid gap-5 lg:sticky lg:top-28">
        <ProfileCard profile={profile} socials={socials} t={t} onContact={onContact} />
        <AboutSnapshotCard t={t} projectCount={projects.length} />
      </div>

      <div className="grid min-w-0 gap-5">
        <SkillPreviewCard t={t} />
        <HireCard t={t} />
        <ServicesCard t={t} />
      </div>

      <div className="grid min-w-0 gap-5">
        <ProjectShowcaseCard t={t} language={language} projects={projects.slice(0, 2)} onOpenPortfolio={onOpenPortfolio} />
        <WorkExperienceCard t={t} />
      </div>
    </div>
  );
}

function WorkExperienceCard({ t }: { t: Translation }) {
  return (
    <section className="glass-card relative overflow-hidden rounded-[18px] p-5">
      <NeuralAccent />
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-[#f8f1df]">{t.workExperience}</h2>
        <BriefcaseBusiness className="text-[#d8aa52]" size={22} />
      </div>
      <div className="grid gap-3">
        {t.workItems.map((item) => (
          <article key={item.role} className="relative rounded-[14px] border border-[#f8f1df]/10 bg-[#f8f1df]/10 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-black text-[#f8f1df]">{item.role}</h3>
                <p className="mt-1 text-sm font-bold text-[#c8d3bf]">{item.company}</p>
              </div>
              <span className="rounded-lg bg-[#f8f1df]/10 px-2.5 py-1 text-xs font-black text-[#f4d68f] ring-1 ring-[#f8f1df]/10">{item.period}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectShowcaseCard({
  t,
  language,
  projects,
  onOpenPortfolio
}: {
  t: Translation;
  language: Language;
  projects: ProjectView[];
  onOpenPortfolio: () => void;
}) {
  return (
    <section className="glass-card relative overflow-hidden rounded-[18px] p-5">
      <NeuralAccent />
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-[#f8f1df]">{t.recentProjects}</h2>
        <button type="button" onClick={onOpenPortfolio} className="inline-flex items-center gap-1 text-sm font-black text-[#f4d68f]">
          {t.all} <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => {
          const localized = localizeProject(project, language);

          return (
            <article key={project.id} className="group relative overflow-hidden rounded-[15px] border border-[#f8f1df]/10 bg-[#082b29]">
              <Image src={project.imageUrl} width={620} height={360} alt={localized.title} className="aspect-[16/8.2] w-full object-cover transition duration-500 group-hover:scale-105" unoptimized />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_36%,rgba(2,27,27,0.82)_100%)]" />
              <div className="absolute bottom-4 left-4 rounded-lg border border-[#f8f1df]/15 bg-[#062f2d]/80 px-3 py-1.5 text-sm font-black text-[#f4d68f] shadow-sm backdrop-blur-xl">{localized.title}</div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function NeuralAccent() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-28 w-40 opacity-50">
      <div className="absolute right-6 top-6 h-2 w-2 rounded-full bg-[#d8aa52] shadow-[0_0_24px_rgba(216,170,82,0.7)]" />
      <div className="absolute right-20 top-10 h-1.5 w-1.5 rounded-full bg-[#2ad390] shadow-[0_0_18px_rgba(42,211,144,0.7)]" />
      <div className="absolute right-10 top-20 h-1.5 w-1.5 rounded-full bg-[#f8f1df]" />
      <div className="absolute right-8 top-8 h-px w-24 rotate-[24deg] bg-gradient-to-r from-[#d8aa52]/70 to-transparent" />
      <div className="absolute right-14 top-16 h-px w-20 -rotate-[18deg] bg-gradient-to-r from-[#2ad390]/70 to-transparent" />
    </div>
  );
}

function SkillPreviewCard({ t }: { t: Translation }) {
  return (
    <section className="glass-card rounded-[18px] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-[#f8f1df]">{t.skills}</h2>
        <span className="text-sm font-black text-[#f4d68f]">{t.all}</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {expertAreas.slice(0, 6).map((item) => (
          <SkillTile key={item.name} name={item.name} />
        ))}
      </div>
    </section>
  );
}

function SkillTile({ name }: { name: string }) {
  const Icon = skillIconFor(name);

  return (
    <div className="grid min-h-[104px] min-w-0 place-items-center rounded-[16px] border border-[#f8f1df]/10 bg-[#f8f1df]/10 p-3 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition hover:-translate-y-1 hover:border-[#d8aa52]/40 hover:shadow-[0_18px_44px_rgba(0,0,0,0.22)]">
      <div className="premium-icon grid h-12 w-12 place-items-center rounded-[14px]">
        <Icon className="text-[#fff8e8]" size={24} />
      </div>
      <p className="mt-2 max-w-full break-words text-sm font-black leading-5 text-[#f8f1df]">{name}</p>
    </div>
  );
}

function HireCard({ t }: { t: Translation }) {
  return (
    <section className="glass-card overflow-hidden rounded-[18px]">
      <div className="mx-4 mt-4 overflow-hidden rounded-[12px] border border-[#f8f1df]/10 bg-[#f8f1df]/10 py-3 text-[#c8d3bf]">
        <div className="marquee-track flex w-max gap-6 whitespace-nowrap text-xl font-black">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index}>{t.marquee} /</span>
          ))}
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d8aa52]">{t.availableForHire}</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-[#f8f1df] sm:text-4xl">{t.contactTitle}</h2>
        <p className="mt-4 leading-7 text-[#c8d3bf]">{t.focusText}</p>
      </div>
    </section>
  );
}

function ServicesCard({ t }: { t: Translation }) {
  return (
    <section className="glass-card rounded-[18px] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black text-[#f8f1df]">{t.servicesTitle}</h2>
        <ArrowRight className="text-[#d8aa52]" size={22} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {serviceCards.map(({ icon, titleKey, textKey }) => {
          const Icon = serviceIconMap[icon];

          return (
            <article key={titleKey} className="rounded-[16px] border border-[#f8f1df]/10 bg-[#f8f1df]/10 p-4">
              <div className="premium-icon grid h-12 w-12 place-items-center rounded-[12px] text-[#fff8e8]">
                <Icon size={23} />
              </div>
              <h3 className="mt-4 font-black text-[#f8f1df]">{t[titleKey]}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#c8d3bf]">{t[textKey]}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AboutTab({ t, profile, projectCount }: { t: Translation; profile: ProfileView; projectCount: number }) {
  const stats = [
    { value: "3+", label: t.yearsExperience },
    { value: `${Math.max(projectCount, 1)}+`, label: t.projectsCompleted }
  ];

  return (
    <div className="grid gap-5">
      <section className="glass-card relative overflow-hidden rounded-[18px] p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="max-w-xl text-3xl font-black leading-tight text-[#f8f1df] sm:text-5xl">
              {t.aboutTitle} <span className="text-[#f4d68f]">{profile.name}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#c8d3bf] sm:mt-7 sm:text-xl sm:leading-9">{t.aboutText}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-[10px] bg-[#f8f1df]/10 px-4 py-3 text-sm font-black text-[#f4d68f] ring-1 ring-[#f8f1df]/10">
            <BadgeCheck size={16} /> {t.availableForHire}
          </span>
        </div>

        <div className="mt-10 flex flex-wrap gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl font-black text-[#f4d68f]">{stat.value}</p>
              <p className="mt-1 text-sm font-bold text-[#c8d3bf]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="premium-icon absolute bottom-8 right-8 hidden h-16 w-16 place-items-center rounded-full text-white md:grid">
          <ArrowRight className="rotate-90" size={24} />
        </div>
      </section>

      <section className="glass-card rounded-[18px] p-5 sm:p-8">
        <h2 className="text-3xl font-black text-[#f8f1df]">{t.skills}</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {expertAreas.map((item) => (
            <SkillTile key={item.name} name={item.name} />
          ))}
        </div>
      </section>
    </div>
  );
}

function PortfolioTab({ t, language, projects }: { t: Translation; language: Language; projects: ProjectView[] }) {
  return (
    <div className="grid gap-5">
      <section className="glass-card rounded-[18px] p-5 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d8aa52]">{t.portfolioLabel}</p>
        <h1 className="mt-3 text-3xl font-black leading-tight text-[#f8f1df] sm:text-5xl">{t.portfolioTitle}</h1>
        <p className="mt-4 max-w-2xl leading-8 text-[#c8d3bf]">{t.portfolioText}</p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => {
          const localized = localizeProject(project, language);

          return (
            <article key={project.id} className="glass-card group overflow-hidden rounded-[18px]">
              <div className="relative overflow-hidden">
                <Image src={project.imageUrl} width={760} height={500} alt={localized.title} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105" unoptimized />
                <span className="absolute bottom-4 left-4 rounded-lg border border-[#f8f1df]/15 bg-[#062f2d]/80 px-3 py-1.5 text-sm font-black text-[#f4d68f] shadow-sm backdrop-blur-xl">{project.featured ? t.featured : t.project}</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-[#f8f1df]">{localized.title}</h3>
                <p className="mt-3 line-clamp-3 leading-7 text-[#c8d3bf]">{localized.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.split(",").slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded-lg bg-[#f8f1df]/10 px-3 py-1 text-xs font-black text-[#c8d3bf] ring-1 ring-[#f8f1df]/10">{tag.trim()}</span>
                  ))}
                </div>
                {project.visitUrl && (
                  <a href={project.visitUrl} className="mt-5 inline-flex items-center gap-1 text-sm font-black text-[#f4d68f]">
                    {t.visitSite} <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}

function ContactTab({ t, location, onAuthRequired }: { t: Translation; location: LocationView; onAuthRequired: () => void }) {
  const mapSrc = location.iframeUrl || `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=13&output=embed`;

  return (
    <div className="grid gap-5">
      <section className="glass-card rounded-[18px] p-5">
        <div className="mb-4 flex items-center gap-2 font-black text-[#f8f1df]">
          <MapPin size={18} /> {t.mapTitle}
        </div>
        <iframe src={mapSrc} className="h-[300px] w-full rounded-[15px] border-0 sm:h-[420px]" loading="lazy" />
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="glass-card rounded-[18px] p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d8aa52]">{t.contact}</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#f8f1df] sm:text-4xl">{t.contactTitle}</h1>
          <p className="mt-4 leading-8 text-[#c8d3bf]">{t.contactText}</p>
          <button type="button" onClick={onAuthRequired} className="btn-secondary mt-6">
            <LockKeyhole size={17} /> {t.authButton}
          </button>
        </div>

        <div className="glass-card rounded-[18px] p-6">
          <ContactForm t={t} onAuthRequired={onAuthRequired} />
        </div>
      </section>
    </div>
  );
}

function localizeProject(project: ProjectView, language: Language) {
  const knownProjects: Record<string, Record<Language, Pick<ProjectView, "title" | "description">>> = {
    "ai portfolio admin": {
      uz: {
        title: "AI portfolio admin paneli",
        description: "Profil kontenti, loyihalar, lokatsiya ma'lumotlari va tasdiqlangan kontakt xabarlarini bitta xavfsiz admin paneldan boshqarish uchun full-stack portfolio dashboard."
      },
      en: {
        title: "AI Portfolio Admin",
        description: "A full-stack portfolio dashboard for managing profile content, projects, location data and verified contact messages from one secure admin panel."
      },
      ru: {
        title: "AI portfolio admin panel",
        description: "Full-stack portfolio dashboard для управления контентом профиля, проектами, данными локации и подтвержденными контактными сообщениями из одной безопасной admin panel."
      }
    },
    "ai portfolio admin paneli": {
      uz: {
        title: "AI portfolio admin paneli",
        description: "Profil kontenti, loyihalar, lokatsiya ma'lumotlari va tasdiqlangan kontakt xabarlarini bitta xavfsiz admin paneldan boshqarish uchun full-stack portfolio dashboard."
      },
      en: {
        title: "AI Portfolio Admin",
        description: "A full-stack portfolio dashboard for managing profile content, projects, location data and verified contact messages from one secure admin panel."
      },
      ru: {
        title: "AI portfolio admin panel",
        description: "Full-stack portfolio dashboard для управления контентом профиля, проектами, данными локации и подтвержденными контактными сообщениями из одной безопасной admin panel."
      }
    },
    "ai assistant workflow": {
      uz: {
        title: "AI assistent workflow",
        description: "Leadlarni saralash, support savollarini tartiblash va Telegram xabarlarini AI yordamidagi mantiq bilan yo'naltirishga xizmat qiladigan avtomatlashtirish workflowi."
      },
      en: {
        title: "AI Assistant Workflow",
        description: "An automation workflow that helps qualify leads, organize support questions and route Telegram messages with AI-assisted logic."
      },
      ru: {
        title: "AI assistant workflow",
        description: "Автоматизированный workflow, который помогает квалифицировать лиды, упорядочивать support-вопросы и направлять Telegram-сообщения с AI-assisted логикой."
      }
    },
    "ai assistent workflow": {
      uz: {
        title: "AI assistent workflow",
        description: "Leadlarni saralash, support savollarini tartiblash va Telegram xabarlarini AI yordamidagi mantiq bilan yo'naltirishga xizmat qiladigan avtomatlashtirish workflowi."
      },
      en: {
        title: "AI Assistant Workflow",
        description: "An automation workflow that helps qualify leads, organize support questions and route Telegram messages with AI-assisted logic."
      },
      ru: {
        title: "AI assistant workflow",
        description: "Автоматизированный workflow, который помогает квалифицировать лиды, упорядочивать support-вопросы и направлять Telegram-сообщения с AI-assisted логикой."
      }
    }
  };

  return knownProjects[project.title.toLowerCase()]?.[language] ?? {
    title: project.title,
    description: project.description
  };
}

function skillIconFor(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("react") || lower.includes("next")) return Sparkles;
  if (lower.includes("type") || lower.includes("script")) return Code2;
  if (lower.includes("tailwind") || lower.includes("design")) return Zap;
  if (lower.includes("database") || lower.includes("prisma") || lower.includes("sql")) return Layers3;
  if (lower.includes("telegram") || lower.includes("cloud")) return Send;
  return Code2;
}

function AuthModal({ t, open, onClose }: { t: Translation; open: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    const res = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(form))
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && mode === "sign-in") {
      setMessage(t.signedIn);
      onClose();
      return;
    }
    setMessage(data.message ?? (mode === "sign-up" ? t.verificationSent : t.signedIn));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center bg-[#021b1b]/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div {...pageMotion} className="glass-card w-full max-w-md rounded-[24px] p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#d8aa52]">{t.secureContact}</p>
                <h2 className="mt-2 text-3xl font-black text-[#f8f1df]">{mode === "sign-in" ? t.signIn : t.signUp}</h2>
              </div>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-[#f8f1df]/10 text-[#f8f1df]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={submit} className="grid gap-4">
              <input className="field" name="email" type="email" placeholder={t.email} required />
              <input className="field" name="password" type="password" placeholder={t.password} minLength={8} required />
              <button className="btn-primary w-full" disabled={loading}>
                {loading ? t.pleaseWait : mode === "sign-in" ? t.signIn : t.createAccount}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <button onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")} className="font-black text-[#f4d68f]">
                {mode === "sign-in" ? t.createAccount : t.haveAccount}
              </button>
              <p className="font-semibold text-[#c8d3bf]">{t.verificationHint}</p>
            </div>
            {message && <p className="mt-4 rounded-2xl bg-[#f8f1df]/10 p-3 text-sm font-bold text-[#c8d3bf]">{message}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
