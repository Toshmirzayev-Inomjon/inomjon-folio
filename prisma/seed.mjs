import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const personalProfile = {
  name: "Inomjon Toshmirzayev",
  headline: "Full-stack Dasturchi",
  bio: "Zamonaviy web ilovalar, portfolio saytlar, dashboardlar va biznes uchun qulay web platformalar yarataman. Next.js, React, TypeScript, Prisma va Tailwind CSS yordamida tez, chiroyli va foydali loyihalar quraman.",
  headlineUz: "Full-stack Dasturchi",
  headlineEn: "Full-stack Developer",
  headlineRu: "Full-stack разработчик",
  bioUz: "Zamonaviy web ilovalar, portfolio saytlar, dashboardlar va biznes uchun qulay web platformalar yarataman. Next.js, React, TypeScript, Prisma va Tailwind CSS yordamida tez, chiroyli va foydali loyihalar quraman.",
  bioEn: "I build modern web apps, portfolio websites, dashboards and useful business platforms with Next.js, React, TypeScript, Prisma and Tailwind CSS.",
  bioRu: "Создаю современные web-приложения, portfolio сайты, dashboard'ы и удобные business platforms на Next.js, React, TypeScript, Prisma и Tailwind CSS.",
  phoneNumber: "+998951840751",
  contactEmail: "toshmirzayevinomjon@gmail.com",
  location: "Qashqadaryo, Uzbekistan",
  heroImage: "/uploads/profile-inomjon.webp",
  cvUrl: "/api/cv",
  telegramUrl: "https://t.me/toshmirzayevinomjon",
  githubUrl: "https://github.com/Toshmirzayev-Inomjon",
  linkedinUrl: "",
  instagramUrl: "",
  careerStartDate: "2023-01-01",
  happyClientsCount: 20
};

const projectSeeds = [
  {
    title: "Admin Dashboard",
    description: "Statistika, foydalanuvchilar va kontent boshqaruvi uchun zamonaviy boshqaruv paneli.",
    imageUrl: "",
    techStack: "Next.js, TypeScript, Prisma, Tailwind CSS",
    visitUrl: "https://toshmirzayev-inomjon.online",
    githubUrl: "",
    featured: true
  },
  {
    title: "E-Commerce Platforma",
    description: "Mahsulotlar, buyurtmalar va to'lov jarayonlari uchun qulay web platforma.",
    imageUrl: "",
    techStack: "React, Node.js, PostgreSQL, Tailwind CSS",
    visitUrl: "",
    githubUrl: "",
    featured: true
  },
  {
    title: "Portfolio Website",
    description: "Shaxsiy portfolio web-sayti. Next.js va Tailwind CSS yordamida yaratilgan.",
    imageUrl: "",
    techStack: "Next.js, React, TypeScript, Tailwind CSS",
    visitUrl: "https://toshmirzayev-inomjon.online",
    githubUrl: "",
    featured: false
  },
  {
    title: "Business Web Platform",
    description: "Biznes jarayonlarini raqamlashtirish uchun tezkor va qulay web platforma.",
    imageUrl: "",
    techStack: "Next.js, Prisma, PostgreSQL, Git",
    visitUrl: "",
    githubUrl: "",
    featured: false
  }
];

const skillIconSlugs = {
  "next.js": "nextdotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  postgresql: "postgresql",
  "tailwind css": "tailwindcss",
  tailwind: "tailwindcss",
  typescript: "typescript",
  javascript: "javascript"
};

const skillSeeds = [
  { name: "React", group: "Frontend" },
  { name: "Next.js", group: "Frontend" },
  { name: "TypeScript", group: "Frontend" },
  { name: "Tailwind CSS", group: "Design" },
  { name: "Prisma", group: "Database" },
  { name: "Node.js", group: "Backend" },
  { name: "PostgreSQL", group: "Database" },
  { name: "Git", group: "Tooling" }
];

function skillIconUrl(name) {
  const normalized = name.trim().toLowerCase();
  const slug = skillIconSlugs[normalized] ?? normalized.replace(/\+/g, "plus").replace(/#/g, "sharp").replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: "ADMIN", emailVerified: new Date() },
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 12),
      role: "ADMIN",
      emailVerified: new Date()
    }
  });

  await prisma.$executeRaw`
    INSERT INTO Profile (
      id, name, headline, bio, headlineUz, headlineEn, headlineRu, bioUz, bioEn, bioRu,
      phoneNumber, contactEmail, location, heroImage, cvUrl,
      telegramUrl, githubUrl, linkedinUrl, instagramUrl, careerStartDate, happyClientsCount, updatedAt
    )
    VALUES (
      'main', ${personalProfile.name}, ${personalProfile.headline}, ${personalProfile.bio}, ${personalProfile.headlineUz},
      ${personalProfile.headlineEn}, ${personalProfile.headlineRu}, ${personalProfile.bioUz}, ${personalProfile.bioEn}, ${personalProfile.bioRu},
      ${personalProfile.phoneNumber}, ${personalProfile.contactEmail}, ${personalProfile.location},
      ${personalProfile.heroImage}, ${personalProfile.cvUrl}, ${personalProfile.telegramUrl}, ${personalProfile.githubUrl},
      ${personalProfile.linkedinUrl}, ${personalProfile.instagramUrl}, ${personalProfile.careerStartDate}, ${personalProfile.happyClientsCount}, datetime('now')
    )
    ON CONFLICT(id) DO UPDATE SET
      headlineUz = COALESCE(Profile.headlineUz, excluded.headlineUz),
      headlineEn = COALESCE(Profile.headlineEn, excluded.headlineEn),
      headlineRu = COALESCE(Profile.headlineRu, excluded.headlineRu),
      bioUz = COALESCE(Profile.bioUz, excluded.bioUz),
      bioEn = COALESCE(Profile.bioEn, excluded.bioEn),
      bioRu = COALESCE(Profile.bioRu, excluded.bioRu),
      phoneNumber = COALESCE(Profile.phoneNumber, excluded.phoneNumber),
      contactEmail = COALESCE(Profile.contactEmail, excluded.contactEmail),
      location = COALESCE(Profile.location, excluded.location),
      careerStartDate = COALESCE(Profile.careerStartDate, excluded.careerStartDate),
      happyClientsCount = COALESCE(Profile.happyClientsCount, excluded.happyClientsCount),
      updatedAt = datetime('now')
  `;

  await prisma.locationSetting.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      latitude: 39.0843,
      longitude: 66.8332,
      iframeUrl: ""
    }
  });

  for (const project of projectSeeds) {
    const exists = await prisma.project.findFirst({ where: { title: project.title } });
    if (!exists) {
      await prisma.project.create({ data: project });
    }
  }

  for (const [index, skill] of skillSeeds.entries()) {
    await prisma.$executeRaw`
      INSERT INTO Skill (id, name, "group", imageUrl, sortOrder, createdAt, updatedAt)
      VALUES (${randomUUID()}, ${skill.name}, ${skill.group}, ${skillIconUrl(skill.name)}, ${index}, datetime('now'), datetime('now'))
      ON CONFLICT(name) DO UPDATE SET
        "group" = excluded."group",
        imageUrl = excluded.imageUrl,
        sortOrder = excluded.sortOrder,
        updatedAt = datetime('now')
    `;
  }
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
