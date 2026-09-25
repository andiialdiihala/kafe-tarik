"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Coffee, CupSoda, UtensilsCrossed, Cookie } from "lucide-react";

type Category = { id: string; name: string; count: number; color: string; bg: string; icon: typeof Coffee };

const initial: Category[] = [
  { id: "1", name: "Kopi", count: 15, color: "text-amber-700", bg: "bg-amber-50", icon: Coffee },
  { id: "2", name: "Non-Kopi", count: 15, color: "text-cyan-700", bg: "bg-cyan-50", icon: CupSoda },
  { id: "3", name: "Makanan", count: 15, color: "text-emerald-700", bg: "bg-emerald-50", icon: UtensilsCrossed },
  { id: "4", name: "Camilan", count: 15, color: "text-orange-700", bg: "bg-orange-50", icon: Cookie },
];

export const CategoriesView = () => {
  const [cats, setCats] = useState<Category[]>(initial);
  const [query, setQuery] = useState("");

  const filtered = cats.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Kategori</h1>
          <p className="text-xs text-stone-500 mt-1">Kelola kategori produk.</p>
        </div>
        <button className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors">
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {initial.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 border border-stone-200/70 shadow-xs flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.color} flex items-center justify-center`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-900">{c.name}</p>
              <p className="text-[11px] text-stone-400">{c.count} produk</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100">
          <h2 className="text-sm font-bold text-stone-800">Daftar Kategori</h2>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kategori..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-[#143125]/10 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Jumlah Produk</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${c.bg} ${c.color} flex items-center justify-center`}>
                      <c.icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-stone-900">{c.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">{c.count}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-stone-500 hover:text-emerald-700 transition"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-stone-500 hover:text-rose-600 transition"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
