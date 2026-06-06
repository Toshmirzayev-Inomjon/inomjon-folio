import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const personalProfile = {
  name: "Inomjon Toshmirzayev",
  headline: "Full-stack Dasturchi",
  bio: "Zamonaviy web ilovalar, portfolio saytlar, dashboardlar va biznes uchun qulay web platformalar yarataman. Next.js, React, TypeScript, Prisma va Tailwind CSS yordamida tez, chiroyli va foydali loyihalar quraman.",
  heroImage: "/uploads/profile-inomjon.webp",
  cvUrl: "/api/cv",
  telegramUrl: "https://t.me/toshmirzayevinomjon",
  githubUrl: "https://github.com/Toshmirzayev-Inomjon",
  linkedinUrl: "",
  instagramUrl: ""
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

  await prisma.profile.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      ...personalProfile
    }
  });

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
}

try {
  await main();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
