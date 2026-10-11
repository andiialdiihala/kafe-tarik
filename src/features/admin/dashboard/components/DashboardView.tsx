import { BarChart3 } from "lucide-react";
import { DashboardStatsData } from "../types/dashboard.types";
import { RevenueChart } from "./RevenueChart";
import { DashboardWelcome } from "./DashboardWelcome";
import { DashboardStats } from "./DashboardStats";
import { TopProductsList } from "./TopProductsList";

export const DashboardView = ({ stats }: { stats: DashboardStatsData }) => {
  return (
    <div className="space-y-7">
      <DashboardWelcome />
      <DashboardStats data={stats} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
          <h3 className="text-sm font-bold text-[#143125] mb-6 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-600" /> Grafik Pendapatan
          </h3>
          <RevenueChart data={stats.dailyRevenue} />
        </div>
        <TopProductsList products={stats.topProducts} />
      </section>
    </div>
  );
};
