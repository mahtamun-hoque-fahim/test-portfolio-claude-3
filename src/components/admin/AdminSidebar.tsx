"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Image,
  Settings,
  Tag,
  Mail,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    label: "Sort Order",
    href: "/admin/sort",
    icon: ArrowUpDown,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Tag,
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: Image,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto py-4 px-3">
      <div className="mb-2 px-3">
        <p className="text-xs font-mono text-ink-faint uppercase tracking-widest">
          Menu
        </p>
      </div>
      <ul className="flex flex-col gap-0.5">
        {navItems.map(({ label, href, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "admin-nav-item",
                  isActive && "active text-ink"
                )}
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-accent" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
