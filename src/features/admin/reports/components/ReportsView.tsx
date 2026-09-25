"use client";

import { useState } from "react";
import { Calendar, TrendingUp, Wallet, ShoppingBag, Users, Download } from "lucide-react";

const periods = ["7 Hari", "30 Hari", "Bulan Ini", "Tahun Ini"] as const;

const stats = [
  { label: "Total Pendapatan", value: "Rp 8.420.000", sub: "Periode ini", icon: Wallet, bg: "bg-emerald-50", color: "text-emerald-600" },
  { label: "Total Pesanan", value: "342", sub: "↑ 12% vs periode lalu", icon: ShoppingBag, bg: "bg-blue-50", color: "text-blue-600" },
  { label: "Rata-rata / Hari", value: "Rp 1.202.000", sub: "7 hari terakhir", icon: TrendingUp, bg: "bg-amber-50", color: "text-amber-600" },
  { label: "Pelanggan Baru", value: "58", sub: "↑ 8% vs periode lalu", icon: Users, bg: "bg-violet-50", color: "text-violet-600" },
];

export const ReportsView = () => {
  const [period, setPeriod] = useState<(typeof periods)[number]>("7 Hari");

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Laporan</h1>
          <p className="text-xs text-stone-500 mt-1">Ringkasan performa penjualan Kafe Tarik.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-stone-200 shadow-xs">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${period === p ? "bg-[#143125] text-white" : "text-stone-600 hover:bg-stone-50"}`}
              >
                {p}
              </button>
            ))}
          </div>
          <button className="bg-white border border-stone-200 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-4 border border-stone-200/70 shadow-xs flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-medium text-stone-500">{s.label}</p>
              <p className="text-lg font-extrabold text-stone-900 leading-none mt-1">{s.value}</p>
              <p className="text-[10px] text-stone-400 mt-1">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-stone-200/70 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-stone-800">Grafik Pendapatan — {period}</h3>
            <span className="text-[11px] text-stone-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {period}</span>
          </div>
          <div className="h-64 w-full bg-stone-50 rounded-2xl border-2 border-dashed border-stone-100 flex items-center justify-center text-stone-400 text-xs">
            [Grafik — {period}]
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-stone-200/70 shadow-xs">
          <h3 className="text-sm font-bold text-stone-800 mb-4">Ringkasan Metode</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 rounded-xl bg-cyan-50 border border-cyan-100">
              <span className="text-xs font-semibold text-cyan-700">QRIS</span>
              <span className="text-xs font-bold text-stone-900">Rp 5.120.000 · 62%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-stone-100 border border-stone-200">
              <span className="text-xs font-semibold text-stone-700">Cash</span>
              <span className="text-xs font-bold text-stone-900">Rp 3.300.000 · 38%</span>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-[#143125] text-white">
            <p className="text-[11px] text-emerald-300/80 font-semibold uppercase tracking-wider">Periode {period}</p>
            <p className="text-sm font-bold mt-1">Performa stabil, naik 12% vs periode lalu.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
