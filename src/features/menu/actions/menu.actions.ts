import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

export async function getPublicMenu() {
  unstable_noStore();
  const result = await db
    .select({
      id: products.idProducts,
      name: products.name,
      price: products.price,
      description: products.description,
      category: categories.name,
      idCategory: products.idCategory,
      stock: products.stock,
      image: products.imageUrl,
    })
    .from(products)
    .leftJoin(categories, eq(products.idCategory, categories.idCategories));

  return result.map((m) => {
    const rawImg = m.image;
    const isPlaceholder = !rawImg || rawImg.includes("via.placeholder.com");
    return {
      ...m,
      price: Number(m.price || 0),
      category: m.category || "Lainnya",
      description: m.description || "",
      image: isPlaceholder ? DEFAULT_IMAGE : rawImg!,
    };
  });
}

export async function getPublicCategories() {
  const cats = await db.select().from(categories);
  return cats.map((c) => ({
    id: c.idCategories,
    name: c.name || "Lainnya",
  }));
}

export async function getProductById(id: string) {
  const result = await db
    .select({
      id: products.idProducts,
      name: products.name,
      price: products.price,
      description: products.description,
      category: categories.name,
      idCategory: products.idCategory,
      stock: products.stock,
      image: products.imageUrl,
    })
    .from(products)
    .leftJoin(categories, eq(products.idCategory, categories.idCategories))
    .where(eq(products.idProducts, id))
    .limit(1);

  if (!result || result.length === 0) return null;

  const m = result[0];
  const rawImg = m.image;
  const isPlaceholder = !rawImg || rawImg.includes("via.placeholder.com");

  return {
    ...m,
    price: Number(m.price || 0),
    category: m.category || "Lainnya",
    description: m.description || "",
    image: isPlaceholder ? DEFAULT_IMAGE : rawImg!,
  };
}
