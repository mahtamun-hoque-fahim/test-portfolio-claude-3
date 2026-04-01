"use client";

import { useState, useRef } from "react";
import { GripVertical, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SortItem {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  coverImage: unknown;
}

interface SortableProjectListProps {
  projects: SortItem[];
}

export function SortableProjectList({ projects: initial }: SortableProjectListProps) {
  const [items, setItems] = useState<SortItem[]>(initial);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const overIndex = useRef<number | null>(null);

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDragOver(e: React.DragEvent, index: number) {
    e.preventDefault();
    overIndex.current = index;
  }

  function onDrop() {
    const from = dragIndex.current;
    const to = overIndex.current;
    if (from === null || to === null || from === to) return;

    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
    setDirty(true);
    dragIndex.current = null;
    overIndex.current = null;
  }

  async function saveOrder() {
    setSaving(true);
    try {
      const order = items.map((item, i) => ({ id: item.id, sortOrder: i }));
      const res = await fetch("/api/admin/projects/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order }),
      });
      if (!res.ok) throw new Error();
      setDirty(false);
      toast.success("Sort order saved");
    } catch {
      toast.error("Failed to save order");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-ink-muted font-mono">Drag rows to reorder. Changes apply to the Work page grid.</p>
        {dirty && (
          <button
            onClick={saveOrder}
            disabled={saving}
            className="btn-primary text-xs px-4 py-2"
          >
            {saving ? <><Loader2 size={13} className="animate-spin" /> Saving…</> : "Save Order"}
          </button>
        )}
      </div>

      <div className="bg-paper border border-paper-border">
        {items.map((item, i) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => onDragStart(i)}
            onDragOver={(e) => onDragOver(e, i)}
            onDrop={onDrop}
            className={cn(
              "flex items-center gap-4 px-4 py-3 cursor-grab active:cursor-grabbing select-none transition-colors",
              i < items.length - 1 && "border-b border-paper-border",
              "hover:bg-paper-warm"
            )}
          >
            <GripVertical size={16} className="text-ink-faint shrink-0" />

            {/* Thumb */}
            <div className="w-10 h-10 shrink-0 bg-paper-warm border border-paper-border overflow-hidden">
              {item.coverImage ? (
                <img
                  src={(item.coverImage as { url: string }).url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-mono text-xs text-ink-faint">{i + 1}</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">{item.title}</p>
              <p className="text-xs font-mono text-ink-faint">/work/{item.slug}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs text-ink-faint w-5 text-right">{i + 1}</span>
              <span className={cn(
                "text-xs font-mono px-2 py-0.5 border",
                item.published
                  ? "border-green-200 text-green-700 bg-green-50"
                  : "border-paper-border text-ink-faint"
              )}>
                {item.published ? "Live" : "Draft"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
