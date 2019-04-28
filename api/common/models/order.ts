import { IOrderProduct, IOrderProductDto } from "./order-product";

export interface IOrder {
  id?: string;
  userId: string;
  eventId: string;
  eventName: string;
  orderNumber: number;
  products: IOrderProduct[];
  total: number;
  createdBy: string;
  paid: boolean;
  cancelled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface IOrderDto {
  id?: string;
  user_id: string;
  event_id: string;
  event_name: string;
  total: number;
  order_number: number;
  products: IOrderProductDto[];
  created_by: string;
  created_at: number;
  updated_at: number;
  paid: boolean;
  cancelled: boolean;
}
