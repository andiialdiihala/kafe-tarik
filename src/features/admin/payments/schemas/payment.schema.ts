import { z } from "zod";

export const paymentStatusSchema = z.enum(["Dibayar", "Ditolak", "Menunggu Verifikasi"]);
