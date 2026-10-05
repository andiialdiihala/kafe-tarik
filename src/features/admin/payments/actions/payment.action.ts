"use server";

import { db } from "@/db";
import { orders, orderItems, payments, customers, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface AdminPaymentItem {
  idPay: string;
  idOrder: string;
  tableNumber: number | null;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  method: "CASH" | "QRIS" | string;
  status: string;
  proofUrl: string | null;
  verifiedBy: string | null;
  verifiedAt: string | null;
  createdAt: Date | null;
  items: {
    idItems: string;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }[];
}

export async function getAdminPayments() {
  try {
    const rawPayments = await db
      .select({
        idPay: payments.idPay,
        idOrder: payments.idOrder,
        tableNumber: orders.tableNumber,
        customerName: customers.name,
        customerPhone: customers.phone,
        totalAmount: orders.totalAmount,
        method: payments.method,
        status: payments.status,
        proofUrl: payments.proofUrl,
        verifiedBy: payments.verifiedBy,
        verifiedAt: payments.verifiedAt,
        createdAt: payments.createdAt,
      })
      .from(payments)
      .leftJoin(orders, eq(payments.idOrder, orders.idOrder))
      .leftJoin(customers, eq(orders.idCustomer, customers.idCustomers))
      .orderBy(desc(payments.createdAt));

    // Fetch order items for each payment
    const result: AdminPaymentItem[] = [];

    for (const p of rawPayments) {
      let items: AdminPaymentItem["items"] = [];
      if (p.idOrder) {
        const rawItems = await db
          .select({
            idItems: orderItems.idItems,
            quantity: orderItems.quantity,
            price: orderItems.price,
            subtotal: orderItems.subtotal,
            productName: products.name,
          })
          .from(orderItems)
          .leftJoin(products, eq(orderItems.idProducts, products.idProducts))
          .where(eq(orderItems.idOrder, p.idOrder));

        items = rawItems.map((i) => ({
          idItems: i.idItems,
          productName: i.productName || "Item Pesanan",
          quantity: i.quantity || 1,
          price: Number(i.price || 0),
          subtotal: Number(i.subtotal || 0),
        }));
      }

      result.push({
        idPay: p.idPay,
        idOrder: p.idOrder || "-",
        tableNumber: p.tableNumber,
        customerName: p.customerName || "Pelanggan",
        customerPhone: p.customerPhone || "-",
        totalAmount: Number(p.totalAmount || 0),
        method: p.method || "QRIS",
        status: p.status || "Menunggu Verifikasi",
        proofUrl: p.proofUrl,
        verifiedBy: p.verifiedBy,
        verifiedAt: p.verifiedAt,
        createdAt: p.createdAt,
        items,
      });
    }

    return { success: true, data: result };
  } catch (error: any) {
    console.error("Error getting admin payments:", error);
    return { success: false, error: error?.message || "Gagal mengambil data pembayaran" };
  }
}

export async function getAdminPaymentStats() {
  try {
    const allPayments = await db
      .select({
        status: payments.status,
        totalAmount: orders.totalAmount,
      })
      .from(payments)
      .leftJoin(orders, eq(payments.idOrder, orders.idOrder));

    let berhasil = 0;
    let pending = 0;
    let ditolak = 0;
    let totalMasuk = 0;

    for (const p of allPayments) {
      const st = (p.status || "").toLowerCase();
      if (st === "dibayar" || st === "berhasil" || st === "verified") {
        berhasil++;
        totalMasuk += Number(p.totalAmount || 0);
      } else if (st === "menunggu verifikasi" || st === "pending" || st === "menunggu pembayaran") {
        pending++;
      } else if (st === "ditolak" || st === "gagal" || st === "rejected") {
        ditolak++;
      }
    }

    return {
      success: true,
      stats: {
        berhasil: berhasil.toString(),
        pending: pending.toString(),
        ditolak: ditolak.toString(),
        totalMasuk: `Rp ${totalMasuk.toLocaleString("id-ID")}`,
      },
    };
  } catch (error: any) {
    console.error("Error getting payment stats:", error);
    return {
      success: false,
      stats: { berhasil: "0", pending: "0", ditolak: "0", totalMasuk: "Rp 0" },
    };
  }
}

export async function updatePaymentStatus(
  idPay: string,
  idOrder: string,
  newStatus: "Dibayar" | "Ditolak" | "Menunggu Verifikasi",
  adminName: string = "Admin Kasir"
) {
  try {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    // Format TIME HH:MM:SS required by Postgres time column
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
  } catch (error: any) {
    console.error("Error updating payment status:", error);
    return { success: false, error: error?.message || "Gagal memperbarui status pembayaran" };
  }
}
