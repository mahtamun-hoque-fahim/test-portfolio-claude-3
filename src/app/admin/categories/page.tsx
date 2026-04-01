import { getAllCategories } from "@/lib/queries/categories";
import { CategoriesClient } from "@/components/admin/CategoriesClient";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <p className="label mb-2">Manage</p>
        <h1 className="font-display text-4xl text-ink font-light">Categories</h1>
        <p className="text-sm text-ink-muted mt-1">
          {categories.length} categories · used to filter projects
        </p>
      </div>

      <CategoriesClient categories={categories} />
    </div>
  );
}
