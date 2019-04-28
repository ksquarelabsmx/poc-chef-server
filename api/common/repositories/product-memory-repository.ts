import { v4 as uuid } from "uuid";
import moment = require("moment");

import { IProduct } from "../models/product";
import { IProductRepository } from "./product-repository";

const products: IProduct[] = [
  {
    id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
    name: "Poc Chuc Torta",
    price: 25,
    createdAt: 1548000000,
    updatedAt: 1548000000
  },
  {
    id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a7",
    name: "Shrimp Torta",
    price: 25,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any): Promise<IProduct[]> => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return Promise.resolve(
      products.filter((product: IProduct) => product[key] === query[key])
    );
  }
  return Promise.resolve(products);
};

const save = (product: IProduct): Promise<IProduct> => {
  product.id = uuid();
  const result: IProduct = {
    ...product,
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };
  products.push(result);
  return Promise.resolve(result);
};

const update = (product: IProduct): Promise<IProduct> => {
  const index: number = products.findIndex(
    (p: IProduct) => p.id === product.id
  );
  products[index] = {
    ...product,
    updatedAt: moment()
      .utc()
      .unix()
  };
  return Promise.resolve(products[index]);
};

export const productMemoryRepository: IProductRepository = {
  find,
  save,
  update
};
