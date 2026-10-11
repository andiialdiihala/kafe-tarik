import { X } from "lucide-react";
import { StaffRole } from "../types/staff.types";

export const InviteStaffDialog = ({
  open,
  email,
  role,
  loading,
  onClose,
  onEmailChange,
  onRoleChange,
  onInvite,
}: {
  open: boolean;
  email: string;
  role: StaffRole;
  loading: boolean;
  onClose: () => void;
  onEmailChange: (v: string) => void;
  onRoleChange: (v: StaffRole) => void;
  onInvite: () => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-96 space-y-4 shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Tambah Staf</h2>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <input value={email} onChange={e => onEmailChange(e.target.value)} placeholder="Email..." className="w-full px-3 py-2 border rounded-lg text-sm" />
        <select value={role} onChange={e => onRoleChange(e.target.value as StaffRole)} className="w-full px-3 py-2 border rounded-lg text-sm">
          <option value="kasir">Kasir</option>
          <option value="admin">Admin</option>
        </select>
        <button onClick={onInvite} disabled={loading} className="w-full bg-[#143125] text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-900 disabled:opacity-50">
          {loading ? "Mengirim..." : "Kirim Undangan"}
        </button>
      </div>
    </div>
  );
};
