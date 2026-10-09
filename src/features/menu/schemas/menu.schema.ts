import { z } from "zod";

export const menuSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  idCategory: z.string().nullable(),
  stock: z.number().nullable(),
  image: z.string(),
});
