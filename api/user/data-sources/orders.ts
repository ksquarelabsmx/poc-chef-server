import * as cuid from "cuid";
import { IOrder } from "../../common/models/order";

const orders: IOrder[] = [
  {
    id: "fefcd99e-d7fb-4189-9e8f-c9395bea5fa7",
    userId: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "8c9ae830-dd56-4828-8503-c70355253de9",
    total: 100,
    products: [
      {
        id: "1",
        name: "Poc Chuc Torta",
        quantity: 2,
        price: 25,
        subtotal: 50,
        createdAt: 1554736045100,
        updatedAt: 1554736045100
      },
      {
        id: "2",
        name: "Shrimp Torta",
        quantity: 2,
        price: 25,
        subtotal: 50,
        createdAt: 1554736045100,
        updatedAt: 1554736045100
      }
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
    total: 50,
    products: [
      {
        id: "3",
        name: "Poc Chuc Torta",
        quantity: 2,
        price: 25,
        subtotal: 50,
        createdAt: 1554736045100,
        updatedAt: 1554736045100
      }
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
    total: 50,
    products: [
      {
        id: "4",
        name: "Poc Chuc Torta",
        quantity: 2,
        price: 25,
        subtotal: 50,
        createdAt: 1554736045100,
        updatedAt: 1554736045100
      }
    ],
    createdBy: "6d623d08-113c-4565-81b2-e17c90331241",
    paid: false,
    cancelled: false,
    createdAt: 1548000000,
    updatedAt: 1548000000
  }
];

interface IFindQuery {
  id?: string;
}

export const find = (query: IFindQuery = {}): Promise<IOrder[]> => {
  if (query.id) {
    const docs = orders.filter(order => order.id === query.id);
    return Promise.resolve(docs);
  }

  return Promise.resolve(orders);
};

export const save = (order: IOrder): Promise<IOrder> => {
  const newOrder = {
    ...order,
    id: cuid()
  };
  orders.push(newOrder);
  return Promise.resolve(newOrder);
};

export const update = (order: IOrder): Promise<IOrder> => {
  const index = orders.findIndex(oldOrder => {
    return oldOrder.id === order.id;
  });

  orders[index] = order;
  return Promise.resolve(order);
};
