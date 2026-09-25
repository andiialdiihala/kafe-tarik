"use client";
import { motion } from "framer-motion";

export const AboutSection = () => (
  <motion.section 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="py-24 px-6 max-w-7xl mx-auto" 
    id="tentang-kami"
  >
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <motion.div 
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-5 space-y-4"
      >
        <span className="text-xs font-bold tracking-widest text-brand-dark uppercase">TENTANG KAMI</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Kopi Berkualitas, Rasa Tak Terlupakan
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Kafe Tarik hadir untuk menemani hari-harimu dengan rasa kopi terbaik dan suasana yang nyaman. Nikmati pengalaman ngopi yang lebih praktis bersama kami.
        </p>
        <div className="pt-4">
          <a className="inline-flex items-center gap-3 bg-brand-dark hover:bg-brand-darker text-white font-medium text-sm px-6 py-3 rounded-full transition shadow hover:shadow-lg" href="/tentang">
            Tentang Kami <span>→</span>
          </a>
        </div>
      </motion.div>
      <motion.div 
        initial={{ x: 30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-7 relative flex justify-center lg:justify-end"
      >
        <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAF7F2] transition duration-500 hover:shadow-2xl" style={{ boxShadow: "rgba(22, 55, 40, 0.15) 0px 20px 40px -15px" }}>
          <img alt="Outlet Kafe Tarik Cabang Sis Al Jufri" className="w-full h-auto object-cover transform hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMk6N6nrhI3kmgA3nHWM_MCjK2EWhPX8ajTaiGDfMc9E3MeMTBIQtGDeeQzqoPRYpNLZA5Iem7cwLmR1MbBtIHE_9Ub_DfbKeG2WN28QNgLlLdZwA_XJvCXB9bihp_6hQI5kNAr6DXis202dL9-_dm0zcNIKB3cAbcI1THlm6rlyNMY7MA-XZQw-_q4OYTiQ8d9DsC0jmqHVExP4ZRAK3hevybcDbsigZu1ec59k1vG90NNi_yhDurHA6vNoSp07Fjp8U" />
          <div className="absolute inset-0 pointer-events-none rounded-3xl" style={{ boxShadow: "rgba(246, 241, 234, 0.2) 0px 0px 35px inset" }}></div>
        </div>
        <div className="absolute -top-6 -right-3 sm:-top-8 sm:right-4 z-20 bg-brand-dark text-white rounded-full p-4 sm:p-6 shadow-xl border-2 border-brand-mint flex flex-col items-center justify-center text-center transform rotate-6">
          <span className="font-handwriting text-xl sm:text-2xl text-brand-mint leading-none">Selamat<br />Menikmati!</span>
          <span className="text-2xl mt-1">☕</span>
        </div>
      </motion.div>
    </div>
  </motion.section>
);
