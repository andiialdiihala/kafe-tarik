"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { menuList, menuCategories } from "@/features/menu/data/menu.data";

export const AdminMenuView = () => {
  const [activeCat, setActiveCat] = useState("Semua");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const filtered = menuList.filter((m) => {
    const matchCat = activeCat === "Semua" || m.category === activeCat;
    const q = query.toLowerCase();
    const matchQuery = !q || m.name.toLowerCase().includes(q) || m.description.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Menu</h1>
          <p className="text-xs text-stone-500 mt-1">Kelola daftar produk Kafe Tarik.</p>
        </div>
        <button className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors">
          <Plus className="w-4 h-4" /> Tambah Menu
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {menuCategories.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCat(c); setPage(1); }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition ${activeCat === c ? "bg-[#143125] text-white border-[#143125]" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Cari menu..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#143125]/10 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                <th className="py-3 px-4">Menu</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {paginated.map((m) => (
                <tr key={m.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={m.image} alt={m.name} className="w-10 h-10 object-cover rounded-lg border border-stone-100" />
                    <div>
                      <p className="font-semibold text-stone-900">{m.name}</p>
                      <p className="text-[10px] text-stone-400 truncate max-w-[150px]">{m.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-stone-600">{m.category}</td>
                  <td className="py-3 px-4 font-semibold text-stone-900">Rp {m.price.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-stone-500 hover:text-emerald-700 transition"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-stone-500 hover:text-rose-600 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-stone-100 flex items-center justify-between">
          <p className="text-[11px] text-stone-500">
            Menampilkan <span className="font-semibold">{paginated.length}</span> dari <span className="font-semibold">{filtered.length}</span> menu
          </p>
          <div className="flex items-center gap-1">
            <button 
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-semibold px-2">Halaman {page} dari {totalPages || 1}</span>
            <button 
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-50"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
