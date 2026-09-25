import { notFound } from "next/navigation";
import { menuList } from "@/features/menu/data/menu.data";
import { ProductDetailView } from "@/features/menu-detail/components/ProductDetailView";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = menuList.find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}
