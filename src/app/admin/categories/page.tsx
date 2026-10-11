import { CategoriesView } from "@/features/admin/categories/components/CategoriesView";
import { getCategoriesWithCount } from "@/features/admin/categories/queries/category.queries";

export default async function CategoriesPage() {
  const data = await getCategoriesWithCount();
  return <CategoriesView initialCategories={data} />;
}
