export interface Product {
  id: string;
  name: string;
  description: string;
  price: number | string;
  imageUrl: string;
}

export interface ProductState {
  products: Product[];
  selectedProductId: string | null;
  loading: boolean;
  error: string | null;
}
