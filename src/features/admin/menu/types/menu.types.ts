export interface Menu {
  id: string;
  name: string | null;
  price: number;
  description: string;
  category: string;
  idCategory: string;
  stock: number;
  image: string;
}

export interface CategoryItem {
  idCategories: string;
  name: string | null;
  icon?: string | null;
  createdAt?: Date | null;
}
