import { ChevronLeft, ChevronRight } from "lucide-react";

interface MenuPaginationProps {
  paginatedCount: number;
  totalCount: number;
  page: number;
  totalPages: number;
  setPage: (updater: number | ((prev: number) => number)) => void;
}

export const MenuPagination = ({
  paginatedCount,
  totalCount,
  page,
  totalPages,
  setPage,
}: MenuPaginationProps) => (
  <div className="p-4 border-t border-stone-100 flex items-center justify-between">
    <p className="text-[11px] text-stone-500">
      Menampilkan <span className="font-semibold">{paginatedCount}</span> dari{" "}
      <span className="font-semibold">{totalCount}</span> menu
    </p>
    <div className="flex items-center gap-1">
      <button
        disabled={page <= 1}
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>
      <span className="text-[11px] font-semibold px-2">
        Halaman {page} dari {totalPages || 1}
      </span>
      <button
        disabled={page >= totalPages}
        onClick={() => setPage((prev) => prev + 1)}
        className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-50 transition cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);
