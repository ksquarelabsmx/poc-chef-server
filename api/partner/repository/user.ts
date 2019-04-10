import * as boom from "boom";

import { error, response } from "../utils";
import { user, auth } from "../interfaces";
import { usersDataSource, authDataSource } from "../../common/data-sources";

export const UserRepository = () => {
  const registerPartner = async (user: user.IUser): Promise<any> => {
    try {
      const userDao: user.IUserDao | undefined = usersDataSource.findByEmail(
        user.email
      );

      if (userDao) {
        return Promise.reject(response.badRequest(error.emailInUse));
      }

      const authProvider:
        | auth.IAuthProviderDao
        | undefined = await authDataSource.findByName("custom");

      if (!authProvider) {
        // TODO: use another status code
        return Promise.reject(boom.internal(error.invalidAuthProvider));
      }

      // TODO encrypt password
      const createdUser: user.IUserDao = await usersDataSource.save({
        ...user,
        authProviderId: authProvider.id
      });

      return Promise.resolve(createdUser);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    registerPartner
  };
};
