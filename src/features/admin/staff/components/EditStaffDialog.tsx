import { X } from "lucide-react";
import { Staff, StaffRole } from "../types/staff.types";

export const EditStaffDialog = ({
  edit,
  loading,
  onClose,
  onChange,
  onSave,
}: {
  edit: Staff | null;
  loading: boolean;
  onClose: () => void;
  onChange: (s: Staff) => void;
  onSave: () => void;
}) => {
  if (!edit) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-96 space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Edit Staf</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <p className="text-xs text-stone-400">{edit.email}</p>
        <input value={edit.name ?? ""} onChange={e => onChange({ ...edit, name: e.target.value })} placeholder="Nama" className="w-full px-3 py-2 border rounded-lg text-sm" />
        <select value={edit.role ?? "kasir"} onChange={e => onChange({ ...edit, role: e.target.value as StaffRole })} className="w-full px-3 py-2 border rounded-lg text-sm">
          <option value="kasir">Kasir</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={onSave} disabled={loading} className="w-full bg-[#143125] text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-900 disabled:opacity-50">
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </div>
  );
};
