"use client";
import { Store, MapPin, Phone, Save } from "lucide-react";
export const SettingsView = () => (
  <div className="space-y-6 max-w-3xl">
    <div><h1 className="text-2xl font-bold font-display text-brand-dark">Pengaturan</h1><p className="text-xs text-stone-500 mt-1">Atur informasi toko dan preferensi.</p></div>
    <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs p-6 space-y-5">
      <div className="flex items-center gap-3 pb-4 border-b border-stone-100"><div className="w-10 h-10 rounded-xl bg-[#eaf3ee] text-[#1e5138] flex items-center justify-center"><Store className="w-5 h-5"/></div><div><p className="text-sm font-bold text-stone-800">Profil Toko</p><p className="text-[11px] text-stone-400">Informasi yang tampil di struk & pelanggan</p></div></div>
      <div><label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5"><Store className="w-3 h-3"/> Nama Toko</label><input defaultValue="Kafe Tarik" className="mt-1.5 w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 focus:border-[#143125]/20 bg-stone-50 focus:bg-white"/></div>
      <div><label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5"><MapPin className="w-3 h-3"/> Alamat</label><input defaultValue="Jl. Sis Aljufri No. 123, Palu" className="mt-1.5 w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 bg-stone-50 focus:bg-white"/></div>
      <div><label className="text-xs font-semibold text-stone-700 flex items-center gap-1.5"><Phone className="w-3 h-3"/> No. WhatsApp</label><input defaultValue="0812-3456-7890" className="mt-1.5 w-full border border-stone-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#143125]/10 bg-stone-50 focus:bg-white"/></div>
      <button className="bg-[#143125] text-white flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-900 transition"><Save className="w-4 h-4"/> Simpan Perubahan</button>
    </div>
  </div>
);
