"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const RevenueChart = ({ data }: { data: { name: string; total: number }[] }) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value: any) => [`Rp ${Number(value).toLocaleString()}`, "Pendapatan"]} />
        <Area type="monotone" dataKey="total" name="Pendapatan" stroke="#143125" fill="#d6f5d6" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
