"use client";

import { Container } from "@/components/ui/Container";
import { HowToOrderSection } from "./HowToOrderSection";
import { motion } from "framer-motion";

export const CaraPesanView = () => {
  return (
    <main className="min-h-screen bg-brand-cream text-stone-800 py-12 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-brand-dark text-white rounded-3xl p-8 md:p-14 mb-12 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-brand-mint uppercase bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-4">
              PANDUAN PEMESANAN
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
              Cara Mudah Pesan di <span className="text-brand-mint">Kafe Tarik</span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Pesan langsung dari meja tanpa perlu mengantre. Cukup scan, pilih, bayar, dan ambil sendiri di counter.
            </p>
          </div>
        </motion.div>

        <HowToOrderSection />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-gradient-to-r from-brand-dark to-brand-darker rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-brand-mint/10"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl font-bold text-white">
              Siap untuk memesan?
            </h3>
            <p className="text-stone-300 text-sm max-w-md">
              Lihat ragam menu kopi tarik, teh, dan makanan favorit kami sekarang juga.
            </p>
          </div>
          <a
            href="/menu"
            className="bg-brand-mint text-brand-darker font-bold px-8 py-3.5 rounded-full hover:bg-white hover:text-brand-dark transition duration-300 text-sm whitespace-nowrap shadow-md"
          >
            Lihat Menu Sekarang &rarr;
          </a>
        </motion.div>
      </Container>
    </main>
  );
};
