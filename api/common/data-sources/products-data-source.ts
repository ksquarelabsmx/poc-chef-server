import { IProduct } from "../models/product";

export interface IProductsDataSource {
  find: (q?: any) => Promise<IProduct[]>;
  save: (p: IProduct) => Promise<IProduct>;
  update: (p: IProduct) => Promise<IProduct>;
}
