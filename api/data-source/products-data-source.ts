import { IProduct, IProductDetails } from "./../interfaces/product";
import { v4 as uuid } from "uuid";
import moment = require("moment");

const products: IProductDetails[] = [
  {
    id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
    name: "Poc Chuc Torta",
    description: "Is a Poc Chuc Torta",
    price: 25,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any) => {
  if (query) {
    const [key] = Object.keys(query);
    return products.filter((user: any) => user[key] === query[key]);
  } else {
    return products;
  }
};

const save = (product: IProduct): IProductDetails => {
  product.id = uuid();
  const result: IProductDetails = {
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

const update = (product: IProduct): IProductDetails => {
  const index = products.findIndex((p: any) => p.id === product.id);
  (<any>products)[index] = { ...(<any>products)[index], ...product };
  return (<any>product)[index];
};

export const productsDataSource = { find, save, update };
