import { MenuSection } from "@/features/menu/components/MenuSection";
import { getPublicMenu, getPublicCategories } from "@/features/menu/actions/menu.actions";

export const revalidate = 0;

export default async function MenuPage() {
  const initialMenu = await getPublicMenu();
  const initialCategories = await getPublicCategories();

  return (
    <main className="min-h-screen bg-brand-cream">
      <MenuSection initialMenu={initialMenu} initialCategories={initialCategories} />
    </main>
  );
}
