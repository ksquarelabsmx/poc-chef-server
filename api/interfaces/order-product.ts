export interface IOrderProduct {
  id?: string;
  orderId: string;
  productId: string;
  quantity: number;
}

export interface IOrderProductDTO {
  id?: string;
  order_id: string;
  product_id: string;
  quantity: number;
}

export interface IOrderProductDetails extends IOrderProduct {
  createdAt: number;
  updatedAt: number;
}

export interface IOrderProductDetailsDTO extends IOrderProductDTO {
  created_at: number;
  updated_at: number;
}
