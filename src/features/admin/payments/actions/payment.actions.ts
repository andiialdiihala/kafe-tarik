"use server";

import { db } from "@/db";
import { orders, orderItems, payments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updatePaymentStatus(
  idPay: string,
  idOrder: string,
  newStatus: "Dibayar" | "Ditolak" | "Menunggu Verifikasi",
  adminName: string = "Admin Kasir"
): Promise<{ success: boolean; error?: string }> {
  try {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const nowTimeStr = `${hours}:${minutes}:${seconds}`;

    await db
      .update(payments)
      .set({
        status: newStatus,
        verifiedBy: adminName.slice(0, 100),
        verifiedAt: nowTimeStr,
      })
      .where(eq(payments.idPay, idPay));

    if (idOrder && idOrder !== "-") {
      await db
        .update(orders)
        .set({ status: newStatus.slice(0, 20) })
        .where(eq(orders.idOrder, idOrder));
    }

    revalidatePath("/admin/payments");
    revalidatePath("/admin/orders");
    revalidatePath("/pembayaran");

    return { success: true };
  } catch (error) {
    console.error("Error updating payment status:", error);
    return { success: false, error: error instanceof Error ? error.message : "Gagal memperbarui status pembayaran" };
  }
}

export async function deletePayment(idPay: string, idOrder: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (idOrder && idOrder !== "-") {
      await db.delete(payments).where(eq(payments.idPay, idPay));
      await db.delete(orderItems).where(eq(orderItems.idOrder, idOrder));
      await db.delete(orders).where(eq(orders.idOrder, idOrder));
    } else {
      await db.delete(payments).where(eq(payments.idPay, idPay));
    }

    revalidatePath("/admin/payments");
    revalidatePath("/admin/orders");
    revalidatePath("/pembayaran");

    return { success: true };
  } catch (error) {
    console.error("Error deleting payment:", error);
    return { success: false, error: error instanceof Error ? error.message : "Gagal menghapus pembayaran" };
  }
}
