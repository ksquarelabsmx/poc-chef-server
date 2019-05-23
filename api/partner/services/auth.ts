import * as boom from "boom";
import * as uuid from "uuid";
import * as moment from "moment";
import * as jwt from "jsonwebtoken";

import { config } from "../../../config";
import { error, response } from "../../common/utils";
import { user, auth } from "../../common/interfaces";
import { usersDataSource } from "../../common/repositories";
import { userMapper } from "./../../common/mappers";
import { IUserDao } from "./../../common/interfaces/user";
// TODO: add encrypt decrypt
const authenticate = (password: string, userPassword: string) => {
  return password === userPassword;
};

// validate that user/password are corrects
const validateLogin = async (loginCredentials: auth.ILogin): Promise<any> => {
  try {
    const { email, password } = loginCredentials;
    const userDao: IUserDao = await usersDataSource.findByEmail(email);

    if (!userDao) {
      throw Promise.reject(response.badRequest(error.userNotExist));
    }
    if (!authenticate(password, userDao.password)) {
      throw Promise.reject(boom.unauthorized(error.invalidPassword));
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
    return err;
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
  validateLogin
};
