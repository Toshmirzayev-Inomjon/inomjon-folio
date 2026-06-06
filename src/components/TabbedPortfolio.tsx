"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  Database,
  ExternalLink,
  Github,
  Home,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Send,
  Server,
  UserRound,
  X,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import type { LocationView, ProfileView, ProjectView } from "@/lib/data";
import {
  expertAreas,
  languages,
  portfolioTabs,
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
  code: Code2,
  mail: Mail
};

const socialIconMap: Record<(typeof socialLinks)[number]["icon"], LucideIcon> = {
  send: Send,
  instagram: Instagram,
  github: Github,
  linkedin: Linkedin
};

const fallbackProjects = [
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    description: "Statistika, foydalanuvchilar va kontent boshqaruvi uchun zamonaviy boshqaruv paneli.",
    imageUrl: "",
    techStack: "Next.js, TypeScript, Prisma, Tailwind CSS",
    visitUrl: siteIdentity.siteUrl,
    githubUrl: "",
    featured: true
  },
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platforma",
    description: "Mahsulotlar, buyurtmalar va to'lov jarayonlari uchun qulay web platforma.",
    imageUrl: "",
    techStack: "React, Node.js, PostgreSQL, Tailwind CSS",
    visitUrl: "",
    githubUrl: "",
    featured: true
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Shaxsiy portfolio web-sayti. Next.js va Tailwind CSS yordamida yaratilgan.",
    imageUrl: "",
    techStack: "Next.js, React, TypeScript, Tailwind CSS",
    visitUrl: siteIdentity.siteUrl,
    githubUrl: "",
    featured: false
  },
  {
    id: "business-platform",
    title: "Business Web Platform",
    description: "Biznes jarayonlarini raqamlashtirish uchun tezkor va qulay web platforma.",
    imageUrl: "",
    techStack: "Next.js, Prisma, PostgreSQL, Git",
    visitUrl: "",
    githubUrl: "",
    featured: false
  }
] satisfies ProjectView[];

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = translations[language];
  const displayProjects = normalizeProjects(projects);
  const socials = socialLinks
    .map((item) => ({ href: profile[item.field], label: item.label, icon: socialIconMap[item.icon] }))
    .filter((item): item is SocialLink => Boolean(item.href));

  function changeTab(tab: TabId) {
    setActiveTab(tab);
    setMobileOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050812] text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_8%,rgba(79,70,229,0.28),transparent_28rem),radial-gradient(circle_at_86%_12%,rgba(124,58,237,0.20),transparent_26rem),linear-gradient(135deg,#050812_0%,#0b1020_45%,#111827_100%)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="mx-auto max-w-[1320px] px-4 py-4 sm:px-6 lg:px-8">
        <Header
          activeTab={activeTab}
          language={language}
          mobileOpen={mobileOpen}
          t={t}
          onChangeLanguage={setLanguage}
          onChangeTab={changeTab}
          onToggleMobile={() => setMobileOpen((value) => !value)}
        />

        <div className="py-6 sm:py-8">
          {activeTab === "home" && <HomeTab t={t} profile={profile} socials={socials} projects={displayProjects} onContact={() => changeTab("contact")} onProjects={() => changeTab("portfolio")} />}
          {activeTab === "about" && <AboutTab t={t} profile={profile} />}
          {activeTab === "portfolio" && <ProjectsTab t={t} projects={displayProjects} />}
          {activeTab === "experience" && <ExperienceTab t={t} />}
          {activeTab === "contact" && <ContactTab t={t} location={location} onAuthRequired={() => changeTab("contact")} />}
        </div>

        <Footer t={t} socials={socials} onChangeTab={changeTab} />
      </div>
    </main>
  );
}

