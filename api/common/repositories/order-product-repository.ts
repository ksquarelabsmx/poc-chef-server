import { v4 as uuid } from "uuid";
import { IOrderProduct } from "../models/order-product";

const orderProducts: IOrderProduct[] = [
  {
    id: "606ffa47-a941-4982-b929-1a900273997c",
    name: "Poc Chef Torta",
    price: 50,
    quantity: 2,
    subtotal: 100,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any): IOrderProduct[] => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return orderProducts.filter(
      (user: IOrderProduct) => user[key] === query[key]
    );
  }
  return orderProducts;
};

const save = (orderProduct: IOrderProduct): IOrderProduct => {
  orderProduct.id = uuid();
  const result: IOrderProduct = { ...orderProduct };
  orderProducts.push(result);
  return result;
};

const update = (orderProduct: IOrderProduct): IOrderProduct => {
  const index: number = orderProducts.findIndex(
    (p: IOrderProduct) => p.id === orderProduct.id
  );
  orderProducts[index] = { ...orderProduct };
  return orderProducts[index];
};

export const orderProductsRepository = { find, save, update };
