import { db } from "@/db";
import { orders, orderItems, customers, products } from "@/db/schema";
import { sql, count, sum, desc, eq } from "drizzle-orm";

function calcChange(today: number, yesterday: number) {
  if (yesterday === 0) return today > 0 ? 100 : 0;
  return ((today - yesterday) / yesterday) * 100;
}

export async function getDashboardStats() {
  const [totalOrders] = await db.select({ count: count() }).from(orders);
  const [totalRevenue] = await db.select({ total: sum(orders.totalAmount) }).from(orders);
  const [newCustomers] = await db.select({ count: count() }).from(customers).where(sql`created_at > NOW() - INTERVAL '30 days'`);
  const [totalSold] = await db.select({ total: sum(orderItems.quantity) }).from(orderItems);

  const [todayRevenueRow] = await db.select({ total: sum(orders.totalAmount) }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE`);
  const [yesterdayRevenueRow] = await db.select({ total: sum(orders.totalAmount) }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE - INTERVAL '1 day'`);
  const [todayOrdersRow] = await db.select({ count: count() }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE`);
  const [yesterdayOrdersRow] = await db.select({ count: count() }).from(orders).where(sql`DATE(${orders.createdAt}) = CURRENT_DATE - INTERVAL '1 day'`);
  const [todaySoldRow] = await db.select({ total: sum(orderItems.quantity) }).from(orderItems).where(sql`DATE(${orderItems.createdAt}) = CURRENT_DATE`);
  const [yesterdaySoldRow] = await db.select({ total: sum(orderItems.quantity) }).from(orderItems).where(sql`DATE(${orderItems.createdAt}) = CURRENT_DATE - INTERVAL '1 day'`);
  const [todayCustomersRow] = await db.select({ count: count() }).from(customers).where(sql`DATE(${customers.createdAt}) = CURRENT_DATE`);
  const [yesterdayCustomersRow] = await db.select({ count: count() }).from(customers).where(sql`DATE(${customers.createdAt}) = CURRENT_DATE - INTERVAL '1 day'`);

  const todayRevenue = Number(todayRevenueRow?.total ?? 0);
  const yesterdayRevenue = Number(yesterdayRevenueRow?.total ?? 0);
  const todayOrders = todayOrdersRow?.count ?? 0;
  const yesterdayOrders = yesterdayOrdersRow?.count ?? 0;
  const todaySold = Number(todaySoldRow?.total ?? 0);
  const yesterdaySold = Number(yesterdaySoldRow?.total ?? 0);
  const todayCustomers = todayCustomersRow?.count ?? 0;
  const yesterdayCustomers = yesterdayCustomersRow?.count ?? 0;

  const [topProducts] = await db
    .select({
      name: products.name,
      price: products.price,
      sold: sum(orderItems.quantity).mapWith(Number),
      image: products.imageUrl,
    })
    .from(orderItems)
    .leftJoin(products, eq(orderItems.idProducts, products.idProducts))
    .groupBy(products.idProducts, products.name, products.price, products.imageUrl)
    .orderBy(desc(sum(orderItems.quantity)))
    .limit(4);

  const dailyRevenue = await db.select({
      day: sql<string>`TO_CHAR(${orders.createdAt}, 'TMDay')`,
      total: sum(orders.totalAmount)
  }).from(orders).where(sql`${orders.createdAt} >= NOW() - INTERVAL '7 days'`)
  .groupBy(sql`TO_CHAR(${orders.createdAt}, 'TMDay')`)
  .orderBy(sql`TO_CHAR(${orders.createdAt}, 'TMDay')`);

  return {
    revenue: totalRevenue.total || 0,
    revenueChange: calcChange(todayRevenue, yesterdayRevenue),
    orders: totalOrders.count || 0,
    ordersChange: calcChange(todayOrders, yesterdayOrders),
    customers: newCustomers.count || 0,
    customersChange: calcChange(todayCustomers, yesterdayCustomers),
    sold: totalSold.total || 0,
    soldChange: calcChange(todaySold, yesterdaySold),
    dailyRevenue: dailyRevenue.map(d => ({
        name: d.day,
        total: Number(d.total || 0)
    })),
    topProducts: topProducts ? [topProducts] : [],
  };
}
