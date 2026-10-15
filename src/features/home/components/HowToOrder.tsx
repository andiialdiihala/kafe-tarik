"use client";
import { motion } from "framer-motion";

export const HowToOrder = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="bg-brand-dark text-white py-14 sm:py-20 px-4 sm:px-6 relative overflow-hidden" 
    id="cara-pesan"
  >
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
      <motion.div 
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-5 flex justify-center"
      >
        <div className="relative max-w-md w-full flex justify-center">
          <div className="relative flex items-center justify-center p-2">
            <div className="absolute inset-0 bg-brand-mint/10 rounded-full blur-2xl pointer-events-none transform scale-90"></div>
            <img alt="Scan QR Code Kafe Tarik" className="w-full max-w-md h-auto object-contain transform hover:scale-105 transition duration-500 relative z-10 select-none drop-shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3qqTF_WngvKoXLY8xeqRtmfq6CjcG5Psk-krQhqkI_D6aWBsevYPtMmeuCbw3agsDZCGzoc9AhiFP2f7xZMBCLlfsKrqt2jV2z5m_7zm-OwmoNEL4yULzuELSUKyER6GR4SCYVBN71IRA6fRda2hoFcLyi8YBmK56XSwOAEodri5Ii4AxOmHakQpiOm4fxDOSF2lSqXF-VcTb7AmIf3QcfH2oFqoN8WOMTf36BklEhaMKxqxqURpeVxaQxE3co-kN5S0" />
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 space-y-8"
      >
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-mint uppercase bg-white/10 px-3.5 py-1 rounded-full">
            CARA PESAN
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
            Mudahnya Pesan di Sini
          </h2>
          <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-lg">
            Cukup scan barcode di meja, pilih menu, selesaikan pembayaran, dan tunggu pesananmu.
          </p>
        </div>
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-5 gap-4 sm:gap-y-6 sm:gap-x-2 text-center pt-4 pb-2 sm:pb-0 -mx-1 sm:mx-0 snap-x snap-mandatory">
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center min-w-[100px] shrink-0 snap-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-stone-200 mt-2.5 leading-tight">1. Scan QR Code di Meja</p>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center min-w-[100px] shrink-0 snap-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-stone-200 mt-2.5 leading-tight">2. Pilih Menu &amp; Jumlah</p>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="flex flex-col items-center min-w-[100px] shrink-0 snap-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-stone-200 mt-2.5 leading-tight">3. Lakukan Pembayaran</p>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center min-w-[100px] shrink-0 snap-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-stone-200 mt-2.5 leading-tight">4. Pesanan Diproses</p>
          </motion.div>
          <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-col items-center min-w-[100px] shrink-0 snap-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-brand-dark flex items-center justify-center font-bold shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
            </div>
            <p className="text-[11px] sm:text-xs font-medium text-stone-200 mt-2.5 leading-tight">5. Ambil di Counter</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.section>
);
