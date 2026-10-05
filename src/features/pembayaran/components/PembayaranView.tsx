"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import {
  QrCode,
  Wallet,
  AlertCircle,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  ShoppingBag,
  User,
  Phone,
  Sparkles,
  Copy,
  Check,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/features/cart/store/cart.store";
import { saveOrder, getOrderStatus, updatePaymentProof } from "../actions/order.action";

export const PembayaranView = () => {
  const { items, clearCart } = useCartStore();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [method, setMethod] = useState<"QRIS" | "CASH">("QRIS");
  const [proofUrl, setProofUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Active Order Tracking State
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [reuploading, setReuploading] = useState(false);
  const [newProofUrl, setNewProofUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const subtotal = items.reduce((acc, { item, quantity }) => acc + item.price * quantity, 0);
  const total = subtotal;

  // Poll active order status
  useEffect(() => {
    if (!activeOrderId) return;

    let isMounted = true;
    let interval: NodeJS.Timeout;

    const fetchStatus = async () => {
      setIsRefreshing(true);
      const res = await getOrderStatus(activeOrderId);
      if (isMounted && res.success && res.order) {
        setOrderDetail(res.order);

        const status = res.order.paymentStatus || res.order.status;
        if (["Berhasil", "VERIFIED", "Ditolak", "Gagal", "Siap Diambil"].includes(status)) {
          clearInterval(interval);
        }
      }
      if (isMounted) setIsRefreshing(false);
    };

    fetchStatus();
    interval = setInterval(fetchStatus, 3500);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeOrderId]);

  const handleConfirm = async () => {
    if (items.length === 0) {
      setErrorMessage("Keranjang Anda kosong!");
      return;
    }

    if (method === "QRIS" && !proofUrl) {
      setErrorMessage("Harap sertakan bukti transfer untuk pembayaran QRIS!");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await saveOrder({
        customerName: customerName.trim() || undefined,
        customerPhone: customerPhone.trim() || undefined,
        items: items.map((i) => ({
          productId: i.item.id,
          quantity: i.quantity,
          price: i.item.price,
          subtotal: i.item.price * i.quantity,
        })),
        totalAmount: total,
        paymentMethod: method,
        proofUrl: proofUrl || undefined,
      });

      if (result.success && result.orderId) {
        setActiveOrderId(result.orderId);
        clearCart();
      } else {
        setErrorMessage(result.error || "Gagal membuat pesanan.");
      }
    } catch (e: any) {
      setErrorMessage(e.message || "Terjadi kesalahan sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReuploadProof = async () => {
    if (!activeOrderId || !newProofUrl) return;
    setReuploading(true);
    try {
      const res = await updatePaymentProof(activeOrderId, newProofUrl);
      if (res.success) {
        setNewProofUrl(null);
        const updated = await getOrderStatus(activeOrderId);
        if (updated.success) setOrderDetail(updated.order);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReuploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatRupiah = (val: number) => `Rp ${val.toLocaleString("id-ID")}`;

  return (
    <main className="min-h-screen bg-[#faf8f5] py-10 px-4">
      <Container>
        <AnimatePresence mode="wait">
          {!activeOrderId ? (
            /* ==========================================================
               MODE 1: FORM PEMBAYARAN & ORDER
               ========================================================== */
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Link
                      href="/cart"
                      className="p-2 bg-stone-100 rounded-full hover:bg-stone-200 transition text-stone-700"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                      <h1 className="font-display text-2xl font-bold text-stone-900">Pembayaran Pesanan</h1>
                      <p className="text-xs text-stone-500">Lengkapi detail pemesanan & pilih metode pembayaran Anda.</p>
                    </div>
                  </div>

                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Customer Info Form */}
                  <div className="space-y-4 mb-8">
                    <h2 className="text-sm font-bold text-stone-800 flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-dark" /> Detail Pelanggan
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Nama Pemesan</label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="Contoh: Budi Pratama"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-stone-600 mb-1">Nomor WhatsApp (Opsional)</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            placeholder="0812xxxxxxx"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-4 mb-6">
                    <h2 className="text-sm font-bold text-stone-800">Pilih Metode Pembayaran</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setMethod("QRIS")}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                          method === "QRIS"
                            ? "border-emerald-600 bg-emerald-50/60 text-emerald-900 shadow-xs"
                            : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        <QrCode className="w-7 h-7 text-emerald-700" />
                        <span className="font-bold text-xs">QRIS (Scan & Upload)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMethod("CASH")}
                        className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition ${
                          method === "CASH"
                            ? "border-amber-600 bg-amber-50/70 text-amber-900 shadow-xs"
                            : "border-stone-200 bg-stone-50 text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        <Wallet className="w-7 h-7 text-amber-700" />
                        <span className="font-bold text-xs">CASH (Bayar di Kasir)</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details Area */}
                  {method === "QRIS" ? (
                    <div className="space-y-4 pt-2">
                      <div className="bg-stone-900 p-6 rounded-2xl text-center text-white space-y-3">
                        <div className="bg-white p-3 rounded-xl inline-block shadow-md">
                          <QrCode className="w-36 h-36 text-stone-900" />
                        </div>
                        <p className="font-bold text-sm tracking-wide">QRIS Kafe Tarik</p>
                        <p className="text-[11px] text-stone-300">Scan QR di atas dengan BCA, Mandiri, GoPay, OVO, ShopeePay, DANA, dll.</p>
                      </div>

                      <div className="border-2 border-dashed border-stone-300 p-5 rounded-2xl bg-stone-50 text-center">
                        {proofUrl ? (
                          <div className="space-y-3">
                            <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                              <img src={proofUrl} alt="Bukti Transfer" className="w-full h-full object-cover" />
                            </div>
                            <p className="text-xs text-emerald-700 font-bold flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Bukti Ter-upload
                            </p>
                            <button
                              type="button"
                              onClick={() => setProofUrl(null)}
                              className="text-[11px] text-rose-600 font-semibold underline hover:text-rose-700"
                            >
                              Ganti Bukti Transfer
                            </button>
                          </div>
                        ) : (
                          <label className="cursor-pointer flex flex-col items-center gap-2 text-stone-500 py-2">
                            <UploadCloud className="w-10 h-10 text-brand-dark hover:scale-110 transition-transform" />
                            <div className="text-xs text-center">
                              <span className="font-bold text-stone-700 block">Upload Bukti Transfer</span>
                              <span className="text-[11px] text-stone-400">Format JPG, PNG, atau WEBP</span>
                            </div>
                            <input
                              type="file"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                
                                const formData = new FormData();
                                formData.append("file", file);
                                
                                const res = await fetch("/api/upload", {
                                  method: "POST",
                                  body: formData,
                                });
                                const data = await res.json();
                                if (data.url) setProofUrl(data.url);
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* CASH Payment Instructions */
                    <div className="bg-amber-50 border-2 border-amber-300/80 p-6 rounded-2xl text-amber-950 space-y-3 shadow-xs">
                      <div className="flex items-center gap-2.5 font-extrabold text-amber-900 text-sm">
                        <Receipt className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>Pembayaran Tunai di Kasir (Cash)</span>
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed">
                        Setelah menekan tombol <strong>"Bayar Sekarang"</strong>, Anda akan mendapatkan <strong>Kode Pesanan Singkat</strong>. Tunjukkan Kode Pesanan tersebut ke Kasir untuk melunasi pembayaran.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary Sticky Panel */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm sticky top-6">
                <h3 className="font-display font-extrabold text-lg text-stone-900 mb-4 flex items-center justify-between">
                  <span>Ringkasan Pesanan</span>
                  <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-sans font-bold">
                    {items.reduce((sum, i) => sum + i.quantity, 0)} Item
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
                      {items.map(({ item, quantity }) => (
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
            </motion.div>
          ) : (
            /* ==========================================================
               MODE 2: REAL-TIME ORDER STATUS TRACKER
               ========================================================== */
            <motion.div
              key="order-status-tracker"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto space-y-6"
            >
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
                {/* Top Status Header */}
                <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Status Pesanan Anda</span>
                    <h2 className="font-display font-extrabold text-xl text-stone-900">Rincian Pembayaran</h2>
                  </div>

                  <div className="flex items-center gap-2">
                    {isRefreshing && (
                      <span className="text-[10px] text-stone-400 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Memperbarui...
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setActiveOrderId(null);
                        setOrderDetail(null);
                      }}
                      className="text-xs bg-stone-100 text-stone-700 px-3 py-1.5 rounded-xl font-semibold hover:bg-stone-200 transition"
                    >
                      Pesanan Baru
                    </button>
                  </div>
                </div>

                {/* PROMINENT ORDER CODE CARD FOR CASH PAYMENTS */}
                {orderDetail?.paymentMethod === "CASH" && (
                  <div className="mt-6 p-6 rounded-2xl bg-amber-500 text-white shadow-md text-center space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-100 block">
                      Tunjukkan Kode Pesanan Ini ke Kasir
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-mono text-3xl font-extrabold tracking-wider bg-black/20 px-4 py-1.5 rounded-xl">
                        {activeOrderId}
                      </span>
                      <button
                        onClick={() => copyToClipboard(activeOrderId)}
                        className="p-2.5 bg-white text-amber-900 rounded-xl hover:bg-amber-100 transition shadow-xs"
                        title="Salin Kode Pesanan"
                      >
                        {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-xs text-amber-100 font-medium">
                      Total yang harus dibayar: <strong>{formatRupiah(Number(orderDetail.totalAmount || 0))}</strong>
                    </p>
                  </div>
                )}

                {/* Status Banner */}
                {(() => {
                  const st = orderDetail?.paymentStatus || orderDetail?.status || "Menunggu Verifikasi";
                  if (st === "Siap Diambil" || st === "READY") {
                    return (
                      <div className="mt-6 p-5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
                            <Sparkles className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-sky-900">Pesanan Siap Diambil!</h4>
                            <p className="text-xs text-sky-700">Silakan ambil pesanan Anda di meja/kasir sekarang.</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else if (st === "Dibayar" || st === "VERIFIED" || st === "Berhasil") {
                    return (
                      <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-emerald-900">Pembayaran Berhasil Diverifikasi!</h4>
                            <p className="text-xs text-emerald-700">Pesanan Anda telah diterima & sedang disiapkan oleh staf dapur.</p>
                          </div>
                        </div>
                      </div>
                    );
                  } else if (st === "Ditolak" || st === "REJECTED" || st === "Gagal") {
                    return (
                      <div className="mt-6 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                            <XCircle className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-rose-900">Pembayaran Ditolak</h4>
                            <p className="text-xs text-rose-700">Bukti pembayaran tidak sesuai atau tidak terbaca. Silakan re-upload bukti transfer.</p>
                          </div>
                        </div>

                        {/* Reupload box */}
                        <div className="pt-2 border-t border-rose-200 space-y-2">
                          <p className="text-xs font-bold text-stone-800">Upload Ulang Bukti Transfer:</p>
                          {newProofUrl ? (
                            <div className="flex items-center gap-3">
                              <img src={newProofUrl} alt="New Proof" className="w-16 h-16 object-cover rounded-xl border" />
                              <button
                                onClick={handleReuploadProof}
                                disabled={reuploading}
                                className="bg-rose-700 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-rose-800 transition"
                              >
                                {reuploading ? "Mengirim..." : "Kirim Bukti Baru"}
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer">
                                <UploadCloud className="w-10 h-10 text-brand-dark mx-auto hover:scale-110 transition-transform" />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        
                                        const formData = new FormData();
                                        formData.append("file", file);
                                        
                                        const res = await fetch("/api/upload", {
                                        method: "POST",
                                        body: formData,
                                        });
                                        const data = await res.json();
                                        if (data.url) {
                                            setNewProofUrl(data.url);
                                            setProofUrl(data.url);
                                        }
                                    }}
                                />
                            </label>
                          )}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 animate-pulse">
                            <Clock className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-amber-900">
                              {orderDetail?.paymentMethod === "CASH"
                                ? "Menunggu Pembayaran Kasir"
                                : "Menunggu Verifikasi Kasir"}
                            </h4>
                            <p className="text-xs text-amber-800">
                              {orderDetail?.paymentMethod === "CASH"
                                ? "Silakan tunjukkan Kode Pesanan di atas ke kasir untuk melunasi pembayaran."
                                : "Bukti transfer telah dikirim. Kasir sedang memverifikasi pembayaran Anda."}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })()}

                {/* Details breakdown */}
                {orderDetail && (
                  <div className="mt-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200/60">
                      <div>
                        <span className="text-stone-400 block font-medium">Kode Pesanan</span>
                        <span className="font-mono font-extrabold text-stone-900 text-sm">{orderDetail.idOrder}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-medium">Metode Pembayaran</span>
                        <span className="font-extrabold text-stone-800 text-sm">{orderDetail.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-medium">Nama Pelanggan</span>
                        <span className="font-semibold text-stone-800">{orderDetail.customerName || "Pelanggan"}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block font-medium">Total Tagihan</span>
                        <span className="font-extrabold text-emerald-700 text-sm">
                          {formatRupiah(Number(orderDetail.totalAmount || 0))}
                        </span>
                      </div>
                    </div>

                    {/* Items table */}
                    <div>
                      <h4 className="text-xs font-bold text-stone-800 mb-3">Item Pesanan:</h4>
                      <div className="divide-y divide-stone-100 text-xs">
                        {orderDetail.items?.map((it: any, idx: number) => (
                          <div key={idx} className="py-2 flex justify-between items-center">
                            <div>
                              <span className="font-bold text-stone-800">{it.quantity}x </span>
                              <span className="text-stone-700">{it.productName || "Item Pesanan"}</span>
                            </div>
                            <span className="font-semibold text-stone-900">
                              {formatRupiah(Number(it.subtotal || 0))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {orderDetail.proofUrl && (
                      <div>
                        <h4 className="text-xs font-bold text-stone-800 mb-2">Bukti Pembayaran Terlampir:</h4>
                        <a href={orderDetail.proofUrl} target="_blank" rel="noopener noreferrer">
                          <img
                            src={orderDetail.proofUrl}
                            alt="Bukti Transfer"
                            className="w-28 h-28 object-cover rounded-xl border border-stone-200 shadow-xs hover:opacity-90 transition"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
};