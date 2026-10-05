"use server";

import { db } from "@/db";
import { orders, customers, orderItems, payments } from "@/db/schema";
import { desc, eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getOrders() {
  const data = await db
    .select({
      id: orders.idOrder,
      date: orders.createdAt,
      customer: customers.name,
      total: orders.totalAmount,
      status: orders.status,
    })
    .from(orders)
    .leftJoin(customers, eq(orders.idCustomer, customers.idCustomers))
    .orderBy(desc(orders.createdAt));

  return data;
}

export async function updateOrderStatus(idOrder: string, status: string) {
  await db
    .update(orders)
    .set({ status: status.slice(0, 20) })
    .where(eq(orders.idOrder, idOrder));

  revalidatePath("/admin/orders");
  revalidatePath("/admin/payments");
  return { success: true };
}

export async function deleteOrder(idOrder: string) {
  try {
    // Delete payments and orderItems related to this order first
    await db.delete(payments).where(eq(payments.idOrder, idOrder));
    await db.delete(orderItems).where(eq(orderItems.idOrder, idOrder));
    await db.delete(orders).where(eq(orders.idOrder, idOrder));

    revalidatePath("/admin/orders");
    revalidatePath("/admin/payments");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting order:", error);
    return { success: false, error: error?.message || "Gagal menghapus pesanan" };
  }
}

export async function getOrderStats() {
  const [total] = await db.select({ count: count() }).from(orders);
  return { total: total.count };
}
