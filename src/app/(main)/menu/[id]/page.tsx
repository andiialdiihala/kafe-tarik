import { notFound } from "next/navigation";
import { getProductById } from "@/features/menu/actions/menu.actions";
import { ProductDetailView } from "@/features/menu-detail/components/ProductDetailView";

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item: any = await getProductById(id);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}
