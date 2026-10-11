"use client";
import { useState, useEffect } from "react";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { inviteStaff, deleteStaff, updateStaff } from "../actions/staff.actions";
import { getStaff } from "../queries/staff.queries";
import { Staff, StaffRole } from "../types/staff.types";
import { toast } from "sonner";

export const StaffView = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [q, setQ] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<StaffRole>("kasir");
  const [edit, setEdit] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    const data = await getStaff();
    setStaff(data);
  };

  useEffect(() => { refresh(); }, []);

  const handleInvite = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await inviteStaff(email, role);
      toast.success("Undangan terkirim");
      setShowModal(false);
      setEmail("");
      refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Gagal mengundang");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin hapus?")) return;
    await deleteStaff(id);
    toast.success("Staf dihapus");
    refresh();
  };

  const openEdit = (s: Staff) => {
    setEdit(s);
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    if (!edit) return;
    setLoading(true);
    try {
      await updateStaff(edit.id, { name: edit.name ?? "", role: edit.role ?? "kasir" });
      toast.success("Staf diperbarui");
      setShowEdit(false);
      refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Gagal memperbarui");
    } finally { setLoading(false); }
  };

  const filtered = staff.filter(s => s.name?.toLowerCase().includes(q.toLowerCase()) || s.email?.toLowerCase().includes(q.toLowerCase()));


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Staf</h1>
          <p className="text-xs text-stone-500 mt-1">Kelola akses dan peran tim Kafe Tarik.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition">
          <Plus className="w-4 h-4" /> Tambah Staf
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-96 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Tambah Staf</h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email..." className="w-full px-3 py-2 border rounded-lg text-sm" />
            <select value={role} onChange={e => setRole(e.target.value as any)} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="kasir">Kasir</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleInvite} disabled={loading} className="w-full bg-[#143125] text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-900">
              {loading ? "Mengirim..." : "Kirim Undangan"}
            </button>
          </div>
        </div>
      )}

      {showEdit && edit && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-96 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-lg">Edit Staf</h2>
              <button onClick={() => setShowEdit(false)}><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-stone-400">{edit.email}</p>
            <input value={edit.name} onChange={e => setEdit({ ...edit, name: e.target.value })} placeholder="Nama" className="w-full px-3 py-2 border rounded-lg text-sm" />
            <select value={edit.role} onChange={e => setEdit({ ...edit, role: e.target.value })} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="kasir">Kasir</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleUpdate} disabled={loading} className="w-full bg-[#143125] text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-900">
              {loading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-stone-200/70 overflow-hidden">
        <div className="p-4 flex items-center justify-between gap-4 border-b border-stone-100">
          <h2 className="text-sm font-bold text-stone-800 shrink-0">Daftar Staf</h2>
          <div className="relative w-48 sm:w-64 md:w-72 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
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
                    <button onClick={() => openEdit(s)} className="p-1.5 text-stone-500 hover:text-brand-dark"><Edit2 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-stone-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
