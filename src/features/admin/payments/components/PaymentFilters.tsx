import { Search } from "lucide-react";

export const PaymentFilters = ({
  selectedStatus,
  setSelectedStatus,
  query,
  setQuery,
}: {
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  query: string;
  setQuery: (q: string) => void;
}) => (
  <div className="p-4 border-b border-stone-100 flex items-center justify-between gap-4">
    <div className="flex items-center gap-1.5 overflow-x-auto min-w-0 flex-1 scrollbar-none py-0.5">
      {["Semua", "Menunggu Verifikasi", "Dibayar", "Ditolak"].map((st) => (
        <button
          key={st}
          type="button"
          onClick={() => setSelectedStatus(st)}
          className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            selectedStatus === st ? "bg-[#143125] text-white shadow-xs" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          }`}
        >
          {st}
        </button>
      ))}
    </div>
    <div className="relative w-48 sm:w-64 md:w-80 shrink-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari Kode Pesanan (ORD-...) atau nama..."
        className="w-full pl-9 pr-3 py-2 h-9 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#143125]/20 focus:border-[#143125]/20 focus:bg-white transition"
      />
    </div>
  </div>
);
