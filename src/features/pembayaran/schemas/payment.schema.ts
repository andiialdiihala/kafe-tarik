import { z } from "zod";

export const paymentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  amount: z.number().or(z.string().transform(Number)),
  method: z.enum(["CASH", "QRIS"]),
  status: z.enum(["PENDING", "SUCCESS", "FAILED"]),
  createdAt: z.date().optional(),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(1, "Nama wajib diisi!"),
  customerPhone: z.string().optional(),
});
