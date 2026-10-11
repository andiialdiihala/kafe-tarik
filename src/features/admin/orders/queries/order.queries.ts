"use server";

import { db } from "@/db";
import { orders, customers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getOrders() {
  try {
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
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
