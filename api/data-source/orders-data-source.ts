import * as moment from "moment";
import { v4 as uuid } from "uuid";

import { IOrder, IOrderDetails } from "./../interfaces/order";

const orders: IOrderDetails[] = [
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
  const index: number = orders.findIndex(
    (ord: IOrderDetails) => ord.id === order.id
  );
  orders[index] = { ...orders[index], ...order };
  return orders[index];
};

export const ordersDataSource = { find, save, update };
