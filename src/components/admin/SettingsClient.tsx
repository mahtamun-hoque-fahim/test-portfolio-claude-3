"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact & Social" },
  { id: "seo", label: "SEO" },
];

interface SettingsClientProps {
  settings: Record<string, unknown>;
}

async function saveSetting(key: string, value: unknown) {
  const res = await fetch("/api/admin/settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, value }),
  });
  if (!res.ok) throw new Error("Failed to save");
}

// ── Hero Tab ────────────────────────────────────────────────────
function HeroTab({ settings }: { settings: Record<string, unknown> }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      hero_heading: (settings.hero_heading as string) ?? "",
      hero_subheading: (settings.hero_subheading as string) ?? "",
    },
  });

  async function onSubmit(data: Record<string, string>) {
    try {
      await Promise.all([
        saveSetting("hero_heading", data.hero_heading),
        saveSetting("hero_subheading", data.hero_subheading),
      ]);
      toast.success("Hero section saved");
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="form-label">Main Heading</label>
        <input {...register("hero_heading")} className="form-input" placeholder="Crafting Identities That Endure" />
      </div>
      <div>
        <label className="form-label">Subheading</label>
        <textarea {...register("hero_subheading")} rows={3} className="form-input resize-none" placeholder="Short tagline…" />
      </div>
      <SaveButton loading={isSubmitting} />
    </form>
  );
}

// ── About Tab ───────────────────────────────────────────────────
function AboutTab({ settings }: { settings: Record<string, unknown> }) {
  const initialSkills: string[] = Array.isArray(settings.about_skills)
    ? (settings.about_skills as string[])
    : [];
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [skillInput, setSkillInput] = useState("");
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { about_bio: (settings.about_bio as string) ?? "" },
  });

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setSkillInput("");
    }
  }

  async function onSubmit(data: { about_bio: string }) {
    try {
      await Promise.all([
        saveSetting("about_bio", data.about_bio),
        saveSetting("about_skills", skills),
      ]);
      toast.success("About section saved");
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="form-label">Bio</label>
        <textarea {...register("about_bio")} rows={6} className="form-input resize-none" placeholder="Tell your story…" />
      </div>
      <div>
        <label className="form-label">Skills</label>
        <div className="flex gap-2 mb-3">
          <input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            className="form-input flex-1"
            placeholder="e.g. Brand Identity"
          />
          <button type="button" onClick={addSkill} className="btn-ghost px-4 py-2 text-xs">
            <Plus size={14} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="flex items-center gap-1 text-xs font-mono border border-paper-border px-3 py-1.5">
              {skill}
              <button type="button" onClick={() => setSkills(skills.filter((s) => s !== skill))}>
                <X size={10} className="text-ink-muted hover:text-red-500" />
              </button>
            </span>
          ))}
        </div>
      </div>
      <SaveButton loading={isSubmitting} />
    </form>
  );
}

// ── Contact Tab ─────────────────────────────────────────────────
function ContactTab({ settings }: { settings: Record<string, unknown> }) {
  const contactInfo = (settings.contact_info ?? {}) as Record<string, string>;
  const socialLinks = (settings.social_links ?? {}) as Record<string, string>;

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      email: contactInfo.email ?? "",
      location: contactInfo.location ?? "",
      availability: contactInfo.availability ?? "",
      behance: socialLinks.behance ?? "",
      dribbble: socialLinks.dribbble ?? "",
      instagram: socialLinks.instagram ?? "",
      linkedin: socialLinks.linkedin ?? "",
    },
  });

  async function onSubmit(data: Record<string, string>) {
    try {
      await Promise.all([
        saveSetting("contact_info", {
          email: data.email,
          location: data.location,
          availability: data.availability,
        }),
        saveSetting("social_links", {
          behance: data.behance,
          dribbble: data.dribbble,
          instagram: data.instagram,
          linkedin: data.linkedin,
        }),
      ]);
      toast.success("Contact info saved");
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <p className="label mb-4 border-b border-paper-border pb-3">Contact Details</p>
        <div className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <input {...register("email")} type="email" className="form-input" placeholder="hello@yourdomain.com" />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input {...register("location")} className="form-input" placeholder="Dhaka, Bangladesh" />
          </div>
          <div>
            <label className="form-label">Availability Status</label>
            <input {...register("availability")} className="form-input" placeholder="Available for freelance" />
          </div>
        </div>
      </div>

      <div>
        <p className="label mb-4 border-b border-paper-border pb-3">Social Links</p>
        <div className="space-y-4">
          {[
            { name: "behance", placeholder: "https://behance.net/yourname" },
            { name: "dribbble", placeholder: "https://dribbble.com/yourname" },
            { name: "instagram", placeholder: "https://instagram.com/yourname" },
            { name: "linkedin", placeholder: "https://linkedin.com/in/yourname" },
          ].map(({ name, placeholder }) => (
            <div key={name}>
              <label className="form-label capitalize">{name}</label>
              <input {...register(name as keyof typeof register)} className="form-input" placeholder={placeholder} />
            </div>
          ))}
        </div>
      </div>

      <SaveButton loading={isSubmitting} />
    </form>
  );
}

// ── SEO Tab ─────────────────────────────────────────────────────
function SeoTab({ settings }: { settings: Record<string, unknown> }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      seo_title: (settings.seo_title as string) ?? "",
      seo_description: (settings.seo_description as string) ?? "",
    },
  });

  async function onSubmit(data: Record<string, string>) {
    try {
      await Promise.all([
        saveSetting("seo_title", data.seo_title),
        saveSetting("seo_description", data.seo_description),
      ]);
      toast.success("SEO settings saved");
    } catch {
      toast.error("Failed to save");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="form-label">SEO Title</label>
        <input {...register("seo_title")} className="form-input" placeholder="MAHTAMUN — Graphic Designer" />
        <p className="text-xs text-ink-faint mt-1">Recommended: 50–60 characters</p>
      </div>
      <div>
        <label className="form-label">Meta Description</label>
        <textarea {...register("seo_description")} rows={3} className="form-input resize-none" placeholder="Graphic designer specialising in…" />
        <p className="text-xs text-ink-faint mt-1">Recommended: 150–160 characters</p>
      </div>
      <SaveButton loading={isSubmitting} />
    </form>
  );
}

// ── Shared save button ──────────────────────────────────────────
function SaveButton({ loading }: { loading: boolean }) {
  return (
    <button type="submit" disabled={loading} className="btn-primary">
      {loading ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : "Save Changes"}
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────
export function SettingsClient({ settings }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState("hero");

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-paper-border mb-8 gap-0">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "px-5 py-3 text-xs font-mono uppercase tracking-widest transition-colors border-b-2 -mb-px",
              activeTab === id
                ? "border-ink text-ink"
                : "border-transparent text-ink-muted hover:text-ink"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-paper border border-paper-border p-6">
        {activeTab === "hero" && <HeroTab settings={settings} />}
        {activeTab === "about" && <AboutTab settings={settings} />}
        {activeTab === "contact" && <ContactTab settings={settings} />}
        {activeTab === "seo" && <SeoTab settings={settings} />}
      </div>
    </div>
  );
}
