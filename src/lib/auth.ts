import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema";
import { openAPI } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  plugins: [openAPI()],
  emailAndPassword: {
    enabled: true,
  },
  // Konfigurasi email manual (tanpa plugin email yang salah)
  email: {
    send: async ({ to, subject, body }) => {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Kafe Tarik <onboarding@resend.dev>",
        to,
        subject,
        html: body,
      });
    },
  },
  // ... sisa config

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "kasir",
        input: true,
      },
    },
  },
});

