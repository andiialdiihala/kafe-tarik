import { Trash2, RefreshCw } from "lucide-react";

export const DeletePaymentModal = ({
  paymentToDelete,
  deletingId,
  onClose,
  onDelete,
}: {
  paymentToDelete: { idPay: string; idOrder: string } | null;
  deletingId: string | null;
  onClose: () => void;
  onDelete: () => void;
}) => {
  if (!paymentToDelete) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl text-center space-y-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          <Trash2 className="w-7 h-7" />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-stone-900">Hapus Pembayaran?</h3>
          <p className="text-xs text-stone-500 mt-1 leading-relaxed">
            Data <span className="font-mono font-bold text-stone-800">{paymentToDelete.idOrder}</span> beserta order & itemnya akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            disabled={deletingId !== null}
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-100 transition disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={deletingId !== null}
            onClick={onDelete}
            className="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {deletingId ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Menghapus...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" /> Ya, Hapus
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
