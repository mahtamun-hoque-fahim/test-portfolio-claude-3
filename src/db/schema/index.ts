import {
  pgTable,
  text,
  varchar,
  boolean,
  integer,
  timestamp,
  jsonb,
  serial,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Categories ────────────────────────────────────────────────────────────────
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Projects ─────────────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  title: varchar("title", { length: 200 }).notNull(),
  tagline: varchar("tagline", { length: 300 }),
  description: text("description"),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  // Cloudinary image data stored as JSON
  coverImage: jsonb("cover_image").$type<{
    publicId: string;
    url: string;
    width: number;
    height: number;
    alt: string;
  }>(),
  // Array of gallery images
  images: jsonb("images")
    .$type<
      Array<{
        publicId: string;
        url: string;
        width: number;
        height: number;
        alt: string;
        caption?: string;
      }>
    >()
    .default([]),
  // Tags / tools used
  tags: jsonb("tags").$type<string[]>().default([]),
  // Project metadata
  client: varchar("client", { length: 200 }),
  year: integer("year"),
  services: jsonb("services").$type<string[]>().default([]),
  externalUrl: text("external_url"),
  // Visibility & ordering
  featured: boolean("featured").default(false).notNull(),
  published: boolean("published").default(false).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  // Timestamps
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ─── Contact Inquiries ─────────────────────────────────────────────────────────
export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 300 }).notNull(),
  company: varchar("company", { length: 200 }),
  service: varchar("service", { length: 100 }),
  budget: varchar("budget", { length: 50 }),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  repliedAt: timestamp("replied_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ─── Site Settings (key-value store) ──────────────────────────────────────────
// Keys: "hero_heading", "hero_subheading", "about_bio", "about_skills",
//       "seo_title", "seo_description", "social_links", "contact_info"
export const siteSettings = pgTable(
  "site_settings",
  {
    id: serial("id").primaryKey(),
    key: varchar("key", { length: 100 }).notNull(),
    value: jsonb("value"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    keyIdx: uniqueIndex("site_settings_key_idx").on(table.key),
  })
);

// ─── Relations ─────────────────────────────────────────────────────────────────
export const categoriesRelations = relations(categories, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one }) => ({
  category: one(categories, {
    fields: [projects.categoryId],
    references: [categories.id],
  }),
}));

// ─── Types ────────────────────────────────────────────────────────────────────
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
