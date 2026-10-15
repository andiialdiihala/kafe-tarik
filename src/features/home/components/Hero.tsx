"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Hero = () => (
  <section className="relative bg-brand-dark text-white pt-4 pb-16 sm:pt-6 sm:pb-24 overflow-hidden" id="beranda">
    <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none"></div>
    <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-8 sm:pb-12 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 space-y-6"
      >
        <div className="inline-block">
          <span className="text-xs font-bold tracking-widest text-brand-mint uppercase bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10">
            KOPI TARIK CABANG SIS AL JUFRI
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
          Rasa Nikmat <br className="hidden sm:block" />Tanpa Antri
        </h1>
        <p className="text-stone-300 text-base sm:text-lg max-w-xl leading-relaxed">
          Sekarang pesan kopi favoritmu lebih mudah! Scan barcode di meja, pilih menu, bayar, dan tunggu pesananmu tanpa perlu antre di kasir.
        </p>
        <div className="pt-2">
          <Link className="inline-flex items-center gap-3 bg-brand-mint hover:bg-[#8ec0b0] text-brand-dark font-display font-semibold text-base sm:text-lg px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5" href="/menu">
            <svg className="w-5 h-5 text-brand-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            Pesan Sekarang
            <span className="text-lg">→</span>
          </Link>
        </div>
        <div className="pt-6 sm:pt-8 grid grid-cols-3 gap-3 sm:gap-4 border-t border-white/10 max-w-lg">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="text-xs font-medium text-stone-300 leading-tight">Menu Lengkap &amp; Favorit</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="text-xs font-medium text-stone-300 leading-tight">Proses Cepat &amp; Mudah</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <span className="text-xs font-medium text-stone-300 leading-tight">Aman &amp; Terpercaya</span>
          </div>
        </div>
      </motion.div>
      <div className="lg:col-span-5 relative flex flex-col items-center justify-center mt-4 lg:mt-0">
        <div className="absolute -top-2 right-2 sm:-top-6 sm:right-6 lg:right-0 z-20 text-center select-none">
          <div className="font-handwriting text-lg sm:text-2xl lg:text-3xl text-stone-200 rotate-6 leading-tight tracking-wide">
            Kopi Tarik Asli,<br /><span className="text-brand-mint">Rasa Istimewa!</span>
          </div>
          <svg className="w-14 h-8 mx-auto text-brand-mint mt-1 stroke-current fill-none" viewBox="0 0 50 30">
            <path d="M5 25 C 20 28, 35 20, 42 5 M 34 8 L 43 4 L 43 14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </div>
        <div className="relative w-full flex justify-center">
          <img alt="Kopi Tarik Segar" className="max-h-[320px] sm:max-h-[460px] lg:max-h-[520px] w-auto object-contain drop-shadow-2xl transition duration-500 hover:scale-105 select-none relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCeEbnB4SU7dOK9zyXb3y21HiZsYaT-Gn92Fep5UMv_kxJDYMsA589RBPOqk9QvMZdkNu32AtH7B2U65HSoxPTbEZsu-X-gZeBL0L5kJC4jNiwkiUJZKkFZ_qFW7vm-BRtukurDjhsOjW3rzfB8yzHv8Smw0fPLqTzmxq1ey8ElS1SRo6oZhTUV_9qDTpXjME15qysJjkcp50Jwcs6YTw6LyfLzXS_OCOvRrNYWlh75265oK5-yrcxtOcj7TodCRtsCsA" />
        </div>
      </div>
    </div>
  </section>
);
