"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const DEFAULT_ICON = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80";

export async function addCategory(data: { name: string; icon: string }) {
  await db.insert(categories).values({
    idCategories: `CAT-${Date.now()}`,
    name: data.name,
    icon: data.icon || DEFAULT_ICON,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateCategory(id: string, data: { name: string; icon?: string }) {
  const updateData: Partial<typeof categories.$inferInsert> = { name: data.name };
  if (data.icon) updateData.icon = data.icon;

  await db.update(categories).set(updateData).where(eq(categories.idCategories, id));

  revalidatePath("/admin/categories");
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteCategory(id: string) {
  await db.delete(categories).where(eq(categories.idCategories, id));
  revalidatePath("/admin/categories");
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
