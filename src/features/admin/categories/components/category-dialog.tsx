"use client";

import { X } from "lucide-react";

interface CategoryDialogProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const CategoryDialog = ({ title, isOpen, onClose, children }: CategoryDialogProps) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl border border-stone-200">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-sm font-bold">{title}</h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600"><X className="w-4 h-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
};
