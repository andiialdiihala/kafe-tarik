"use client";

import { useCartStore } from "@/features/cart/store/cart.store";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

export const MenuCard = ({ item }: { item: any }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  const isDrink =
    item.category?.toLowerCase().includes("kopi") ||
    item.category?.toLowerCase().includes("minuman") ||
    item.category?.toLowerCase().includes("drink");

  const imageUrl = item.image || DEFAULT_IMAGE;

  return (
    <div className="bg-white rounded-2xl p-3.5 shadow-sm hover:shadow-xl border border-stone-200/80 flex flex-col justify-between group transition hover:-translate-y-1">
      <Link href={`/menu/${item.id}`} className="relative w-full aspect-square bg-brand-dark rounded-xl overflow-hidden mb-3 flex items-center justify-center block">
        {item.isPopular && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#2D6A4F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            👑 Best Seller
          </span>
        )}
        <img
          alt={item.name}
          src={imageUrl}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 bg-stone-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
          }}
        />
      </Link>
      <div className="space-y-1">
        <span className="text-[10px] font-bold tracking-widest text-brand-sage uppercase">{item.category || "Lainnya"}</span>
        <Link href={`/menu/${item.id}`}>
          <h3 className="font-display font-semibold text-stone-900 text-[15px] leading-tight line-clamp-1 hover:text-brand-accent transition">{item.name}</h3>
        </Link>
        <p className="text-[12px] text-stone-500 leading-snug line-clamp-2 min-h-[32px]">{item.description || "-"}</p>
        <div className="pt-2 flex items-center justify-between">
          <span className="text-sm font-bold text-brand-dark">Rp {Number(item.price || 0).toLocaleString("id-ID")}</span>
          <button 
            onClick={() => {
              const productToAdd = {
                ...item,
                price: Number(item.price || 0),
                name: isDrink ? `${item.name} (Regular)` : item.name,
              };
              addItem(productToAdd);
              showToast(`${productToAdd.name} ditambah ke keranjang!`);
            }}
            className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center hover:bg-brand-darker transition text-sm shadow active:scale-95"
            aria-label="Tambah ke Keranjang"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
