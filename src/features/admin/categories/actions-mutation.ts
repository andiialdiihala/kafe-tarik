"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const DEFAULT_ICON = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80";

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
    const filename = `cat-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filePath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filePath, buffer);
    return `/api/uploads/${filename}`;
  } catch (error) {
    console.error("Error saving uploaded category icon:", error);
    return null;
  }
}

function getVal(fd: any, key: string) {
  if (fd && typeof fd.get === "function") return fd.get(key);
  return fd?.[key];
}

export async function addCategory(formData: FormData) {
  const name = getVal(formData, "name") as string;
  const iconUrlInput = (getVal(formData, "iconUrl") as string)?.trim();
  const iconFile = getVal(formData, "iconFile") as File | null;

  let iconUrl = iconUrlInput || DEFAULT_ICON;

  const savedFilePath = await saveUploadedFile(iconFile);
  if (savedFilePath) {
    iconUrl = savedFilePath;
  }

  await db.insert(categories).values({
    idCategories: `CAT-${Date.now()}`,
    name,
    icon: iconUrl,
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function updateCategory(id: string, formData: FormData) {
  const name = getVal(formData, "name") as string;
  const iconUrlInput = (getVal(formData, "iconUrl") as string)?.trim();
  const iconFile = getVal(formData, "iconFile") as File | null;

  const updateData: Record<string, any> = { name };

  const savedFilePath = await saveUploadedFile(iconFile);
  if (savedFilePath) {
    updateData.icon = savedFilePath;
  } else if (iconUrlInput) {
    updateData.icon = iconUrlInput;
  }

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
