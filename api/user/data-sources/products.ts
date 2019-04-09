import { IProduct } from "../models/product";

const products: IProduct[] = [
  {
    id: "1",
    name: "Poc Chuc Torta",
    created_at: 1554736045100,
    price: 25
  },
  {
    id: "2",
    name: "Shrimp Torta",
    created_at: 1554736045100,
    price: 25
  }
];

interface IFindQuery {
  id?: string;
}

export const find = (query: IFindQuery = {}): Promise<IProduct[]> => {
  if (query.id) {
    const result = products.filter(prod => query.id === prod.id);
    return Promise.resolve(result);
  }

  return Promise.resolve(products);
};
