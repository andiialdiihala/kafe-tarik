"use client";
import { motion } from "framer-motion";

export const HowToOrderSection = () => {
  const steps = [
    {
      step: "01",
      title: "Scan QR Code",
      desc: "Cari sticker QR Code yang ada di atas meja kamu, lalu scan memakai kamera HP atau aplikasi scanner.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      )
    },
    {
      step: "02",
      title: "Pilih Menu",
      desc: "Pilih minuman dan makanan favoritmu dari katalog digital kami, lalu atur jumlah pesanan.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      )
    },
    {
      step: "03",
      title: "Bayar Online",
      desc: "Lakukan pembayaran secara instan via QRIS, e-wallet (Gopay/OVO/ShopeePay), atau Virtual Account.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      )
    },
    {
      step: "04",
      title: "Diproses Barista",
      desc: "Pesanan otomatis masuk ke sistem dapur/bar. Barista langsung meracik pesananmu.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      )
    },
    {
      step: "05",
      title: "Ambil di Counter",
      desc: "Tunggu notifikasi pesanan siap, lalu ambil sendiri pesananmu di counter dengan menunjukkan nomor struk.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((item, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
          className="bg-brand-light-cream border border-brand-mint/20 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:border-brand-mint/50 transition duration-300 relative group"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-mint flex items-center justify-center shadow-md group-hover:scale-110 transition duration-300">
                {item.icon}
              </div>
              <span className="font-display text-3xl font-bold text-brand-accent/30 group-hover:text-brand-accent/60 transition">
                {item.step}
              </span>
            </div>
            <h3 className="font-display text-xl font-bold text-brand-dark mb-2">
              {item.title}
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
