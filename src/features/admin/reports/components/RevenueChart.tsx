"use client";

import { Calendar } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DailyRevenue, ReportPeriod } from "../types/report.types";

export const RevenueChart = ({ data, period }: { data: DailyRevenue[]; period: ReportPeriod }) => (
  <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-stone-200/70 shadow-xs">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-bold text-stone-800">Grafik Pendapatan — {period}</h3>
      <span className="text-[11px] text-stone-400 flex items-center gap-1">
        <Calendar className="w-3 h-3" /> {period}
      </span>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: unknown) => [`Rp ${Number(value ?? 0).toLocaleString()}`, "Pendapatan"]} />
        <Area type="monotone" dataKey="total" name="Pendapatan" stroke="#143125" fill="#d6f5d6" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
