import * as moment from "moment";
import { v4 as uuid } from "uuid";

import { order } from "./../interfaces";

const orders: order.IOrderDetails[] = [
  {
    id: "fefcd99e-d7fb-4189-9e8f-c9395bea5fa7",
    userId: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "8c9ae830-dd56-4828-8503-c70355253de9",
    price: 45,
    orderProductId: [
      "606ffa47-a941-4982-b929-1a900273997c",
      "fc6a2b09-f797-460f-8ab3-8c221f4f6211"
    ],
    createdBy: "6d623d08-113c-4565-81b2-e17c90331241",
    paid: false,
    cancelled: true,
    createdAt: 1548000000,
    updatedAt: 1548000000
  },
  {
    id: "cd639768-37fc-4386-8fc8-f93c2327ebf1",
    userId: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "8c9ae830-dd56-4828-8503-c70355253de9",
    price: 60,
    orderProductId: [
      "bfca1b12-567c-4ae7-8f60-45563b28af36",
      "13e3d6e4-64fe-4467-ae82-7112d709d252"
    ],
    createdBy: "6d623d08-113c-4565-81b2-e17c90331241",
    paid: true,
    cancelled: false,
    createdAt: 1548000000,
    updatedAt: 1548000000
  },
  {
    id: "93d1d016-6a24-4680-ae80-a558176aba37",
    userId: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "92c483f9-87cb-4715-b563-093f91703f63",
    price: 90,
    orderProductId: [
      "b931dcdb-c833-4e3b-b156-cade380bc5eb",
      "f5d6cc72-da67-4d2a-b3eb-c7a2878aea23"
    ],
    createdBy: "6d623d08-113c-4565-81b2-e17c90331241",
    paid: false,
    cancelled: false,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

const find = (query?: any): order.IOrderDetails[] => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return orders.filter(
      (order: order.IOrderDetails) => order[key] === query[key]
    );
  }
  return orders;
};

const save = (order: order.IOrder): order.IOrderDetails => {
  order.id = uuid();
  const result: order.IOrderDetails = {
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

const update = (order: any): order.IOrderDetails => {
  const index: number = orders.findIndex(
    (ord: order.IOrderDetails) => ord.id === order.id
  );
  orders[index] = { ...orders[index], ...order };
  return orders[index];
};

export const ordersDataSource = { find, save, update };
