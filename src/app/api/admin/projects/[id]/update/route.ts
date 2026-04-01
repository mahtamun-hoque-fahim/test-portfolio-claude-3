import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { updateProject, getProjectByIdAdmin } from "@/lib/queries/projects";
import { projectSchema } from "@/lib/validations";

interface Params {
  params: { id: string };
}

export async function PUT(req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const body = await req.json();
    const validated = projectSchema.parse(body);

    const existing = await getProjectByIdAdmin(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const project = await updateProject(id, {
      ...validated,
      coverImage: body.coverImage ?? null,
      images: body.images ?? [],
      publishedAt:
        validated.published && !existing.published ? new Date() : existing.publishedAt,
    });

    return NextResponse.json(project);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Validation or server error" }, { status: 400 });
  }
}
