import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  deleteProject,
  toggleProjectPublished,
  toggleProjectFeatured,
  getProjectByIdAdmin,
} from "@/lib/queries/projects";

interface Params {
  params: { id: string };
}

export async function PATCH(req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  const { action } = await req.json();

  try {
    const project = await getProjectByIdAdmin(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    switch (action) {
      case "publish":
        await toggleProjectPublished(id, !project.published);
        break;
      case "feature":
        await toggleProjectFeatured(id, !project.featured);
        break;
      case "delete":
        await deleteProject(id);
        break;
      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const id = parseInt(params.id);
  if (isNaN(id)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
