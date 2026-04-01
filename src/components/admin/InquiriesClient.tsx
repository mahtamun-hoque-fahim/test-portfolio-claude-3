"use client";

import { useState } from "react";
import { ChevronDown, Mail, MailOpen, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { formatDateFull } from "@/lib/utils";
import type { Inquiry } from "@/db/schema";

const SERVICE_LABELS: Record<string, string> = {
  "brand-identity": "Logo & Brand Identity",
  "social-media": "Social Media Design",
  "ui-ux": "UI/UX & Web Design",
  "print-illustration": "Print & Illustration",
  "other": "Other",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-500": "Under $500",
  "500-1500": "$500 – $1,500",
  "1500-5000": "$1,500 – $5,000",
  "5000-plus": "$5,000+",
  "tbd": "To be discussed",
};

interface InquiriesClientProps {
  inquiries: Inquiry[];
}

export function InquiriesClient({ inquiries: initial }: InquiriesClientProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>(initial);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filtered = inquiries.filter((i) => {
    if (filter === "unread") return !i.read;
    if (filter === "read") return i.read;
    return true;
  });

  async function markRead(id: number, read: boolean) {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (!res.ok) throw new Error();
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, read } : i))
      );
    } catch {
      toast.error("Failed to update");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (expanded === id) setExpanded(null);
      toast.success("Inquiry deleted");
    } catch {
      toast.error("Failed to delete");
    }
  }

  function handleExpand(id: number) {
    setExpanded(expanded === id ? null : id);
    // Auto-mark as read on open
    const inquiry = inquiries.find((i) => i.id === id);
    if (inquiry && !inquiry.read) markRead(id, true);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {(["all", "unread", "read"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 text-xs font-mono uppercase tracking-widest border transition-colors",
              filter === f
                ? "bg-ink text-paper border-ink"
                : "border-paper-border text-ink-muted hover:text-ink hover:border-ink"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="border border-dashed border-paper-border py-20 text-center">
          <Mail size={32} className="mx-auto text-paper-border mb-3" strokeWidth={1} />
          <p className="text-sm text-ink-muted">No inquiries yet.</p>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-px bg-paper-border">
        {filtered.map((inquiry) => (
          <div key={inquiry.id} className="bg-paper">
            {/* Row */}
            <div
              className={cn(
                "flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-paper-warm transition-colors",
                !inquiry.read && "bg-paper-warm"
              )}
              onClick={() => handleExpand(inquiry.id)}
            >
              {/* Unread dot */}
              <div className="w-2 shrink-0">
                {!inquiry.read && (
                  <span className="block w-2 h-2 rounded-full bg-accent" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 grid grid-cols-[1fr_160px_120px_100px] gap-4 items-center">
                <div className="min-w-0">
                  <p className={cn("text-sm truncate", !inquiry.read ? "font-semibold text-ink" : "text-ink-soft")}>
                    {inquiry.name}
                  </p>
                  <p className="text-xs text-ink-muted truncate">{inquiry.email}</p>
                </div>
                <p className="text-xs text-ink-muted hidden md:block truncate">
                  {SERVICE_LABELS[inquiry.service ?? ""] ?? inquiry.service}
                </p>
                <p className="text-xs text-ink-faint font-mono hidden lg:block">
                  {formatDateFull(inquiry.createdAt)}
                </p>
                <p className="text-xs text-ink-muted hidden lg:block">
                  {BUDGET_LABELS[inquiry.budget ?? ""] ?? inquiry.budget}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => markRead(inquiry.id, !inquiry.read)}
                  className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                  title={inquiry.read ? "Mark unread" : "Mark read"}
                >
                  {inquiry.read ? <Mail size={14} /> : <MailOpen size={14} />}
                </button>
                <a
                  href={`mailto:${inquiry.email}?subject=Re: Your inquiry`}
                  className="p-1.5 text-ink-muted hover:text-ink transition-colors"
                  title="Reply via email"
                >
                  <ExternalLink size={14} />
                </a>
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="p-1.5 text-ink-muted hover:text-red-500 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
                <ChevronDown
                  size={14}
                  className={cn(
                    "text-ink-faint transition-transform duration-200",
                    expanded === inquiry.id && "rotate-180"
                  )}
                />
              </div>
            </div>

            {/* Expanded message */}
            {expanded === inquiry.id && (
              <div className="border-t border-paper-border px-8 py-6 bg-paper-warm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  {[
                    { label: "Company", value: inquiry.company || "—" },
                    { label: "Service", value: SERVICE_LABELS[inquiry.service ?? ""] ?? inquiry.service },
                    { label: "Budget", value: BUDGET_LABELS[inquiry.budget ?? ""] ?? inquiry.budget },
                    { label: "Received", value: formatDateFull(inquiry.createdAt) },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="label mb-1 text-xs">{label}</p>
                      <p className="text-sm text-ink-soft">{value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="label mb-2 text-xs">Message</p>
                  <p className="text-sm text-ink-soft leading-relaxed whitespace-pre-wrap border-l-2 border-accent pl-4">
                    {inquiry.message}
                  </p>
                </div>
                <div className="mt-5">
                  <a
                    href={`mailto:${inquiry.email}?subject=Re: Your project inquiry`}
                    className="btn-primary text-sm px-5 py-2.5"
                  >
                    Reply to {inquiry.name.split(" ")[0]} ↗
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
