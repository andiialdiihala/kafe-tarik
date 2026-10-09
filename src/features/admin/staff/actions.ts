"use server";
import { db } from "@/db";
import { invitations, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { randomUUID } from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getStaff() {
  return await db.select({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }).from(user);
}

export async function updateStaffRole(id: string, role: "kasir" | "admin") {
  await db.update(user).set({ role }).where(eq(user.id, id));
  return { success: true };
}

export async function updateStaff(id: string, data: { name: string; role: "kasir" | "admin" }) {
  await db.update(user).set({ name: data.name, role: data.role }).where(eq(user.id, id));
  return { success: true };
}

export async function deleteStaff(id: string) {
  await db.delete(user).where(eq(user.id, id));
  return { success: true };
}

export async function inviteStaff(email: string, role: "kasir" | "admin" = "kasir") {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
  
  const existing = await db.select().from(user).where(eq(user.email, email));
  if (existing.length > 0) throw new Error("Email sudah terdaftar");

  const token = randomUUID();
  await db.insert(invitations).values({
    id: randomUUID(),
    email,
    token,
    role,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000";
  const { data, error } = await resend.emails.send({
    from: "Kafe Tarik <onboarding@resend.dev>",
    to: email,
    subject: "Undangan Staf Kafe Tarik",
    html: `<div style="font-family:sans-serif;padding:20px"><h2>Undangan Staf Kafe Tarik</h2><p>Anda diundang sebagai <b>${role}</b>.</p><a href="${baseUrl}/auth/accept?token=${token}" style="display:inline-block;padding:10px 20px;background:#143125;color:#fff;border-radius:8px;text-decoration:none">Terima Undangan</a><p style="font-size:12px;color:#888;margin-top:16px">Link kadaluarsa 24 jam. Token: ${token}</p></div>`,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(`Gagal kirim email: ${error.message || JSON.stringify(error)}`);
  }

  console.log("Resend sent:", data?.id);
  return { success: true, id: data?.id };
}
