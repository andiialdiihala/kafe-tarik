import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { count, eq, sql } from "drizzle-orm";

const DEFAULT_ICON = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80";

export async function getCategoriesWithCount() {
  const data = await db
    .select({
      id: categories.idCategories,
      name: categories.name,
      icon: categories.icon,
      count: sql<number>`count(${products.idProducts})`,
    })
    .from(categories)
    .leftJoin(products, eq(categories.idCategories, products.idCategory))
    .groupBy(categories.idCategories, categories.name, categories.icon);

  return data.map((c) => {
    const rawIcon = c.icon;
    const isPlaceholder = !rawIcon || rawIcon.includes("via.placeholder.com") || rawIcon === "Coffee";
    return {
      ...c,
      icon: isPlaceholder ? DEFAULT_ICON : rawIcon,
    };
  });
}
