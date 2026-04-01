import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/queries/projects";
import { getSetting } from "@/lib/queries/settings";
import { MarqueeStrip } from "@/components/ui/MarqueeStrip";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export default async function HomePage() {
  const [featuredProjects, heroHeading, heroSubheading] = await Promise.all([
    getFeaturedProjects(6),
    getSetting("hero_heading"),
    getSetting("hero_subheading"),
  ]);

  const heading =
    typeof heroHeading === "string" ? heroHeading : "Crafting Identities That Endure";
  const subheading =
    typeof heroSubheading === "string"
      ? heroSubheading
      : "Graphic designer specialising in brand identity, digital design, and visual storytelling.";

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-20 md:pb-32 pt-32 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(var(--paper-border) 1px, transparent 1px), linear-gradient(90deg, var(--paper-border) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.45,
          }}
        />
        <div
          className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          aria-hidden
          style={{ background: "radial-gradient(circle, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-8xl mx-auto px-6 md:px-12 w-full">
          <p className="label mb-8 animate-fade-up">
            Graphic Designer · Brand Identity · Visual Storytelling
          </p>
          <h1
            className="font-display font-light text-ink mb-8 animate-fade-up animation-delay-100"
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
          <div className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 animate-fade-in animation-delay-600">
            <div className="w-px h-12 bg-paper-border" style={{ animation: "scrollLine 2s ease-in-out infinite" }} />
            <span className="label" style={{ writingMode: "vertical-rl" }}>Scroll</span>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-paper-border py-5 overflow-hidden">
        <MarqueeStrip
          items={["Brand Identity","Logo Design","Social Media","UI/UX Design","Print Design","Typography","Illustration","Visual Storytelling"]}
          speed={25}
        />
      </div>

      {/* Stats */}
      <section className="border-b border-paper-border bg-paper-warm">
        <div className="max-w-8xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-paper-border">
            {[
              { value: 50, suffix: "+", label: "Projects Delivered" },
              { value: 30, suffix: "+", label: "Happy Clients" },
              { value: 4, suffix: "", label: "Years Experience" },
              { value: 100, suffix: "%", label: "Client Satisfaction" },
            ].map(({ value, suffix, label }) => (
              <div key={label} className="reveal py-10 px-8 text-center">
                <p className="font-display text-5xl md:text-6xl font-light text-ink mb-2">
                  <AnimatedNumber value={value} suffix={suffix} />
                </p>
                <p className="label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {featuredProjects.length > 0 && (
        <section className="py-20 md:py-32 border-b border-paper-border">
          <div className="max-w-8xl mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-14 reveal">
              <div>
                <p className="label mb-3">Selected Projects</p>
                <h2 className="font-display font-light">Featured Work</h2>
              </div>
              <Link href="/work" className="hidden md:flex items-center gap-2 label hover:text-ink transition-colors duration-200">
                All projects <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-px bg-paper-border">
              {featuredProjects.slice(0, 2).map((project, i) => (
                <Link
                  key={project.id}
                  href={`/work/${project.slug}`}
                  className="group relative bg-paper overflow-hidden flex flex-col md:flex-row reveal img-zoom"
                  data-delay={String(i * 80)}
                  style={{ minHeight: 360 }}
                >
                  <div className={`md:w-[55%] bg-paper-warm overflow-hidden aspect-video md:aspect-auto shrink-0 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                    {project.coverImage ? (
                      <Image
                        src={(project.coverImage as { url: string }).url}
                        alt={(project.coverImage as { alt: string }).alt || project.title}
                        width={900} height={600}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                        priority={i === 0}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="font-display text-7xl text-paper-border">{String(i + 1).padStart(2, "0")}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center p-10 md:p-14 flex-1">
                    {project.category && <p className="label mb-3">{project.category.name}</p>}
                    <h2 className="font-display text-4xl md:text-5xl text-ink mb-4 leading-tight">{project.title}</h2>
                    {project.tagline && <p className="text-ink-muted leading-relaxed mb-6 max-w-sm">{project.tagline}</p>}
                    <span className="inline-flex items-center gap-2 label group-hover:text-ink transition-colors">
                      View Project
                      <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}

              {featuredProjects.length > 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-border">
                  {featuredProjects.slice(2).map((project, i) => (
                    <Link key={project.id} href={`/work/${project.slug}`} className="group bg-paper overflow-hidden reveal img-zoom" data-delay={String(i * 80)}>
                      <div className="aspect-[4/3] bg-paper-warm overflow-hidden">
                        {project.coverImage ? (
                          <Image
                            src={(project.coverImage as { url: string }).url}
                            alt={(project.coverImage as { alt: string }).alt || project.title}
                            width={700} height={525}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="font-display text-5xl text-paper-border">{String(i + 3).padStart(2, "0")}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex items-start justify-between gap-4">
                        <div>
                          {project.category && <p className="label mb-1.5">{project.category.name}</p>}
                          <h3 className="font-display text-2xl text-ink">{project.title}</h3>
                          {project.tagline && <p className="text-sm text-ink-muted mt-1 leading-snug">{project.tagline}</p>}
                        </div>
                        <ArrowRight size={16} className="shrink-0 mt-1 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 md:hidden">
              <Link href="/work" className="btn-ghost w-full justify-center">
                All Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-20 md:py-28 border-b border-paper-border bg-paper-warm">
        <div className="max-w-8xl mx-auto px-6 md:px-12">
          <p className="label mb-12 reveal">What I Do</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-paper-border">
            {[
              { num: "01", title: "Logo & Brand Identity", desc: "Distinctive logos and comprehensive brand systems built to last." },
              { num: "02", title: "Social Media Design", desc: "Cohesive visual templates and campaigns for digital platforms." },
              { num: "03", title: "UI/UX & Web Design", desc: "Intuitive interfaces and thoughtful web experiences." },
              { num: "04", title: "Print & Illustration", desc: "Print collateral and original illustrations with craft and intention." },
            ].map(({ num, title, desc }, i) => (
              <div key={num} className="bg-paper-warm px-8 py-10 border-t-2 border-transparent hover:border-accent transition-colors duration-300 reveal" data-delay={String(i * 100)}>
                <span className="font-mono text-xs text-accent tracking-widest">{num}</span>
                <h3 className="font-display text-2xl text-ink mt-4 mb-3">{title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second marquee */}
      <div className="border-b border-paper-border py-5 overflow-hidden">
        <MarqueeStrip
          items={["Available for Freelance","Bangladesh","Working Worldwide","Let's Collaborate","Open to Projects"]}
          speed={35}
          separator="★"
        />
      </div>

      {/* CTA */}
      <section className="py-24 md:py-40">
        <div className="max-w-8xl mx-auto px-6 md:px-12 text-center">
          <p className="label mb-6 reveal">Start a Project</p>
          <h2 className="font-display font-light text-ink mb-10 max-w-2xl mx-auto reveal" data-delay="100" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Have something in mind?<br />Let&apos;s talk.
          </h2>
          <div className="reveal" data-delay="200">
            <Link href="/contact" className="btn-primary">
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`@keyframes scrollLine { 0%,100%{transform:scaleY(1);opacity:1} 50%{transform:scaleY(0.4);opacity:0.3} }`}</style>
    </>
  );
}
