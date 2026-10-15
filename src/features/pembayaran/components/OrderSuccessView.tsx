import { motion } from "framer-motion";
import Link from "next/link";

export const OrderSuccessView = ({ activeOrderId, orderDetail, formatRupiah }: any) => (
  <div className="max-w-lg mx-auto bg-white p-8 rounded-3xl border border-stone-200/80 shadow-sm text-center">
    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h2 className="text-2xl font-display font-bold text-stone-900 mb-1">Pesanan Berhasil!</h2>
    <p className="text-stone-500 text-sm mb-6">Terima kasih telah memesan.</p>
    
    <div className="bg-stone-50 rounded-2xl p-6 text-left space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-stone-500">ID Pesanan</span>
        <span className="font-bold text-stone-900">{activeOrderId}</span>
      </div>
      {orderDetail && (
        <>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Status</span>
            <span className="font-bold text-emerald-700">{orderDetail.paymentStatus || orderDetail.status}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-500">Metode</span>
            <span className="font-bold text-stone-900">{orderDetail.paymentMethod}</span>
          </div>
          <div className="border-t border-stone-200 pt-4 mt-2">
            <p className="text-xs text-stone-400 uppercase tracking-wider font-bold mb-3">Item Dipesan</p>
            <ul className="space-y-2">
              {orderDetail.items.map((item: any) => (
                <li key={item.idItems} className="flex justify-between text-sm">
                  <span className="text-stone-700">{item.productName} × {item.quantity}</span>
                  <span className="font-medium text-stone-900">{formatRupiah(item.subtotal)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-base font-bold mt-4 pt-4 border-t border-stone-200">
              <span>Total</span>
              <span className="text-emerald-700">{formatRupiah(orderDetail.totalAmount)}</span>
            </div>
          </div>
        </>
      )}
    </div>
    
    <Link href="/menu" className="mt-8 block w-full bg-[#143125] text-white font-bold py-3.5 rounded-2xl hover:bg-emerald-950 transition">
      Kembali ke Menu
    </Link>
  </div>
);
