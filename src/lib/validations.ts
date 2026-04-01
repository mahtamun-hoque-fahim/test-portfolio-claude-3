import { z } from "zod";

// ─── Project ───────────────────────────────────────────────────────────────────
export const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").max(200).regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens",
  }),
  tagline: z.string().max(300).optional().nullable(),
  description: z.string().optional().nullable(),
  categoryId: z.number().int().positive().optional().nullable(),
  client: z.string().max(200).optional().nullable(),
  year: z.number().int().min(2000).max(2100).optional().nullable(),
  services: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  externalUrl: z.string().url().optional().nullable().or(z.literal("")),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// ─── Category ─────────────────────────────────────────────────────────────────
export const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().nullable(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

// ─── Contact Form ─────────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(200).optional(),
  service: z.enum([
    "brand-identity",
    "social-media",
    "ui-ux",
    "print-illustration",
    "other",
  ]),
  budget: z.enum(["under-500", "500-1500", "1500-5000", "5000-plus", "tbd"]),
  message: z.string().min(20, "Message must be at least 20 characters").max(2000),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Site Settings ────────────────────────────────────────────────────────────
export const heroSettingsSchema = z.object({
  hero_heading: z.string().min(1).max(200),
  hero_subheading: z.string().max(400),
});

export const aboutSettingsSchema = z.object({
  about_bio: z.string().min(1).max(2000),
  about_skills: z.array(z.string()),
});

export const contactInfoSchema = z.object({
  email: z.string().email(),
  location: z.string(),
  availability: z.string(),
});

export const socialLinksSchema = z.object({
  behance: z.string().url().optional().or(z.literal("")),
  dribbble: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
});
