"use client";

import { useState } from "react";
import { MenuCard } from "./MenuCard";
import { motion, AnimatePresence } from "framer-motion";

interface MenuSectionProps {
  initialMenu?: any[];
  initialCategories?: any[];
}

export const MenuSection = ({ initialMenu = [], initialCategories = [] }: MenuSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categoryNames = initialCategories.length > 0
    ? ["Semua", ...initialCategories.map((c: any) => c.name)]
    : ["Semua"];

  const filtered = initialMenu.filter((item) => {
    const matchCategory =
      activeCategory === "Semua" ||
      (item.category && item.category.toLowerCase() === activeCategory.toLowerCase());
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(search.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const getPages = (): (number | string)[] => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, "...", totalPages];
    if (currentPage >= totalPages - 1) return [1, "...", totalPages - 1, totalPages];
    return [1, "...", currentPage, totalPages];
  };

  return (
    <section className="py-10 md:py-16 px-5 md:px-6 max-w-7xl mx-auto" id="menu-list">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-10"
      >
        <span className="text-xs font-bold tracking-widest text-brand-dark uppercase bg-brand-mint/20 px-4 py-1.5 rounded-full border border-brand-mint/30">
          DAFTAR MENU KAMI
        </span>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mt-4 leading-tight">
          Pilih Favoritmu, <span className="text-brand-dark">Pesan Sekarang</span>
        </h1>
        <p className="text-stone-500 text-sm sm:text-base mt-3 leading-relaxed">
          Semua menu dibuat dari bahan pilihan dengan racikan otentik.
        </p>

        <div className="relative mt-6 max-w-md mx-auto">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Cari kopi tarik, pisang goreng..."
            className="w-full pl-11 pr-4 py-3.5 rounded-full border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark shadow-sm"
          />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10"
      >
        {categoryNames.map((cat: string) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all border capitalize ${
              activeCategory.toLowerCase() === cat.toLowerCase()
                ? "bg-brand-dark text-white border-brand-dark shadow-lg scale-105"
                : "bg-white text-stone-600 border-stone-200 hover:border-brand-dark hover:text-brand-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {filtered.length > 0 ? (
        <>
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
            <AnimatePresence>
              {paginatedItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-9 h-9 md:w-10 md:h-10 flex shrink-0 items-center justify-center bg-white border border-stone-200 rounded-full disabled:opacity-40 hover:border-brand-dark hover:text-brand-dark transition"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="flex items-center gap-1.5 md:gap-2">
                {getPages().map((p, idx) =>
                  p === "..." ? (
                    <span key={`dots-${idx}`} className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-stone-400 text-sm select-none">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p as number)}
                      className={`w-9 h-9 md:w-10 md:h-10 shrink-0 rounded-full text-sm font-semibold border transition ${
                        currentPage === p ? "bg-brand-dark text-white border-brand-dark shadow-md scale-105" : "bg-white border-stone-200 text-stone-600 hover:border-brand-dark hover:text-brand-dark"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-9 h-9 md:w-10 md:h-10 flex shrink-0 items-center justify-center bg-white border border-stone-200 rounded-full disabled:opacity-40 hover:border-brand-dark hover:text-brand-dark transition"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          )}
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-display font-semibold text-stone-800">Menu tidak ditemukan</p>
          <p className="text-sm text-stone-500 mt-1">Coba kata kunci atau kategori lain ya.</p>
        </motion.div>
      )}
    </section>
  );
};