import { v4 as uuid } from "uuid";
import moment = require("moment");

import { IOrder } from "../models/order";
import { IOrderRepository } from "./order-repository";

const orders: IOrder[] = [
  {
    id: "fefcd99e-d7fb-4189-9e8f-c9395bea5fa7",
    userName: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "8c9ae830-dd56-4828-8503-c70355253de9",
    total: 100,
    orderFolio: "1",
    products: [
      {
        id: "faa65af2-ac6d-4404-9d9d-7423f04eb740",
        name: "Poc Chuc Torta",
        quantity: 2,
        price: 25,
        subtotal: 50,
        createdAt: 1554736045100,
        updatedAt: 1554736045100
      },
      {
        id: "8eeb4aa5-6f49-43a4-b25f-7987d938f3a7",
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
    userName: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "92c483f9-87cb-4715-b563-093f91703f63",
    total: 50,
    orderFolio: "2",
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
    createdBy: "02840522-0aea-422a-8972-77d73701630a",
    paid: true,
    cancelled: false,
    createdAt: 1548000000,
    updatedAt: 1548000000
  },
  {
    id: "93d1d016-6a24-4680-ae80-a558176aba37",
    userName: "6d623d08-113c-4565-81b2-e17c90331241",
    eventId: "92c483f9-87cb-4715-b563-093f91703f63",
    total: 50,
    orderFolio: "3",
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

const find = (query?: any): Promise<IOrder[]> => {
  if (query) {
    const [key]: string[] = Object.keys(query);
    return Promise.resolve(
      orders.filter((order: IOrder) => order[key] === query[key])
    );
  }
  return Promise.resolve(orders);
};

const save = (order: IOrder): Promise<IOrder> => {
  order.id = uuid();
  const result: IOrder = {
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
  return Promise.resolve(result);
};

const update = (order: IOrder): Promise<IOrder> => {
  const index: number = orders.findIndex((ord: IOrder) => ord.id === order.id);
  orders[index] = {
    ...order,
    updatedAt: moment()
      .utc()
      .unix()
  };
  return Promise.resolve(orders[index]);
};

export const orderMemoryRepository: IOrderRepository = { find, save, update };
