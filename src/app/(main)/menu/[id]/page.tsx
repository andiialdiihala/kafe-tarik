import { notFound } from "next/navigation";
import { getProductById as getProductDetailById } from "@/features/menu-detail/actions/menu-detail.action";
import { ProductDetailView } from "@/features/menu-detail/components/ProductDetailView";

export const revalidate = 0;

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getProductDetailById(id);

  if (!item) {
    notFound();
  }

  return <ProductDetailView item={item} />;
}
