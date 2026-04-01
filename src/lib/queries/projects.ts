import { db } from "@/db";
import { projects, categories } from "@/db/schema";
import { eq, desc, and, asc } from "drizzle-orm";
import type { NewProject } from "@/db/schema";

// ─── Public queries (published only) ──────────────────────────────────────────

export async function getAllPublishedProjects() {
  return db.query.projects.findMany({
    where: eq(projects.published, true),
    with: { category: true },
    orderBy: [asc(projects.sortOrder), desc(projects.publishedAt)],
  });
}

export async function getFeaturedProjects(limit = 6) {
  return db.query.projects.findMany({
    where: and(eq(projects.published, true), eq(projects.featured, true)),
    with: { category: true },
    orderBy: [asc(projects.sortOrder)],
    limit,
  });
}

export async function getProjectBySlug(slug: string) {
  return db.query.projects.findFirst({
    where: and(eq(projects.slug, slug), eq(projects.published, true)),
    with: { category: true },
  });
}

export async function getProjectsByCategory(categorySlug: string) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, categorySlug),
  });
  if (!category) return [];

  return db.query.projects.findMany({
    where: and(
      eq(projects.published, true),
      eq(projects.categoryId, category.id)
    ),
    with: { category: true },
    orderBy: [asc(projects.sortOrder), desc(projects.publishedAt)],
  });
}

// ─── Admin queries (all projects) ─────────────────────────────────────────────

export async function getAllProjectsAdmin() {
  return db.query.projects.findMany({
    with: { category: true },
    orderBy: [asc(projects.sortOrder), desc(projects.createdAt)],
  });
}

export async function getProjectByIdAdmin(id: number) {
  return db.query.projects.findFirst({
    where: eq(projects.id, id),
    with: { category: true },
  });
}

export async function createProject(data: NewProject) {
  const [project] = await db.insert(projects).values(data).returning();
  return project;
}

export async function updateProject(id: number, data: Partial<NewProject>) {
  const [project] = await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  return project;
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
}

export async function toggleProjectPublished(id: number, published: boolean) {
  const [project] = await db
    .update(projects)
    .set({
      published,
      publishedAt: published ? new Date() : null,
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id))
    .returning();
  return project;
}

export async function toggleProjectFeatured(id: number, featured: boolean) {
  const [project] = await db
    .update(projects)
    .set({ featured, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  return project;
}
