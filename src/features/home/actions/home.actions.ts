"use server";

import { db } from "@/db";
import { products, orderItems } from "@/db/schema";
import { sql, desc } from "drizzle-orm";

export async function getTopSellingProducts() {
  const result = await db
    .select({
      id: products.idProducts,
      name: products.name,
      price: products.price,
      image: products.imageUrl,
      totalSold: sql<number>`SUM(${orderItems.quantity})`,
    })
    .from(products)
    .innerJoin(orderItems, sql`${orderItems.idProducts} = ${products.idProducts}`)
    .groupBy(products.idProducts)
    .orderBy(desc(sql<number>`SUM(${orderItems.quantity})`))
    .limit(4);

  return result.map((p) => ({
    ...p,
    price: Number(p.price || 0),
    totalSold: Number(p.totalSold || 0),
    image: p.image || "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
  }));
}
