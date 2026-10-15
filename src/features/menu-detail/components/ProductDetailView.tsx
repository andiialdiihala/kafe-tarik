"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useToast } from "@/components/ui/Toast";
import { Container } from "@/components/ui/Container";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

import { ProductDetailItem } from "../types/menu-detail.types";

export const ProductDetailView = ({ item }: { item: ProductDetailItem }) => {
  const addItem = useCartStore((state) => state.addItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const { showToast } = useToast();

  const finalPrice = Number(item.price || 0);
  const imageUrl = item.image;
  
  return (
    <main className="min-h-screen bg-brand-cream py-12">
      <Container>
        <Link href="/menu" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-dark mb-8 transition">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-brand-dark rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src={imageUrl}
              alt={item.name}
              className="w-full h-full object-cover bg-stone-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
              }}
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold tracking-widest text-brand-mint uppercase bg-brand-dark px-3 py-1 rounded-full capitalize">
              {item.category || "Lainnya"}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-dark">{item.name}</h1>
            <p className="text-stone-600 text-lg leading-relaxed">{item.description || "Tidak ada deskripsi."}</p>

            <div className="text-3xl font-bold text-brand-darker pt-2">
              Rp {finalPrice.toLocaleString("id-ID")}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => {
                  const finalItem = {
                    ...item,
                    price: finalPrice,
                  };
                  addItem(finalItem);
                  showToast(`${finalItem.name} ditambah ke keranjang!`);
                }}
                className="flex-1 inline-flex items-center justify-center gap-3 bg-brand-dark text-white font-bold px-6 py-4 rounded-full hover:bg-brand-darker transition shadow-lg active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" /> Masukkan Keranjang
              </button>

              <Link
                href="/pembayaran"
                onClick={() => {
                  const finalItem = {
                    ...item,
                    price: finalPrice,
                  };
                  clearCart();
                  addItem(finalItem);
                }}
                className="flex-1 inline-flex items-center justify-center gap-3 bg-brand-mint text-brand-dark font-bold px-6 py-4 rounded-full hover:bg-white transition shadow-lg active:scale-95 text-center"
              >
                Bayar Sekarang
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
};
