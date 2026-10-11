"use client";

import { AlertCircle } from "lucide-react";

interface CategoryDeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export const CategoryDeleteDialog = ({ isOpen, onClose, onConfirm, isSubmitting }: CategoryDeleteDialogProps) => {
  if (!isOpen) return null;
  return (
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
          <button onClick={onClose} className="px-4 py-2 border rounded-xl text-xs font-semibold">Batal</button>
          <button onClick={onConfirm} disabled={isSubmitting} className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 disabled:opacity-50">
            {isSubmitting ? "Hapus..." : "Hapus Permanen"}
          </button>
        </div>
      </div>
    </div>
  );
};
