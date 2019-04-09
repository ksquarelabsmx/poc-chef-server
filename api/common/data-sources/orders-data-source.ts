import { IOrder } from "../models/order";

export interface IOrdersDataSource {
  find: (query?: any) => IOrder[];
  save: (order: IOrder) => IOrder;
  update: (order: any) => IOrder;
}
