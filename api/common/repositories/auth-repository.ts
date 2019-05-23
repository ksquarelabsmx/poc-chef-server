import { db } from "./../../../db";
import { auth } from "../interfaces";

const findByName = (name: string): Promise<auth.IAuthProviderDao> => {
  return new Promise((resolve, reject) => {
    db.getDB()
      .collection("authProvider")
      .find({ name })
      .toArray(
        (err: any, data: auth.IAuthProviderDao): any => {
          err ? reject(err) : resolve(data[0]);
        }
      );
  });
};

export const authRepository = {
  findByName
};
