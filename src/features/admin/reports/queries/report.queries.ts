import { db } from "@/db";
import { orders, orderItems, payments } from "@/db/schema";
import { sql, count, countDistinct, sum, eq } from "drizzle-orm";
import { ReportsData } from "../types/report.types";

function calcChange(today: number, yesterday: number) {
  if (yesterday === 0) return today > 0 ? 100 : 0;
  return ((today - yesterday) / yesterday) * 100;
}

export async function getReportsData(): Promise<ReportsData> {
  const [totalRevenueRow] = await db.select({ total: sum(orders.totalAmount) }).from(orders);
  const [totalOrdersRow] = await db.select({ count: count() }).from(orders);
  const [totalSoldRow] = await db.select({ total: sum(orderItems.quantity) }).from(orderItems);
  const [totalCustomersRow] = await db.select({ count: countDistinct(orders.idCustomer) }).from(orders);

  const [todayRevenueRow] = await db.select({ total: sum(orders.totalAmount) }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE`);
  const [yesterdayRevenueRow] = await db.select({ total: sum(orders.totalAmount) }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE - 1`);
  const [todayOrdersRow] = await db.select({ count: count() }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE`);
  const [yesterdayOrdersRow] = await db.select({ count: count() }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE - 1`);
  const [todaySoldRow] = await db.select({ total: sum(orderItems.quantity) }).from(orderItems).where(sql`DATE(${orderItems.createdAt}) = CURRENT_DATE`);
  const [yesterdaySoldRow] = await db.select({ total: sum(orderItems.quantity) }).from(orderItems).where(sql`DATE(${orderItems.createdAt}) = CURRENT_DATE - 1`);
  const [todayCustomersRow] = await db.select({ count: countDistinct(orders.idCustomer) }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE`);
  const [yesterdayCustomersRow] = await db.select({ count: countDistinct(orders.idCustomer) }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE - 1`);

  const dailyRevenue = await db.select({
      day: sql<string>`TO_CHAR(${orders.createdAt}, 'TMDay')`,
      total: sum(orders.totalAmount)
  }).from(orders).where(sql`${orders.createdAt} >= NOW() - INTERVAL '7 days'`)
  .groupBy(sql`TO_CHAR(${orders.createdAt}, 'TMDay')`)
  .orderBy(sql`TO_CHAR(${orders.createdAt}, 'TMDay')`);

  const paymentData = await db.select({
      method: payments.method,
      amount: sum(orders.totalAmount).as("total")
  }).from(payments)
  .leftJoin(orders, eq(payments.idOrder, orders.idOrder))
  .groupBy(payments.method);

  const totalPayment = paymentData.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  return {
    revenue: {
        total: Number(totalRevenueRow?.total ?? 0),
        change: calcChange(Number(todayRevenueRow?.total ?? 0), Number(yesterdayRevenueRow?.total ?? 0))
    },
    orders: {
        total: totalOrdersRow?.count ?? 0,
        change: calcChange(Number(todayOrdersRow?.count ?? 0), Number(yesterdayOrdersRow?.count ?? 0))
    },
    sold: {
        total: Number(totalSoldRow?.total ?? 0),
        change: calcChange(Number(todaySoldRow?.total ?? 0), Number(yesterdaySoldRow?.total ?? 0))
    },
    customers: {
        total: totalCustomersRow?.count ?? 0,
        change: calcChange(Number(todayCustomersRow?.count ?? 0), Number(yesterdayCustomersRow?.count ?? 0))
    },
    dailyRevenue: dailyRevenue.map(d => ({
        name: d.day,
        total: Number(d.total || 0)
    })),
    paymentMethods: paymentData.map(p => ({
        method: p.method,
        total: Number(p.amount || 0),
        percentage: totalPayment > 0 ? (Number(p.amount || 0) / totalPayment) * 100 : 0
    }))
  };
}
