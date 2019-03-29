import * as boom from "boom";
import * as fp from "lodash/fp";
import * as uuid from "uuid";
import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import {
  LoginTicket,
  TokenPayload
} from "google-auth-library/build/src/auth/loginticket";

import { config } from "../../config";
import { error, response } from "../utils";
import { user, auth } from "../interfaces";
import { usersDataSource, authDataSource } from "../data-source";
import { userMapper } from "../mappers";

// TODO: add encrypt decrypt
const authenticate = (password: string, userPassword: string) => {
  return password === userPassword;
};

const getDataFromPayload = (payload: TokenPayload): user.IGoogleUser => {
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
  googleUser: user.IGoogleUser
): Promise<user.IUserDao> => {
  try {
    const { email, name } = googleUser;
    const userDao:
      | user.IUserDao
      | undefined = await usersDataSource.findByEmail(email);
    // if user exist return it
    if (userDao) {
      return Promise.resolve(userDao);
    }

    // create a user and return it
    const authProvider: auth.IAuthProviderDao = await authDataSource.findByName(
      "google"
    );

    const user: user.IUser = {
      email,
      name,
      password: "DUMMYPASS", // user can't access by password
      role: "user",
      authProviderId: authProvider.id
    };

    const createdUser: user.IUserDao = await usersDataSource.save(user);
    return Promise.resolve(createdUser);
  } catch (error) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

// validate that user/password are corrects
const validateLogin = async (loginCredentials: auth.ILogin): Promise<any> => {
  try {
    const { email, password } = loginCredentials;
    const userDao: user.IUserDao | undefined = usersDataSource.findByEmail(
      email
    );

    if (!userDao) {
      return Promise.reject(response.badRequest(error.userNotExist));
    }
    if (!authenticate(password, userDao.password)) {
      return Promise.reject(boom.unauthorized(error.invalidPassword));
    }

    // return jwt and user info
    const userDto: user.IUserDto = userMapper.toDto(userDao);

    const token: string = createJWT(userDao, "access");

    return Promise.resolve({
      jwt: token,
      user: {
        ...userDto
      }
    });
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

    const userData: user.IGoogleUser = getDataFromPayload(payload);
    const userDao: user.IUserDao = await handlerGoogleUser(userData);
    const userDto: user.IUserDto = userMapper.toDto(userDao);
    const token: string = createJWT(userDao, "access");

    // return jwt and user info
    return Promise.resolve({
      jwt: token,
      user: {
        ...userDto
      }
    });
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const createJWT = (user: user.IUserDao, type: string) => {
  const { id, email, role, name } = user;
  const { auth } = config;

  // get data for a token type. (user, admin, refresh, ...)
  const {
    expiry: { unit, length },
    subject,
    audience
  } = auth.jwt[type];

  // generate jwt data
  const expires: number = moment()
    .utc()
    .add(length, unit)
    .unix();
  const issued: number = moment()
    .utc()
    .unix();
  const expiresIn: number = expires - issued;

  // generate jwt
  const token = jwt.sign(
    {
      id,
      email,
      name,
      role,
      sub: subject,
      aud: audience,
      exp: expires,
      iat: issued,
      jti: uuid.v4()
    },
    auth.jwt.secret
  );
  return token;
};

export const authService = {
  validateLogin,
  googleLogin
};
