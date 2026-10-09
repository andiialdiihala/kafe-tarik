"use client";
import { Store, MapPin, Phone, Save, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

export const SettingsView = () => {
  const handleSave = () => toast.success("Pengaturan berhasil disimpan!");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold font-display text-brand-dark">Pengaturan</h1>
        <p className="text-xs text-stone-500 mt-1">Kelola informasi toko, jam operasional, dan kontak bisnis.</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200/70 shadow-sm p-6 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
          <div className="w-10 h-10 rounded-xl bg-[#eaf3ee] text-[#1e5138] flex items-center justify-center">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-stone-800">Profil & Kontak</p>
            <p className="text-[11px] text-stone-400">Informasi utama toko Anda.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-2">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"><Store className="w-3 h-3" /> Nama Toko</label>
            <input defaultValue="Kafe Tarik" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 bg-stone-50 focus:bg-white" />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"><MapPin className="w-3 h-3" /> Alamat Lengkap</label>
            <textarea rows={3} defaultValue="Jl. Sis Aljufri No. 123, Palu" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 bg-stone-50 focus:bg-white" />
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"><Phone className="w-3 h-3" /> No. WhatsApp</label>
            <input defaultValue="0812-3456-7890" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 bg-stone-50 focus:bg-white" />
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5 mb-1.5"><Mail className="w-3 h-3" /> Email Bisnis</label>
            <input type="email" defaultValue="kontak@kafetarik.com" className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 bg-stone-50 focus:bg-white" />
          </div>
        </div>

        <button onClick={handleSave} className="bg-[#143125] text-white flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-emerald-900 transition w-full justify-center shadow-lg">
          <Save className="w-4 h-4" /> Simpan Pengaturan
        </button>
      </div>
    </div>
  );
};
