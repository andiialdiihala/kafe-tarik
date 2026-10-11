import { z } from "zod";

export const productDetailParamsSchema = z.object({
  id: z.string().min(1, "ID produk wajib diisi"),
});

export type ProductDetailParamsInput = z.infer<typeof productDetailParamsSchema>;
