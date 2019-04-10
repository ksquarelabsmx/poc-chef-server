import { IOrder } from "../models/order";

export interface IOrdersDataSource {
  find: (query?: any) => Promise<IOrder[]>;
  save: (order: IOrder) => Promise<IOrder>;
  update: (order: any) => Promise<IOrder>;
}
