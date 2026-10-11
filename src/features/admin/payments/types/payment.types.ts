export interface PaymentItemDetail {
  idItems: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface AdminPaymentItem {
  idPay: string;
  idOrder: string;
  tableNumber: number | null;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  method: "CASH" | "QRIS" | string;
  status: string;
  proofUrl: string | null;
  verifiedBy: string | null;
  verifiedAt: string | null;
  createdAt: Date | null;
  items: PaymentItemDetail[];
}

export interface PaymentStats {
  berhasil: string;
  pending: string;
  ditolak: string;
  totalMasuk: string;
}
