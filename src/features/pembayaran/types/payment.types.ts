export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'CASH' | 'QRIS';
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createdAt: Date;
}
