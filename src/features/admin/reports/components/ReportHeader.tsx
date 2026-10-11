import { FileText } from "lucide-react";
import { ReportPeriod } from "../types/report.types";

const periods: ReportPeriod[] = ["7 Hari", "30 Hari", "Bulan Ini", "Tahun Ini"];

export const ReportHeader = ({
  period,
  setPeriod,
  onExportPdf,
}: {
  period: ReportPeriod;
  setPeriod: (p: ReportPeriod) => void;
  onExportPdf: () => void;
}) => (
  <div className="flex items-center justify-between gap-4">
    <div>
      <h1 className="text-2xl font-bold font-display text-brand-dark">Laporan</h1>
      <p className="text-xs text-stone-500 mt-1">Ringkasan performa penjualan Kafe Tarik.</p>
    </div>
    <div className="flex items-center gap-2 shrink-0">
      <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-stone-200 shadow-xs overflow-x-auto scrollbar-none">
        {periods.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
              period === p ? "bg-[#143125] text-white" : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onExportPdf}
        className="bg-[#143125] text-white flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-950 transition whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
      >
        <FileText className="w-3.5 h-3.5" /> Export PDF
      </button>
    </div>
  </div>
);
