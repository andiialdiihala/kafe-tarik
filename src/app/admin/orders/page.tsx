import { OrdersView } from "@/features/admin/orders/components/OrdersView";
import { getOrders } from "@/features/admin/orders/actions";

export default async function OrdersPage() {
  const ordersList = await getOrders();
  return <OrdersView initialOrders={ordersList} />;
}
