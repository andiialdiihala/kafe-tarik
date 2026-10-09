import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
