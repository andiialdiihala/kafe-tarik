import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CustomerForm } from "./CustomerForm";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { QrisSection } from "./QrisSection";
import { CashSection } from "./CashSection";
import { OrderSummary } from "./OrderSummary";

export const CheckoutForm = ({
  errorMessage,
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  method,
  setMethod,
  proofUrl,
  setProofUrl,
  items,
  subtotal,
  total,
  formatRupiah,
  isSubmitting,
  handleConfirm,
}: any) => (
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
);