function Header({
  activeTab,
  language,
  mobileOpen,
  t,
  onChangeLanguage,
  onChangeTab,
  onToggleMobile
}: {
  activeTab: TabId;
  language: Language;
  mobileOpen: boolean;
  t: Translation;
  onChangeLanguage: (language: Language) => void;
  onChangeTab: (tab: TabId) => void;
  onToggleMobile: () => void;
}) {
  return (
    <header className="sticky top-3 z-50 rounded-2xl border border-white/10 bg-[#090d18]/78 px-3 py-3 shadow-[0_22px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => onChangeTab("home")} className="flex items-center gap-3 text-left">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-indigo-400/30 bg-indigo-500/15 text-sm font-black text-indigo-100">IT</span>
          <span className="hidden sm:block">
            <span className="block text-sm font-black leading-4 text-white">Inomjon</span>
            <span className="block text-xs font-bold text-slate-400">Full-stack Dasturchi</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {portfolioTabs.map(({ id, icon, labelKey }) => {
            const Icon = tabIconMap[icon];
            const active = activeTab === id;
            return (
              <button key={id} onClick={() => onChangeTab(id)} className={`inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-bold transition ${active ? "bg-white text-slate-950" : "text-slate-300 hover:bg-white/8 hover:text-white"}`}>
                <Icon size={16} />
                {t[labelKey]}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
            {languages.map((lang) => (
              <button key={lang} onClick={() => onChangeLanguage(lang)} className={`h-8 rounded-lg px-2.5 text-xs font-black uppercase transition ${language === lang ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-white"}`}>
                {lang}
              </button>
            ))}
          </div>
          <button onClick={() => onChangeTab("contact")} className="hidden h-10 rounded-xl bg-indigo-500 px-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(79,70,229,0.32)] transition hover:bg-indigo-400 sm:inline-flex sm:items-center">
            {t.letstalk}
          </button>
          <button onClick={onToggleMobile} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="mt-3 grid gap-2 border-t border-white/10 pt-3 lg:hidden">
          {portfolioTabs.map(({ id, icon, labelKey }) => {
            const Icon = tabIconMap[icon];
            return (
              <button key={id} onClick={() => onChangeTab(id)} className="inline-flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3 text-left text-sm font-bold text-slate-200">
                <Icon size={16} />
                {t[labelKey]}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}

function HomeTab({
  t,
  profile,
  socials,
  projects,
  onContact,
  onProjects
}: {
  t: Translation;
  profile: ProfileView;
  socials: SocialLink[];
  projects: ProjectView[];
  onContact: () => void;
  onProjects: () => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-8 lg:p-10">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-indigo-300">Full-stack Dasturchi</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.05] text-white sm:text-6xl">{profile.name}</h1>
        <p className="mt-5 max-w-2xl text-lg font-bold text-blue-100">{t.profileHeadline}</p>
        <p className="mt-5 max-w-2xl leading-8 text-slate-300">{t.profileBio}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={onProjects} className="btn-primary">
            {t.viewProjects} <ArrowRight size={17} />
          </button>
          <button onClick={onContact} className="btn-secondary">
            {t.letstalk}
          </button>
        </div>

        {socials.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} aria-label={label} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:-translate-y-0.5 hover:border-indigo-300/50 hover:bg-indigo-500/14 hover:text-white">
                <Icon size={18} />
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-4">
        <div className="grid gap-4 md:grid-cols-[0.78fr_1.22fr]">
          <ProfilePortrait profile={profile} />
          <DeveloperCard />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard value="3+" label={t.yearsExperience} />
          <StatCard value={`${Math.max(projects.length, 10)}+`} label={t.projectsCompleted} />
          <StatCard value="20+" label={t.happyClients} />
        </div>
      </section>

      <section className="lg:col-span-2">
        <SkillsSection t={t} />
      </section>

      <section className="lg:col-span-2">
        <ProjectsGrid t={t} projects={projects.slice(0, 4)} />
      </section>

      <section className="lg:col-span-2">
        <CtaSection t={t} onContact={onContact} />
      </section>
    </div>
  );
}

function ProfilePortrait({ profile, compact = false }: { profile: ProfileView; compact?: boolean }) {
  const fallbackImage = "/uploads/profile-inomjon.webp";
  const imageSrc = profile.heroImage || fallbackImage;

  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a1020]/86 shadow-[0_28px_90px_rgba(0,0,0,0.30)] ${compact ? "min-h-[420px]" : "min-h-[360px]"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(99,102,241,0.22),transparent_18rem),linear-gradient(180deg,rgba(15,23,42,0.04),rgba(2,6,23,0.80))]" />
      <img
        src={imageSrc}
        alt={`${profile.name} portreti`}
        width={720}
        height={745}
        loading={compact ? "lazy" : "eager"}
        decoding="async"
        className="relative z-10 h-full min-h-[360px] w-full object-cover object-center"
        onError={(event) => {
          if (event.currentTarget.src.endsWith(fallbackImage)) return;
          event.currentTarget.src = fallbackImage;
        }}
      />
      <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl border border-white/10 bg-[#050812]/78 p-4 backdrop-blur-xl">
        <p className="text-lg font-black text-white">{profile.name}</p>
        <p className="mt-1 text-sm font-bold text-indigo-200">{profile.headline}</p>
      </div>
    </div>
  );
}

function DeveloperCard() {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0a1020]/86 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.30)]">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-blue-400" />
        <span className="ml-2 text-xs font-bold text-slate-500">portfolio.tsx</span>
      </div>
      <div className="space-y-3 rounded-2xl border border-white/8 bg-black/24 p-5 font-mono text-sm leading-7 text-slate-300">
        <p><span className="text-indigo-300">const</span> developer = &#123;</p>
        <p className="pl-5"><span className="text-blue-300">name</span>: <span className="text-slate-100">"Inomjon"</span>,</p>
        <p className="pl-5"><span className="text-blue-300">stack</span>: [<span className="text-slate-100">"Next.js"</span>, <span className="text-slate-100">"React"</span>],</p>
        <p className="pl-5"><span className="text-blue-300">focus</span>: <span className="text-slate-100">"Clean web platforms"</span></p>
        <p>&#125;</p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["Next.js", "TypeScript", "Prisma"].map((item) => (
          <span key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-xs font-black text-slate-200">{item}</span>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.055] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.22)]">
      <p className="text-3xl font-black text-white">{value}</p>
      <p className="mt-2 text-sm font-bold text-slate-400">{label}</p>
    </div>
  );
}

function SkillsSection({ t }: { t: Translation }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">{t.stack}</p>
          <h2 className="mt-2 text-3xl font-black text-white">{t.skills}</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {expertAreas.map((item) => (
          <SkillTile key={item.name} name={item.name} />
        ))}
      </div>
    </section>
  );
}

function SkillTile({ name }: { name: string }) {
  const Icon = skillIconFor(name);
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c1224]/78 p-4 text-center transition hover:-translate-y-1 hover:border-indigo-300/40 hover:bg-indigo-500/10">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-indigo-500/14 text-indigo-200">
        <Icon size={21} />
      </div>
      <p className="mt-3 break-words text-sm font-black text-slate-100">{name}</p>
    </div>
  );
}

