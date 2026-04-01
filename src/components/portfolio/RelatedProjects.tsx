import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq, and, ne } from "drizzle-orm";

interface RelatedProjectsProps {
  currentProjectId: number;
  categoryId: number | null;
}

export async function RelatedProjects({ currentProjectId, categoryId }: RelatedProjectsProps) {
  if (!categoryId) return null;

  const related = await db.query.projects.findMany({
    where: and(
      eq(projects.published, true),
      eq(projects.categoryId, categoryId),
      ne(projects.id, currentProjectId)
    ),
    with: { category: true },
    limit: 3,
    orderBy: (p, { asc }) => [asc(p.sortOrder)],
  });

  if (!related.length) return null;

  return (
    <section className="border-t border-paper-border pt-16 mt-16">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="label mb-2">More Like This</p>
          <h2 className="font-display text-3xl font-light text-ink">Related Projects</h2>
        </div>
        <Link
          href="/work"
          className="hidden md:flex items-center gap-2 label hover:text-ink transition-colors"
        >
          All Work <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-border">
        {related.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="group bg-paper overflow-hidden reveal"
          >
            <div className="aspect-video bg-paper-warm overflow-hidden">
              {project.coverImage ? (
                <Image
                  src={(project.coverImage as { url: string }).url}
                  alt={(project.coverImage as { alt: string }).alt || project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-paper-warm">
                  <span className="font-display text-4xl text-paper-border">
                    {project.title[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="p-5 flex items-start justify-between gap-3">
              <div>
                {project.category && (
                  <p className="label mb-1">{project.category.name}</p>
                )}
                <h3 className="font-display text-xl text-ink group-hover:text-ink-soft transition-colors">
                  {project.title}
                </h3>
              </div>
              <ArrowRight
                size={16}
                className="shrink-0 mt-1 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
