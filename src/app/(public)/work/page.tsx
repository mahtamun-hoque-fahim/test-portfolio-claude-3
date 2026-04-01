import type { Metadata } from "next";
import { getAllPublishedProjects } from "@/lib/queries/projects";
import { getAllCategories } from "@/lib/queries/categories";
import { WorkGrid } from "@/components/portfolio/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects spanning brand identity, social media, UI/UX, and print design.",
};

export default async function WorkPage() {
  const [allProjects, categories] = await Promise.all([
    getAllPublishedProjects(),
    getAllCategories(),
  ]);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <p className="label mb-4">Portfolio</p>
          <h1 className="font-display font-light">Selected Work</h1>
          <p className="text-ink-muted mt-4 max-w-lg leading-relaxed">
            A curated collection of projects across brand identity, digital design, and visual storytelling.
          </p>
        </div>

        {/* Client component handles filtering */}
        <WorkGrid projects={allProjects} categories={categories} />
      </div>
    </div>
  );
}
