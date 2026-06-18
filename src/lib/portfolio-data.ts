import type { Lang } from "./i18n";

export const techStack = [
  "Python",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "GitHub",
  "Docker",
  "REST API",
];

export type Project = {
  id: string;
  watermark: string;
  gradient: string;
  dotColor: string;
  tagColor: string;
  category: Record<Lang, string>;
  title: string;
  description: Record<Lang, string>;
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "dtm-tayyorgarlik",
    watermark: "D",
    gradient: "from-blue-600/25 to-indigo-700/25",
    dotColor: "bg-blue-500",
    tagColor: "border-blue-500/30 text-blue-400",
    category: { en: "EDUCATION", uz: "TA'LIM", ru: "ОБРАЗОВАНИЕ" },
    title: "DTM Tayyorgarlik",
    description: {
      en: "An adaptive exam preparation platform for DTM with AI-powered question generation and progress tracking.",
      uz: "DTM imtihoniga adaptiv testlar, AI asosidagi savol generatsiyasi va progress kuzatuv bilan tayyorgarlik platformasi.",
      ru: "Адаптивная платформа подготовки к экзамену DTM с генерацией вопросов на базе ИИ и отслеживанием прогресса.",
    },
    stack: ["FastAPI", "PostgreSQL", "AI"],
  },
  {
    id: "shahrisabz-yetkazuv",
    watermark: "S",
    gradient: "from-emerald-600/25 to-teal-700/25",
    dotColor: "bg-emerald-500",
    tagColor: "border-emerald-500/30 text-emerald-400",
    category: { en: "DELIVERY", uz: "YETKAZUV", ru: "ДОСТАВКА" },
    title: "Shahrisabz Yetkazuv",
    description: {
      en: "A regional delivery management system with real-time order tracking and courier dispatching.",
      uz: "Real vaqtda buyurtma kuzatuv va kuryer boshqaruvi bilan hududiy yetkazib berish tizimi.",
      ru: "Региональная система управления доставкой с отслеживанием заказов в реальном времени и диспетчеризацией курьеров.",
    },
    stack: ["Django", "PostgreSQL", "Redis"],
  },
  {
    id: "neuroflow-ai",
    watermark: "N",
    gradient: "from-violet-600/25 to-purple-700/25",
    dotColor: "bg-violet-500",
    tagColor: "border-violet-500/30 text-violet-400",
    category: { en: "SAAS", uz: "SAAS", ru: "SAAS" },
    title: "NeuroFlow AI",
    description: {
      en: "An AI SaaS platform with subscription management, intelligent workflow automation, and multi-tenant architecture.",
      uz: "Obuna tizimi, aqlli ish oqimi avtomatizatsiyasi va ko'p ijarachilik arxitekturasi bilan AI SaaS platformasi.",
      ru: "AI SaaS-платформа с управлением подписками, интеллектуальной автоматизацией и мультитенантной архитектурой.",
    },
    stack: ["Django", "FastAPI", "PostgreSQL"],
  },
];

export const contactData = {
  phone: "+998951840751",
  email: "toshmirzayevinomjon@gmail.com",
  location: "Qashqadaryo, Uzbekistan",
};

export const socialLinks = {
  github: "https://github.com/Toshmirzayev-Inomjon",
  telegram: "https://t.me/toshmirzayevinomjon",
  linkedin: "https://linkedin.com/in/toshmirzayev-inomjon",
  email: "mailto:toshmirzayevinomjon@gmail.com",
};
