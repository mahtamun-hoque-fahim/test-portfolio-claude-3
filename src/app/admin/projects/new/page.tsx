import { getAllCategories } from "@/lib/queries/categories";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const categories = await getAllCategories();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="label mb-2">Projects</p>
        <h1 className="font-display text-4xl text-ink font-light">New Project</h1>
      </div>
      <ProjectForm categories={categories} />
    </div>
  );
}
