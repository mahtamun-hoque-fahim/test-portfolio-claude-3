import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug, getAllPublishedProjects } from "@/lib/queries/projects";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getAllPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline ?? project.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const cover = project.coverImage as { url: string; alt: string; width: number; height: number } | null;
  const images = (project.images as Array<{ url: string; alt: string; caption?: string }>) ?? [];
  const tags = (project.tags as string[]) ?? [];
  const services = (project.services as string[]) ?? [];

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Back */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 label hover:text-ink transition-colors mb-12"
        >
          <ArrowLeft size={14} /> All Work
        </Link>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 pb-12 border-b border-paper-border">
          <div className="lg:col-span-2">
            {project.category && (
              <p className="label mb-4">{project.category.name}</p>
            )}
            <h1 className="font-display font-light text-ink mb-4">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-xl text-ink-muted leading-relaxed">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Metadata sidebar */}
          <div className="flex flex-col gap-6 lg:pt-2">
            {project.client && (
              <div>
                <p className="label mb-1">Client</p>
                <p className="text-sm text-ink-soft">{project.client}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="label mb-1">Year</p>
                <p className="text-sm text-ink-soft">{project.year}</p>
              </div>
            )}
            {services.length > 0 && (
              <div>
                <p className="label mb-2">Services</p>
                <div className="flex flex-col gap-1">
                  {services.map((s) => (
                    <p key={s} className="text-sm text-ink-soft">{s}</p>
                  ))}
                </div>
              </div>
            )}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 label hover:text-ink transition-colors"
              >
                View Live <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Cover image */}
        {cover && (
          <div className="mb-6 bg-paper-warm overflow-hidden">
            <Image
              src={cover.url}
              alt={cover.alt || project.title}
              width={cover.width || 1400}
              height={cover.height || 900}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="max-w-2xl mt-16 mb-16">
            <p className="label mb-4">About the Project</p>
            <p className="text-ink-soft leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}

        {/* Gallery */}
        {images.length > 0 && (
          <div className="mb-16">
            <p className="label mb-6">Gallery</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
              {images.map((img, i) => (
                <div key={i} className="bg-paper-warm overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt || `${project.title} — ${i + 1}`}
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                  {img.caption && (
                    <p className="px-4 py-3 text-xs text-ink-muted font-mono">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="border-t border-paper-border pt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-ink-muted border border-paper-border px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-20 pt-10 border-t border-paper-border">
          <Link href="/work" className="btn-ghost">
            <ArrowLeft size={16} /> Back to All Work
          </Link>
        </div>
      </div>
    </article>
  );
}
