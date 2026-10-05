"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Wallet,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  Eye,
  Check,
  X,
  ExternalLink,
  ShoppingBag,
  Receipt,
} from "lucide-react";
import {
  getAdminPayments,
  getAdminPaymentStats,
  updatePaymentStatus,
  AdminPaymentItem,
} from "../actions/payment.action";

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

export const PaymentsView = () => {
  const [payments, setPayments] = useState<AdminPaymentItem[]>([]);
  const [stats, setStats] = useState({
    berhasil: "0",
    pending: "0",
    ditolak: "0",
    totalMasuk: "Rp 0",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [selectedPayment, setSelectedPayment] = useState<AdminPaymentItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [paymentsRes, statsRes] = await Promise.all([
        getAdminPayments(),
        getAdminPaymentStats(),
      ]);

      if (paymentsRes.success && paymentsRes.data) {
        setPayments(paymentsRes.data);
      }
      if (statsRes.success && statsRes.stats) {
        setStats(statsRes.stats);
      }
    } catch (err) {
      console.error("Error fetching admin payments data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (
    idPay: string,
    idOrder: string,
    newStatus: "Dibayar" | "Ditolak" | "Menunggu Verifikasi"
  ) => {
    setUpdatingId(idPay);
    try {
      const res = await updatePaymentStatus(idPay, idOrder, newStatus, "Admin Kasir");
      if (res.success) {
        // Optimistic state update
        setPayments((prev) =>
          prev.map((p) =>
            p.idPay === idPay
              ? {
                  ...p,
                  status: newStatus,
                  verifiedBy: "Admin Kasir",
                  verifiedAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
                }
              : p
          )
        );

        if (selectedPayment && selectedPayment.idPay === idPay) {
          setSelectedPayment((prev) =>
            prev
              ? {
                  ...prev,
                  status: newStatus,
                  verifiedBy: "Admin Kasir",
                  verifiedAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
                }
              : null
          );
        }

        // Refresh stats
        const statsRes = await getAdminPaymentStats();
        if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
      } else {
        alert(res.error || "Gagal mengubah status pembayaran.");
      }
    } catch (e: any) {
      alert("Terjadi kesalahan: " + e.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = payments.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery =
      p.idOrder.toLowerCase().includes(q) ||
      p.idPay.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.method.toLowerCase().includes(q);

    if (!matchesQuery) return false;

    if (selectedStatus === "Semua") return true;
    if (selectedStatus === "Menunggu Verifikasi")
      return p.status === "Menunggu Verifikasi" || p.status === "Menunggu Pembayaran" || p.status === "Pending";
    if (selectedStatus === "Dibayar")
      return p.status === "Dibayar" || p.status === "VERIFIED" || p.status === "Berhasil";
    if (selectedStatus === "Ditolak")
      return p.status === "Ditolak" || p.status === "REJECTED" || p.status === "Gagal";

    return true;
  });

  const formatRupiah = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Verifikasi Pembayaran</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Cari Kode Pesanan pelanggan & verifikasi pembayaran Cash / QRIS.
          </p>
        </div>

        <button
          onClick={fetchData}
          disabled={isRefreshing}
          className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-stone-500 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500">Berhasil Diverifikasi</p>
            <p className="text-2xl font-extrabold text-stone-900 leading-none mt-1">{stats.berhasil}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4 relative overflow-hidden">
          {Number(stats.pending) > 0 && (
            <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          )}
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500">Menunggu Pembayaran / Verifikasi</p>
            <p className="text-2xl font-extrabold text-amber-600 leading-none mt-1">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500">Ditolak / Gagal</p>
            <p className="text-2xl font-extrabold text-rose-600 leading-none mt-1">{stats.ditolak}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#eaf3ee] text-[#1e5138] flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-stone-500">Total Masuk</p>
            <p className="text-xl font-extrabold text-[#1e5138] leading-none mt-1">{stats.totalMasuk}</p>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden">
        {/* Controls: Search & Tabs */}
        <div className="p-4 border-b border-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {["Semua", "Menunggu Verifikasi", "Dibayar", "Ditolak"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedStatus === st
                    ? "bg-[#143125] text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari Kode Pesanan (ORD-...) atau nama..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#143125]/20 transition"
            />
          </div>
        </div>

        {/* Table Content */}
        {isLoading ? (
          <div className="p-12 text-center text-stone-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-brand-dark" />
            <span>Memuat daftar pembayaran...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-xs">
            <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30 text-stone-400" />
            <p className="font-semibold">Tidak ada transaksi pembayaran ditemukan.</p>
          </div>
        ) : (
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
                  const isPending =
                    p.status === "Menunggu Verifikasi" || p.status === "Menunggu Pembayaran" || p.status === "Pending";
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

                      <td className="py-3.5 px-4 font-extrabold text-stone-900">
                        {formatRupiah(p.totalAmount)}
                      </td>

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
                          <button
                            onClick={() => setSelectedPayment(p)}
                            className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold hover:underline"
                          >
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
                                onClick={() => handleUpdateStatus(p.idPay, p.idOrder, "Dibayar")}
                                className="px-2.5 py-1.5 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition text-[11px] font-bold flex items-center gap-1 shadow-2xs"
                              >
                                <Check className="w-3.5 h-3.5" /> terima
                              </button>
                              <button
                                title="Tolak Pembayaran"
                                disabled={updatingId === p.idPay}
                                onClick={() => handleUpdateStatus(p.idPay, p.idOrder, "Ditolak")}
                                className="p-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => setSelectedPayment(p)}
                            className="bg-[#143125] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-emerald-950 transition flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3" /> Detail
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==========================================================
         DETAIL & VERIFICATION MODAL DIALOG
         ========================================================== */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-100 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Detail Transaksi</span>
                <h3 className="text-lg font-mono font-extrabold text-stone-900 font-display">{selectedPayment.idOrder}</h3>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Info Grid */}
            <div className="grid grid-cols-2 gap-3 bg-stone-50 p-4 rounded-2xl text-xs border border-stone-200/60">
              <div>
                <span className="text-stone-400 block font-medium">Pelanggan</span>
                <span className="font-bold text-stone-800">{selectedPayment.customerName}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Metode Pembayaran</span>
                <span className="font-extrabold text-stone-900">{selectedPayment.method}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Nomor Telepon</span>
                <span className="font-semibold text-stone-800">{selectedPayment.customerPhone}</span>
              </div>
              <div>
                <span className="text-stone-400 block font-medium">Status</span>
                <span className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] border ${statusStyle[selectedPayment.status]}`}>
                  {selectedPayment.status}
                </span>
              </div>
            </div>

            {/* Items List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-800">Rincian Menu Yang Dipesan:</h4>
              <div className="bg-stone-50/50 rounded-2xl p-3 border border-stone-100 space-y-2 max-h-40 overflow-y-auto text-xs">
                {selectedPayment.items.length === 0 ? (
                  <p className="text-stone-400 italic">Tidak ada rincian item.</p>
                ) : (
                  selectedPayment.items.map((it, idx) => (
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
                <span className="text-emerald-700 text-base">{formatRupiah(selectedPayment.totalAmount)}</span>
              </div>
            </div>

            {/* Proof image if present */}
            {selectedPayment.proofUrl && (
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-stone-800">Bukti Transfer Pelanggan:</h4>
                  <a
                    href={selectedPayment.proofUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-1"
                  >
                    Buka Ukuran Penuh <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-stone-200 bg-stone-900">
                  <img src={selectedPayment.proofUrl} alt="Bukti Transfer" className="w-full h-full object-contain mx-auto" />
                </div>
              </div>
            )}

            {/* Admin Verification Info */}
            {selectedPayment.verifiedBy && (
              <div className="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600 flex justify-between">
                <span>Diverifikasi oleh: <strong>{selectedPayment.verifiedBy}</strong></span>
                <span>Waktu: <strong>{selectedPayment.verifiedAt || "-"}</strong></span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-100 transition"
              >
                Tutup
              </button>

              <button
                type="button"
                disabled={updatingId === selectedPayment.idPay}
                onClick={() => handleUpdateStatus(selectedPayment.idPay, selectedPayment.idOrder, "Ditolak")}
                className="px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition flex items-center gap-1.5 disabled:opacity-50"
              >
                <X className="w-4 h-4" /> Tolak
              </button>

              <button
                type="button"
                disabled={updatingId === selectedPayment.idPay}
                onClick={() => handleUpdateStatus(selectedPayment.idPay, selectedPayment.idOrder, "Dibayar")}
                className="px-5 py-2.5 rounded-xl bg-[#143125] text-white text-xs font-bold hover:bg-emerald-950 transition flex items-center gap-1.5 disabled:opacity-50 shadow-md"
              >
                <Check className="w-4 h-4 text-emerald-400" /> Setujui Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
