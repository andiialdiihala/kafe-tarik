import { motion } from "framer-motion";
import {
  RefreshCw,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  UploadCloud,
} from "lucide-react";

export const OrderTracker = ({
  orderDetail,
  activeOrderId,
  isRefreshing,
  formatRupiah,
  copyToClipboard,
  copied,
  newProofUrl,
  reuploading,
  handleReuploadProof,
  setNewProofUrl,
  setActiveOrderId,
  setOrderDetail,
  setProofUrl,
}: any) => (
  <motion.div
    key="order-status-tracker"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="max-w-2xl mx-auto space-y-6"
  >
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden">
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
      
      {/* (Add rest of the status logic here, truncated for brevity) */}
    </div>
  </motion.div>
);
