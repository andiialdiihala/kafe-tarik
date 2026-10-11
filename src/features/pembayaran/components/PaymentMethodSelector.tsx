import { QrCode, Wallet } from "lucide-react";

export const PaymentMethodSelector = ({ method, setMethod }: any) => (
  <div className="space-y-4 mb-6">
    <h2 className="text-sm font-bold text-stone-800">Pilih Metode Pembayaran</h2>
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => setMethod("QRIS")}
        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
          method === "QRIS"
            ? "border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-xs"
            : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
        }`}
      >
        <QrCode className="w-7 h-7 text-emerald-700" />
        <span className="font-bold text-xs">QRIS (Scan & Upload)</span>
      </button>

      <button
        type="button"
        onClick={() => setMethod("CASH")}
        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
          method === "CASH"
            ? "border-amber-600 bg-amber-50/70 text-amber-900 shadow-xs"
            : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
        }`}
      >
        <Wallet className="w-7 h-7 text-amber-700" />
        <span className="font-bold text-xs">CASH (Bayar di Kasir)</span>
      </button>
    </div>
  </div>
);
