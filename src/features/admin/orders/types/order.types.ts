export interface OrderItem {
  id: string;
  date: Date | string | null;
  customer: string | null;
  total: string | number | null;
  status: string | null;
}

export interface FormattedOrder {
  raw: OrderItem;
  id: string;
  date: string;
  customer: string;
  menu: string;
  total: string;
  status: string;
}

