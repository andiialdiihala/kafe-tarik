import { Edit2, Trash2 } from "lucide-react";
import { Category } from "../types/category.types";

const DEFAULT_ICON = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80";

interface GetCategoryColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export const getCategoryColumns = ({ onEdit, onDelete }: GetCategoryColumnsProps) => [
  {
    header: "Kategori",
    accessorKey: "name",
    cell: (c: Category) => (
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
    ),
  },
  {
    header: "Jumlah Produk",
    accessorKey: "count",
    cell: (c: Category) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold">
        {c.count}
      </span>
    ),
  },
  {
    header: "Aksi",
    id: "actions",
    cell: (c: Category) => (
      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() => onEdit(c)}
          className="p-1.5 text-stone-500 hover:text-emerald-700 transition"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => onDelete(c.id)}
          className="p-1.5 text-stone-500 hover:text-rose-600 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ),
  },
];
