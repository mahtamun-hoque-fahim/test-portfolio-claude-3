import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper-border bg-paper-warm">
      <div className="max-w-8xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl text-ink mb-3">Mahtamun</p>
            <p className="text-sm text-ink-muted leading-relaxed max-w-xs">
              Graphic designer crafting meaningful visual identities and digital experiences.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label mb-4">Navigation</p>
            <nav className="flex flex-col gap-2.5">
              {[
                { href: "/work", label: "Work" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="label mb-4">Get in touch</p>
            <a
              href="mailto:hello@mahtamun.com"
              className="text-sm text-ink-muted hover:text-ink transition-colors duration-200"
            >
              hello@mahtamun.com
            </a>
            <p className="text-sm text-ink-muted mt-1">Dhaka, Bangladesh</p>
            <p className="text-xs text-accent mt-4 font-mono tracking-wider uppercase">
              Available for freelance
            </p>
          </div>
        </div>

        <div className="rule mt-10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-ink-faint font-mono">
            © {year} Mahtamun Hoque Fahim. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-ink-faint hover:text-ink-muted font-mono transition-colors duration-200"
          >
            Admin ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
