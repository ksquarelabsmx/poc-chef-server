export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  createdAt: number;
  updatedAt: number;
}

export interface IProductDto {
  id?: string;
  name: string;
  description: string;
  price: number;
  created_at: number;
  updated_at: number;
}
