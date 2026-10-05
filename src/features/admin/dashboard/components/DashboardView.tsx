import { BarChart3, TrendingUp, CreditCard, ClipboardList, Package, Users } from "lucide-react";
import { RevenueChart } from "./RevenueChart";

export const DashboardView = ({ stats: dbStats }: { stats: any }) => {
  const stats = [
    { label: "Total Pendapatan", value: `Rp ${Number(dbStats.revenue).toLocaleString()}`, change: `${dbStats.revenueChange >= 0 ? '+' : ''}${dbStats.revenueChange.toFixed(1)}%`, color: "text-emerald-700", bg: "bg-emerald-50", icon: CreditCard },
    { label: "Pesanan Masuk", value: dbStats.orders.toString(), change: `${dbStats.ordersChange >= 0 ? '+' : ''}${dbStats.ordersChange.toFixed(1)}%`, color: "text-blue-700", bg: "bg-blue-50", icon: ClipboardList },
    { label: "Menu Terjual", value: dbStats.sold.toString(), change: `${dbStats.soldChange >= 0 ? '+' : ''}${dbStats.soldChange.toFixed(1)}%`, color: "text-amber-700", bg: "bg-amber-50", icon: Package },
    { label: "Pelanggan Baru", value: dbStats.customers.toString(), change: `${dbStats.customersChange >= 0 ? '+' : ''}${dbStats.customersChange.toFixed(1)}%`, color: "text-rose-700", bg: "bg-rose-50", icon: Users },
  ];

  const topProducts = (dbStats.topProducts || []).map((p: any, i: number) => ({
    name: p.name || "Menu",
    price: `Rp ${Number(p.price || 0).toLocaleString()}`,
    sold: `${p.sold || 0} terjual`,
    rank: i + 1,
    image: p.image || "https://via.placeholder.com/150",
  }));

  const chartData = dbStats.dailyRevenue || [];

  return (
    <div className="space-y-7">
      <section className="relative rounded-2xl bg-white p-7 shadow-sm border border-stone-200/60 overflow-hidden flex items-center justify-between min-h-[175px]">
        <div className="z-10 max-w-lg">
          <p className="text-xs font-semibold text-emerald-800 tracking-wide flex items-center gap-1.5">Selamat datang, Admin <span>👋</span></p>
          <h2 className="text-2xl font-bold font-display text-brand-dark tracking-tight">Kelola Kafe Tarik lebih mudah!</h2>
          <p className="text-xs text-stone-500 mt-2 font-normal">Pantau penjualan, pesanan dan kelola menu secara cepat dan efisien.</p>
        </div>
      </section>

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

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
          <h3 className="text-sm font-bold text-[#143125] mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" /> Grafik Pendapatan
          </h3>
          <RevenueChart data={chartData} />
        </div>
        <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold text-[#143125] mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" /> Produk Favorit
          </h3>
          <div className="flex-1 space-y-4">
            {topProducts.map((p: any) => (
              <div key={p.rank} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors border border-transparent hover:border-stone-100">
                <img src={p.image} className="w-14 h-14 object-cover rounded-xl shadow-inner border border-stone-100" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-stone-900">{p.name}</h4>
                  <p className="text-[10px] text-emerald-700 font-semibold">{p.price}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-[#143125]">#{p.rank}</div>
                  <div className="text-[9px] text-stone-400 font-medium">{p.sold.split(' ')[0]} terjual</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};