"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Kopi Tarik", price: "14k", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnKeCSRT9e-6bafRAAyhTDOzeO7uMm95GlNUKlWRoqBhOnd9HLe1qWgE7M2bvd1phoj7C3lMBVFS-2uZIEW5wI72apj7tpJ67LpDhfUn_lzi2iuA1ITif3BfxidcbOd3GeKYfSk8z6NCi0kIDIx77dUvpwn5V8DB5KfMqGWN4tnnJ11-gccoRXIM3vSMKr0E7r_GeLcTVOmvG4QmUz_-LDZJTAvnzn5qoAbvUYeaVaF-10GL6VhVjCbd5Bw9kOJyCaUIU", popular: true },
  { name: "Teh Tarik", price: "16k", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi15Xu0s-v73IheoxisrS2I85fozB8DFYtvnR7opBaGmniYVkYt9KUWbd3QlLstHTREo-hD4LyZmkqhjtbzltTtRaTuAS6wJXmKeEvmy3z37ad_qJQJSxbexDHRpcjp_9YBjj9pXvMrns9j8G_gFeWULFpa1YYnQIY9mEq1GhWOF0BFB61ybFMUG3SGRcmnTq9cmJXrAPX5QIMLf0RKO8_KNtlwtS7Wpo4K9w7ZZB6ijk7HWh6ZuvyLVauHfCLfHc957w", popular: false },
  { name: "Es Kopi Susu", price: "17k", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDIBChi4ISTIm7sqXs85Qjh9097D82vU1lMLPFyc-c8wQJPkTGSBuHea1R2K_1J8B-Y6OUVP7J0K8W-8qdF6PZFTupk3GW9nKiOALyr88vD2Yem7FkCZ4jORr7CnyU45ibZnk_YuhoealDbDkXTudYQ2kElSZ8X15_ORmFwcPea985wtl12zwzcwkXFBN8Vg2xUvT3F1j5WxXZe3Ftm1R3mzXa0VzAz5Htx0CQSPsnr8j5YHSiB1fRDEvMzvhjOE8mtTU", popular: false },
  { name: "Pisang Goreng", price: "12k", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDIBChi4ISTIm7sqXs85Qjh9097D82vU1lMLPFyc-c8wQJPkTGSBuHea1R2K_1J8B-Y6OUVP7J0K8W-8qdF6PZFTupk3GW9nKiOALyr88vD2Yem7FkCZ4jORr7CnyU45ibZnk_YuhoealDbDkXTudYQ2kElSZ8X15_ORmFwcPea985wtl12zwzcwkXFBN8Vg2xUvT3F1j5WxXZe3Ftm1R3mzXa0VzAz5Htx0CQSPsnr8j5YHSiB1fRDEvMzvhjOE8mtTU", popular: false },
];

export const FavoriteMenu = () => (
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
        {menuItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href="/menu" className="group bg-white rounded-xl md:rounded-2xl p-2.5 md:p-3.5 shadow-sm border border-stone-200/80 flex flex-col justify-between hover:shadow-md hover:border-brand-mint transition">
              <div className="relative w-full aspect-square bg-brand-dark rounded-lg md:rounded-xl overflow-hidden mb-2 md:mb-3 flex items-center justify-center">
                {item.popular && <span className="absolute top-2 left-2 z-10 bg-[#2D6A4F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">👑</span>}
                <img alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" src={item.img} />
              </div>
              <div>
                <h3 className="font-display font-semibold text-stone-900 text-sm md:text-base group-hover:text-brand-dark transition">{item.name}</h3>
                <div className="mt-1 md:mt-2 flex items-center justify-between">
                  <span className="text-xs md:text-sm font-bold text-brand-dark">Rp {item.price}</span>
                  <span className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-brand-dark text-white font-bold flex items-center justify-center text-xs group-hover:bg-brand-mint group-hover:text-brand-dark transition">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);