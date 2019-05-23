import { v4 as uuid } from "uuid";
import moment = require("moment");

import { db } from "./../../../db";
import { IEvent } from "../models/event";
import { IEventRepository } from "./event-repository";

const find = (query?: any): Promise<IEvent[]> => {
  if (query) {
    return new Promise((resolve, reject) => {
      db.getDB()
        .collection("events")
        .find({ ...query })
        .toArray(
          (err: any, data: IEvent[]): any => {
            err ? reject(err) : resolve(data);
          }
        );
    });
  }

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("events")
      .find()
      .toArray(
        (err: any, data: IEvent[]): any => {
          err ? reject(err) : resolve(data);
        }
      );
  });
};

const save = (event: IEvent): Promise<IEvent> => {
  event.id = uuid();
  const result: IEvent = {
    ...event,
    orders: [],
    total: 0,
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
      .collection("events")
      .insertOne(
        { ...result },
        (err: any, result: any): any => {
          err ? reject(err) : resolve(result.ops[0]);
        }
      );
  });
};

const update = (event: IEvent): Promise<IEvent> => {
  event.updatedAt = moment()
    .utc()
    .unix();

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("events")
      .findOneAndUpdate(
        { id: event.id },
        { $set: { ...event } },
        { returnOriginal: false },
        (err: any, result: any): any => {
          err ? reject(err) : resolve(result.value);
        }
      );
  });
};

export const eventMemoryRepository: IEventRepository = { find, save, update };
