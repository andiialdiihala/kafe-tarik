"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { getAdminPayments, getAdminPaymentStats } from "../queries/payment.queries";
import { updatePaymentStatus, deletePayment } from "../actions/payment.actions";
import { AdminPaymentItem } from "../types/payment.types";
import { PaymentStatsCards } from "./PaymentStatsCards";
import { PaymentFilters } from "./PaymentFilters";
import { PaymentTable } from "./PaymentTable";
import { PaymentDetailModal } from "./PaymentDetailModal";
import { DeletePaymentModal } from "./DeletePaymentModal";

export const PaymentsView = () => {
  const [payments, setPayments] = useState<AdminPaymentItem[]>([]);
  const [stats, setStats] = useState({ berhasil: "0", pending: "0", ditolak: "0", totalMasuk: "Rp 0" });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Semua");
  const [selectedPayment, setSelectedPayment] = useState<AdminPaymentItem | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [paymentToDelete, setPaymentToDelete] = useState<{ idPay: string; idOrder: string } | null>(null);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const [paymentsRes, statsRes] = await Promise.all([getAdminPayments(), getAdminPaymentStats()]);
      if (paymentsRes.success && paymentsRes.data) setPayments(paymentsRes.data);
      if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
    } catch (err) {
      console.error("Error fetching admin payments data:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleUpdateStatus = async (idPay: string, idOrder: string, newStatus: "Dibayar" | "Ditolak" | "Menunggu Verifikasi") => {
    setUpdatingId(idPay);
    try {
      const res = await updatePaymentStatus(idPay, idOrder, newStatus, "Admin Kasir");
      if (res.success) {
        setPayments((prev) => prev.map((p) => p.idPay === idPay ? { ...p, status: newStatus, verifiedBy: "Admin Kasir", verifiedAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) } : p));
        if (selectedPayment?.idPay === idPay) setSelectedPayment((prev) => prev ? { ...prev, status: newStatus, verifiedBy: "Admin Kasir", verifiedAt: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) } : null);
        const statsRes = await getAdminPaymentStats();
        if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
      } else { alert(res.error || "Gagal mengubah status pembayaran."); }
    } catch (e: any) { alert("Terjadi kesalahan: " + e.message); } finally { setUpdatingId(null); }
  };

  const handleDelete = async () => {
    if (!paymentToDelete) return;
    setDeletingId(paymentToDelete.idPay);
    try {
      const res = await deletePayment(paymentToDelete.idPay, paymentToDelete.idOrder);
      if (res.success) {
        setPayments((prev) => prev.filter((p) => p.idPay !== paymentToDelete.idPay));
        if (selectedPayment?.idPay === paymentToDelete.idPay) setSelectedPayment(null);
        setPaymentToDelete(null);
        const statsRes = await getAdminPaymentStats();
        if (statsRes.success && statsRes.stats) setStats(statsRes.stats);
      } else { alert(res.error || "Gagal menghapus pembayaran."); }
    } catch (e: any) { alert("Terjadi kesalahan: " + e.message); } finally { setDeletingId(null); }
  };

  const filtered = payments.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery = p.idOrder.toLowerCase().includes(q) || p.idPay.toLowerCase().includes(q) || p.customerName.toLowerCase().includes(q) || p.method.toLowerCase().includes(q);
    if (!matchesQuery) return false;
    if (selectedStatus === "Semua") return true;
    if (selectedStatus === "Menunggu Verifikasi") return ["Menunggu Verifikasi", "Menunggu Pembayaran", "Pending"].includes(p.status);
    if (selectedStatus === "Dibayar") return ["Dibayar", "VERIFIED", "Berhasil"].includes(p.status);
    if (selectedStatus === "Ditolak") return ["Ditolak", "REJECTED", "Gagal"].includes(p.status);
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Verifikasi Pembayaran</h1>
          <p className="text-xs text-stone-500 mt-0.5">Cari Kode Pesanan pelanggan & verifikasi pembayaran Cash / QRIS.</p>
        </div>
        <button
          onClick={fetchData}
          disabled={isRefreshing}
          className="shrink-0 flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition shadow-2xs cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-stone-500 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>Segarkan Data</span>
        </button>
      </div>

      <PaymentStatsCards stats={stats} />

      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-2xs overflow-hidden">
        <PaymentFilters selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} query={query} setQuery={setQuery} />
        <PaymentTable filtered={filtered} isLoading={isLoading} updatingId={updatingId} deletingId={deletingId} onUpdateStatus={handleUpdateStatus} onDetail={setSelectedPayment} onDelete={(idPay, idOrder) => setPaymentToDelete({ idPay, idOrder })} />
      </div>

      <PaymentDetailModal payment={selectedPayment} onClose={() => setSelectedPayment(null)} onUpdateStatus={handleUpdateStatus} onDelete={(idPay, idOrder) => setPaymentToDelete({ idPay, idOrder })} updatingId={updatingId} deletingId={deletingId} />
      <DeletePaymentModal paymentToDelete={paymentToDelete} deletingId={deletingId} onClose={() => setPaymentToDelete(null)} onDelete={handleDelete} />
    </div>
  );
};
