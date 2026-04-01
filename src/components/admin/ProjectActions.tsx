"use client";

import Link from "next/link";
import { useState } from "react";
import { Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProjectActionsProps {
  projectId: number;
  published: boolean;
  featured: boolean;
}

export function ProjectActions({ projectId, published, featured }: ProjectActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAction(action: "publish" | "feature" | "delete") {
    if (action === "delete") {
      if (!confirm("Delete this project? This cannot be undone.")) return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error();

      const messages = {
        publish: published ? "Project unpublished" : "Project published",
        feature: featured ? "Removed from featured" : "Added to featured",
        delete: "Project deleted",
      };
      toast.success(messages[action]);
      router.refresh();
    } catch {
      toast.error("Action failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {/* Edit */}
      <Link
        href={`/admin/projects/${projectId}/edit`}
        className="p-1.5 text-ink-muted hover:text-ink transition-colors rounded"
        title="Edit"
      >
        <Pencil size={14} />
      </Link>

      {/* Publish toggle */}
      <button
        onClick={() => handleAction("publish")}
        disabled={loading}
        className="p-1.5 text-ink-muted hover:text-ink transition-colors rounded"
        title={published ? "Unpublish" : "Publish"}
      >
        {published ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>

      {/* Feature toggle */}
      <button
        onClick={() => handleAction("feature")}
        disabled={loading}
        className="p-1.5 text-ink-muted hover:text-accent transition-colors rounded"
        title={featured ? "Remove featured" : "Set featured"}
      >
        <Star size={14} className={featured ? "fill-accent text-accent" : ""} />
      </button>

      {/* Delete */}
      <button
        onClick={() => handleAction("delete")}
        disabled={loading}
        className="p-1.5 text-ink-muted hover:text-red-500 transition-colors rounded"
        title="Delete"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
