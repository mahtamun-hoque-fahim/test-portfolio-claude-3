"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import type { Category } from "@/db/schema";

interface CategoriesClientProps {
  categories: Category[];
}

export function CategoriesClient({ categories: initial }: CategoriesClientProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(initial);
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // New category form state
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDesc, setNewDesc] = useState("");

  // Edit state
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editDesc, setEditDesc] = useState("");

  async function handleCreate() {
    if (!newName.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          slug: newSlug.trim() || slugify(newName),
          description: newDesc.trim() || null,
        }),
      });
      if (!res.ok) throw new Error();
      const cat = await res.json();
      setCategories([...categories, cat]);
      setCreating(false);
      setNewName(""); setNewSlug(""); setNewDesc("");
      toast.success("Category created");
    } catch {
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
    setEditDesc(cat.description ?? "");
  }

  async function handleUpdate(id: number) {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, slug: editSlug, description: editDesc || null }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setCategories(categories.map((c) => (c.id === id ? updated : c)));
      setEditingId(null);
      toast.success("Category updated");
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this category? Projects in this category will become uncategorised.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setCategories(categories.filter((c) => c.id !== id));
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* List */}
      <div className="bg-paper border border-paper-border mb-4">
        {categories.length === 0 && !creating && (
          <div className="py-12 text-center text-sm text-ink-muted">
            No categories yet.
          </div>
        )}

        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className={`p-5 ${i < categories.length - 1 ? "border-b border-paper-border" : ""}`}
          >
            {editingId === cat.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="form-label">Name</label>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">Slug</label>
                    <input
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                      className="form-input font-mono text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="form-label">Description</label>
                  <input
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="form-input"
                    placeholder="Optional"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    disabled={loading}
                    className="btn-primary text-xs px-4 py-2"
                  >
                    {loading ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn-ghost text-xs px-4 py-2"
                  >
                    <X size={13} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink">{cat.name}</p>
                  <p className="text-xs font-mono text-ink-faint">{cat.slug}</p>
                  {cat.description && (
                    <p className="text-xs text-ink-muted mt-1">{cat.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => startEdit(cat)}
                    className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 text-ink-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Inline create form */}
        {creating && (
          <div className="p-5 border-t border-paper-border bg-paper-warm space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="form-label">Name *</label>
                <input
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (!newSlug) setNewSlug(slugify(e.target.value));
                  }}
                  onBlur={() => setNewSlug(slugify(newName))}
                  className="form-input"
                  placeholder="Brand Identity"
                  autoFocus
                />
              </div>
              <div>
                <label className="form-label">Slug *</label>
                <input
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  className="form-input font-mono text-xs"
                  placeholder="brand-identity"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Description</label>
              <input
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="form-input"
                placeholder="Optional description"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={loading || !newName.trim()}
                className="btn-primary text-xs px-4 py-2"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                Create
              </button>
              <button
                onClick={() => { setCreating(false); setNewName(""); setNewSlug(""); setNewDesc(""); }}
                className="btn-ghost text-xs px-4 py-2"
              >
                <X size={13} /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {!creating && (
        <button onClick={() => setCreating(true)} className="btn-ghost text-sm px-5 py-2.5">
          <Plus size={15} /> Add Category
        </button>
      )}
    </div>
  );
}
