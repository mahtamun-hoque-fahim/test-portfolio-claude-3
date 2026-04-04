import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper-warm flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-paper border-r border-paper-border flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-paper-border">
          <Link
            href="/admin"
            className="font-display text-lg tracking-wider text-ink"
          >
            Mahtamun
          </Link>
          <span className="text-xs font-mono text-ink-faint bg-paper-warm px-2 py-0.5 border border-paper-border">
            CMS
          </span>
        </div>

        {/* Navigation */}
        <AdminSidebar />

        {/* User */}
        <div className="mt-auto p-4 border-t border-paper-border flex items-center gap-3">
          <SignOutButton />
          <div>
            <p className="text-xs text-ink-soft font-medium">Admin</p>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-ink-muted hover:text-ink transition-colors"
            >
              View site ↗
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
