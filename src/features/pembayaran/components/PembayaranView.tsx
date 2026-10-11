"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart.store";
import { checkoutSchema } from "../schemas/payment.schema";
import { saveOrder, updatePaymentProof } from "../actions/order.action";
import { useOrderStatus } from "../hooks/useOrderStatus";
import { CustomerForm } from "./CustomerForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { QrisSection } from "./QrisSection";
import { CashSection } from "./CashSection";
import { OrderSummary } from "./OrderSummary";

export const PembayaranView = () => {
  const { items, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [method, setMethod] = useState<"QRIS" | "CASH">("QRIS");
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const { orderDetail, setOrderDetail, isRefreshing } = useOrderStatus(activeOrderId);

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
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Link
                      href="/cart"
                      className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition text-stone-700"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                      <h1 className="font-display text-2xl font-bold text-stone-900">Pembayaran Pesanan</h1>
                      <p className="text-xs text-stone-500">Lengkapi detail pemesanan & pilih metode pembayaran Anda.</p>
                    </div>
                  </div>

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  <CustomerForm
                    customerName={customerName}
                    setCustomerName={setCustomerName}
                    customerPhone={customerPhone}
                    setCustomerPhone={setCustomerPhone}
                  />

                  <PaymentMethodSelector method={method} setMethod={setMethod} />

                  {method === "QRIS" ? (
                    <QrisSection proofUrl={proofUrl} setProofUrl={setProofUrl} />
                  ) : (
                    <CashSection />
                  )}
                </div>
              </div>

              <OrderSummary
                items={items}
                subtotal={subtotal}
                total={total}
                formatRupiah={formatRupiah}
                isSubmitting={isSubmitting}
                handleConfirm={handleConfirm}
              />
            </motion.div>
          ) : (
            <div className="text-center py-20 text-stone-600">
              <h2 className="text-xl font-bold mb-2">Pesanan Berhasil Dibuat!</h2>
              <p className="text-sm">ID Pesanan: {activeOrderId}</p>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
};
