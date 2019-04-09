import { IOrderProduct } from "../../common/models/order-product";

export interface IOrder {
  id: string;
  event_id: string;
  created_at: number;
  products: IOrderProduct[];
  cancelled: boolean;
  total: number;
}
