import { Check, X, Eye, Trash2, RefreshCw, Receipt, ShoppingBag } from "lucide-react";
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

const methodBadge: Record<string, string> = {
  QRIS: "bg-cyan-50 text-cyan-700 border border-cyan-200",
  CASH: "bg-amber-50 text-amber-700 border border-amber-200",
  Cash: "bg-amber-50 text-amber-700 border border-amber-200",
};

export const PaymentTable = ({
  filtered,
  isLoading,
  updatingId,
  deletingId,
  onUpdateStatus,
  onDetail,
  onDelete,
}: {
  filtered: AdminPaymentItem[];
  isLoading: boolean;
  updatingId: string | null;
  deletingId: string | null;
  onUpdateStatus: (idPay: string, idOrder: string, status: "Dibayar" | "Ditolak" | "Menunggu Verifikasi") => void;
  onDetail: (p: AdminPaymentItem) => void;
  onDelete: (idPay: string, idOrder: string) => void;
}) => {
  const formatRupiah = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;

  if (isLoading) {
    return (
      <div className="p-12 text-center text-stone-400 text-xs flex items-center justify-center gap-2">
        <RefreshCw className="w-4 h-4 animate-spin text-brand-dark" />
        <span>Memuat daftar pembayaran...</span>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="p-12 text-center text-stone-400 text-xs">
        <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30 text-stone-400" />
        <p className="font-semibold">Tidak ada transaksi pembayaran ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider bg-stone-50/60 border-b border-stone-100">
            <th className="py-3.5 px-4">Kode Pesanan</th>
            <th className="py-3.5 px-4">Pelanggan</th>
            <th className="py-3.5 px-4">Jumlah Tagihan</th>
            <th className="py-3.5 px-4">Metode</th>
            <th className="py-3.5 px-4">Bukti / Keterangan</th>
            <th className="py-3.5 px-4 text-center">Status</th>
            <th className="py-3.5 px-4 text-right">Aksi Kasir</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 text-xs">
          {filtered.map((p) => {
            const isPending = p.status === "Menunggu Verifikasi" || p.status === "Menunggu Pembayaran" || p.status === "Pending";
            return (
              <tr key={p.idPay} className="hover:bg-stone-50/70 transition-colors">
                <td className="py-3.5 px-4">
                  <span className="font-mono font-bold text-stone-900 block">{p.idOrder}</span>
                  <span className="text-[10px] text-stone-400">{p.idPay}</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-stone-800 block">{p.customerName}</span>
                  <span className="text-[10px] text-stone-400">{p.customerPhone}</span>
                </td>
                <td className="py-3.5 px-4 font-extrabold text-stone-900">{formatRupiah(p.totalAmount)}</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${methodBadge[p.method] || "bg-stone-100"}`}>
                    {p.method}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  {p.method === "CASH" ? (
                    <span className="text-[11px] text-amber-800 font-semibold flex items-center gap-1">
                      <Receipt className="w-3.5 h-3.5 text-amber-600" /> Bayar di Kasir
                    </span>
                  ) : p.proofUrl ? (
                    <button onClick={() => onDetail(p)} className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline">
                      <img src={p.proofUrl} alt="Bukti" className="w-7 h-7 object-cover rounded-md border border-stone-200" />
                      <span>Lihat Bukti</span>
                    </button>
                  ) : (
                    <span className="text-[11px] text-stone-400 italic">Belum Ada Bukti</span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusStyle[p.status] || "bg-stone-100"}`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {isPending && (
                      <>
                        <button
                          title="Terima / Verifikasi Pembayaran"
                          disabled={updatingId === p.idPay}
                          onClick={() => onUpdateStatus(p.idPay, p.idOrder, "Dibayar")}
                          className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                        >
                          <Check className="w-3.5 h-3.5" /> terima
                        </button>
                        <button
                          title="Tolak Pembayaran"
                          disabled={updatingId === p.idPay}
                          onClick={() => onUpdateStatus(p.idPay, p.idOrder, "Ditolak")}
                          className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onDetail(p)}
                      className="bg-[#143125] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-emerald-950 transition flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> Detail
                    </button>
                    <button
                      title="Hapus Pembayaran"
                      disabled={deletingId === p.idPay}
                      onClick={() => onDelete(p.idPay, p.idOrder)}
                      className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition active:scale-95 disabled:opacity-50"
                    >
                      {deletingId === p.idPay ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
