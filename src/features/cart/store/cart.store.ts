import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MenuItem } from "@/features/menu/data/menu.data";

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          // Gunakan ID unik untuk item dengan size berbeda
          const existing = state.items.find((i) => i.item.id === item.id && i.item.name === item.name);
          if (existing) {
            return {
              items: state.items.map((i) =>
                (i.item.id === item.id && i.item.name === item.name) ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { item, quantity: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.item.id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clearCart: () => set({ items: [] }),
    }),
    { name: "kafe-tarik-cart" }
  )
);
