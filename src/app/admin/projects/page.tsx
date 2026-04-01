import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff, Star } from "lucide-react";
import { getAllProjectsAdmin } from "@/lib/queries/projects";
import { getAllCategories } from "@/lib/queries/categories";
import { ProjectActions } from "@/components/admin/ProjectActions";
import { formatDate } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const [projects, categories] = await Promise.all([
    getAllProjectsAdmin(),
    getAllCategories(),
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="label mb-2">Manage</p>
          <h1 className="font-display text-4xl text-ink font-light">Projects</h1>
          <p className="text-sm text-ink-muted mt-1">
            {projects.length} total · {projects.filter((p) => p.published).length} published
          </p>
        </div>
        <Link href="/admin/projects/new" className="btn-primary">
          <Plus size={16} /> New Project
        </Link>
      </div>

      {/* Table */}
      <div className="bg-paper border border-paper-border overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_80px_80px_100px_120px] gap-4 px-6 py-3 border-b border-paper-border bg-paper-warm">
          {["Title", "Category", "Featured", "Status", "Date", "Actions"].map((h) => (
            <span key={h} className="label text-xs">{h}</span>
          ))}
        </div>

        {projects.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-ink-muted text-sm mb-6">No projects yet.</p>
            <Link href="/admin/projects/new" className="btn-ghost text-sm px-5 py-2.5">
              Create your first project
            </Link>
          </div>
        ) : (
          <ul>
            {projects.map((project, i) => (
              <li
                key={project.id}
                className={`grid grid-cols-[2fr_1fr_80px_80px_100px_120px] gap-4 items-center px-6 py-4 hover:bg-paper-warm transition-colors ${
                  i < projects.length - 1 ? "border-b border-paper-border" : ""
                }`}
              >
                {/* Title */}
                <div>
                  <p className="text-sm font-medium text-ink truncate">{project.title}</p>
                  <p className="text-xs text-ink-faint font-mono truncate">/work/{project.slug}</p>
                </div>

                {/* Category */}
                <p className="text-xs text-ink-muted truncate">
                  {project.category?.name ?? "—"}
                </p>

                {/* Featured */}
                <div className="flex justify-center">
                  {project.featured ? (
                    <Star size={14} className="text-accent fill-accent" />
                  ) : (
                    <Star size={14} className="text-paper-border" />
                  )}
                </div>

                {/* Status */}
                <div>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 border ${
                      project.published
                        ? "border-green-200 text-green-700 bg-green-50"
                        : "border-paper-border text-ink-faint"
                    }`}
                  >
                    {project.published ? "Live" : "Draft"}
                  </span>
                </div>

                {/* Date */}
                <p className="text-xs text-ink-muted font-mono">
                  {formatDate(project.createdAt)}
                </p>

                {/* Actions */}
                <ProjectActions projectId={project.id} published={project.published} featured={project.featured} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
