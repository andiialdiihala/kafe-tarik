import { useState, useEffect } from "react";
import { getOrderStatus } from "../actions/order.action";

export const useOrderStatus = (activeOrderId: string | undefined | null) => {
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!activeOrderId) return;
    const orderId: string = activeOrderId;
    let isMounted = true;
    let interval: NodeJS.Timeout;

    const fetchStatus = async () => {
      setIsRefreshing(true);
      const res = await getOrderStatus(orderId);
      if (isMounted && res.success && res.order) {
        setOrderDetail(res.order);
        const status = (res.order.paymentStatus || res.order.status || "").toString();
        if (["Berhasil", "VERIFIED", "Ditolak", "Gagal", "Siap Diambil"].includes(status)) {
          clearInterval(interval);
        }
      }
      if (isMounted) setIsRefreshing(false);
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeOrderId]);

  return { orderDetail, setOrderDetail, isRefreshing };
};
