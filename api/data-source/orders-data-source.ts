import { v4 as uuid } from "uuid";
import { IOrder, IOrderDetails } from "./../interfaces/order";
import moment = require("moment");

const orders: IOrderDetails[] = [
  {
    id: "fefcd99e-d7fb-4189-9e8f-c9395bea5fa7",
    userId: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "8c9ae830-dd56-4828-8503-c70355253de9",
    price: 45,
    orderProductId: ["606ffa47-a941-4982-b929-1a900273997c"],
    createdBy: "6d623d08-113c-4565-81b2-e17c90331241",
    paid: false,
    cancelled: false,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any): any => {
  if (query) {
    const [key] = Object.keys(query);
    return orders.filter((order: any) => order[key] === query[key]);
  } else {
    return orders;
  }
};

const save = (order: IOrder): IOrderDetails => {
  order.id = uuid();
  const result: IOrderDetails = {
    ...order,
    paid: false,
    cancelled: false,
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };
  orders.push(result);
  return result;
};

const update = (order: IOrder): IOrderDetails => {
  const index = orders.findIndex((ord: any) => ord.id === order.id);
  (<any>orders)[index] = { ...(<any>orders)[index], ...order };
  return (<any>orders)[index];
};

export const ordersDataSource = { find, save, update };
