import "server-only";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { Category } from "../types/category.types";

const DEFAULT_ICON = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80";

export async function getCategoriesWithCount(): Promise<Category[]> {
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

  return data.map((c) => ({
    id: c.id,
    name: c.name || "",
    count: Number(c.count),
    icon: !c.icon || c.icon === "Coffee" ? DEFAULT_ICON : c.icon,
  }));
}
