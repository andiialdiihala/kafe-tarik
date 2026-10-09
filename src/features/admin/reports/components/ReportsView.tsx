"use client";

import { useState } from "react";
import { Calendar, TrendingUp, Wallet, ShoppingBag, Users, Download } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const periods = ["7 Hari", "30 Hari", "Bulan Ini", "Tahun Ini"] as const;

export const ReportsView = ({ data }: { data: any }) => {
  const [period, setPeriod] = useState<(typeof periods)[number]>("7 Hari");

  const chartData = data.dailyRevenue;

  const stats = [
    { label: "Total Pendapatan", value: `Rp ${Number(data.revenue.total).toLocaleString()}`, sub: `${data.revenue.change >= 0 ? '↑' : '↓'} ${Math.abs(data.revenue.change).toFixed(1)}% vs periode lalu`, icon: Wallet, bg: "bg-emerald-50", color: "text-emerald-600" },
    { label: "Total Pesanan", value: data.orders.total.toString(), sub: `${data.orders.change >= 0 ? '↑' : '↓'} ${Math.abs(data.orders.change).toFixed(1)}% vs periode lalu`, icon: ShoppingBag, bg: "bg-blue-50", color: "text-blue-600" },
    { label: "Total Menu Terjual", value: data.sold.total.toString(), sub: `${data.sold.change >= 0 ? '↑' : '↓'} ${Math.abs(data.sold.change).toFixed(1)}% vs periode lalu`, icon: TrendingUp, bg: "bg-amber-50", color: "text-amber-600" },
    { label: "Pelanggan Baru", value: data.customers.total.toString(), sub: `${data.customers.change >= 0 ? '↑' : '↓'} ${Math.abs(data.customers.change).toFixed(1)}% vs periode lalu`, icon: Users, bg: "bg-violet-50", color: "text-violet-600" },
  ];

  const handleExport = () => {
    const esc = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const rows: string[][] = [];
    rows.push(["Kafe Tarik - Laporan Penjualan"]);
    rows.push(["Periode", period]);
    rows.push(["Tanggal Export", new Date().toLocaleString("id-ID", { dateStyle: "long", timeStyle: "short" })]);
    rows.push([]);
    rows.push(["RINGKASAN"]);
    rows.push(["Label", "Nilai", "Perubahan vs Periode Lalu"]);
    stats.forEach((s) => rows.push([s.label, s.value, s.sub]));
    rows.push([]);
    rows.push(["PENDAPATAN HARIAN"]);
    rows.push(["Hari", "Pendapatan (Rp)"]);
    chartData.forEach((d: any) => rows.push([d.name, d.total]));
    rows.push([]);
    rows.push(["RINGKASAN METODE PEMBAYARAN"]);
    rows.push(["Metode", "Total (Rp)", "Persentase"]);
    data.paymentMethods.forEach((pm: any) => rows.push([pm.method, pm.total, `${pm.percentage.toFixed(2)}%`]));
    const csv = "\uFEFF" + rows.map((r) => (r.length === 0 ? "" : r.map(esc).join(","))).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `laporan-kafe-tarik_${period.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

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
          <button onClick={handleExport} className="bg-white border border-stone-200 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50">
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
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: any) => [`Rp ${Number(value).toLocaleString()}`, "Pendapatan"]} />
              <Area type="monotone" dataKey="total" name="Pendapatan" stroke="#143125" fill="#d6f5d6" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 border border-stone-200/70 shadow-xs">
          <h3 className="text-sm font-bold text-stone-800 mb-4">Ringkasan Metode</h3>
          <div className="space-y-3">
            {data.paymentMethods.map((pm: any) => (
              <div key={pm.method} className={`flex justify-between items-center p-3 rounded-xl border ${pm.method === 'QRIS' ? 'bg-cyan-50 border-cyan-100' : 'bg-stone-100 border-stone-200'}`}>
                <span className={`text-xs font-semibold ${pm.method === 'QRIS' ? 'text-cyan-700' : 'text-stone-700'}`}>{pm.method}</span>
                <span className="text-xs font-bold text-stone-900">Rp {pm.total.toLocaleString()} · {pm.percentage.toFixed(0)}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-[#143125] text-white">
            <p className="text-[11px] text-emerald-300/80 font-semibold uppercase tracking-wider">Periode {period}</p>
            <p className="text-sm font-bold mt-1">Performa stabil, naik {Math.abs(data.revenue.change).toFixed(1)}% vs periode lalu.</p>
          </div>
        </div>
      </div>

      {/* Tabel Preview */}
      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-100 font-bold text-sm">Preview Data Laporan</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-50">
              <tr>
                <th className="p-3">Kategori</th>
                <th className="p-3">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {stats.map((s) => (
                <tr key={s.label}>
                  <td className="p-3 font-medium text-stone-600">{s.label}</td>
                  <td className="p-3 font-bold text-stone-900">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
