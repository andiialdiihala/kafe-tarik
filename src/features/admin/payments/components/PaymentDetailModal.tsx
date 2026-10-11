import { X, Check, Trash2, ExternalLink } from "lucide-react";
import { AdminPaymentItem } from "../types/payment.types";

const statusStyle: Record<string, string> = {
  Dibayar: "bg-emerald-50 text-emerald-700 border-emerald-200",
  VERIFIED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Berhasil: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Menunggu Verifikasi": "bg-amber-50 text-amber-700 border-amber-200",
  "Menunggu Pembayaran": "bg-amber-50 text-amber-700 border-amber-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Ditolak: "bg-rose-50 text-rose-700 border-rose-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  Gagal: "bg-rose-50 text-rose-700 border-rose-200",
};

export const PaymentDetailModal = ({
  payment,
  onClose,
  onUpdateStatus,
  onDelete,
  updatingId,
  deletingId,
}: {
  payment: AdminPaymentItem | null;
  onClose: () => void;
  onUpdateStatus: (idPay: string, idOrder: string, status: "Dibayar" | "Ditolak" | "Menunggu Verifikasi") => void;
  onDelete: (idPay: string, idOrder: string) => void;
  updatingId: string | null;
  deletingId: string | null;
}) => {
  if (!payment) return null;
  const formatRupiah = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Detail Transaksi</span>
            <h3 className="text-lg font-mono font-extrabold text-stone-900 font-display">{payment.idOrder}</h3>
          </div>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl text-xs border border-stone-200/60">
          <div>
            <span className="text-stone-400 block font-medium">Pelanggan</span>
            <span className="font-bold text-stone-800">{payment.customerName}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Metode Pembayaran</span>
            <span className="font-extrabold text-stone-900">{payment.method}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Nomor Telepon</span>
            <span className="font-semibold text-stone-800">{payment.customerPhone}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Status</span>
            <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] border ${statusStyle[payment.status]}`}>{payment.status}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-stone-800">Rincian Menu Yang Dipesan:</h4>
          <div className="bg-stone-50/50 rounded-2xl p-3 border border-stone-100 space-y-2 max-h-40 overflow-y-auto text-xs">
            {payment.items.length === 0 ? (
              <p className="text-stone-400 italic">Tidak ada rincian item.</p>
            ) : (
              payment.items.map((it, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-stone-100 last:border-0 pb-1.5 last:pb-0">
                  <div>
                    <span className="font-bold text-stone-800">{it.quantity}x </span>
                    <span className="text-stone-700">{it.productName}</span>
                  </div>
                  <span className="font-semibold text-stone-900">{formatRupiah(it.subtotal)}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-stone-100">
            <span>Total Tagihan</span>
            <span className="text-emerald-700 text-base">{formatRupiah(payment.totalAmount)}</span>
          </div>
        </div>

        {payment.proofUrl && (
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-stone-800">Bukti Transfer Pelanggan:</h4>
              <a href={payment.proofUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1">
                Buka Ukuran Penuh <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-900">
              <img src={payment.proofUrl} alt="Bukti Transfer" className="w-full h-full object-contain mx-auto" />
            </div>
          </div>
        )}

        {payment.verifiedBy && (
          <div className="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600 flex justify-between">
            <span>
              Diverifikasi oleh: <strong>{payment.verifiedBy}</strong>
            </span>
            <span>
              Waktu: <strong>{payment.verifiedAt || "-"}</strong>
            </span>
          </div>
        )}

        <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
          <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-100 transition">
            Tutup
          </button>
          <button
            type="button"
            disabled={deletingId === payment.idPay}
            onClick={() => onDelete(payment.idPay, payment.idOrder)}
            className="px-4 py-2.5 rounded-xl bg-rose-100 text-rose-700 text-xs font-bold hover:bg-rose-200 transition flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Hapus
          </button>
          <div className="flex-grow"></div>
          <button
            type="button"
            disabled={updatingId === payment.idPay}
            onClick={() => onUpdateStatus(payment.idPay, payment.idOrder, "Ditolak")}
            className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <X className="w-4 h-4" /> Tolak
          </button>
          <button
            type="button"
            disabled={updatingId === payment.idPay}
            onClick={() => onUpdateStatus(payment.idPay, payment.idOrder, "Dibayar")}
            className="px-5 py-2.5 rounded-xl bg-[#143125] text-white text-xs font-bold hover:bg-emerald-950 transition flex items-center gap-1.5 disabled:opacity-50 shadow-md"
          >
            <Check className="w-4 h-4 text-emerald-400" /> Setujui
          </button>
        </div>
      </div>
    </div>
  );
};
