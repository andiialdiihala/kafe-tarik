import { db } from "@/db";
import { payments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getPaymentByOrderId(orderId: string) {
  return await db.select().from(payments).where(eq(payments.idOrder, orderId));
}
