import { PaymentMethodSummary, ReportPeriod } from "../types/report.types";

export const PaymentMethodSummaryCards = ({
  methods,
  revenueChange,
  period,
}: {
  methods: PaymentMethodSummary[];
  revenueChange: number;
  period: ReportPeriod;
}) => (
  <div className="bg-white rounded-xl p-6 border border-stone-200/70 shadow-xs">
    <h3 className="text-sm font-bold text-stone-800 mb-4">Ringkasan Metode</h3>
    <div className="space-y-3">
      {methods.map((pm) => (
        <div
          key={pm.method ?? "Lainnya"}
          className={`flex justify-between items-center p-3 rounded-xl border ${pm.method === "QRIS" ? "bg-cyan-50 border-cyan-100" : "bg-stone-100 border-stone-200"}`}
        >
          <span className={`text-xs font-semibold ${pm.method === "QRIS" ? "text-cyan-700" : "text-stone-700"}`}>
            {pm.method ?? "Lainnya"}
          </span>
          <span className="text-xs font-bold text-stone-900">
            Rp {pm.total.toLocaleString()} · {pm.percentage.toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
    <div className="mt-6 p-4 rounded-xl bg-[#143125] text-white">
      <p className="text-[11px] text-emerald-300/80 font-semibold uppercase tracking-wider">Periode {period}</p>
      <p className="text-sm font-bold mt-1">Performa stabil, naik {Math.abs(revenueChange).toFixed(1)}%.</p>
    </div>
  </div>
);
