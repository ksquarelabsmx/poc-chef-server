import * as boom from "boom";
import * as fp from "lodash/fp";

import { error } from "./../utils/errors";
import { ILogin } from "../interfaces/auth";
import { IUserDao } from "./../interfaces/user";
import { usersDataSource } from "./../data-source/users-data-source";
import { appResponse } from "./../utils/appResponse";

// TODO: add encrypt decrypt
const authenticate = (password: string, userPassword: string) => {
  return password === userPassword;
};

// validate that user/password are corrects
const validateLogin = async (loginCredentials: ILogin): Promise<any> => {
  try {
    const { email, password } = loginCredentials;
    const user: IUserDao | undefined = usersDataSource.findByEmail(email);

    if (!user) {
      return Promise.reject(appResponse.badRequest(error.userNotExist));
    }
    if (!authenticate(password, user.password)) {
      return Promise.reject(boom.unauthorized(error.invalidPassword));
    }

    const userInfo = fp.pick(["id", "email", "role"], user);
    return Promise.resolve(userInfo);
  } catch (err) {
    return Promise.reject(boom.internal);
  }
};

export const authService = {
  validateLogin
};
