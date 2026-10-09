export interface MenuProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  idCategory: string | null;
  stock: number | null;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}
