import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { order } = await req.json() as {
      order: Array<{ id: number; sortOrder: number }>;
    };

    if (!Array.isArray(order)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    // Update each project's sortOrder in parallel
    await Promise.all(
      order.map(({ id, sortOrder }) =>
        db
          .update(projects)
          .set({ sortOrder, updatedAt: new Date() })
          .where(eq(projects.id, id))
      )
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reorder error:", err);
    return NextResponse.json({ error: "Reorder failed" }, { status: 500 });
  }
}
