"use server";

import { db } from "@/db";
import { user } from "@/db/schema";

export async function getStaff() {
  return await db.select({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }).from(user);
}
