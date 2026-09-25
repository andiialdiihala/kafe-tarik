"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

export const TentangView = () => {
  const values = [
    { title: "Autentik", desc: "Resep peranakan asli yang terjaga turun-temurun." },
    { title: "Kualitas", desc: "Bahan baku pilihan untuk rasa terbaik." },
    { title: "Ramah", desc: "Suasana nyaman untuk berbagi cerita." },
  ];

  return (
    <main className="min-h-screen bg-brand-cream text-stone-800 py-12 md:py-20">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold tracking-widest text-brand-accent uppercase bg-brand-accent/10 px-4 py-1.5 rounded-full inline-block mb-4">
            TENTANG KAMI
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-brand-dark tracking-tight mb-6">
            Cerita Dibalik <br className="hidden sm:block" /> Secangkir Kopi Tarik
          </h1>
          <p className="text-stone-600 text-lg leading-relaxed">
            Lebih dari sekadar kafe, kami adalah tempat bertemunya tradisi dan modernitas di jantung Kota Palu.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTbKF5aHxMm73PFgRAtpjolRIquuse8uw33RbaZYiDZdbEkEIK6w8jERb3L85PQpFTiPpZdRDCanq5yK6HZH6QwkEgtMZFm7O9RjDz5Zlj2yBuTB1IFBWxQa0k4ltBAJcwvvXXOtLHnXquPAUEK3IyNk5dR6ygjygbBUh16g8d_IS1L8KFlkSsqCHqEbd1WyN026K8yN-WyclarBijbWCAcC59OrRN-KsagNQia33wDrYCdIf7ADoF-XW3GROlgkRY4II" 
                alt="Suasana Kafe Tarik" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="prose prose-stone max-w-none">
              <p className="text-lg leading-relaxed text-stone-700">
                Didirikan dengan kecintaan mendalam pada budaya kopitiam, Kafe Tarik hadir sebagai oase bagi penikmat kopi yang mencari otentisitas. Kami meyakini bahwa setiap tarikan kopi bukan hanya sekadar proses, melainkan seni menjaga rasa.
              </p>
              <p className="text-lg leading-relaxed text-stone-700 mt-4">
                Komitmen kami adalah menggunakan biji kopi lokal kualitas terbaik yang dipadukan dengan teknik tarik tradisional, menghasilkan profil rasa yang pekat, aromatik, dan konsisten di setiap cangkir.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {values.map((v, i) => (
                <motion.div 
                  key={v.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-sm border border-stone-100"
                >
                  <h4 className="font-bold text-brand-dark mb-1">{v.title}</h4>
                  <p className="text-[10px] text-stone-500 leading-tight">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
};