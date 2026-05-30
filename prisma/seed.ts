import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { locationSeed, personalProfile, projectSeeds } from "../src/data/siteData";

const prisma = new PrismaClient();

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
    update: {
      name: personalProfile.name,
      headline: personalProfile.headline,
      bio: personalProfile.bio,
      heroImage: personalProfile.heroImage,
      cvUrl: personalProfile.cvUrl,
      telegramUrl: personalProfile.telegramUrl,
      githubUrl: personalProfile.githubUrl,
      linkedinUrl: personalProfile.linkedinUrl,
      instagramUrl: personalProfile.instagramUrl
    },
    create: {
      id: "main",
      name: personalProfile.name,
      headline: personalProfile.headline,
      bio: personalProfile.bio,
      heroImage: personalProfile.heroImage,
      cvUrl: personalProfile.cvUrl,
      telegramUrl: personalProfile.telegramUrl,
      githubUrl: personalProfile.githubUrl,
      linkedinUrl: personalProfile.linkedinUrl,
      instagramUrl: personalProfile.instagramUrl
    }
  });

  await prisma.locationSetting.upsert({
    where: { id: "main" },
    update: locationSeed,
    create: {
      id: "main",
      ...locationSeed
    }
  });

  for (const project of projectSeeds) {
    const exists = await prisma.project.findFirst({ where: { title: project.title } });
    if (exists) {
      await prisma.project.update({ where: { id: exists.id }, data: { ...project } });
    } else {
      await prisma.project.create({ data: { ...project } });
    }
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
