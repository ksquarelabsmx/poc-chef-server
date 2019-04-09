import { IProduct } from "../../common/models/product";

const products: IProduct[] = [
  {
    id: "1",
    name: "Poc Chuc Torta",
    description: "Delicious",
    price: 25,
    createdAt: 1554736045100,
    updatedAt: 1554736045100
  },
  {
    id: "2",
    name: "Shrimp Torta",
    description: "Delicious",
    price: 25,
    createdAt: 1554736045100,
    updatedAt: 1554736045100
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
