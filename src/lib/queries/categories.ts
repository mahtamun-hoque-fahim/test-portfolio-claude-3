import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { NewCategory } from "@/db/schema";

export async function getAllCategories() {
  return db.query.categories.findMany({
    orderBy: (c, { asc }) => [asc(c.name)],
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
}

export async function createCategory(data: NewCategory) {
  const [cat] = await db.insert(categories).values(data).returning();
  return cat;
}

export async function updateCategory(id: number, data: Partial<NewCategory>) {
  const [cat] = await db
    .update(categories)
    .set(data)
    .where(eq(categories.id, id))
    .returning();
  return cat;
}

export async function deleteCategory(id: number) {
  await db.delete(categories).where(eq(categories.id, id));
}
