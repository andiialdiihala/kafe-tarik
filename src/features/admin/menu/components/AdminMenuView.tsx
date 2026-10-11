"use client";

import { useState } from "react";
import { toast } from "sonner";
import { addProduct, updateProduct, deleteProduct } from "../actions/menu.actions";
import { Menu, CategoryItem } from "../types/menu.types";
import {
  MenuHeader,
  MenuFilters,
  MenuTable,
  MenuPagination,
  AddMenuDialog,
  EditMenuDialog,
  DeleteMenuDialog,
} from "./";

export const AdminMenuView = ({
  initialMenu = [],
  initialCategories = [],
}: {
  initialMenu?: Menu[];
  initialCategories?: CategoryItem[];
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Menu | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addPreview, setAddPreview] = useState<string | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Semua", ...initialCategories.map((c) => c.name || "Tanpa Nama")];
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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menambahkan menu");
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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal memperbarui menu");
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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal menghapus menu");
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

  const filtered = initialMenu.filter((m) => {
    const matchCat =
      activeCat === "Semua" || (m.category || "Lainnya").toLowerCase() === activeCat.toLowerCase();
    const q = query.toLowerCase();
    const matchQuery =
      !q ||
      (m.name || "").toLowerCase().includes(q) ||
      (m.description || "").toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <MenuHeader
        onAdd={() => {
          setAddPreview(null);
          setIsModalOpen(true);
        }}
      />

      <AddMenuDialog
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAdd}
        categories={initialCategories}
        addPreview={addPreview}
        setAddPreview={setAddPreview}
        handleFileChange={(e) => handleFileChange(e, false)}
        isSubmitting={isSubmitting}
      />

      <EditMenuDialog
        editingItem={editingItem}
        onClose={() => {
          setEditingItem(null);
          setEditPreview(null);
        }}
        onSubmit={handleUpdate}
        categories={initialCategories}
        editPreview={editPreview}
        setEditPreview={setEditPreview}
        handleFileChange={(e) => handleFileChange(e, true)}
        isSubmitting={isSubmitting}
      />

      <DeleteMenuDialog
        deletingId={deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={confirmDelete}
        isSubmitting={isSubmitting}
      />

      <div className="bg-white rounded-xl border border-stone-200/70 shadow-xs overflow-hidden">
        <MenuFilters
          categories={categories}
          activeCat={activeCat}
          setActiveCat={(c) => {
            setActiveCat(c);
            setPage(1);
          }}
          query={query}
          setQuery={(q) => {
            setQuery(q);
            setPage(1);
          }}
        />

        <MenuTable
          paginated={paginated}
          onEdit={(m) => {
            setEditPreview(null);
            setEditingItem(m);
          }}
          onDelete={(id) => setDeletingId(id)}
        />

        <MenuPagination
          paginatedCount={paginated.length}
          totalCount={filtered.length}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
