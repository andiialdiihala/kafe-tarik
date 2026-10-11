"use client";

import { useCartStore } from "../store/cart.store";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CartSection = () => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();

  const subtotal = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const total = subtotal;

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 px-6 max-w-xl mx-auto text-center"
      >
        <div className="w-20 h-20 bg-brand-dark/5 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
          🛒
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900">Keranjang Masih Kosong</h2>
        <p className="text-stone-500 text-sm mt-2 mb-6">
          Yuk cari kopi atau camilan favoritmu dan nikmati tanpa antre!
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 bg-brand-dark hover:bg-brand-darker text-white font-medium text-sm px-6 py-3 rounded-full transition shadow"
        >
          Lihat Menu
        </Link>
      </motion.div>
    );
  }

  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <Link href="/menu" className="p-2 bg-white rounded-full border border-stone-200 hover:bg-stone-50">
            <ArrowLeft className="w-5 h-5 text-stone-700" />
          </Link>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900">
            Keranjang Pesanan
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" /> Kosongkan
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <motion.div 
          layout
          className="lg:col-span-7 space-y-4"
        >
          <AnimatePresence>
            {items.map(({ item, quantity }) => (
              <motion.div
                layout
                key={`${item.id}-${item.name}`}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm flex items-center gap-4"
              >
                <img
                  src={`${item.image}?t=${Date.now()}`}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-brand-dark shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-stone-900 text-base truncate">
                    {item.name.includes('(') ? item.name.split('(')[0] : item.name}
                  </h3>
                  {item.name.includes('(') && (
                    <p className="text-[10px] font-bold text-brand-mint bg-brand-dark inline-block px-1.5 py-0.5 rounded-md mt-0.5">
                      {item.name.match(/\(([^)]+)\)/)?.[1]}
                    </p>
                  )}
                  <p className="text-xs text-stone-500 mt-1">{item.category}</p>
                  <p className="text-sm font-bold text-brand-dark mt-1">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-stone-400 hover:text-red-500 transition"
                    aria-label="Hapus Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-full border border-stone-200">
                    <button
                      onClick={() => updateQuantity(item.id, quantity - 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs shadow-sm hover:bg-stone-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, quantity + 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs shadow-sm hover:bg-stone-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm sticky top-24"
        >
          <h3 className="font-display font-extrabold text-xl text-stone-900 mb-5">Ringkasan Pesanan</h3>
          <div className="space-y-3.5 text-[15px] pb-5 border-b border-stone-100">
            <div className="flex justify-between text-stone-600">
              <span className="font-medium">Total Item</span>
              <span className="font-bold text-stone-900">{items.reduce((acc, curr) => acc + curr.quantity, 0)} pcs</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold text-stone-900">Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-5 text-lg font-bold text-stone-900">
            <span className="font-display tracking-tight">Total Pembayaran</span>
            <span className="text-brand-dark text-2xl font-extrabold font-display">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
          <Link
            href="/pembayaran"
            className="w-full mt-2 block text-center bg-brand-dark hover:bg-brand-darker text-white font-medium py-3.5 rounded-full transition shadow-lg text-sm"
          >
            Lanjut ke Pembayaran
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
