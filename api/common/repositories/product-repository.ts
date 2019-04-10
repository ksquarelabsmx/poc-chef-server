import { IProduct } from "../models/product";

export interface IProductRepository {
  find: (q?: any) => Promise<IProduct[]>;
  save: (p: IProduct) => Promise<IProduct>;
  update: (p: IProduct) => Promise<IProduct>;
}
