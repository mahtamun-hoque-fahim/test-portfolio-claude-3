"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project, Category } from "@/db/schema";

type ProjectWithCategory = Project & { category: Category | null };

interface WorkGridProps {
  projects: ProjectWithCategory[];
  categories: Category[];
}

export function WorkGrid({ projects, categories }: WorkGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? projects.filter((p) => p.category?.slug === activeCategory)
    : projects;

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-12 border-b border-paper-border pb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200",
            activeCategory === null
              ? "bg-ink text-paper"
              : "text-ink-muted hover:text-ink border border-paper-border hover:border-ink"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() =>
              setActiveCategory(activeCategory === cat.slug ? null : cat.slug)
            }
            className={cn(
              "px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-200",
              activeCategory === cat.slug
                ? "bg-ink text-paper"
                : "text-ink-muted hover:text-ink border border-paper-border hover:border-ink"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="label mb-8">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-ink-muted">No projects in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-border">
          {filtered.map((project, i) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group bg-paper overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-video bg-paper-warm overflow-hidden relative">
                {project.coverImage ? (
                  <Image
                    src={(project.coverImage as { url: string }).url}
                    alt={(project.coverImage as { alt: string }).alt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display text-6xl text-paper-border">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="p-8 flex items-start justify-between gap-4">
                <div>
                  {project.category && (
                    <p className="label mb-2">{project.category.name}</p>
                  )}
                  <h2 className="font-display text-3xl text-ink">{project.title}</h2>
                  {project.tagline && (
                    <p className="text-sm text-ink-muted mt-2">{project.tagline}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {(project.tags as string[]).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-ink-faint border border-paper-border px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="shrink-0 mt-2 text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
