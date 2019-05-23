import { v4 as uuid } from "uuid";
import moment = require("moment");

import { db } from "./../../../db";
import { IProduct } from "../models/product";
import { IProductRepository } from "./product-repository";

const find = (query?: any): Promise<IProduct[]> => {
  if (query) {
    return new Promise((resolve, reject) => {
      db.getDB()
        .collection("products")
        .find({ ...query })
        .toArray(
          (err: any, data: IProduct[]): any => {
            err ? reject(err) : resolve(data);
          }
        );
    });
  }

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("products")
      .find()
      .toArray(
        (err: any, data: IProduct[]): any => {
          err ? reject(err) : resolve(data);
        }
      );
  });
};

const save = (product: IProduct): Promise<IProduct> => {
  product.id = uuid();
  const result: IProduct = {
    ...product,
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("products")
      .insertOne(
        { ...result },
        (err: any, result: any): any => {
          err ? reject(err) : resolve(result.ops[0]);
        }
      );
  });
};

const update = (product: IProduct): Promise<IProduct> => {
  product.updatedAt = moment()
    .utc()
    .unix();

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("products")
      .findOneAndUpdate(
        { id: product.id },
        { $set: { ...product } },
        { returnOriginal: false },
        (err: any, result: any): any => {
          err ? reject(err) : resolve(result.value);
        }
      );
  });
};

export const productMemoryRepository: IProductRepository = {
  find,
  save,
  update
};
