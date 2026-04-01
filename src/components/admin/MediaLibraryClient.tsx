"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, Copy, Trash2, Check, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface MediaItem {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  format: string;
}

interface MediaLibraryClientProps {
  initialMedia: MediaItem[];
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function MediaLibraryClient({ initialMedia }: MediaLibraryClientProps) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [selected, setSelected] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");

  function handleUploadSuccess(result: unknown) {
    const r = result as { event: string; info: MediaItem & { secure_url: string } };
    if (r.event === "success") {
      const info = r.info;
      setMedia((prev) => [
        {
          public_id: info.public_id,
          secure_url: info.secure_url,
          width: info.width,
          height: info.height,
          bytes: info.bytes,
          created_at: new Date().toISOString(),
          format: info.format,
        },
        ...prev,
      ]);
      toast.success("Image uploaded successfully");
    }
  }

  async function handleDelete(publicId: string) {
    if (!confirm("Delete this image from Cloudinary? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      if (!res.ok) throw new Error();
      setMedia((prev) => prev.filter((m) => m.public_id !== publicId));
      if (selected === publicId) setSelected(null);
      toast.success("Image deleted");
    } catch {
      toast.error("Failed to delete image");
    }
  }

  async function copyUrl(url: string, id: string) {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("URL copied to clipboard");
  }

  const selectedItem = media.find((m) => m.public_id === selected);

  return (
    <div className="flex gap-6">
      {/* ── Main panel ─────────────────────────── */}
      <div className="flex-1 min-w-0">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "px-3 py-1.5 text-xs font-mono border transition-colors",
                view === "grid"
                  ? "bg-ink text-paper border-ink"
                  : "border-paper-border text-ink-muted hover:border-ink hover:text-ink"
              )}
            >
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "px-3 py-1.5 text-xs font-mono border transition-colors",
                view === "list"
                  ? "bg-ink text-paper border-ink"
                  : "border-paper-border text-ink-muted hover:border-ink hover:text-ink"
              )}
            >
              List
            </button>
          </div>

          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            options={{ folder: "portfolio", multiple: true }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button onClick={() => open()} className="btn-primary text-sm px-5 py-2.5">
                <Upload size={15} /> Upload Images
              </button>
            )}
          </CldUploadWidget>
        </div>

        {/* Empty state */}
        {media.length === 0 && (
          <div className="border border-dashed border-paper-border py-24 flex flex-col items-center gap-4">
            <ImageIcon size={36} className="text-paper-border" strokeWidth={1} />
            <p className="text-sm text-ink-muted">No media uploaded yet.</p>
            <CldUploadWidget
              uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
              options={{ folder: "portfolio", multiple: true }}
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <button onClick={() => open()} className="btn-ghost text-sm px-5 py-2.5">
                  <Upload size={15} /> Upload your first image
                </button>
              )}
            </CldUploadWidget>
          </div>
        )}

        {/* Grid view */}
        {view === "grid" && media.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px bg-paper-border">
            {media.map((item) => (
              <button
                key={item.public_id}
                onClick={() => setSelected(selected === item.public_id ? null : item.public_id)}
                className={cn(
                  "relative aspect-square bg-paper-warm overflow-hidden group transition-all",
                  selected === item.public_id && "ring-2 ring-ink ring-inset"
                )}
              >
                <img
                  src={item.secure_url}
                  alt={item.public_id}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-200" />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs text-paper font-mono truncate">
                    {item.format.toUpperCase()}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* List view */}
        {view === "list" && media.length > 0 && (
          <div className="bg-paper border border-paper-border">
            <div className="grid grid-cols-[48px_1fr_80px_80px_100px] gap-4 px-4 py-2 border-b border-paper-border bg-paper-warm">
              {["", "File", "Format", "Size", "Actions"].map((h) => (
                <span key={h} className="label text-xs">{h}</span>
              ))}
            </div>
            {media.map((item, i) => (
              <div
                key={item.public_id}
                className={cn(
                  "grid grid-cols-[48px_1fr_80px_80px_100px] gap-4 items-center px-4 py-3 hover:bg-paper-warm transition-colors cursor-pointer",
                  i < media.length - 1 && "border-b border-paper-border",
                  selected === item.public_id && "bg-paper-warm"
                )}
                onClick={() => setSelected(selected === item.public_id ? null : item.public_id)}
              >
                <img
                  src={item.secure_url}
                  alt=""
                  className="w-10 h-10 object-cover border border-paper-border"
                />
                <p className="text-xs font-mono text-ink-soft truncate">{item.public_id}</p>
                <p className="text-xs text-ink-muted uppercase">{item.format}</p>
                <p className="text-xs text-ink-muted">{formatBytes(item.bytes)}</p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => { e.stopPropagation(); copyUrl(item.secure_url, item.public_id); }}
                    className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                    title="Copy URL"
                  >
                    {copiedId === item.public_id ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.public_id); }}
                    className="p-1.5 text-ink-muted hover:text-red-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Detail sidebar ────────────────────── */}
      {selectedItem && (
        <aside className="w-64 shrink-0 border border-paper-border bg-paper self-start sticky top-8">
          <div className="aspect-square bg-paper-warm overflow-hidden">
            <img
              src={selectedItem.secure_url}
              alt={selectedItem.public_id}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4 space-y-3 border-t border-paper-border">
            <div>
              <p className="label mb-1 text-xs">Public ID</p>
              <p className="text-xs font-mono text-ink-soft break-all leading-relaxed">
                {selectedItem.public_id}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="label mb-1 text-xs">Dimensions</p>
                <p className="text-xs text-ink-soft">{selectedItem.width} × {selectedItem.height}</p>
              </div>
              <div>
                <p className="label mb-1 text-xs">Size</p>
                <p className="text-xs text-ink-soft">{formatBytes(selectedItem.bytes)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => copyUrl(selectedItem.secure_url, selectedItem.public_id)}
                className="btn-ghost text-xs px-3 py-2 justify-center"
              >
                {copiedId === selectedItem.public_id ? (
                  <><Check size={13} className="text-green-600" /> Copied!</>
                ) : (
                  <><Copy size={13} /> Copy URL</>
                )}
              </button>
              <button
                onClick={() => handleDelete(selectedItem.public_id)}
                className="text-xs text-red-500 hover:text-red-700 transition-colors py-1"
              >
                Delete image
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
