"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { useCartStore } from "@/features/cart/store/cart.store";
import { checkoutSchema } from "../schemas/payment.schema";
import { saveOrder } from "../actions/order.action";
import { useOrderStatus } from "../hooks/useOrderStatus";
import { CheckoutForm } from "./CheckoutForm";
import { OrderSuccessView } from "./OrderSuccessView";

export const PembayaranView = () => {
  const { items, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [method, setMethod] = useState<"QRIS" | "CASH">("QRIS");
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const { orderDetail } = useOrderStatus(activeOrderId);

  const subtotal = items.reduce((acc: number, { item, quantity }: any) => acc + item.price * quantity, 0);
  const total = subtotal;

  const handleConfirm = async () => {
    const validation = checkoutSchema.safeParse({ customerName, customerPhone });
    if (!validation.success) {
      const firstIssue = validation.error.issues[0];
      setErrorMessage(firstIssue.message);
      return;
    }

    if (items.length === 0) {
      setErrorMessage("Keranjang Anda kosong!");
      return;
    }

    if (method === "QRIS" && !proofUrl) {
      setErrorMessage("Harap sertakan bukti transfer untuk pembayaran QRIS!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await saveOrder({
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        items: items.map((i) => ({
          productId: i.item.id,
          quantity: i.quantity,
          price: i.item.price,
          subtotal: i.item.price * i.quantity,
        })),
        totalAmount: total,
        paymentMethod: method,
        proofUrl: proofUrl || undefined,
      });

      if (result.success && result.orderId) {
        setActiveOrderId(result.orderId);
        clearCart();
      } else {
        setErrorMessage(result.error || "Gagal membuat pesanan.");
      }
    } catch (e: any) {
      setErrorMessage(e.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRupiah = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;

  return (
    <main className="min-h-screen bg-[#faf8f5] py-10 px-4">
      <Container>
        <AnimatePresence mode="wait">
          {!activeOrderId ? (
            <CheckoutForm
              errorMessage={errorMessage}
              customerName={customerName}
              setCustomerName={setCustomerName}
              customerPhone={customerPhone}
              setCustomerPhone={setCustomerPhone}
              method={method}
              setMethod={setMethod}
              proofUrl={proofUrl}
              setProofUrl={setProofUrl}
              items={items}
              subtotal={subtotal}
              total={total}
              formatRupiah={formatRupiah}
              isSubmitting={isSubmitting}
              handleConfirm={handleConfirm}
            />
          ) : (
            <OrderSuccessView
              activeOrderId={activeOrderId}
              orderDetail={orderDetail}
              formatRupiah={formatRupiah}
            />
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
};
