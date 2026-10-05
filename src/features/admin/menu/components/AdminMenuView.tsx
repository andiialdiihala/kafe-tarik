"use client";

import { useState } from "react";
import { Search, Plus, Edit2, Trash2, ChevronLeft, ChevronRight, X, AlertCircle, Upload, Image as ImageIcon } from "lucide-react";
import { addProduct, updateProduct, deleteProduct } from "../actions-mutation";
import { toast } from "sonner";

export const AdminMenuView = ({ initialMenu = [], initialCategories = [] }: { initialMenu?: any[], initialCategories?: any[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addPreview, setAddPreview] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Semua", ...initialCategories.map((c: any) => c.name)];
  const [activeCat, setActiveCat] = useState("Semua");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await addProduct(formData);
      setIsModalOpen(false);
      setAddPreview(null);
      toast.success("Menu berhasil ditambahkan!");
    } catch (err: any) {
      toast.error(err.message || "Gagal menambahkan menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingItem) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateProduct(editingItem.id, formData);
      setEditingItem(null);
      setEditPreview(null);
      toast.success("Menu berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui menu");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsSubmitting(true);
    try {
      await deleteProduct(deletingId);
      setDeletingId(null);
      toast.success("Menu berhasil dihapus!");
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus menu");
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

  const filtered = initialMenu.filter((m: any) => {
    const matchCat = activeCat === "Semua" || m.category?.toLowerCase() === activeCat.toLowerCase();
    const q = query.toLowerCase();
    const matchQuery = !q || m.name?.toLowerCase().includes(q) || m.description?.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-brand-dark">Menu</h1>
          <p className="text-xs text-stone-500 mt-1">Kelola daftar produk Kafe Tarik yang tampil di halaman pelanggan.</p>
        </div>
        <button
          onClick={() => {
            setAddPreview(null);
            setIsModalOpen(true);
          }}
          className="bg-[#143125] text-white flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Tambah Menu
        </button>
      </div>

      {/* MODAL TAMBAH MENU */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-xl border border-stone-200 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 sticky top-0 bg-white z-10">
              <h2 className="text-base font-bold text-stone-900">Tambah Menu Baru</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600 p-1 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Menu</label>
                <input name="name" placeholder="cth. Es Kopi Tarik Special" required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga (Rp)</label>
                  <input name="price" type="number" placeholder="18000" required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stok Awal</label>
                  <input name="stock" type="number" placeholder="50" required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
                <select name="idCategory" className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20 bg-white">
                  {initialCategories.map((c: any) => (
                    <option key={c.idCategories} value={c.idCategories}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deskripsi</label>
                <textarea name="description" placeholder="Deskripsi singkat menu..." rows={2} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/25" />
              </div>

              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 space-y-3">
                <label className="block font-semibold text-stone-700 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#143125]" /> Upload Gambar Menu
                </label>
                
                <input
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, false)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-600 focus:outline-none"
                />

                {addPreview && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-stone-300">
                    <img src={addPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Atau masukkan URL Foto (opsional):</label>
                  <input
                    name="imageUrl"
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none text-xs"
                    onChange={(e) => {
                      if (e.target.value) setAddPreview(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t sticky bottom-0 bg-white">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600 hover:bg-stone-50 text-xs">
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#143125] text-white rounded-xl font-semibold hover:bg-emerald-900 text-xs transition-colors shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan Menu"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL EDIT MENU */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3 sticky top-0 bg-white z-10">
              <h2 className="text-base font-bold text-stone-900">Edit Menu</h2>
              <button type="button" onClick={() => { setEditingItem(null); setEditPreview(null); }} className="text-stone-400 hover:text-stone-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Menu</label>
                <input name="name" defaultValue={editingItem.name} required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga (Rp)</label>
                  <input name="price" type="number" defaultValue={editingItem.price} required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Stok</label>
                  <input name="stock" type="number" defaultValue={editingItem.stock ?? 0} required className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
                <select name="idCategory" defaultValue={editingItem.idCategory} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20 bg-white">
                  {initialCategories.map((c: any) => (
                    <option key={c.idCategories} value={c.idCategories}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deskripsi</label>
                <textarea name="description" defaultValue={editingItem.description} rows={2} className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/25" />
              </div>

              <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 space-y-3">
                <label className="block font-semibold text-stone-700 flex items-center gap-1.5">
                  <Upload className="w-4 h-4 text-[#143125]" /> Ubah Gambar Menu
                </label>
                
                <input
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, true)}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-600 focus:outline-none"
                />

                <div className="flex items-center gap-3">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-stone-300 shrink-0">
                    <img
                      src={editPreview || editingItem.image}
                      alt={editingItem.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";
                      }}
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">Gambar saat ini. Pilih file baru di atas jika ingin mengganti.</p>
                </div>

                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Atau ganti URL Foto:</label>
                  <input
                    name="imageUrl"
                    type="url"
                    defaultValue={editingItem.image?.startsWith("http") ? editingItem.image : ""}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none text-xs"
                    onChange={(e) => {
                      if (e.target.value) setEditPreview(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t sticky bottom-0 bg-white">
              <button type="button" onClick={() => { setEditingItem(null); setEditPreview(null); }} className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600 hover:bg-stone-50 text-xs">
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 bg-[#143125] text-white rounded-xl font-semibold hover:bg-emerald-900 text-xs transition-colors shadow-sm disabled:opacity-50"
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
                <h2 className="text-sm font-bold">Hapus Menu?</h2>
                <p className="text-xs text-stone-500 mt-1">Tindakan ini tidak dapat dibatalkan. Menu akan hilang dari halaman pelanggan juga.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t">
              <button type="button" onClick={() => setDeletingId(null)} className="px-4 py-2 border rounded-xl text-xs font-semibold">
                Batal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isSubmitting}
                className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 disabled:opacity-50"
              >
                {isSubmitting ? "Hapus..." : "Hapus Permanen"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABEL LIST MENU */}
      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <div className="p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {categories.map((c: string) => (
              <button
                key={c}
                onClick={() => { setActiveCat(c); setPage(1); }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition ${activeCat.toLowerCase() === c.toLowerCase() ? "bg-[#143125] text-white border-[#143125]" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Cari menu..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#143125]/10 transition"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">
                <th className="py-3 px-4">Menu</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Harga</th>
                <th className="py-3 px-4 text-center">Stok</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs">
              {paginated.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-stone-400">Belum ada menu. Tambahkan menu baru.</td></tr>
              ) : paginated.map((m: any) => (
                <tr key={m.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-12 h-12 object-cover rounded-lg border border-stone-100 shrink-0 bg-stone-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";
                      }}
                    />
                    <div>
                      <p className="font-semibold text-stone-900">{m.name}</p>
                      <p className="text-[10px] text-stone-400 truncate max-w-[200px]">{m.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-stone-600 capitalize">{m.category || "-"}</td>
                  <td className="py-3 px-4 font-semibold text-stone-900">Rp {Number(m.price || 0).toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4 text-center font-medium text-stone-600">{m.stock ?? 0}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditPreview(null);
                          setEditingItem(m);
                        }}
                        className="p-1.5 text-stone-500 hover:text-emerald-700 transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeletingId(m.id)} className="p-1.5 text-stone-500 hover:text-rose-600 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-stone-100 flex items-center justify-between">
          <p className="text-[11px] text-stone-500">
            Menampilkan <span className="font-semibold">{paginated.length}</span> dari <span className="font-semibold">{filtered.length}</span> menu
          </p>
          <div className="flex items-center gap-1">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-50"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-semibold px-2">Halaman {page} dari {totalPages || 1}</span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-50"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
