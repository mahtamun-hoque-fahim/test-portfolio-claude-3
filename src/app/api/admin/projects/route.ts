import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { createProject } from "@/lib/queries/projects";
import { projectSchema } from "@/lib/validations";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);

    const project = await createProject({
      ...validated,
      coverImage: body.coverImage ?? null,
      images: body.images ?? [],
      publishedAt: validated.published ? new Date() : null,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Validation or server error" }, { status: 400 });
  }
}
