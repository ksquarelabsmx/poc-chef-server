import { v4 as uuid } from "uuid";
import moment = require("moment");

import { db } from "./../../../db";
import { IOrder } from "../models/order";
import { IOrderRepository } from "./order-repository";

const find = (query?: any): Promise<IOrder[]> => {
  if (query) {
    return new Promise((resolve, reject) => {
      db.getDB()
        .collection("orders")
        .find({ ...query })
        .toArray(
          (err: any, data: IOrder[]): any => {
            err ? reject(err) : resolve(data);
          }
        );
    });
  }

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("orders")
      .find()
      .toArray(
        (err: any, data: IOrder[]): any => {
          err ? reject(err) : resolve(data);
        }
      );
  });
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

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("orders")
      .insertOne(
        { ...result },
        (err: any, result: any): any => {
          err ? reject(err) : resolve(result.ops[0]);
        }
      );
  });
};

const update = (order: IOrder): Promise<IOrder> => {
  order.updatedAt = moment()
    .utc()
    .unix();

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("orders")
      .findOneAndUpdate(
        { id: order.id },
        { $set: { ...order } },
        { returnOriginal: false },
        (err: any, result: any): any => {
          err ? reject(err) : resolve(result.value);
        }
      );
  });
};

export const orderMemoryRepository: IOrderRepository = { find, save, update };
