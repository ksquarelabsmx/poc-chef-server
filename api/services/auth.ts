import * as boom from "boom";
import * as fp from "lodash/fp";
import { OAuth2Client } from "google-auth-library";

import { error } from "./../utils/errors";
import { ILogin, IAuthProviderDao } from "../interfaces/auth";
import { IUserDao, IUser, IGoogleUser } from "./../interfaces/user";
import { authDataSource } from "./../data-source/auth-provider-data-source";
import { usersDataSource } from "./../data-source/users-data-source";
import {
  LoginTicket,
  TokenPayload
} from "google-auth-library/build/src/auth/loginticket";
import { config } from "../../config";

// TODO: add encrypt decrypt
const authenticate = (password: string, userPassword: string) => {
  return password === userPassword;
};

const getDataFromPayload = (payload: TokenPayload): IGoogleUser => {
  const getEmail = fp.compose(
    fp.defaultTo(""),
    fp.prop("email")
  );

  const getName = fp.compose(
    fp.defaultTo(""),
    fp.prop("name")
  );

  const getPicture = fp.compose(
    fp.defaultTo(""),
    fp.prop("picture")
  );

  return {
    userId: payload.sub,
    email: getEmail(payload),
    name: getName(payload),
    picture: getPicture(payload)
  };
};

// get user from datasource or create it
const handlerGoogleUser = async (
  googleUser: IGoogleUser
): Promise<IUserDao> => {
  try {
    const { email, name } = googleUser;
    const userDao: IUserDao | undefined = await usersDataSource.findByEmail(
      email
    );
    // if user exist return it
    if (userDao) {
      return Promise.resolve(userDao);
    }

    // create a user and return it
    const authProvider: IAuthProviderDao = await authDataSource.findByName(
      "google"
    );

    const user: IUser = {
      email,
      name,
      password: "DUMMYPASS", // user can't access by password
      role: "user",
      authProviderId: authProvider.id
    };

    const createdUser: IUserDao = await usersDataSource.save(user);
    return Promise.resolve(createdUser);
  } catch (error) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

// validate that user/password are correctsz
const validateLogin = async (loginCredentials: ILogin): Promise<any> => {
  try {
    const { email, password } = loginCredentials;
    const user: IUserDao | undefined = usersDataSource.findByEmail(email);

    if (!user) {
      return Promise.reject(boom.badRequest(error.userNotExist));
    }
    if (!authenticate(password, user.password)) {
      return Promise.reject(boom.unauthorized(error.invalidPassword));
    }

    const userInfo = fp.pick(["id", "email", "role"], user);
    return Promise.resolve(userInfo);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

// googleLogin is only for role user
const googleLogin = async (idToken: string): Promise<any> => {
  try {
    const gAuthClient = new OAuth2Client(config.auth.google.clientId);
    const ticket: LoginTicket = await gAuthClient.verifyIdToken({
      idToken,
      audience: config.auth.google.clientId
    });

    const payload: TokenPayload | undefined = ticket.getPayload();

    if (!payload) {
      return Promise.reject(boom.internal("Can't payload from google account"));
    }

    const userInfo: IGoogleUser = getDataFromPayload(payload);
    const userDao: IUserDao = await handlerGoogleUser(userInfo);

    return Promise.resolve(userDao);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

export const authService = {
  validateLogin,
  googleLogin
};
