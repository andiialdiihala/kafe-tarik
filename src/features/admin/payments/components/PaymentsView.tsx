"use client";

import { useState } from "react";
import { Search, Wallet, CheckCircle2, Clock, XCircle } from "lucide-react";

const stats = [
  { label: "Berhasil", value: "110", icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
  { label: "Pending", value: "6", icon: Clock, bg: "bg-amber-50", color: "text-amber-600" },
  { label: "Gagal", value: "2", icon: XCircle, bg: "bg-rose-50", color: "text-rose-600" },
  { label: "Total Masuk", value: "Rp 2.450.000", icon: Wallet, bg: "bg-[#eaf3ee]", color: "text-[#1e5138]" },
];

const payments = [
  { id: "#TK-0012", customer: "Rizky A.", amount: "Rp 34.000", method: "QRIS", date: "13 Sep 2025", status: "Pending" as const },
  { id: "#TK-0011", customer: "Siti Nurhaliza", amount: "Rp 14.000", method: "QRIS", date: "13 Sep 2025", status: "Berhasil" as const },
  { id: "#TK-0010", customer: "Andi Pratama", amount: "Rp 32.000", method: "Cash", date: "13 Sep 2025", status: "Berhasil" as const },
  { id: "#TK-0008", customer: "Budi Santoso", amount: "Rp 17.000", method: "Cash", date: "13 Sep 2025", status: "Gagal" as const },
];

const statusStyle: Record<string, string> = {
  Berhasil: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Pending: "bg-amber-50 text-amber-600 border-amber-200",
  Gagal: "bg-rose-50 text-rose-600 border-rose-200",
};

const methodBadge: Record<string, string> = {
  QRIS: "bg-cyan-50 text-cyan-600",
  Cash: "bg-stone-100 text-stone-600",
};

export const PaymentsView = () => {
  const [query, setQuery] = useState("");

  const filtered = payments.filter((p) => p.id.toLowerCase().includes(query.toLowerCase()) || p.customer.toLowerCase().includes(query.toLowerCase()) || p.method.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-brand-dark">Pembayaran</h1>
        <p className="text-xs text-stone-500 mt-1">Verifikasi bukti transfer pelanggan.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-stone-200/70 shadow-xs flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
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
          <h2 className="text-sm font-bold text-stone-800">Riwayat Pembayaran</h2>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari pembayaran..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-[#143125]/10 transition" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                <th className="py-3 px-4">Pesanan</th>
                <th className="py-3 px-4">Pelanggan</th>
                <th className="py-3 px-4">Jumlah</th>
                <th className="py-3 px-4">Metode</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-stone-900">{p.id}</td>
                  <td className="py-3 px-4 text-stone-700">{p.customer}</td>
                  <td className="py-3 px-4 font-semibold text-stone-900">{p.amount}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${methodBadge[p.method]}`}>{p.method}</span>
                  </td>
                  <td className="py-3 px-4 text-stone-500">{p.date}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusStyle[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="bg-[#143125] text-white px-3.5 py-1.5 rounded-lg text-[11px] font-semibold hover:bg-emerald-900 transition">Detail</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
