"use client";

import { useState } from "react";
import { Search, Clock, CookingPot, CheckCircle2, ClipboardList, Trash2, AlertTriangle, X } from "lucide-react";
import { updateOrderStatus, deleteOrder } from "../actions";
import { toast } from "sonner";

const tabs = ["Semua", "Menunggu Verifikasi", "Diproses", "Selesai", "Dibatalkan"] as const;

const statusStyles: Record<string, string> = {
  "Menunggu Verifikasi": "bg-amber-50 text-amber-600 border-amber-200",
  "Menunggu Pembayaran": "bg-amber-50 text-amber-600 border-amber-200",
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  Diproses: "bg-blue-50 text-blue-600 border-blue-200",
  Dibayar: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Selesai: "bg-emerald-50 text-emerald-600 border-emerald-200",
  "Siap Diambil": "bg-sky-50 text-sky-600 border-sky-200",
  Dibatalkan: "bg-rose-50 text-rose-600 border-rose-200",
  Ditolak: "bg-rose-50 text-rose-600 border-rose-200",
};

export const OrdersView = ({ initialOrders = [] }: { initialOrders?: any[] }) => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Semua");
  const [query, setQuery] = useState("");
  const [list, setList] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

  const handleStatus = async (id: string, next: string) => {
    setLoadingId(id);
    setList((prev) => prev.map((o) => (o.id === id ? { ...o, status: next } : o)));
    try {
      await updateOrderStatus(id, next);
      toast.success(`Pesanan ${id} → ${next}`);
    } catch {
      toast.error("Gagal update status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (idOrder: string) => {
    setDeletingId(idOrder);
    try {
      const res = await deleteOrder(idOrder);
      if (res.success) {
        setList((prev) => prev.filter((o) => o.id !== idOrder));
        toast.success(`Pesanan ${idOrder} berhasil dihapus`);
      } else {
        toast.error(res.error || "Gagal menghapus pesanan");
      }
    } catch (e: any) {
      toast.error("Terjadi kesalahan saat menghapus");
    } finally {
      setDeletingId(null);
      setOrderToDelete(null);
    }
  };

  const ordersData = list.map((o) => ({
    raw: o,
    id: o.id || "#TK-0000",
    date: o.date ? new Date(o.date).toLocaleString("id-ID") : "-",
    customer: o.customer || "Pelanggan",
    menu: "—",
    total: `Rp ${Number(o.total || 0).toLocaleString("id-ID")}`,
    status: (o.status || "Pending") as string,
  }));

  const stats = [
    { label: "Total Pesanan", value: ordersData.length.toString(), icon: ClipboardList, bg: "bg-[#eaf3ee]", color: "text-[#1e5138]" },
    { label: "Pending", value: ordersData.filter((o) => ["Pending", "Menunggu Verifikasi", "Menunggu Pembayaran"].includes(o.status)).length.toString(), icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
    { label: "Diproses", value: ordersData.filter((o) => o.status === "Diproses").length.toString(), icon: CookingPot, bg: "bg-blue-50", color: "text-blue-600" },
    { label: "Selesai", value: ordersData.filter((o) => ["Selesai", "Dibayar"].includes(o.status)).length.toString(), icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
  ];

  const filtered = ordersData.filter((o) => {
    const matchTab = activeTab === "Semua" || o.status === activeTab;
    const q = query.toLowerCase();
    const matchQuery = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    return matchTab && matchQuery;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-brand-dark">Pesanan</h1>
        <p className="text-xs text-stone-500 mt-1">Kelola, perbarui status, atau hapus pesanan pelanggan.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-stone-200/70 shadow-xs flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-stone-500">{s.label}</p>
              <p className="text-xl font-extrabold text-stone-900 leading-none mt-1">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition ${activeTab === t ? "bg-[#143125] text-white border-[#143125]" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari ID, pelanggan..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#143125]/10 focus:border-[#143125]/20 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
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
                  <td colSpan={6} className="py-12 text-center text-stone-400 text-xs">
                    Tidak ada pesanan untuk filter ini.
                  </td>
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
        </div>
      </div>

      {/* CONFIRM DELETE MODAL */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button
                onClick={() => setOrderToDelete(null)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-stone-900">Hapus Pesanan?</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Apakah Anda yakin ingin menghapus pesanan <strong className="font-mono text-stone-800">{orderToDelete}</strong>? Tindakan ini akan menghapus riwayat pembayaran & item terkait secara permanen.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={deletingId === orderToDelete}
                onClick={() => handleDelete(orderToDelete)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition disabled:opacity-50 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {deletingId === orderToDelete ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