function ProjectsGrid({ t, projects }: { t: Translation; projects: ProjectView[] }) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">{t.portfolioLabel}</p>
      <h2 className="mt-2 text-3xl font-black text-white">{t.recentProjects}</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} t={t} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, t }: { project: ProjectView; index: number; t: Translation }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120]/86 shadow-[0_20px_70px_rgba(0,0,0,0.24)] transition hover:-translate-y-1 hover:border-indigo-300/35">
      <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,rgba(37,99,235,0.42),rgba(124,58,237,0.28)),linear-gradient(180deg,#111827,#020617)]">
        <div className="absolute inset-4 rounded-xl border border-white/10 bg-black/18 p-4">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-purple-300" />
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-3 w-3/4 rounded-full bg-white/22" />
            <div className="h-3 w-1/2 rounded-full bg-white/14" />
            <div className="grid grid-cols-3 gap-3 pt-3">
              <div className="h-14 rounded-lg bg-white/10" />
              <div className="h-14 rounded-lg bg-white/10" />
              <div className="h-14 rounded-lg bg-white/10" />
            </div>
          </div>
        </div>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/24 px-3 py-1 text-xs font-black text-white">0{index + 1}</span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-black text-white">{project.title}</h3>
        <p className="mt-3 leading-7 text-slate-400">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.split(",").slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-black text-slate-300">{tag.trim()}</span>
          ))}
        </div>
        <a href={project.visitUrl || "#"} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-indigo-300">
          {t.visitSite} <ExternalLink size={15} />
        </a>
      </div>
    </article>
  );
}

function AboutTab({ t, profile }: { t: Translation; profile: ProfileView }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-6">
        <ProfilePortrait profile={profile} compact />
        <section className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">{t.about}</p>
          <h1 className="mt-3 text-4xl font-black text-white">{profile.name}</h1>
          <p className="mt-4 text-lg font-bold text-blue-100">{t.profileHeadline}</p>
          <p className="mt-5 leading-8 text-slate-300">{t.aboutText}</p>
        </section>
      </div>
      <ExperienceTab t={t} compact />
    </div>
  );
}

function ProjectsTab({ t, projects }: { t: Translation; projects: ProjectView[] }) {
  return <ProjectsGrid t={t} projects={projects} />;
}

