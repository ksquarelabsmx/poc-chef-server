import * as moment from "moment";
import { v4 as uuid } from "uuid";

import { product } from "../interfaces";

const products: product.IProductDetails[] = [
  {
    id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
    name: "Poc Chuc Torta",
    description: "Is a Poc Chuc Torta",
    price: 25,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any): product.IProductDetails[] => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return products.filter(
      (user: product.IProductDetails) => user[key] === query[key]
    );
  }
  return products;
};

const save = (product: product.IProduct): product.IProductDetails => {
  product.id = uuid();
  const result: product.IProductDetails = {
    ...product,
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };
  products.push(result);
  return result;
};

const update = (product: product.IProduct): product.IProductDetails => {
  const index: number = products.findIndex(
    (p: product.IProductDetails) => p.id === product.id
  );
  products[index] = { ...products[index], ...product };
  return products[index];
};

export const productsDataSource = { find, save, update };
