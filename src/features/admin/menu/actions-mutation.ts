"use server";

import { db } from "@/db";
import { products, orderItems } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

async function saveUploadedFile(file?: File | null): Promise<string | null> {
  if (!file || !(file instanceof File) || file.size === 0 || file.name === "undefined") {
    return null;
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      await fs.promises.mkdir(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name) || ".png";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filePath, buffer);
    return `/api/uploads/${filename}`;
  } catch (error) {
    console.error("Error saving uploaded file:", error);
    return null;
  }
}

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const description = (formData.get("description") as string)?.trim() || null;
  const idCategory = formData.get("idCategory") as string;
  const stock = Number(formData.get("stock"));
  const imageUrlInput = (formData.get("imageUrl") as string)?.trim();
  const imageFile = formData.get("imageFile") as File | null;

  let imageUrl = imageUrlInput || DEFAULT_IMAGE;

  const savedFilePath = await saveUploadedFile(imageFile);
  if (savedFilePath) {
    imageUrl = savedFilePath;
  }

  await db.insert(products).values({
    idProducts: `PRD-${Date.now()}`,
    name,
    price: price.toString() as any,
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
  const price = Number(formData.get("price"));
  const description = formData.get("description") as string;
  const idCategory = formData.get("idCategory") as string;
  const stock = Number(formData.get("stock"));
  const imageUrlInput = (formData.get("imageUrl") as string)?.trim();
  const imageFile = formData.get("imageFile") as File | null;

  const updateData: Record<string, any> = {
    name,
    price: price.toString(),
    description,
    idCategory,
    stock,
  };

  const savedFilePath = await saveUploadedFile(imageFile);
  if (savedFilePath) {
    updateData.imageUrl = savedFilePath;
  } else if (imageUrlInput) {
    updateData.imageUrl = imageUrlInput;
  }

  await db.update(products).set(updateData).where(eq(products.idProducts, id));

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function deleteProduct(id: string) {
  await db.delete(orderItems).where(eq(orderItems.idProducts, id));
  await db.delete(products).where(eq(products.idProducts, id));
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
