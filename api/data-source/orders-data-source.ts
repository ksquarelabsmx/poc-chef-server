import { v4 as uuid } from "uuid";
import { IOrder } from "./../interfaces/order";

const orders: IOrder[] = [
  {
    id: uuid(),
    total: 45,
    shrimpTortasTotal: 1,
    shrimpTortaUnitaryPrice: 25,
    pocChucTortasTotal: 1,
    pocChucTortaUnitaryPrice: 20,
    event: {
      id: uuid(),
      createdAt: 1548000000
    },
    owner: {
      id: uuid(),
      name: "Juan Perez"
    },
    paid: false,
    canceled: false
  }
];

const find = (query?: any): any => {
  if (query) {
    const key = Object.keys(query)[0];
    return orders.filter((order: any) => order[key] === query[key]);
  } else {
    return orders;
  }
};

const save = (order: IOrder): IOrder => {
  order.id = uuid();
  orders.push(order);
  return order;
};

const update = (order: IOrder): IOrder => {
  const index = orders.findIndex((ord: any) => ord.id === order.id);
  (<any>orders)[index] = { ...order };
  return (<any>orders)[index];
};

export const ordersDataSource = { find, save, update };
