import Link from "next/link";
import { ShoppingBag, RefreshCw, Sparkles } from "lucide-react";

export const OrderSummary = ({
  items,
  subtotal,
  total,
  formatRupiah,
  isSubmitting,
  handleConfirm,
}: any) => (
  <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm sticky top-6">
    <h3 className="font-display font-extrabold text-lg text-stone-900 mb-4 flex items-center justify-between">
      <span>Ringkasan Pesanan</span>
      <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-sans font-bold">
        {items.reduce((sum: number, i: any) => sum + i.quantity, 0)} Item
      </span>
    </h3>

    {items.length === 0 ? (
      <div className="text-center py-8 text-stone-400 text-xs">
        <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-40" />
        <p>Keranjang masih kosong.</p>
        <Link href="/menu" className="mt-3 inline-block font-bold text-brand-dark hover:underline">
          Lihat Menu
        </Link>
      </div>
    ) : (
      <>
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-6 divide-y divide-stone-100 text-xs">
          {items.map(({ item, quantity }: any) => (
            <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-start gap-2">
              <div>
                <p className="font-semibold text-stone-800">{item.name}</p>
                <p className="text-[11px] text-stone-400">
                  {quantity}x @ {formatRupiah(item.price)}
                </p>
              </div>
              <span className="font-bold text-stone-900 shrink-0">
                {formatRupiah(item.price * quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-stone-200 pt-4 space-y-2 mb-6">
          <div className="flex justify-between text-xs text-stone-500">
            <span>Subtotal</span>
            <span className="font-medium text-stone-800">{formatRupiah(subtotal)}</span>
          </div>
          <div className="flex justify-between text-xs text-stone-500">
            <span>Biaya Layanan</span>
            <span className="font-medium text-emerald-600">Gratis</span>
          </div>
          <div className="flex justify-between items-center text-stone-900 pt-2 border-t border-stone-100">
            <span className="font-bold text-sm">Total Bayar</span>
            <span className="font-extrabold text-xl text-emerald-700">{formatRupiah(total)}</span>
          </div>
        </div>

        <button
          type="button"
          disabled={isSubmitting || items.length === 0}
          onClick={handleConfirm}
          className="w-full bg-[#143125] text-white font-bold py-3.5 px-6 rounded-2xl hover:bg-emerald-950 transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Memproses...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-emerald-400" /> Bayar Sekarang
            </>
          )}
        </button>
      </>
    )}
  </div>
);
