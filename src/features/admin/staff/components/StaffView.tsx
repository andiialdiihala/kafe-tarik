"use client";
import { useState } from "react";
import { Search, Plus, ShieldCheck, UserCog, Eye, Edit2, Trash2 } from "lucide-react";

const staff = [
  { id: "1", name: "Admin Kafe", email: "admin@kafetarik.com", role: "Admin", status: "Aktif", avatar: "https://i.pravatar.cc/100?img=12" },
  { id: "2", name: "Budi Kasir", email: "budi@kafetarik.com", role: "Kasir", status: "Aktif", avatar: "https://i.pravatar.cc/100?img=15" },
  { id: "3", name: "Siti Barista", email: "siti@kafetarik.com", role: "Staf", status: "Nonaktif", avatar: "https://i.pravatar.cc/100?img=23" },
];

const roleBadge: Record<string,string> = {
  Admin: "bg-[#143125] text-white",
  Kasir: "bg-blue-50 text-blue-600 border border-blue-200",
  Staf: "bg-stone-100 text-stone-600 border border-stone-200",
};

export const StaffView = () => {
  const [q, setQ] = useState("");
  const filtered = staff.filter(s => s.name.toLowerCase().includes(q.toLowerCase()) || s.email.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Staf</h1>
          <p className="text-xs text-stone-500 mt-1">Kelola akses dan peran tim Kafe Tarik.</p>
        </div>
        <button className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition">
          <Plus className="w-4 h-4"/> Tambah Staf
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-stone-200/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eaf3ee] text-[#1e5138] flex items-center justify-center"><ShieldCheck className="w-5 h-5"/></div>
          <div><p className="text-[11px] text-stone-500">Total Staf</p><p className="text-xl font-extrabold">{staff.length}</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><UserCog className="w-5 h-5"/></div>
          <div><p className="text-[11px] text-stone-500">Aktif</p><p className="text-xl font-extrabold">{staff.filter(s=>s.status==="Aktif").length}</p></div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-stone-200/70 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-600 flex items-center justify-center"><Eye className="w-5 h-5"/></div>
          <div><p className="text-[11px] text-stone-500">Role</p><p className="text-xs font-bold">Admin · Kasir · Staf</p></div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200/70 overflow-hidden">
        <div className="p-4 flex justify-between border-b border-stone-100">
          <h2 className="text-sm font-bold">Daftar Staf</h2>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari staf..." className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-[#143125]/10"/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="text-[11px] font-bold text-stone-400 uppercase border-b border-stone-100"><th className="py-3 px-4">Staf</th><th className="py-3 px-4">Role</th><th className="py-3 px-4">Status</th><th className="py-3 px-4 text-right">Aksi</th></tr></thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filtered.map(s=>(
                <tr key={s.id} className="hover:bg-stone-50/70">
                  <td className="py-3 px-4 flex items-center gap-3"><img src={s.avatar} className="w-8 h-8 rounded-full"/><div><p className="font-semibold text-stone-900">{s.name}</p><p className="text-[11px] text-stone-400">{s.email}</p></div></td>
                  <td className="py-3 px-4"><span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${roleBadge[s.role]}`}>{s.role}</span></td>
                  <td className="py-3 px-4"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${s.status==="Aktif"?"bg-emerald-50 text-emerald-600 border-emerald-200":"bg-stone-100 text-stone-500 border-stone-200"}`}>{s.status}</span></td>
                  <td className="py-3 px-4 text-right flex justify-end gap-1"><button className="p-1.5 text-stone-500 hover:text-emerald-700"><Edit2 className="w-3.5 h-3.5"/></button><button className="p-1.5 text-stone-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5"/></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};