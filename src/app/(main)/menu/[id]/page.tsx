import { notFound } from "next/navigation";
import { getProductById } from "@/features/menu/actions";
import { menuList } from "@/features/menu/data/menu.data";
import { ProductDetailView } from "@/features/menu-detail/components/ProductDetailView";

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  let item: any = await getProductById(id);

  if (!item) {
    const staticItem = menuList.find((i) => i.id === id);
    if (staticItem) {
      item = {
        ...staticItem,
        idCategory: null,
        stock: null,
      };
    }
  }

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}
