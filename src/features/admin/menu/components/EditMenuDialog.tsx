import { X, Upload } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Menu, CategoryItem } from "../types/menu.types";

interface EditMenuDialogProps {
  editingItem: Menu | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  categories: CategoryItem[];
  editPreview: string | null;
  setEditPreview: (url: string | null) => void;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
}

export const EditMenuDialog = ({
  editingItem,
  onClose,
  onSubmit,
  categories,
  editPreview,
  setEditPreview,
  handleFileChange,
  isSubmitting,
}: EditMenuDialogProps) => {
  if (!editingItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-2xl w-full max-w-lg space-y-4 shadow-xl border border-stone-200 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b border-stone-100 pb-3 sticky top-0 bg-white z-10">
          <h2 className="text-base font-bold text-stone-900">Edit Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Nama Menu</label>
            <input
              name="name"
              defaultValue={editingItem.name ?? ""}
              required
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Harga (Rp)</label>
              <input
                name="price"
                type="number"
                defaultValue={editingItem.price}
                required
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Stok</label>
              <input
                name="stock"
                type="number"
                defaultValue={editingItem.stock ?? 0}
                required
                className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Kategori</label>
            <select
              name="idCategory"
              defaultValue={editingItem.idCategory}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/20 bg-white"
            >
              {categories.map((c) => (
                <option key={c.idCategories} value={c.idCategories}>
                  {c.name || "Tanpa Nama"}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Deskripsi</label>
            <textarea
              name="description"
              defaultValue={editingItem.description}
              rows={2}
              className="w-full px-3 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#143125]/25"
            />
          </div>

          <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 space-y-3">
            <label className="block font-semibold text-stone-700 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-[#143125]" /> Ubah Gambar Menu
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res?.[0]?.url) {
                    setEditPreview(res[0].url);
                  }
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
              />
              {handleFileChange && (
                <input
                  name="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl text-stone-600 focus:outline-none text-xs"
                />
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-stone-300 shrink-0">
                <img
                  src={editPreview || editingItem.image}
                  alt={editingItem.name ?? "Menu"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";
                  }}
                />
              </div>
              <p className="text-[11px] text-stone-500">
                Gambar saat ini. Unggah file baru atau masukkan link untuk mengganti.
              </p>
            </div>

            <div>
              <label className="block text-[11px] text-stone-500 mb-1">Atau ganti URL Foto:</label>
              <input
                name="imageUrl"
                type="url"
                value={
                  editPreview !== null
                    ? editPreview
                    : editingItem.image?.startsWith("http")
                    ? editingItem.image
                    : ""
                }
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-xl focus:outline-none text-xs"
                onChange={(e) => setEditPreview(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100 sticky bottom-0 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-stone-200 rounded-xl font-semibold text-stone-600 hover:bg-stone-50 text-xs transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-[#143125] text-white rounded-xl font-semibold hover:bg-emerald-900 text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Memperbarui..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
};
