export interface ProductDetailItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  idCategory: string | null;
  stock: number | null;
  image: string;
}

export interface ProductDetailParams {
  id: string;
}
