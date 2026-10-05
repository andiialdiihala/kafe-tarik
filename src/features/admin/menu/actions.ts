import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getMenu(limit = 100) {
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
    .limit(limit);

  return result.map((m) => {
    const rawImg = m.image;
    const isPlaceholder = !rawImg || rawImg.includes("via.placeholder.com");
    return {
      ...m,
      price: Number(m.price || 0),
      category: m.category || "Lainnya",
      image: isPlaceholder
        ? "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80"
        : rawImg,
    };
  });
}

export async function getCategories() {
  return await db.select().from(categories);
}
