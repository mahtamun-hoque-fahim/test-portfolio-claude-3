import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug, getAllPublishedProjects } from "@/lib/queries/projects";
import { Gallery } from "@/components/portfolio/Gallery";
import { RelatedProjects } from "@/components/portfolio/RelatedProjects";

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
  const cover = project.coverImage as { url: string } | null;
  return {
    title: project.title,
    description: project.tagline ?? project.description ?? undefined,
    openGraph: {
      title: project.title,
      description: project.tagline ?? undefined,
      images: cover ? [{ url: cover.url, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const cover = project.coverImage as { url: string; alt: string; width: number; height: number } | null;
  const images = (project.images as Array<{ url: string; alt: string; caption?: string; width?: number; height?: number }>) ?? [];
  const tags = (project.tags as string[]) ?? [];
  const services = (project.services as string[]) ?? [];

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 md:px-12">

        {/* Back */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 label hover:text-ink transition-colors mb-12 group"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
          All Work
        </Link>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16 pb-12 border-b border-paper-border">
          <div className="lg:col-span-2 animate-fade-up">
            {project.category && (
              <p className="label mb-4">{project.category.name}</p>
            )}
            <h1 className="font-display font-light text-ink mb-5">
              {project.title}
            </h1>
            {project.tagline && (
              <p className="text-xl text-ink-muted leading-relaxed max-w-xl">
                {project.tagline}
              </p>
            )}
          </div>

          {/* Metadata sidebar */}
          <aside className="flex flex-col gap-6 animate-fade-up animation-delay-100 lg:border-l lg:border-paper-border lg:pl-10">
            {[
              { label: "Client", value: project.client },
              { label: "Year", value: project.year?.toString() },
              { label: "Category", value: project.category?.name },
            ].map(({ label, value }) =>
              value ? (
                <div key={label}>
                  <p className="label mb-1">{label}</p>
                  <p className="text-sm text-ink-soft">{value}</p>
                </div>
              ) : null
            )}

            {services.length > 0 && (
              <div>
                <p className="label mb-2">Services</p>
                <ul className="flex flex-col gap-1">
                  {services.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm text-ink-soft">
                      <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 label hover:text-ink transition-colors mt-2"
              >
                View Live <ExternalLink size={12} />
              </a>
            )}
          </aside>
        </div>

        {/* Cover image */}
        {cover && (
          <div className="mb-16 overflow-hidden bg-paper-warm animate-fade-up animation-delay-200">
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
          <div className="max-w-2xl mb-20 reveal">
            <p className="label mb-4">About the Project</p>
            <p className="text-ink-soft leading-relaxed whitespace-pre-line text-lg">
              {project.description}
            </p>
          </div>
        )}

        {/* Gallery with lightbox */}
        {images.length > 0 && (
          <div className="mb-20 reveal">
            <p className="label mb-6">Gallery</p>
            <Gallery images={images} />
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="border-t border-paper-border pt-8 mb-16 flex flex-wrap gap-2 reveal">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-ink-muted border border-paper-border px-3 py-1.5 hover:border-ink hover:text-ink transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Related projects */}
        <RelatedProjects
          currentProjectId={project.id}
          categoryId={project.categoryId}
        />

        {/* Navigation footer */}
        <div className="mt-16 pt-10 border-t border-paper-border flex items-center justify-between">
          <Link href="/work" className="btn-ghost">
            <ArrowLeft size={16} /> All Work
          </Link>
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
        </div>
      </div>
    </article>
  );
}
