import * as boom from "boom";

import { error } from "../utils/errors";
import { IUser, IUserDao } from "../interfaces/user";
import { usersDataSource } from "../data-source/users-data-source";

const createUser = async (user: IUser): Promise<any> => {
  try {
    const existEmail: boolean = usersDataSource.findByEmail(user.email);

    if (existEmail) {
      return Promise.reject(boom.badRequest(error.emailInUse));
    }

    const createdUser: IUserDao = await usersDataSource.save(user);
    return Promise.resolve(createdUser);
  } catch (err) {
    return Promise.reject(boom.internal());
  }
};

export const userService = {
  createUser
};
