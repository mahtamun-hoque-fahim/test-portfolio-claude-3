"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-paper/90 backdrop-blur-md border-b border-paper-border"
            : "bg-transparent"
        )}
      >
        <div className="max-w-8xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-medium tracking-widest uppercase text-ink hover:text-accent transition-colors duration-300"
          >
            Mahtamun
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "link-underline label transition-colors duration-200",
                  pathname.startsWith(href)
                    ? "text-ink after:w-full"
                    : "hover:text-ink"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 -mr-2 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-paper flex flex-col justify-center px-8 transition-all duration-500 ease-out-expo md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-8">
          {navLinks.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-display text-5xl font-light text-ink transition-all duration-300",
                open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                `transition-delay-[${i * 80}ms]`
              )}
              style={{ transitionDelay: open ? `${i * 80 + 100}ms` : "0ms" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
