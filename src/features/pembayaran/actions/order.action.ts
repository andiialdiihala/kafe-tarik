"use server";

import { db } from "@/db";
import { orders, orderItems, payments, customers, products } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Custom type for push notification trigger
// We use a simple helper here to simulate a browser notification
// Note: In real production, this would be a real Pusher/Firebase/WebPush implementation
// We'll add a helper that can be called by admin actions to notify
export async function notifyCustomer(orderId: string, message: string) {
  // Logic: In a real app, this would be a websocket event
  // For now, we update a status or add a notification log
  console.log(`[Notification] Order ${orderId}: ${message}`);
  // We'll rely on the existing status field which client polls
}


export async function saveOrder(data: {
  tableNumber?: number;
  customerName?: string;
  customerPhone?: string;
  items: { productId: string; quantity: number; price: number; subtotal: number }[];
  totalAmount: number;
  paymentMethod: "CASH" | "QRIS";
  proofUrl?: string;
}) {
  try {
    const timestamp = Date.now();
    // idOrder max length 20: "ORD-1728059000000" (17 chars)
    const newOrderId = `ORD-${timestamp}`;
    let customerId: string | null = null;

    // Save customer info if provided (idCustomers max length 10: "CST-123456" = 10 chars)
    if (data.customerName || data.customerPhone) {
      customerId = `CST-${timestamp.toString().slice(-6)}`;
      await db.insert(customers).values({
        idCustomers: customerId,
        name: (data.customerName || "Pelanggan").slice(0, 100),
        phone: (data.customerPhone && data.customerPhone.trim() !== "") ? data.customerPhone.slice(0, 12) : null,
      });
    }

    for (const item of data.items) {
      if (!item.productId) continue;
      const [prod] = await db.select({ stock: products.stock, name: products.name }).from(products).where(eq(products.idProducts, item.productId.slice(0, 20))).limit(1);
      if (prod && prod.stock !== null && prod.stock < item.quantity) {
        return { success: false, error: `Stok ${prod.name} tidak cukup (sisa ${prod.stock})` };
      }
    }

    const initialStatus = data.paymentMethod === "CASH" ? "Menunggu Pembayaran" : "Menunggu Verifikasi";

    // Create order
    await db.insert(orders).values({
      idOrder: newOrderId,
      tableNumber: data.tableNumber ? Number(data.tableNumber) : 1,
      idCustomer: customerId,
      idUser: null,
      status: initialStatus,
      totalAmount: data.totalAmount.toString(),
    });

    // Create order items (idItems max length 20: "ITM-12345678-abc4" = 17 chars)
    for (const item of data.items) {
      let validProdId: string | null = null;
      if (item.productId) {
        const prod = await db
          .select({ id: products.idProducts })
          .from(products)
          .where(eq(products.idProducts, item.productId.slice(0, 20)))
          .limit(1);
        if (prod.length > 0) {
          validProdId = prod[0].id;
        }
      }

      const itemId = `ITM-${timestamp.toString().slice(-8)}-${Math.random().toString(36).substring(2, 6)}`;

      await db.insert(orderItems).values({
        idItems: itemId,
        idOrder: newOrderId,
        idProducts: validProdId,
        quantity: item.quantity,
        price: item.price.toString(),
        subtotal: item.subtotal.toString(),
      });

      if (validProdId) {
        await db.update(products).set({ stock: sql`GREATEST(COALESCE(${products.stock}, 0) - ${item.quantity}, 0)` }).where(eq(products.idProducts, validProdId));
      }
    }

    // Create payment record (idPay max length 20: "PAY-1728059000000" = 17 chars)
    const newPayId = `PAY-${timestamp}`;
    await db.insert(payments).values({
      idPay: newPayId,
      idOrder: newOrderId,
      method: data.paymentMethod,
      status: initialStatus,
      proofUrl: data.proofUrl ? data.proofUrl.slice(0, 225) : null,
    });

    revalidatePath("/admin/payments");
    revalidatePath("/admin/orders");

    return { success: true, orderId: newOrderId, paymentId: newPayId };
  } catch (error: any) {
    console.error("Error saving order:", error);
    return { success: false, error: error?.message || "Gagal menyimpan pesanan" };
  }
}

export async function getOrderStatus(orderId: string) {
  try {
    const orderRes = await db
      .select({
        idOrder: orders.idOrder,
        tableNumber: orders.tableNumber,
        totalAmount: orders.totalAmount,
        status: orders.status,
        createdAt: orders.createdAt,
        customerName: customers.name,
        customerPhone: customers.phone,
        idPay: payments.idPay,
        paymentMethod: payments.method,
        paymentStatus: payments.status,
        proofUrl: payments.proofUrl,
        verifiedBy: payments.verifiedBy,
        verifiedAt: payments.verifiedAt,
      })
      .from(orders)
      .leftJoin(customers, eq(orders.idCustomer, customers.idCustomers))
      .leftJoin(payments, eq(orders.idOrder, payments.idOrder))
      .where(eq(orders.idOrder, orderId))
      .limit(1);

    if (orderRes.length === 0) {
      return { success: false, error: "Pesanan tidak ditemukan" };
    }

    const orderData = orderRes[0];

    const items = await db
      .select({
        idItems: orderItems.idItems,
        quantity: orderItems.quantity,
        price: orderItems.price,
        subtotal: orderItems.subtotal,
        productName: products.name,
      })
      .from(orderItems)
      .leftJoin(products, eq(orderItems.idProducts, products.idProducts))
      .where(eq(orderItems.idOrder, orderId));

    return {
      success: true,
      order: {
        ...orderData,
        items,
      },
    };
  } catch (error: any) {
    console.error("Error getting order status:", error);
    return { success: false, error: error?.message || "Gagal mengambil status pesanan" };
  }
}

export async function updatePaymentProof(orderId: string, proofUrl: string) {
  try {
    await db
      .update(payments)
      .set({
        proofUrl: proofUrl.slice(0, 225),
        status: "Menunggu Verifikasi",
      })
      .where(eq(payments.idOrder, orderId));

    await db
      .update(orders)
      .set({ status: "Menunggu Verifikasi" })
      .where(eq(orders.idOrder, orderId));

    revalidatePath("/admin/payments");
    revalidatePath("/pembayaran");

    return { success: true };
  } catch (error: any) {
    console.error("Error updating payment proof:", error);
    return { success: false, error: error?.message || "Gagal memperbarui bukti pembayaran" };
  }
}
