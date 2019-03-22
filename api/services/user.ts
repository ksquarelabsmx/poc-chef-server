import * as boom from "boom";

import { error } from "../utils/errors";
import { IUser, IUserDao } from "../interfaces/user";
import { IAuthProviderDao } from "../interfaces/auth";
import { usersDataSource } from "../data-source/users-data-source";
import { authDataSource } from "../data-source/auth-provider-data-source";
import { appResponse } from "./../utils/appResponse";

const registerPartner = async (user: IUser): Promise<any> => {
  try {
    const userDao: IUserDao | undefined = usersDataSource.findByEmail(
      user.email
    );

    if (userDao) {
      return Promise.reject(appResponse.badRequest(error.emailInUse));
    }

    const authProvider:
      | IAuthProviderDao
      | undefined = await authDataSource.findByName("custom");

    if (!authProvider) {
      return Promise.reject(boom.internal(error.invalidAuthProvider));
    }

    // TODO encrypt password
    const createdUser: IUserDao = await usersDataSource.save({
      ...user,
      authProviderId: authProvider.id
    });

    console.log(createdUser);

    return Promise.resolve(createdUser);
  } catch (err) {
    return Promise.reject(boom.internal());
  }
};

export const userService = {
  registerPartner
};
