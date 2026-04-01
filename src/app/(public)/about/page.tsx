import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllSettings } from "@/lib/queries/settings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Graphic designer based in Bangladesh, specialising in brand identity, UI/UX, and visual storytelling.",
};

export default async function AboutPage() {
  const settings = await getAllSettings();

  const bio =
    typeof settings.about_bio === "string"
      ? settings.about_bio
      : "I'm a graphic designer with a passion for creating meaningful visual experiences. With expertise spanning brand identity, digital design, and print, I help businesses communicate their story with clarity and intention.";

  const skills: string[] = Array.isArray(settings.about_skills)
    ? (settings.about_skills as string[])
    : [
        "Brand Identity",
        "Logo Design",
        "Typography",
        "Social Media Design",
        "UI/UX Design",
        "Print Design",
        "Illustration",
        "Motion Graphics",
      ];

  const socialLinks = (settings.social_links ?? {}) as Record<string, string>;
  const contactInfo = (settings.contact_info ?? {}) as Record<string, string>;

  const tools = [
    { name: "Adobe Illustrator", category: "Design" },
    { name: "Adobe Photoshop", category: "Design" },
    { name: "Figma", category: "UI/UX" },
    { name: "Adobe InDesign", category: "Print" },
    { name: "After Effects", category: "Motion" },
    { name: "Procreate", category: "Illustration" },
  ];

  const experience = [
    {
      role: "Freelance Graphic Designer",
      company: "Self-employed",
      period: "2021 — Present",
      description:
        "Working with clients across South Asia and beyond on brand identity, social media, and digital design projects.",
    },
    {
      role: "Junior Designer",
      company: "Creative Studio",
      period: "2019 — 2021",
      description:
        "Supported senior designers on print campaigns, brand guidelines, and marketing collateral.",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 md:px-12">

        {/* ── Header ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 pb-16 border-b border-paper-border">
          <div>
            <p className="label mb-6">About</p>
            <h1 className="font-display font-light text-ink mb-8">
              Mahtamun Hoque Fahim
            </h1>
            <p className="text-ink-muted leading-relaxed text-lg whitespace-pre-line">{bio}</p>

            <div className="mt-8 flex flex-wrap gap-4">
              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="label hover:text-ink transition-colors"
                >
                  {contactInfo.email}
                </a>
              )}
              {contactInfo.location && (
                <span className="label">{contactInfo.location}</span>
              )}
            </div>

            {/* Social links */}
            {Object.entries(socialLinks).some(([, v]) => v) && (
              <div className="mt-6 flex flex-wrap gap-4">
                {Object.entries(socialLinks).map(
                  ([platform, url]) =>
                    url && (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label hover:text-ink transition-colors capitalize"
                      >
                        {platform} ↗
                      </a>
                    )
                )}
              </div>
            )}
          </div>

          {/* Right — availability + portrait placeholder */}
          <div className="flex flex-col justify-between">
            <div className="aspect-[3/4] bg-paper-warm border border-paper-border flex items-center justify-center max-w-sm">
              <span className="font-display text-7xl text-paper-border">MHF</span>
            </div>
            {contactInfo.availability && (
              <div className="mt-6 inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-ink-muted uppercase tracking-widest">
                  {contactInfo.availability}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Skills ───────────────────────────────── */}
        <section className="mb-24 pb-16 border-b border-paper-border">
          <p className="label mb-10">Skills & Expertise</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-paper-border">
            {skills.map((skill, i) => (
              <div
                key={skill}
                className="bg-paper px-6 py-5 group hover:bg-paper-warm transition-colors duration-200"
              >
                <span className="font-mono text-xs text-ink-faint mb-2 block">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <p className="text-sm font-medium text-ink">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tools ────────────────────────────────── */}
        <section className="mb-24 pb-16 border-b border-paper-border">
          <p className="label mb-10">Tools I Use</p>
          <div className="flex flex-wrap gap-3">
            {tools.map(({ name, category }) => (
              <div
                key={name}
                className="border border-paper-border px-5 py-3 flex items-center gap-3 hover:border-ink transition-colors duration-200"
              >
                <span className="text-sm text-ink">{name}</span>
                <span className="text-xs font-mono text-ink-faint">{category}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experience ───────────────────────────── */}
        <section className="mb-24 pb-16 border-b border-paper-border">
          <p className="label mb-10">Experience</p>
          <div className="flex flex-col gap-px bg-paper-border">
            {experience.map(({ role, company, period, description }) => (
              <div
                key={role}
                className="bg-paper grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-8"
              >
                <div>
                  <p className="font-mono text-xs text-ink-faint mb-1">{period}</p>
                  <p className="text-xs text-ink-muted">{company}</p>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-ink mb-2">{role}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="text-center py-12">
          <p className="label mb-6">Work Together</p>
          <h2
            className="font-display font-light text-ink mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Ready to start a project?
          </h2>
          <Link href="/contact" className="btn-primary">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </div>
  );
}
