"use server";

import { db } from "@/db";
import { products, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price")) || 0;
  const stock = Number(formData.get("stock")) || 0;
  const idCategory = formData.get("idCategory") as string;
  const description = formData.get("description") as string;
  const imageUrl = (formData.get("imageUrl") as string) || DEFAULT_IMAGE;

  await db.insert(products).values({
    idProducts: `PRD-${Date.now()}`,
    name,
    price: price.toString(),
    description: description || null,
    idCategory,
    stock,
    imageUrl,
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price")) || 0;
  const stock = Number(formData.get("stock")) || 0;
  const idCategory = formData.get("idCategory") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  const updateData: Partial<typeof products.$inferInsert> = {
    name,
    price: price.toString(),
    description,
    idCategory,
    stock,
  };

  if (imageUrl) {
    updateData.imageUrl = imageUrl;
  }

  await db.update(products).set(updateData).where(eq(products.idProducts, id));

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteProduct(id: string) {
  try {
    await db.delete(orderItems).where(eq(orderItems.idProducts, id));
    await db.delete(products).where(eq(products.idProducts, id));
    revalidatePath("/admin/menu");
    revalidatePath("/menu");
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Gagal menghapus produk");
  }
}
