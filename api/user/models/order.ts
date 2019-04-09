import { IOrderProduct } from "./order-product";

export interface IOrder {
  id: string;
  event_id: string;
  created_at: number;
  products: IOrderProduct[];
  cancelled: boolean;
  total: number;
}
