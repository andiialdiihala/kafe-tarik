import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori wajib diisi"),
  iconFile: z.any().optional(),
  iconUrl: z.string().url().optional().or(z.literal("")),
});
