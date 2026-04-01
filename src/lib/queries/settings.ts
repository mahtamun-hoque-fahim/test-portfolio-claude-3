import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSetting(key: string) {
  const result = await db.query.siteSettings.findFirst({
    where: eq(siteSettings.key, key),
  });
  return result?.value ?? null;
}

export async function getAllSettings() {
  const rows = await db.query.siteSettings.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function upsertSetting(key: string, value: unknown) {
  await db
    .insert(siteSettings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}
