"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CldUploadWidget } from "next-cloudinary";
import { X, Upload, Loader2 } from "lucide-react";
import { projectSchema, type ProjectFormData } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import type { Category, Project } from "@/db/schema";

interface ProjectFormProps {
  categories: Category[];
  project?: Project & { category: Category | null };
}

export function ProjectForm({ categories, project }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [coverImage, setCoverImage] = useState<{
    publicId: string; url: string; width: number; height: number; alt: string;
  } | null>(
    project?.coverImage
      ? (project.coverImage as { publicId: string; url: string; width: number; height: number; alt: string })
      : null
  );

  const [galleryImages, setGalleryImages] = useState<Array<{
    publicId: string; url: string; width: number; height: number; alt: string;
  }>>(
    Array.isArray(project?.images)
      ? (project.images as Array<{ publicId: string; url: string; width: number; height: number; alt: string }>)
      : []
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? "",
      slug: project?.slug ?? "",
      tagline: project?.tagline ?? "",
      description: project?.description ?? "",
      categoryId: project?.categoryId ?? undefined,
      client: project?.client ?? "",
      year: project?.year ?? new Date().getFullYear(),
      services: (project?.services as string[]) ?? [],
      tags: (project?.tags as string[]) ?? [],
      externalUrl: project?.externalUrl ?? "",
      featured: project?.featured ?? false,
      published: project?.published ?? false,
      sortOrder: project?.sortOrder ?? 0,
    },
  });

  const title = watch("title");

  // Tag input state
  const [tagInput, setTagInput] = useState("");
  const [serviceInput, setServiceInput] = useState("");
  const tags = watch("tags") ?? [];
  const services = watch("services") ?? [];

  function autoSlug() {
    if (!watch("slug")) {
      setValue("slug", slugify(title));
    }
  }

  function addTag() {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setValue("tags", tags.filter((t) => t !== tag));
  }

  function addService() {
    if (serviceInput.trim() && !services.includes(serviceInput.trim())) {
      setValue("services", [...services, serviceInput.trim()]);
      setServiceInput("");
    }
  }

  function removeService(s: string) {
    setValue("services", services.filter((x) => x !== s));
  }

  async function onSubmit(data: ProjectFormData) {
    setSaving(true);
    try {
      const payload = {
        ...data,
        coverImage: coverImage ?? undefined,
        images: galleryImages,
      };

      const url = project
        ? `/api/admin/projects/${project.id}/update`
        : "/api/admin/projects";

      const res = await fetch(url, {
        method: project ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      toast.success(project ? "Project updated!" : "Project created!");
      router.push("/admin/projects");
      router.refresh();
    } catch {
      toast.error("Failed to save project. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* ── Basic Info ─────────────────────────────── */}
      <section className="bg-paper border border-paper-border p-6 space-y-5">
        <h2 className="font-display text-xl text-ink border-b border-paper-border pb-4">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="form-label">Title *</label>
            <input
              {...register("title")}
              onBlur={autoSlug}
              className="form-input"
              placeholder="My Brand Project"
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Slug *</label>
            <input
              {...register("slug")}
              className="form-input font-mono text-xs"
              placeholder="my-brand-project"
            />
            {errors.slug && (
              <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="form-label">Tagline</label>
          <input
            {...register("tagline")}
            className="form-input"
            placeholder="A short, punchy description"
          />
        </div>

        <div>
          <label className="form-label">Description</label>
          <textarea
            {...register("description")}
            rows={5}
            className="form-input resize-none"
            placeholder="Tell the story of this project…"
          />
        </div>
      </section>

      {/* ── Cover Image ────────────────────────────── */}
      <section className="bg-paper border border-paper-border p-6 space-y-4">
        <h2 className="font-display text-xl text-ink border-b border-paper-border pb-4">
          Cover Image
        </h2>

        {coverImage ? (
          <div className="relative inline-block">
            <img
              src={coverImage.url}
              alt="Cover"
              className="w-full max-w-md h-48 object-cover border border-paper-border"
            />
            <button
              type="button"
              onClick={() => setCoverImage(null)}
              className="absolute top-2 right-2 p-1 bg-paper border border-paper-border hover:bg-paper-warm transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result) => {
              if (result.event === "success" && result.info && typeof result.info === "object") {
                const info = result.info as {
                  public_id: string;
                  secure_url: string;
                  width: number;
                  height: number;
                };
                setCoverImage({
                  publicId: info.public_id,
                  url: info.secure_url,
                  width: info.width,
                  height: info.height,
                  alt: watch("title") || "Project cover",
                });
              }
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-3 px-6 py-4 border border-dashed border-paper-border hover:border-ink text-ink-muted hover:text-ink transition-all duration-200 w-full max-w-md"
              >
                <Upload size={18} />
                <span className="text-sm">Upload cover image</span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </section>

      {/* ── Gallery Images ─────────────────────────── */}
      <section className="bg-paper border border-paper-border p-6 space-y-4">
        <h2 className="font-display text-xl text-ink border-b border-paper-border pb-4">
          Gallery Images
        </h2>

        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          options={{ multiple: true, folder: "portfolio/gallery" }}
          onSuccess={(result) => {
            if (result.event === "success" && result.info && typeof result.info === "object") {
              const info = result.info as { public_id: string; secure_url: string; width: number; height: number };
              setGalleryImages((prev) => [
                ...prev,
                { publicId: info.public_id, url: info.secure_url, width: info.width, height: info.height, alt: watch("title") || "Gallery image" },
              ]);
            }
          }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()} className="flex items-center gap-3 px-6 py-4 border border-dashed border-paper-border hover:border-ink text-ink-muted hover:text-ink transition-all duration-200 w-full">
              <Upload size={18} />
              <span className="text-sm">Upload gallery images (multiple allowed)</span>
            </button>
          )}
        </CldUploadWidget>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {galleryImages.map((img, i) => (
              <div key={img.publicId} className="relative group aspect-square">
                <img src={img.url} alt="" className="w-full h-full object-cover border border-paper-border" />
                <button
                  type="button"
                  onClick={() => setGalleryImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute top-1 right-1 p-0.5 bg-paper border border-paper-border opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Project Details ────────────────────────── */}
      <section className="bg-paper border border-paper-border p-6 space-y-5">
        <h2 className="font-display text-xl text-ink border-b border-paper-border pb-4">
          Project Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="form-label">Category</label>
            <select {...register("categoryId", { valueAsNumber: true })} className="form-input">
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Client</label>
            <input
              {...register("client")}
              className="form-input"
              placeholder="Client Name"
            />
          </div>

          <div>
            <label className="form-label">Year</label>
            <input
              {...register("year", { valueAsNumber: true })}
              type="number"
              className="form-input"
              placeholder="2024"
            />
          </div>
        </div>

        <div>
          <label className="form-label">External URL</label>
          <input
            {...register("externalUrl")}
            className="form-input"
            placeholder="https://example.com"
            type="url"
          />
        </div>

        {/* Services */}
        <div>
          <label className="form-label">Services</label>
          <div className="flex gap-2 mb-2">
            <input
              value={serviceInput}
              onChange={(e) => setServiceInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addService())}
              className="form-input flex-1"
              placeholder="e.g. Brand Strategy"
            />
            <button type="button" onClick={addService} className="btn-ghost px-4 py-2 text-xs">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <span key={s} className="flex items-center gap-1 text-xs font-mono border border-paper-border px-2 py-1">
                {s}
                <button type="button" onClick={() => removeService(s)}>
                  <X size={10} className="text-ink-muted hover:text-red-500" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="form-label">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              className="form-input flex-1"
              placeholder="e.g. Figma, Logo, Minimal"
            />
            <button type="button" onClick={addTag} className="btn-ghost px-4 py-2 text-xs">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs font-mono border border-paper-border px-2 py-1">
                {tag}
                <button type="button" onClick={() => removeTag(tag)}>
                  <X size={10} className="text-ink-muted hover:text-red-500" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visibility ─────────────────────────────── */}
      <section className="bg-paper border border-paper-border p-6 space-y-4">
        <h2 className="font-display text-xl text-ink border-b border-paper-border pb-4">
          Visibility & Display
        </h2>

        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("published")}
              className="w-4 h-4 border border-paper-border accent-ink"
            />
            <div>
              <p className="text-sm font-medium text-ink">Published</p>
              <p className="text-xs text-ink-muted">Visible on the public portfolio</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              {...register("featured")}
              className="w-4 h-4 border border-paper-border accent-ink"
            />
            <div>
              <p className="text-sm font-medium text-ink">Featured</p>
              <p className="text-xs text-ink-muted">Show on the homepage featured section</p>
            </div>
          </label>
        </div>

        <div className="w-32">
          <label className="form-label">Sort Order</label>
          <input
            {...register("sortOrder", { valueAsNumber: true })}
            type="number"
            className="form-input"
            placeholder="0"
          />
        </div>
      </section>

      {/* ── Submit ─────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving…
            </>
          ) : (
            <>{project ? "Update Project" : "Create Project"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="btn-ghost"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
