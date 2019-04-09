import { IProduct } from "./product";

export interface IOrder {
  id: string;
  products: IProduct[];
}
