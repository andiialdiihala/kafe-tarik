import { TrendingUp, Wallet, ShoppingBag, Users } from "lucide-react";
import { ReportsData } from "../types/report.types";

export const ReportStatsCards = ({ data }: { data: ReportsData }) => {
  const stats = [
    { label: "Total Pendapatan", value: `Rp ${Number(data.revenue.total).toLocaleString()}`, sub: `${data.revenue.change >= 0 ? '↑' : '↓'} ${Math.abs(data.revenue.change).toFixed(1)}%`, icon: Wallet, bg: "bg-emerald-50", color: "text-emerald-600" },
    { label: "Total Pesanan", value: data.orders.total.toString(), sub: `${data.orders.change >= 0 ? '↑' : '↓'} ${Math.abs(data.orders.change).toFixed(1)}%`, icon: ShoppingBag, bg: "bg-blue-50", color: "text-blue-600" },
    { label: "Total Menu Terjual", value: data.sold.total.toString(), sub: `${data.sold.change >= 0 ? '↑' : '↓'} ${Math.abs(data.sold.change).toFixed(1)}%`, icon: TrendingUp, bg: "bg-amber-50", color: "text-amber-600" },
    { label: "Pelanggan Baru", value: data.customers.total.toString(), sub: `${data.customers.change >= 0 ? '↑' : '↓'} ${Math.abs(data.customers.change).toFixed(1)}%`, icon: Users, bg: "bg-violet-50", color: "text-violet-600" },
  ];

  return (
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
  );
};
