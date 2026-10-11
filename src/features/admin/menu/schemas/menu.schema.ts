import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().min(1, "Nama menu wajib diisi"),
  price: z.coerce.number().positive("Harga harus lebih dari 0"),
  description: z.string().optional(),
  idCategory: z.string().min(1, "Kategori wajib dipilih"),
  stock: z.coerce.number().int().nonnegative("Stok tidak boleh negatif"),
});
