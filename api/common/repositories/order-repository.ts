import { IOrder } from "../models/order";

export interface IOrderRepository {
  find: (query?: any) => Promise<IOrder[]>;
  save: (order: IOrder) => Promise<IOrder>;
  update: (order: IOrder) => Promise<IOrder>;
}
