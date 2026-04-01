import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getSetting } from "@/lib/queries/settings";

export default async function HomePage() {
  const [featuredProjects, heroHeading, heroSubheading] = await Promise.all([
    getFeaturedProjects(6),
    getSetting("hero_heading"),
    getSetting("hero_subheading"),
  ]);

  const heading =
    typeof heroHeading === "string"
      ? heroHeading
      : "Crafting Identities That Endure";
  const subheading =
    typeof heroSubheading === "string"
      ? heroSubheading
      : "Graphic designer specialising in brand identity, digital design, and visual storytelling.";

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-32 pt-32">
        {/* Background grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(var(--paper-border) 1px, transparent 1px), linear-gradient(90deg, var(--paper-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.4,
          }}
        />

        <div className="relative max-w-8xl mx-auto px-6 md:px-12 w-full">
          {/* Eyebrow */}
          <p className="label mb-8 animate-fade-up">
            Graphic Designer · Brand Identity · Visual Storytelling
          </p>

          {/* Main heading */}
          <h1
            className="font-display font-light text-ink mb-8 max-w-4xl animate-fade-up animation-delay-100"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 1.05 }}
          >
            {heading}
          </h1>

          <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20 animate-fade-up animation-delay-200">
            <p className="text-ink-muted max-w-md leading-relaxed">{subheading}</p>
            <Link href="/work" className="btn-primary shrink-0">
              View Work <ArrowRight size={16} />
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 animate-fade-in animation-delay-600">
            <div className="w-px h-12 bg-paper-border" />
            <span className="label" style={{ writingMode: "vertical-rl" }}>
              Scroll
            </span>
          </div>
        </div>
      </section>

      {/* ── Featured Work ──────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="py-20 md:py-32 border-t border-paper-border">
          <div className="max-w-8xl mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="label mb-3">Selected Projects</p>
                <h2 className="font-display font-light">Featured Work</h2>
              </div>
              <Link
                href="/work"
                className="hidden md:flex items-center gap-2 label hover:text-ink transition-colors duration-200"
              >
                All projects <ArrowRight size={14} />
              </Link>
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
              {featuredProjects.map((project, i) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="group relative bg-paper overflow-hidden"
                >
                  {/* Image */}
                  <div className="aspect-[4/3] bg-paper-warm overflow-hidden">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage.url}
                        alt={project.coverImage.alt || project.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-4xl text-paper-border">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        {project.category && (
                          <p className="label mb-1.5">{project.category.name}</p>
                        )}
                        <h3 className="font-display text-2xl text-ink group-hover:text-ink-soft transition-colors">
                          {project.title}
                        </h3>
                        {project.tagline && (
                          <p className="text-sm text-ink-muted mt-1 leading-snug">
                            {project.tagline}
                          </p>
                        )}
                      </div>
                      <ArrowRight
                        size={18}
                        className="shrink-0 mt-1 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 md:hidden">
              <Link href="/work" className="btn-ghost w-full justify-center">
                All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Services Strip ─────────────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-paper-border bg-paper-warm">
        <div className="max-w-8xl mx-auto px-6 md:px-12">
          <p className="label mb-12">What I Do</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                num: "01",
                title: "Logo & Brand Identity",
                desc: "Distinctive logos and comprehensive brand systems built to last.",
              },
              {
                num: "02",
                title: "Social Media Design",
                desc: "Cohesive visual templates and campaigns for digital platforms.",
              },
              {
                num: "03",
                title: "UI/UX & Web Design",
                desc: "Intuitive interfaces and thoughtful web experiences.",
              },
              {
                num: "04",
                title: "Print & Illustration",
                desc: "Print collateral and original illustrations with craft and intention.",
              },
            ].map(({ num, title, desc }) => (
              <div key={num} className="border-t border-paper-border pt-8">
                <span className="font-mono text-xs text-accent tracking-widest">{num}</span>
                <h3 className="font-display text-2xl text-ink mt-3 mb-3">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="py-24 md:py-40 border-t border-paper-border">
        <div className="max-w-8xl mx-auto px-6 md:px-12 text-center">
          <p className="label mb-6">Start a Project</p>
          <h2
            className="font-display font-light text-ink mb-10 max-w-2xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            Have something in mind? Let&apos;s talk.
          </h2>
          <Link href="/contact" className="btn-primary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
