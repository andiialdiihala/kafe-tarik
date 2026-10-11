import { User, Phone } from "lucide-react";

export const CustomerForm = ({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
}: any) => (
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
);
