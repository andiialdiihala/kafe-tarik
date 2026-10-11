import { AdminMenuView } from "@/features/admin/menu/components/AdminMenuView";
import { getMenu, getCategories } from "@/features/admin/menu/queries/menu.queries";

export default async function MenuPage() {
  const menuList = await getMenu();
  const categoriesList = await getCategories();
  return <AdminMenuView initialMenu={menuList} initialCategories={categoriesList} />;
}
