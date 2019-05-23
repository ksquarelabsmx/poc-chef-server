import * as moment from "moment";
import { v4 as uuid } from "uuid";

import { db } from "./../../../db";
import { IUser, IUserDao } from "../interfaces/user";

const save = (user: IUser): Promise<IUserDao> => {
  const userDao: IUserDao = {
    ...user,
    id: uuid(),
    createdAt: moment()
      .utc()
      .unix(),
    updatedAt: moment()
      .utc()
      .unix()
  };

  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("user")
      .insertOne({ ...userDao }, (err: any, result: any) => {
        err ? reject(err) : resolve(result.ops[0]);
      });
  });
};

const findByEmail = async (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("user")
      .find({ email })
      .toArray(
        (err: any, data: any): any => {
          err ? reject(err) : resolve(data[0]);
        }
      );
  });
};
export const usersDataSource = { save, findByEmail };
