import type { Metadata } from "next";
import { getAllSettings } from "@/lib/queries/settings";
import { ContactForm } from "@/components/portfolio/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project or say hello. Based in Bangladesh, working with clients worldwide.",
};

export default async function ContactPage() {
  const settings = await getAllSettings();
  const contactInfo = (settings.contact_info ?? {}) as Record<string, string>;
  const socialLinks = (settings.social_links ?? {}) as Record<string, string>;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 md:px-12">

        {/* ── Header ───────────────────────────────── */}
        <div className="mb-16">
          <p className="label mb-4">Contact</p>
          <h1 className="font-display font-light text-ink max-w-2xl">
            Let&apos;s make something great together.
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          {/* ── Form ─────────────────────────────── */}
          <div>
            <ContactForm />
          </div>

          {/* ── Info sidebar ─────────────────────── */}
          <aside className="flex flex-col gap-10 lg:border-l lg:border-paper-border lg:pl-16">
            {/* Contact details */}
            <div>
              <p className="label mb-5">Contact Details</p>
              <div className="flex flex-col gap-4">
                {contactInfo.email && (
                  <div>
                    <p className="text-xs font-mono text-ink-faint mb-1">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-ink hover:text-accent transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                )}
                {contactInfo.location && (
                  <div>
                    <p className="text-xs font-mono text-ink-faint mb-1">Location</p>
                    <p className="text-sm text-ink">{contactInfo.location}</p>
                  </div>
                )}
                {contactInfo.availability && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <p className="text-xs font-mono text-ink-muted uppercase tracking-widest">
                      {contactInfo.availability}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="label mb-5">Services</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Logo & Brand Identity",
                  "Social Media Design",
                  "UI/UX & Web Design",
                  "Print & Illustration",
                ].map((s) => (
                  <li key={s} className="flex items-center gap-2 text-sm text-ink-muted">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            {Object.entries(socialLinks).some(([, v]) => v) && (
              <div>
                <p className="label mb-5">Elsewhere</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(socialLinks).map(
                    ([platform, url]) =>
                      url && (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ink-muted hover:text-ink transition-colors capitalize"
                        >
                          {platform} ↗
                        </a>
                      )
                  )}
                </div>
              </div>
            )}

            {/* Response time note */}
            <div className="border border-paper-border p-5 bg-paper-warm">
              <p className="text-xs font-mono text-ink-muted leading-relaxed">
                I typically respond within 24–48 hours. For urgent projects, mention it in your message.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
