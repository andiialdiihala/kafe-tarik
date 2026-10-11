import { Search, Edit2, Trash2 } from "lucide-react";
import { Staff } from "../types/staff.types";

export const StaffTable = ({
  staff,
  q,
  onQChange,
  onEdit,
  onDelete,
}: {
  staff: Staff[];
  q: string;
  onQChange: (v: string) => void;
  onEdit: (s: Staff) => void;
  onDelete: (id: string) => void;
}) => {
  const filtered = staff.filter(s => s.name?.toLowerCase().includes(q.toLowerCase()) || s.email?.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="bg-white rounded-xl border border-stone-200/70 overflow-hidden">
      <div className="p-4 flex items-center justify-between gap-4 border-b border-stone-100">
        <h2 className="text-sm font-bold text-stone-800 shrink-0">Daftar Staf</h2>
        <div className="relative w-48 sm:w-64 md:w-72 shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            value={q}
            onChange={(e) => onQChange(e.target.value)}
            placeholder="Cari staf..."
            className="w-full pl-9 pr-3 py-2 h-9 rounded-xl border border-stone-200 bg-stone-50 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#143125]/10 focus:border-[#143125]/20 focus:bg-white transition"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="text-[11px] font-bold text-stone-400 uppercase border-b border-stone-100"><th className="py-3 px-4">Staf</th><th className="py-3 px-4">Role</th><th className="py-3 px-4 text-right">Aksi</th></tr></thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {filtered.map(s => (
              <tr key={s.id} className="hover:bg-stone-50/70">
                <td className="py-3 px-4"><div><p className="font-semibold text-stone-900">{s.name || "Pending"}</p><p className="text-[11px] text-stone-400">{s.email}</p></div></td>
                <td className="py-3 px-4 capitalize">{s.role}</td>
                <td className="py-3 px-4 text-right flex justify-end gap-1">
                  <button onClick={() => onEdit(s)} className="p-1.5 text-stone-500 hover:text-brand-dark"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => onDelete(s.id)} className="p-1.5 text-stone-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
