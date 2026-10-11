import { OrdersView } from "@/features/admin/orders/components/OrdersView";
import { getOrders } from "@/features/admin/orders/queries/order.queries";

export default async function OrdersPage() {
  const ordersList = await getOrders();
  return <OrdersView initialOrders={ordersList} />;
}
