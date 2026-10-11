import { AlertTriangle, Trash2, X } from "lucide-react";

export const DeleteOrderModal = ({ 
  orderId, 
  onClose, 
  onDelete, 
  loading 
}: { 
  orderId: string; 
  onClose: () => void; 
  onDelete: () => void; 
  loading: boolean; 
}) => (
  <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-100 space-y-4 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div>
        <h3 className="text-base font-bold text-stone-900">Hapus Pesanan?</h3>
        <p className="text-xs text-stone-500 mt-1 leading-relaxed">
          Apakah Anda yakin ingin menghapus pesanan <strong className="font-mono text-stone-800">{orderId}</strong>?
        </p>
      </div>
      <div className="pt-2 flex items-center justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition">Batal</button>
        <button disabled={loading} onClick={onDelete} className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 transition disabled:opacity-50 flex items-center gap-1.5">
          <Trash2 className="w-3.5 h-3.5" />
          {loading ? "Menghapus..." : "Ya, Hapus"}
        </button>
      </div>
    </div>
  </div>
);
