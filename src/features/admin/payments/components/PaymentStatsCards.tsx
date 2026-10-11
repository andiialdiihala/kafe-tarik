import { CheckCircle2, Clock, XCircle, Wallet } from "lucide-react";
import { PaymentStats } from "../types/payment.types";

export const PaymentStatsCards = ({ stats }: { stats: PaymentStats }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-stone-500">Berhasil Diverifikasi</p>
        <p className="text-2xl font-extrabold text-stone-900 leading-none mt-1">{stats.berhasil}</p>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4 relative overflow-hidden">
      {Number(stats.pending) > 0 && (
        <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
      )}
      <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
        <Clock className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-stone-500">Menunggu Pembayaran / Verifikasi</p>
        <p className="text-2xl font-extrabold text-amber-600 leading-none mt-1">{stats.pending}</p>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
        <XCircle className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-stone-500">Ditolak / Gagal</p>
        <p className="text-2xl font-extrabold text-rose-600 leading-none mt-1">{stats.ditolak}</p>
      </div>
    </div>

    <div className="bg-white rounded-2xl p-4 border border-stone-200/80 shadow-2xs flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-[#eaf3ee] text-[#1e5138] flex items-center justify-center shrink-0">
        <Wallet className="w-6 h-6" />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-stone-500">Total Masuk</p>
        <p className="text-xl font-extrabold text-[#1e5138] leading-none mt-1">{stats.totalMasuk}</p>
      </div>
    </div>
  </div>
);
