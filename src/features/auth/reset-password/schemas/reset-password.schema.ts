import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password minimal 8 karakter"),
  confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
});

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
