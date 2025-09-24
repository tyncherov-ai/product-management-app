export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ProductData {
  price?: number;
  category?: string;
  color?: string;
  stock?: number;
  status?: "Active" | "Out of Stock";
  [key: string]: unknown;
}

export interface Product {
  id: string;
  name: string;
  createdAt: string;
  data: ProductData | null;
}

export interface CreateProductRequest {
  name: string;
  data?: ProductData;
}

export interface UpdateProductRequest {
  id: string;
  name?: string;
  data?: ProductData;
}
