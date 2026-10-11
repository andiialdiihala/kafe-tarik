import { BarChart3, TrendingUp, CreditCard, ClipboardList, Package, Users } from "lucide-react";
import { DashboardStatsData } from "../types/dashboard.types";
import { RevenueChart } from "./RevenueChart";

export const DashboardStats = ({ data }: { data: DashboardStatsData }) => {
  const stats = [
    { label: "Total Pendapatan", value: `Rp ${Number(data.revenue).toLocaleString()}`, change: `${data.revenueChange >= 0 ? '+' : ''}${data.revenueChange.toFixed(1)}%`, color: "text-emerald-700", bg: "bg-emerald-50", icon: CreditCard },
    { label: "Pesanan Masuk", value: data.orders.toString(), change: `${data.ordersChange >= 0 ? '+' : ''}${data.ordersChange.toFixed(1)}%`, color: "text-blue-700", bg: "bg-blue-50", icon: ClipboardList },
    { label: "Menu Terjual", value: data.sold.toString(), change: `${data.soldChange >= 0 ? '+' : ''}${data.soldChange.toFixed(1)}%`, color: "text-amber-700", bg: "bg-amber-50", icon: Package },
    { label: "Pelanggan Baru", value: data.customers.toString(), change: `${data.customersChange >= 0 ? '+' : ''}${data.customersChange.toFixed(1)}%`, color: "text-rose-700", bg: "bg-rose-50", icon: Users },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{stat.label}</span>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#143125] tracking-tight">{stat.value}</div>
            <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1.5 bg-emerald-50 w-fit px-2 py-0.5 rounded-full">
              <span>{stat.change}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
