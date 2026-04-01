import Link from "next/link";
import { ArrowRight, FolderOpen, Eye, Star, Mail } from "lucide-react";
import { getAllProjectsAdmin } from "@/lib/queries/projects";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eq } from "drizzle-orm";
import { formatDateFull } from "@/lib/utils";

export default async function AdminDashboard() {
  const [projects, unreadInquiries] = await Promise.all([
    getAllProjectsAdmin(),
    db.query.inquiries.findMany({ where: eq(inquiries.read, false) }),
  ]);

  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.published).length,
    featured: projects.filter((p) => p.featured).length,
    unread: unreadInquiries.length,
  };

  const recentProjects = projects.slice(0, 5);

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="label mb-2">Overview</p>
        <h1 className="font-display text-4xl text-ink font-light">Dashboard</h1>
        <p className="text-sm text-ink-muted mt-1">
          {formatDateFull(new Date())}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Total Projects", value: stats.total, icon: FolderOpen, href: "/admin/projects" },
          { label: "Published", value: stats.published, icon: Eye, href: "/admin/projects" },
          { label: "Featured", value: stats.featured, icon: Star, href: "/admin/projects" },
          { label: "New Inquiries", value: stats.unread, icon: Mail, href: "/admin/inquiries", highlight: stats.unread > 0 },
        ].map(({ label, value, icon: Icon, href, highlight }) => (
          <Link
            key={label}
            href={href}
            className="bg-paper border border-paper-border p-6 hover:border-ink transition-colors duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <Icon size={18} className="text-ink-muted group-hover:text-ink transition-colors" />
              {highlight && (
                <span className="w-2 h-2 rounded-full bg-accent" />
              )}
            </div>
            <p className={`font-display text-4xl font-light mb-1 ${highlight ? "text-accent" : "text-ink"}`}>
              {value}
            </p>
            <p className="text-xs font-mono text-ink-muted uppercase tracking-widest">
              {label}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-paper border border-paper-border mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-paper-border">
          <p className="label">Recent Projects</p>
          <Link
            href="/admin/projects/new"
            className="btn-primary text-xs px-4 py-2"
          >
            + New Project
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-ink-muted text-sm mb-4">No projects yet.</p>
            <Link href="/admin/projects/new" className="btn-ghost text-sm px-5 py-2.5">
              Create your first project
            </Link>
          </div>
        ) : (
          <ul>
            {recentProjects.map((project, i) => (
              <li
                key={project.id}
                className={`flex items-center justify-between px-6 py-4 hover:bg-paper-warm transition-colors ${
                  i < recentProjects.length - 1 ? "border-b border-paper-border" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-ink-faint w-5">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{project.title}</p>
                    <p className="text-xs text-ink-muted">{project.category?.name ?? "Uncategorised"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs font-mono px-2 py-0.5 border ${
                      project.published
                        ? "border-green-200 text-green-700 bg-green-50"
                        : "border-paper-border text-ink-faint"
                    }`}
                  >
                    {project.published ? "Live" : "Draft"}
                  </span>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-xs text-ink-muted hover:text-ink transition-colors"
                  >
                    Edit <ArrowRight size={12} className="inline" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/admin/projects/new", label: "New Project" },
          { href: "/admin/media", label: "Media Library" },
          { href: "/admin/settings", label: "Site Settings" },
          { href: "/", label: "View Site ↗", external: true },
        ].map(({ href, label, external }) => (
          <Link
            key={href}
            href={href}
            target={external ? "_blank" : undefined}
            className="border border-paper-border px-4 py-3 text-xs font-mono text-ink-muted hover:text-ink hover:border-ink text-center transition-all duration-200"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
