import { CategoriesView } from "@/features/admin/categories/components/CategoriesView";
import { getCategoriesWithCount } from "@/features/admin/categories/actions";

export default async function CategoriesPage() {
  const data = await getCategoriesWithCount();
  return <CategoriesView initialCategories={data} />;
}
