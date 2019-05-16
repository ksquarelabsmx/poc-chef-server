import { IOrderProduct, IOrderProductDto } from "./order-product";

export interface IOrder {
  id?: string;
  userName: string;
  eventId: string;
  orderFolio: string;
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
  user_name: string;
  event_id: string;
  total: number;
  order_folio: string;
  products: IOrderProductDto[];
  created_by: string;
  created_at: number;
  updated_at: number;
  paid: boolean;
  cancelled: boolean;
}
