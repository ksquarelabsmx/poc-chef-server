import * as boom from "boom";

import { error } from "../utils/errors";
import { IUser, IUserDao } from "../interfaces/user";
import { usersDataSource } from "../data-source/users-data-source";

const createUser = async (user: IUser): Promise<any> => {
  try {
    const userDao: IUserDao | undefined = usersDataSource.findByEmail(
      user.email
    );

    if (userDao) {
      return Promise.reject(boom.badRequest(error.emailInUse));
    }

    // TODO encrypt password
    const createdUser: IUserDao = await usersDataSource.save(user);
    return Promise.resolve(createdUser);
  } catch (err) {
    return Promise.reject(boom.internal());
  }
};

export const userService = {
  createUser
};
