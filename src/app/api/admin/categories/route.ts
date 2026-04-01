import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createCategory } from "@/lib/queries/categories";
import { categorySchema } from "@/lib/validations";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const data = categorySchema.parse(body);
    const category = await createCategory(data);
    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Validation or server error" }, { status: 400 });
  }
}
