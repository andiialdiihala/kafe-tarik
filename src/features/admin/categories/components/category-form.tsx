"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { categorySchema } from "../schemas/category.schema";
import { useState } from "react";

interface CategoryFormProps {
  initialData?: { name: string; icon: string };
  onSubmit: (formData: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const CategoryForm = ({ initialData, onSubmit, isSubmitting }: CategoryFormProps) => {
  const [preview, setPreview] = useState<string | null>(initialData?.icon || null);
  const { register, handleSubmit } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: initialData?.name || "" },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit((_, e) => e && onSubmit(new FormData(e.target as HTMLFormElement)))} className="space-y-4">
      <div>
        <label className="block font-semibold text-stone-700 mb-1">Nama Kategori</label>
        <input {...register("name")} className="w-full px-3 py-2 border border-stone-200 rounded-xl" />
      </div>

      <div className="border border-stone-200 rounded-xl p-3 bg-stone-50/50 space-y-3">
        <label className="block font-semibold text-stone-700 flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5" /> Gambar / Icon
        </label>
        <input name="iconFile" type="file" accept="image/*" onChange={handleFileChange} className="w-full text-xs" />
        {preview && <img src={preview} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />}
        <input {...register("iconUrl")} placeholder="URL Gambar..." className="w-full px-2 py-1 border rounded-lg text-xs" onChange={(e) => e.target.value && setPreview(e.target.value)} />
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-[#143125] text-white p-2 rounded-xl text-xs font-semibold">
        {isSubmitting ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
};
