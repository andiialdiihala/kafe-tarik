import { Trash2 } from "lucide-react";

import { FormattedOrder } from "../types/order.types";

export const OrderTable = ({
  filtered,
  statusStyles,
  loadingId,
  deletingId,
  handleStatus,
  setOrderToDelete,
}: {
  filtered: FormattedOrder[];
  statusStyles: Record<string, string>;
  loadingId: string | null;
  deletingId: string | null;
  handleStatus: (id: string, next: string) => void;
  setOrderToDelete: (id: string) => void;
}) => (
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
        <th className="py-3 px-4 font-semibold">No. Pesanan</th>
        <th className="py-3 px-4 font-semibold">Tanggal</th>
        <th className="py-3 px-4 font-semibold">Pelanggan</th>
        <th className="py-3 px-4 font-semibold">Total</th>
        <th className="py-3 px-4 font-semibold text-center">Status</th>
        <th className="py-3 px-4 font-semibold text-right">Aksi</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-stone-100 text-xs">
      {filtered.length === 0 ? (
        <tr>
          <td colSpan={6} className="py-12 text-center text-stone-400 text-xs">Tidak ada pesanan untuk filter ini.</td>
        </tr>
      ) : (
        filtered.map((o) => (
          <tr key={o.id} className="hover:bg-stone-50/70 transition-colors">
            <td className="py-3.5 px-4 font-mono font-bold text-stone-900">{o.id}</td>
            <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">{o.date}</td>
            <td className="py-3.5 px-4 font-medium text-stone-800">{o.customer}</td>
            <td className="py-3.5 px-4 font-extrabold text-stone-900">{o.total}</td>
            <td className="py-3.5 px-4 text-center">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyles[o.status] ?? "bg-stone-50 text-stone-600 border-stone-200"}`}>
                {o.status}
              </span>
            </td>
            <td className="py-3.5 px-4 text-right">
              <div className="flex items-center justify-end gap-2">
                <select
                  disabled={loadingId === o.id || deletingId === o.id}
                  value={o.status}
                  onChange={(e) => handleStatus(o.id, e.target.value)}
                  className="bg-[#143125] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border-0 focus:ring-2 focus:ring-[#1e5138] disabled:opacity-50"
                >
                  <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                  <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                  <option value="Diproses">Diproses</option>
                  <option value="Siap Diambil">Siap Diambil</option>
                  <option value="Dibayar">Dibayar</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
                <button
                  type="button"
                  title="Hapus Pesanan"
                  disabled={deletingId === o.id}
                  onClick={() => setOrderToDelete(o.id)}
                  className="p-1.5 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition border border-rose-200 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);
