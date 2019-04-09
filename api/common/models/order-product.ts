export interface IOrderProduct {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  createdAt: number;
  updatedAt: number;
}

export interface IOrderProductDto {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  created_at: number;
  updated_at: number;
}
