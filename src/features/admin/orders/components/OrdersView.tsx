"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, CookingPot, CheckCircle2, XCircle, ClipboardList } from "lucide-react";

const stats = [
  { label: "Total Pesanan", value: "128", icon: ClipboardList, bg: "bg-[#eaf3ee]", color: "text-[#1e5138]" },
  { label: "Pending", value: "8", icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
  { label: "Diproses", value: "5", icon: CookingPot, bg: "bg-blue-50", color: "text-blue-600" },
  { label: "Selesai", value: "110", icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
];

const tabs = ["Semua", "Pending", "Diproses", "Selesai", "Dibatalkan"] as const;

const orders = [
  { id: "#TK-0012", date: "13 Sep 2025, 20:45", customer: "Rizky A.", menu: "Es Kopi Susu (2)", total: "Rp 34.000", status: "Pending" as const },
  { id: "#TK-0011", date: "13 Sep 2025, 20:32", customer: "Siti Nurhaliza", menu: "Kopi Tarik (1)", total: "Rp 14.000", status: "Diproses" as const },
  { id: "#TK-0010", date: "13 Sep 2025, 19:58", customer: "Andi Pratama", menu: "Teh Cokelat Tarik (2)", total: "Rp 32.000", status: "Selesai" as const },
  { id: "#TK-0009", date: "13 Sep 2025, 19:40", customer: "Dewi Lestari", menu: "Pisang Goreng (1)", total: "Rp 12.000", status: "Selesai" as const },
  { id: "#TK-0008", date: "13 Sep 2025, 19:25", customer: "Budi Santoso", menu: "Es Kopi Susu (1)", total: "Rp 17.000", status: "Dibatalkan" as const },
  { id: "#TK-0007", date: "13 Sep 2025, 18:10", customer: "Lina Marlina", menu: "Kopi Tarik (2) + Pisang Goreng (1)", total: "Rp 40.000", status: "Selesai" as const },
];

const statusStyle: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  Diproses: "bg-blue-50 text-blue-600 border-blue-200",
  Selesai: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Dibatalkan: "bg-rose-50 text-rose-600 border-rose-200",
};

export const OrdersView = () => {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Semua");
  const [query, setQuery] = useState("");

  const filtered = orders.filter((o) => {
    const matchTab = activeTab === "Semua" || o.status === activeTab;
    const q = query.toLowerCase();
    const matchQuery = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.menu.toLowerCase().includes(q);
    return matchTab && matchQuery;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-brand-dark">Pesanan</h1>
        <p className="text-xs text-stone-500 mt-1">Kelola dan pantau semua pesanan pelanggan.</p>
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
              placeholder="Cari ID, pelanggan, menu..."
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
                <th className="py-3 px-4 font-semibold">Menu</th>
                <th className="py-3 px-4 font-semibold">Total</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-400 text-xs">
                    Tidak ada pesanan untuk filter ini.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-stone-900">{o.id}</td>
                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">{o.date}</td>
                    <td className="py-3.5 px-4 font-medium text-stone-800">{o.customer}</td>
                    <td className="py-3.5 px-4 text-stone-600 max-w-[220px] truncate">{o.menu}</td>
                    <td className="py-3.5 px-4 font-semibold text-stone-900">{o.total}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/admin/orders/${o.id.replace("#", "")}`} className="block bg-[#143125] text-white hover:bg-emerald-900 text-[11px] font-semibold px-3.5 py-1.5 rounded-lg transition-colors text-center">
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