function ExperienceTab({ t, compact = false }: { t: Translation; compact?: boolean }) {
  return (
    <section className={`rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8 ${compact ? "" : "mx-auto max-w-4xl"}`}>
      <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">{t.experience}</p>
      <h2 className="mt-2 text-3xl font-black text-white">{t.workExperience}</h2>
      <div className="mt-6 grid gap-4">
        {t.workItems.map((item) => (
          <article key={`${item.period}-${item.role}`} className="rounded-2xl border border-white/10 bg-[#0b1120]/80 p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-white">{item.role}</h3>
                <p className="mt-1 font-bold text-slate-400">{item.company}</p>
              </div>
              <span className="h-fit rounded-full border border-indigo-300/20 bg-indigo-500/12 px-3 py-1 text-sm font-black text-indigo-200">{item.period}</span>
            </div>
            <p className="mt-3 leading-7 text-slate-400">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactTab({ t, location, onAuthRequired }: { t: Translation; location: LocationView; onAuthRequired: () => void }) {
  const mapSrc = location.iframeUrl || `https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=13&output=embed`;
  return (
    <div className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
      <section className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 sm:p-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-300">{t.contact}</p>
        <h1 className="mt-3 text-3xl font-black text-white">{t.contactTitle}</h1>
        <p className="mt-4 leading-8 text-slate-300">{t.contactText}</p>
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
          <iframe src={mapSrc} className="h-[260px] w-full border-0 grayscale" loading="lazy" />
        </div>
      </section>
      <section className="rounded-[28px] border border-white/10 bg-white/[0.055] p-6 sm:p-8">
        <ContactForm t={t} onAuthRequired={onAuthRequired} />
      </section>
    </div>
  );
}

function CtaSection({ t, onContact }: { t: Translation; onContact: () => void }) {
  return (
    <section className="rounded-[28px] border border-indigo-300/20 bg-[linear-gradient(135deg,rgba(37,99,235,0.22),rgba(124,58,237,0.18)),rgba(255,255,255,0.045)] p-6 text-center shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-10">
      <h2 className="text-3xl font-black text-white">{t.ctaTitle}</h2>
      <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-300">{t.ctaText}</p>
      <button onClick={onContact} className="btn-primary mt-6">{t.letstalk}</button>
    </section>
  );
}

function Footer({ t, socials, onChangeTab }: { t: Translation; socials: SocialLink[]; onChangeTab: (tab: TabId) => void }) {
  return (
    <footer className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-slate-400 sm:p-8">
      <div className="grid gap-6 md:grid-cols-[1fr_auto_auto]">
        <div>
          <h2 className="text-xl font-black text-white">Inomjon Toshmirzayev</h2>
          <p className="mt-2 font-bold text-slate-400">{t.profileHeadline}</p>
          <p className="mt-4 text-sm">© 2026 Inomjon Toshmirzayev. Barcha huquqlar himoyalangan.</p>
        </div>
        <div className="grid gap-2 text-sm font-bold">
          {portfolioTabs.map((item) => (
            <button key={item.id} onClick={() => onChangeTab(item.id)} className="text-left transition hover:text-white">{t[item.labelKey]}</button>
          ))}
        </div>
        <div className="flex gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <a key={label} href={href} aria-label={label} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 hover:text-white">
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function normalizeProjects(projects: ProjectView[]) {
  const cleaned = projects
    .filter((project) => !/ai/i.test(`${project.title} ${project.description} ${project.techStack}`))
    .map((project) => ({
      ...project,
      title: cleanProjectText(project.title),
      description: cleanProjectText(project.description),
      techStack: cleanProjectText(project.techStack)
    }));
  return [...cleaned, ...fallbackProjects].slice(0, 4);
}

function cleanProjectText(value: string) {
  return value.replace(new RegExp("[Aa][Ii]\\s*", "g"), "").replace(/\s{2,}/g, " ").trim();
}

function skillIconFor(name: string): LucideIcon {
  const lower = name.toLowerCase();
  if (lower.includes("react") || lower.includes("next")) return Code2;
  if (lower.includes("prisma") || lower.includes("postgres") || lower.includes("sql")) return Database;
  if (lower.includes("node")) return Server;
  if (lower.includes("tailwind")) return Monitor;
  if (lower.includes("git")) return Layers3;
  return Code2;
}
