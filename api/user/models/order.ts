import { IProduct, IProductDetails } from "./product";
import { IEventDetails } from "./event";

export interface IOrder {
  id: string;
  products: IProduct[];
}

export interface IOrderDetails {
  id: string;
  created_at: number;
  event: IEventDetails;
  products: IProductDetails[];
  total: number;
  cancelled: boolean;
}
