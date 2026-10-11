export interface TopProduct {
  name: string | null;
  price: string | null;
  sold: number;
  image: string | null;
}

export interface DailyRevenue {
  name: string;
  total: number;
}

export interface DashboardStatsData {
  revenue: number;
  revenueChange: number;
  orders: number;
  ordersChange: number;
  customers: number;
  customersChange: number;
  sold: number;
  soldChange: number;
  dailyRevenue: DailyRevenue[];
  topProducts: TopProduct[];
}
