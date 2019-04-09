import * as cuid from "cuid";
import { IOrderDetails } from "../models/order";

const orders: IOrderDetails[] = [
  {
    id: "1",
    created_at: 1554736045107,
    event: {
      event_id: "1",
      name: "Tortas",
      created_at: 1554736045101
    },
    products: [
      { id: "1", name: "Poc Chuc Torta", price: 25, quantity: 2, subtotal: 50 }
    ],
    total: 50,
    cancelled: false
  },
  {
    id: "2",
    event: {
      event_id: "2",
      name: "Fondita Rubí",
      created_at: 1554736045101
    },
    created_at: 1554736045107,
    products: [
      { id: "1", name: "Poc Chuc Torta", price: 25, quantity: 2, subtotal: 50 },
      { id: "2", name: "Shrimp Torta", price: 25, quantity: 2, subtotal: 50 }
    ],
    total: 100,
    cancelled: false
  }
];

interface IFindQuery {
  id?: string;
}

export const find = (query: IFindQuery = {}): Promise<IOrderDetails[]> => {
  if (query.id) {
    const docs = orders.filter(order => order.id === query.id);
    return Promise.resolve(docs);
  }

  return Promise.resolve(orders);
};

export const save = (order: IOrderDetails): Promise<IOrderDetails> => {
  const newOrder = {
    ...order,
    id: cuid()
  };
  orders.push(newOrder);
  return Promise.resolve(newOrder);
};

export const update = (order: IOrderDetails): Promise<IOrderDetails> => {
  const index = orders.findIndex(oldOrder => {
    return oldOrder.id === order.id;
  });

  orders[index] = order;
  return Promise.resolve(order);
};
