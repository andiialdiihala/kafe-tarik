"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTopSelling } from "../queries/home.queries";

export const FavoriteMenu = () => {
  const { data: menuItems = [], isLoading } = useTopSelling();

  return (
    <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto" id="menu">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-4 space-y-4"
        >
          <span className="text-xs font-bold tracking-widest text-brand-dark uppercase">MENU FAVORIT</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 leading-snug">
            Pilihan Menu Terbaik Kami
          </h2>
          <p className="text-stone-600 text-sm leading-relaxed">
            Dari kopi klasik hingga varian kekinian, semua bisa kamu pesan dengan mudah melalui website ini.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-brand-dark text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-brand-darker transition shadow-sm"
            >
              Lihat Semua Menu &rarr;
            </Link>
          </div>
        </motion.div>

        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {isLoading ? (
            <p className="text-stone-500">Memuat menu...</p>
          ) : menuItems.length > 0 ? (
            menuItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href="/menu" className="group bg-white rounded-xl md:rounded-2xl p-2.5 md:p-3.5 shadow-sm border border-stone-200/80 flex flex-col justify-between hover:shadow-md hover:border-brand-mint transition">
                  <div className="relative w-full aspect-square bg-brand-dark rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-3 flex items-center justify-center">
                    {i === 0 && <span className="absolute top-2 left-2 z-10 bg-[#2D6A4F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">👑</span>}
                    <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src={item.image} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-stone-900 text-sm md:text-base group-hover:text-brand-dark transition">{item.name}</h3>
                    <div className="mt-1 md:mt-2 flex items-center justify-between">
                      <span className="text-xs md:text-sm font-bold text-brand-dark">Rp {item.price.toLocaleString()}</span>
                      <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-brand-dark text-white font-bold flex items-center justify-center text-xs group-hover:bg-brand-mint group-hover:text-brand-dark transition">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-stone-500">Belum ada menu favorit.</p>
          )}
        </div>
      </div>
    </section>
  );
};