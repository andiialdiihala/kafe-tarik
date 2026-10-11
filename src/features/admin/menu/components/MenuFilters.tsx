import { Search } from "lucide-react";

interface MenuFiltersProps {
  categories: string[];
  activeCat: string;
  setActiveCat: (c: string) => void;
  query: string;
  setQuery: (q: string) => void;
}

export const MenuFilters = ({
  categories,
  activeCat,
  setActiveCat,
  query,
  setQuery,
}: MenuFiltersProps) => (
  <div className="p-4 flex items-center justify-between gap-4 border-b border-stone-100">
    <div className="flex items-center gap-2 overflow-x-auto min-w-0 flex-1 scrollbar-none py-0.5">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setActiveCat(c)}
          className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
            activeCat.toLowerCase() === c.toLowerCase()
              ? "bg-[#143125] text-white border-[#143125]"
              : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
    <div className="relative w-48 sm:w-64 md:w-72 shrink-0">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
        <Search className="w-4 h-4" />
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari menu..."
        className="w-full pl-9 pr-3 py-2 h-9 rounded-xl border border-stone-200 bg-stone-50 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#143125]/10 focus:border-[#143125]/20 focus:bg-white transition"
      />
    </div>
  </div>
);
