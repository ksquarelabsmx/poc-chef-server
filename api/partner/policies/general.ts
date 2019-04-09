import * as moment from "moment";
import * as jwt from "jsonwebtoken";
import * as fp from "lodash/fp";
import { Request, Response, NextFunction } from "express";

import { config } from "../../../config";
import { uriBuilder, response } from "../utils";
import { authErrors } from "../utils/errors";
import { user, error } from "../interfaces";

// check if the authorization header is correct, return
const checkAuthzHeader = (authorization: string): error.IError | undefined => {
  if (!authorization) {
    return authErrors.noTokenPresent;
  }

  const splitedAuthorization: string[] = authorization.split(" ");

  if (splitedAuthorization.length !== 2) {
    return authErrors.malformedHeader;
  }

  const scheme: string = splitedAuthorization[0];

  if (!/^Bearer$/i.test(scheme)) {
    return authErrors.invalidAuthMethod;
  }
};

const checkJWT = (token: string, type: string): error.IError | undefined => {
  const decodedjwt: any = jwt.decode(token);
  const actualTime: number = moment()
    .utc()
    .unix();

  const { auth } = config;

  // Check if token is valid
  if (fp.isEmpty(decodedjwt)) {
    return authErrors.jwtInvalid;
  }
  // Check if token expired
  if (decodedjwt.exp <= actualTime) {
    return authErrors.expiredToken;
  }
  // Check if token is early
  if (!fp.isEmpty(decodedjwt.nbf) && actualTime <= decodedjwt.nbf) {
    return authErrors.tokenEarly;
  }
  // Check if the audiencie is the correct one
  if (auth.jwt[type].audience !== decodedjwt.aud) {
    return authErrors.invalidAudencie;
  }
  // Check if the subject is valid
  if (auth.jwt[type].subject !== decodedjwt.sub) {
    return authErrors.invalidSubject;
  }
};

export const validateJWT = (type: string) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization: string = req.get("Authorization") || "";
  const source: string = uriBuilder(req);

  const authzError: error.IError | undefined = checkAuthzHeader(authorization);

  // check authorization header errors
  if (authzError) {
    const { title, detail, status } = authzError;
    return res.send(response.error(title, status, source, detail));
  }

  const token: string = authorization.split(" ")[1];
  const tokenError: error.IError | undefined = checkJWT(token, type);

  // check jwt errors
  if (tokenError) {
    const { title, detail, status } = tokenError;
    return res.send(response.error(title, status, source, detail));
  }

  const decodedjwt: any = jwt.decode(token);
  const userData: user.IUserDto = fp.omit("password", decodedjwt);

  // add user data in req session
  req["session"] = {
    id: userData.id,
    email: userData.email,
    role: userData.role,
    name: userData.name
  };

  next();
};
