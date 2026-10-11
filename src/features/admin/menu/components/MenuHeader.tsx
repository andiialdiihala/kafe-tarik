import { Plus } from "lucide-react";

interface MenuHeaderProps {
  onAdd: () => void;
}

export const MenuHeader = ({ onAdd }: MenuHeaderProps) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold font-display text-brand-dark">Menu</h1>
      <p className="text-xs text-stone-500 mt-1">
        Kelola daftar produk Kafe Tarik yang tampil di halaman pelanggan.
      </p>
    </div>
    <button
      onClick={onAdd}
      className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-sm cursor-pointer"
    >
      <Plus className="w-4 h-4" /> Tambah Menu
    </button>
  </div>
);
