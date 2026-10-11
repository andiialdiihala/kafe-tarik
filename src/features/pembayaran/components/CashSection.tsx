import { Receipt } from "lucide-react";

export const CashSection = () => (
  <div className="bg-amber-50 border-2 border-amber-300/80 p-6 rounded-2xl text-amber-950 space-y-3 shadow-xs">
    <div className="flex items-center gap-2.5 font-extrabold text-amber-900 text-sm">
      <Receipt className="w-5 h-5 text-amber-600 shrink-0" />
      <span>Pembayaran Tunai di Kasir (Cash)</span>
    </div>
    <p className="text-xs text-amber-900 leading-relaxed">
      Setelah menekan tombol <strong>"Bayar Sekarang"</strong>, Anda akan mendapatkan <strong>Kode Pesanan Singkat</strong>. Tunjukkan Kode Pesanan tersebut ke Kasir untuk melunasi pembayaran.
    </p>
  </div>
);
