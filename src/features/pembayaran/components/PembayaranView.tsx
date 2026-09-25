"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, QrCode, Upload, AlertCircle, Clock, Check, X, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart.store";

export const PembayaranView = () => {
  const { items, clearCart } = useCartStore();
  const [method, setMethod] = useState<"QRIS" | "Cash">("QRIS");
  const [proof, setProof] = useState<string | null>(null);
  const [status, setStatus] = useState<"Belum Dibayar" | "Menunggu Verifikasi" | "Dibayar" | "Ditolak">("Belum Dibayar");

  const subtotal = items.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0);
  const total = subtotal;
  const orderId = "#ORD-8F29A";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProof(url);
    }
  };

  return (
    <main className="min-h-screen bg-brand-cream py-12">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-stone-200"
        >
          <div className="text-center mb-6">
            <span className="text-xs font-bold tracking-widest text-brand-dark uppercase bg-brand-mint/20 px-3 py-1 rounded-full border border-brand-mint/30">
              PEMBAYARAN PESANAN
            </span>
            <h1 className="font-display text-2xl font-bold text-stone-900 mt-2">Selesaikan Pembayaran</h1>
            <p className="text-stone-500 text-sm mt-1">Order ID: <span className="font-mono font-bold text-stone-800">{orderId}</span></p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center justify-between bg-stone-50 px-4 py-3 rounded-2xl border border-stone-200 mb-6">
            <span className="text-xs text-stone-500 font-medium">Status Pembayaran:</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${
              status === "Belum Dibayar" ? "bg-amber-100 text-amber-800" :
              status === "Menunggu Verifikasi" ? "bg-blue-100 text-blue-800" :
              status === "Dibayar" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
            }`}>
              {status}
            </span>
          </div>

          {/* Summary Box */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 mb-6">
            <h3 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2 text-sm text-stone-600 max-h-40 overflow-y-auto pr-1">
              {items.map(({ item, quantity }) => (
                <div key={item.id} className="flex justify-between">
                  <span>{quantity}x {item.name}</span>
                  <span className="font-medium text-stone-800">Rp {(item.price * quantity).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 my-3 pt-3 flex justify-between font-bold text-stone-900">
              <span>Total</span>
              <span className="text-brand-dark">Rp {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Method Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => { setMethod("QRIS"); if(status==="Dibayar") setStatus("Belum Dibayar"); }}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition ${
                method === "QRIS" ? "border-brand-dark bg-brand-mint/10 text-brand-dark font-bold" : "border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              <QrCode className="w-6 h-6" />
              <span className="text-sm">QRIS</span>
            </button>
            <button
              onClick={() => { setMethod("Cash"); setStatus("Belum Dibayar"); }}
              className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition ${
                method === "Cash" ? "border-brand-dark bg-brand-mint/10 text-brand-dark font-bold" : "border-stone-200 text-stone-600 hover:border-stone-300"
              }`}
            >
              <Wallet className="w-6 h-6" />
              <span className="text-sm">Cash (Bayar di Kasir)</span>
            </button>
          </div>

          {/* QRIS SECTION */}
          {method === "QRIS" && (
            <div className="space-y-6">
              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 text-center">
                <div className="bg-white p-4 inline-block rounded-2xl shadow-sm border border-stone-200 mb-3">
                  <QrCode className="w-40 h-40 mx-auto text-stone-900" />
                </div>
                <p className="font-display font-bold text-stone-800 text-sm">Merchant: Kafe Tarik Official</p>
                <p className="text-xs text-stone-500 mt-1">Scan pakai m-Banking atau e-Wallet apa saja</p>
              </div>

              {/* Upload Proof */}
              <div className="border-2 border-dashed border-stone-300 p-6 rounded-2xl text-center bg-stone-50">
                {proof ? (
                  <div className="space-y-3">
                    <img src={proof} alt="Bukti Transfer" className="w-32 h-32 object-cover mx-auto rounded-xl border border-stone-200" />
                    <button onClick={() => setProof(null)} className="text-xs text-rose-600 font-bold hover:underline">Hapus / Ganti Foto</button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-stone-700 block">Upload Bukti Pembayaran</span>
                    <span className="text-xs text-stone-400 mt-1 block">Format JPG, PNG (Maks. 2MB)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                )}
              </div>

              <button
                disabled={!proof || status === "Menunggu Verifikasi"}
                onClick={() => setStatus("Menunggu Verifikasi")}
                className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-full hover:bg-brand-darker transition disabled:opacity-50"
              >
                Konfirmasi Pembayaran
              </button>

              {status === "Menunggu Verifikasi" && (
                <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 p-4 rounded-2xl text-blue-800 text-sm">
                  <Clock className="w-5 h-5 shrink-0" />
                  <span>⏳ Menunggu verifikasi pembayaran oleh kasir. Mohon tunggu sebentar.</span>
                </div>
              )}
            </div>
          )}

          {/* CASH SECTION */}
          {method === "Cash" && (
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-900 text-sm space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>Instruksi Bayar di Kasir</span>
                </div>
                <p className="text-xs leading-relaxed text-amber-800">
                  Silakan tunjukkan kode pesanan <strong className="font-mono">{orderId}</strong> kepada kasir. Tidak perlu upload bukti.
                </p>
              </div>

              <button
                onClick={() => setStatus("Dibayar")}
                className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-full hover:bg-brand-darker transition"
              >
                Konfirmasi Pesanan Kasir
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link 
              href="/"
              onClick={clearCart}
              className="text-xs font-bold text-stone-400 hover:text-stone-600 transition"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </motion.div>
      </Container>
    </main>
  );
};
