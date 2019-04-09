export interface IOrderProduct {
  id?: string;
  orderId: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  createdAt: number;
  updatedAt: number;
}

export interface IOrderProductDto {
  id?: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  subtotal: number;
  created_at: number;
  updated_at: number;
}
