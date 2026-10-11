import { Plus } from "lucide-react";

export const StaffHeader = ({ onAdd }: { onAdd: () => void }) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-2xl font-bold font-display text-brand-dark">Staf</h1>
      <p className="text-xs text-stone-500 mt-1">Kelola akses dan peran tim Kafe Tarik.</p>
    </div>
    <button onClick={onAdd} className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition">
      <Plus className="w-4 h-4" /> Tambah Staf
    </button>
  </div>
);
