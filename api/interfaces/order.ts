export interface IOrder {
  id?: string;
  userId: string;
  eventId: string;
  price: number;
  orderProductId: string[];
  createdBy: string;
}

export interface IOrderDTO {
  id?: string;
  user_id: string;
  event_id: string;
  price: number;
  order_product_id: string[];
  created_by: string;
}

export interface IOrderDetails extends IOrder {
  createdAt: number;
  updatedAt: number;
  paid: boolean;
  cancelled: boolean;
}

export interface IOrderDetailsDTO extends IOrderDTO {
  created_at: number;
  updated_at: number;
  paid: boolean;
  cancelled: boolean;
}
