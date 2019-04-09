import * as moment from "moment";
import { v4 as uuid } from "uuid";
import { IProduct } from "../../common/models/product";

const products: IProduct[] = [
  {
    id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
    name: "Poc Chuc Torta",
    description: "Is a Poc Chuc Torta",
    price: 25,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any): IProduct[] => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return products.filter((user: IProduct) => user[key] === query[key]);
  }
  return products;
};

const save = (product: IProduct): IProduct => {
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
  return result;
};

const update = (product: IProduct): IProduct => {
  const index: number = products.findIndex(
    (p: IProduct) => p.id === product.id
  );
  products[index] = { ...products[index], ...product };
  return products[index];
};

export const productsDataSource = { find, save, update };