"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, AlertCircle, Upload, X } from "lucide-react";
import { addCategory, updateCategory, deleteCategory } from "../actions-mutation";
import { toast } from "sonner";

const DEFAULT_ICON = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80";

export const CategoriesView = ({ initialCategories = [] }: { initialCategories?: any[] }) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [addPreview, setAddPreview] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cats = initialCategories.map((c: any) => ({
    id: c.id,
    name: c.name,
    icon: c.icon || DEFAULT_ICON,
    count: Number(c.count || 0),
  }));

  const filtered = cats.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await addCategory(formData);
      setIsOpen(false);
      setAddPreview(null);
      toast.success("Kategori berhasil ditambahkan!");
    } catch (err: any) {
      toast.error(err.message || "Gagal menambahkan kategori");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateCategory(editingItem.id, formData);
      setEditingItem(null);
      setEditPreview(null);
      toast.success("Kategori berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui kategori");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async (id: string) => {
    setIsSubmitting(true);
    try {
      await deleteCategory(id);
      setDeletingId(null);
      toast.success("Kategori berhasil dihapus!");
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus kategori");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (isEdit) setEditPreview(url);
      else setAddPreview(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Kategori</h1>
          <p className="text-xs text-stone-500 mt-1">Kelola kategori produk dan gambar/icon kategorinya.</p>
        </div>
        <button
          onClick={() => {
            setAddPreview(null);
            setIsOpen(true);
          }}
          className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Kategori
        </button>
      </div>

      {/* MODAL TAMBAH KATEGORI */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl w-full max-w-sm space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-sm font-bold text-stone-900">Tambah Kategori Baru</h2>
              <button type="button" onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-600 p-1 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Kategori</label>
                <input name="name" placeholder="cth. Kopi / Makanan / Snack" required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
              </div>

              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 space-y-3">
                <label className="block font-semibold text-stone-700 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#143125]" /> Upload Gambar / Icon
                </label>

                <input
                  name="iconFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, false)}
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-600 text-xs"
                />

                {addPreview && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-stone-300">
                    <img src={addPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] text-stone-500 mb-1">Atau URL Gambar (opsional):</label>
                  <input
                    name="iconUrl"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none text-[11px]"
                    onChange={(e) => {
                      if (e.target.value) setAddPreview(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-stone-50">
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#143125] text-white rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Kategori"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL EDIT KATEGORI */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form onSubmit={handleEdit} className="bg-white p-6 rounded-2xl w-full max-w-sm space-y-4 shadow-xl border border-stone-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-sm font-bold text-stone-900">Edit Kategori</h2>
              <button type="button" onClick={() => { setEditingItem(null); setEditPreview(null); }} className="text-stone-400 hover:text-stone-600 p-1 rounded-lg">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Kategori</label>
                <input name="name" defaultValue={editingItem.name} required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
              </div>

              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 space-y-3">
                <label className="block font-semibold text-stone-700 flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5 text-[#143125]" /> Ubah Gambar / Icon
                </label>

                <input
                  name="iconFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                  className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-600 text-xs"
                />

                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-stone-300 shrink-0">
                    <img
                      src={editPreview || editingItem.icon}
                      alt={editingItem.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_ICON;
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-500">Gambar saat ini. Upload file baru jika ingin mengganti.</p>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-500 mb-1">Atau ganti URL Gambar:</label>
                  <input
                    name="iconUrl"
                    type="url"
                    defaultValue={editingItem.icon?.startsWith("http") ? editingItem.icon : ""}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none text-[11px]"
                    onChange={(e) => {
                      if (e.target.value) setEditPreview(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => { setEditingItem(null); setEditPreview(null); }} className="px-4 py-2 border rounded-xl text-xs font-semibold hover:bg-stone-50">
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#143125] text-white rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Memperbarui..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white p-7 rounded-2xl w-full max-w-sm space-y-4 shadow-xl border border-stone-200">
            <div className="flex gap-3">
              <AlertCircle className="w-10 h-10 text-rose-500 shrink-0" />
              <div>
                <h2 className="text-sm font-bold">Hapus Kategori?</h2>
                <p className="text-xs text-stone-500 mt-1">Tindakan ini tidak dapat dibatalkan.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setDeletingId(null)} className="px-4 py-2 border rounded-xl text-xs font-semibold">
                Batal
              </button>
              <button
                onClick={() => confirmDelete(deletingId)}
                disabled={isSubmitting}
                className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 disabled:opacity-50"
              >
                {isSubmitting ? "Hapus..." : "Hapus Permanen"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GRID KARTU KATEGORI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cats.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 border border-stone-200/70 shadow-xs flex items-center gap-3.5 hover:border-emerald-700/30 transition">
            <img
              src={c.icon}
              alt={c.name}
              className="w-12 h-12 rounded-xl object-cover border border-stone-100 shrink-0 bg-stone-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_ICON;
              }}
            />
            <div>
              <p className="text-xs font-bold text-stone-900 capitalize">{c.name}</p>
              <p className="text-[11px] text-stone-400">{c.count} produk</p>
            </div>
          </div>
        ))}
      </div>

      {/* TABEL DAFTAR KATEGORI */}
      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100">
          <h2 className="text-sm font-bold text-stone-800">Daftar Kategori</h2>
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari kategori..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs focus:outline-none focus:ring-2 focus:ring-[#143125]/10 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Jumlah Produk</th>
                <th className="py-3 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="py-12 text-center text-stone-400">Belum ada kategori.</td></tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.icon}
                          alt={c.name}
                          className="w-10 h-10 rounded-lg object-cover border border-stone-100 shrink-0 bg-stone-100"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_ICON;
                          }}
                        />
                        <span className="font-semibold text-stone-900 capitalize">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">{c.count}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditPreview(null);
                            setEditingItem(c);
                          }}
                          className="p-1.5 text-stone-500 hover:text-emerald-700 transition"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeletingId(c.id)} className="p-1.5 text-stone-500 hover:text-rose-600 transition">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
