export interface ReportSummary {
  total: number;
  change: number;
}

export interface DailyRevenue {
  name: string;
  total: number;
}

export interface PaymentMethodSummary {
  method: string | null;
  total: number;
  percentage: number;
}

export interface ReportsData {
  revenue: ReportSummary;
  orders: ReportSummary;
  sold: ReportSummary;
  customers: ReportSummary;
  dailyRevenue: DailyRevenue[];
  paymentMethods: PaymentMethodSummary[];
}

export type ReportPeriod = "7 Hari" | "30 Hari" | "Bulan Ini" | "Tahun Ini";
