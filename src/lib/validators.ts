import { z } from "zod";

const localPathSchema = z.string().regex(/^\/(?!\/)\S*$/);
const urlOrLocalPathSchema = z.string().url().or(localPathSchema).or(z.literal(""));

export const authSchema = z.object({
  email: z.string().email().max(160).transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(100)
});

export const profileSchema = z.object({
  name: z.string().min(2).max(80),
  headline: z.string().min(10).max(180),
  bio: z.string().min(20).max(900),
  headlineUz: z.string().max(180).optional(),
  headlineEn: z.string().max(180).optional(),
  headlineRu: z.string().max(180).optional(),
  bioUz: z.string().max(900).optional(),
  bioEn: z.string().max(900).optional(),
  bioRu: z.string().max(900).optional(),
  heroImage: z.string().min(1),
  cvUrl: urlOrLocalPathSchema.optional(),
  telegramUrl: z.string().url().or(z.literal("")).optional(),
  githubUrl: z.string().url().or(z.literal("")).optional(),
  linkedinUrl: z.string().url().or(z.literal("")).optional(),
  instagramUrl: z.string().url().or(z.literal("")).optional(),
  careerStartDate: z.string().date().or(z.literal("")).optional(),
  happyClientsCount: z.coerce.number().int().min(0).max(999999).default(20)
});

export const projectSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(500),
  imageUrl: z.string().min(1),
  techStack: z.string().min(2).max(240),
  visitUrl: z.string().url().or(z.literal("")).optional(),
  githubUrl: z.string().url().or(z.literal("")).optional(),
  featured: z.boolean().default(false)
});

export const skillSchema = z.object({
  name: z.string().min(2).max(60),
  group: z.string().max(80).optional(),
  imageUrl: z.string().min(1).optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(0)
});

export const locationSchema = z.object({
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  iframeUrl: z.string().url().or(z.literal("")).optional()
});

export const messageSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(160),
  subject: z.string().min(3).max(120),
  body: z.string().min(10).max(2000)
});
