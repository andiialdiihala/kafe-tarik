"use client";

import { useState } from "react";
import { Clock, CookingPot, CheckCircle2, ClipboardList } from "lucide-react";
import { updateOrderStatus, deleteOrder } from "../actions/order.actions";
import { toast } from "sonner";
import { StatsCard } from "./StatsCard";
import { OrderFilters } from "./OrderFilters";
import { OrderTable } from "./OrderTable";
import { DeleteOrderModal } from "./DeleteOrderModal";

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

import { OrderItem, FormattedOrder } from "../types/order.types";

export const OrdersView = ({ initialOrders = [] }: { initialOrders?: OrderItem[] }) => {
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
    } catch {
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
          <StatsCard key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <OrderFilters 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          query={query} 
          setQuery={setQuery} 
        />

        <div className="overflow-x-auto">
          <OrderTable 
            filtered={filtered} 
            statusStyles={statusStyles} 
            loadingId={loadingId} 
            deletingId={deletingId} 
            handleStatus={handleStatus} 
            setOrderToDelete={setOrderToDelete} 
          />
        </div>
      </div>

      {orderToDelete && (
        <DeleteOrderModal 
          orderId={orderToDelete} 
          onClose={() => setOrderToDelete(null)} 
          onDelete={() => handleDelete(orderToDelete)} 
          loading={deletingId === orderToDelete} 
        />
      )}
    </div>
  );
};
