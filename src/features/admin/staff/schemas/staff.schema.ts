import { z } from "zod";

export const inviteStaffSchema = z.object({
  email: z.string().email("Email tidak valid"),
  role: z.enum(["kasir", "admin"]),
});

export const updateStaffSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  role: z.enum(["kasir", "admin"]),
});
