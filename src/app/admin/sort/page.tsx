import { getAllProjectsAdmin } from "@/lib/queries/projects";
import { SortableProjectList } from "@/components/admin/SortableProjectList";

export default async function AdminSortPage() {
  const projects = await getAllProjectsAdmin();

  const sortableProjects = projects.map((p) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    published: p.published,
    coverImage: p.coverImage,
  }));

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="label mb-2">Display Order</p>
        <h1 className="font-display text-4xl text-ink font-light">Sort Projects</h1>
        <p className="text-sm text-ink-muted mt-1">
          Drag and drop to set the display order across the portfolio.
        </p>
      </div>
      <SortableProjectList projects={sortableProjects} />
    </div>
  );
}
