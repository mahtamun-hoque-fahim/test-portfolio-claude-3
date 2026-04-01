/**
 * Seed script — run with: npx tsx src/db/seed.ts
 * Populates default categories and site settings.
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, siteSettings } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("🌱 Seeding database...");

  // ── Categories ─────────────────────────────────────────────
  const defaultCategories = [
    {
      name: "Logo & Brand Identity",
      slug: "brand-identity",
      description: "Logo design, brand guidelines, visual identity systems",
    },
    {
      name: "Social Media Design",
      slug: "social-media",
      description: "Social media graphics, templates, and campaigns",
    },
    {
      name: "UI/UX & Web Design",
      slug: "ui-ux",
      description: "Web design, app interfaces, and user experience",
    },
    {
      name: "Print & Illustration",
      slug: "print-illustration",
      description: "Print materials, posters, and original illustrations",
    },
  ];

  for (const cat of defaultCategories) {
    await db
      .insert(categories)
      .values(cat)
      .onConflictDoNothing({ target: categories.slug });
  }
  console.log("✅ Categories seeded");

  // ── Site Settings ──────────────────────────────────────────
  const defaultSettings = [
    {
      key: "hero_heading",
      value: "Crafting Identities That Endure",
    },
    {
      key: "hero_subheading",
      value:
        "Graphic designer specialising in brand identity, digital design, and visual storytelling.",
    },
    {
      key: "about_bio",
      value:
        "I'm a graphic designer with a passion for creating meaningful visual experiences. With expertise spanning brand identity, digital design, and print, I help businesses communicate their story with clarity and intention.",
    },
    {
      key: "about_skills",
      value: JSON.stringify([
        "Brand Identity",
        "Logo Design",
        "Typography",
        "Social Media Design",
        "UI/UX Design",
        "Print Design",
        "Illustration",
        "Motion Graphics",
      ]),
    },
    {
      key: "social_links",
      value: JSON.stringify({
        behance: "",
        dribbble: "",
        instagram: "",
        linkedin: "",
      }),
    },
    {
      key: "contact_info",
      value: JSON.stringify({
        email: "hello@yourdomain.com",
        location: "Dhaka, Bangladesh",
        availability: "Available for freelance",
      }),
    },
    {
      key: "seo_title",
      value: "MAHTAMUN — Graphic Designer & Visual Identity",
    },
    {
      key: "seo_description",
      value:
        "Graphic designer specialising in brand identity, logo design, UI/UX, and social media. Based in Bangladesh, working worldwide.",
    },
  ];

  for (const setting of defaultSettings) {
    await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoNothing({ target: siteSettings.key });
  }
  console.log("✅ Site settings seeded");

  console.log("🎉 Seed complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
