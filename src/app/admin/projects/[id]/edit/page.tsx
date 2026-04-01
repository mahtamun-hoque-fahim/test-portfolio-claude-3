import { notFound } from "next/navigation";
import { getAllCategories } from "@/lib/queries/categories";
import { getProjectByIdAdmin } from "@/lib/queries/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";

interface Props {
  params: { id: string };
}

export default async function EditProjectPage({ params }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  const [project, categories] = await Promise.all([
    getProjectByIdAdmin(id),
    getAllCategories(),
  ]);

  if (!project) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="label mb-2">Projects</p>
        <h1 className="font-display text-4xl text-ink font-light">Edit Project</h1>
        <p className="text-sm text-ink-muted mt-1">{project.title}</p>
      </div>
      <ProjectForm categories={categories} project={project} />
    </div>
  );
}
