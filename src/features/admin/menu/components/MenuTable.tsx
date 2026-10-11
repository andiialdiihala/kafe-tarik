import { Edit2, Trash2 } from "lucide-react";
import { Menu } from "../types/menu.types";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80";

interface MenuTableProps {
  paginated: Menu[];
  onEdit: (m: Menu) => void;
  onDelete: (id: string) => void;
}

export const MenuTable = ({ paginated, onEdit, onDelete }: MenuTableProps) => (
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
          <tr>
            <td colSpan={5} className="py-12 text-center text-stone-400">
              Belum ada menu. Tambahkan menu baru.
            </td>
          </tr>
        ) : (
          paginated.map((m) => (
            <tr key={m.id} className="hover:bg-stone-50/70 transition-colors">
              <td className="py-3 px-4 flex items-center gap-3">
                <img
                  src={m.image || DEFAULT_IMAGE}
                  alt={m.name ?? "Menu"}
                  className="w-12 h-12 object-cover rounded-lg border border-stone-100 shrink-0 bg-stone-100"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = DEFAULT_IMAGE;
                  }}
                />
                <div>
                  <p className="font-semibold text-stone-900">{m.name}</p>
                  <p className="text-[10px] text-stone-400 truncate max-w-[200px]">{m.description}</p>
                </div>
              </td>
              <td className="py-3 px-4 text-stone-600 capitalize">{m.category || "-"}</td>
              <td className="py-3 px-4 font-semibold text-stone-900">
                Rp {Number(m.price || 0).toLocaleString("id-ID")}
              </td>
              <td className="py-3 px-4 text-center font-medium text-stone-600">{m.stock ?? 0}</td>
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onEdit(m)}
                    className="p-1.5 text-stone-500 hover:text-emerald-700 transition cursor-pointer"
                    title="Edit Menu"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(m.id)}
                    className="p-1.5 text-stone-500 hover:text-rose-600 transition cursor-pointer"
                    title="Hapus Menu"
                  >
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
);
