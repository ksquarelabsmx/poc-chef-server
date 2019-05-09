import * as fp from "lodash";
import * as boom from "boom";

import { ISession } from "../interfaces/auth";
import { authErrors } from "../utils/errors";
import { response, uriBuilder } from "../utils";
import { Request, Response, NextFunction } from "express";

export const filterRoles = (roles: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  const source: string = uriBuilder(req);
  const user: ISession | undefined = req["session"];

  if (!user) {
    const { title, statusCode, detail } = authErrors.notRoleAuthorization;
    return res.send(response.error(statusCode, source, detail, title));
  }

  const { role } = user;

  // role without privileges
  if (!fp.includes(roles, role)) {
    const { title, statusCode, detail } = authErrors.notRoleAuthorization;
    return res.send(response.error(statusCode, source, detail, title));
  }

  next();
};

export const onlyOwner = (dataSource: any) => async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const source: string = uriBuilder(req);
    const user: ISession | undefined = req["session"];
    const paramsId = req.params.id;

    if (!user) {
      const { title, statusCode, detail } = authErrors.notUserAuthorization;
      return res.send(response.error(statusCode, source, detail, title));
    }

    // get entity (order event, etc) and check owner
    const { id } = user;
    const [entity]: any = await dataSource.find({ id: paramsId });

    if (!fp.isEqual(id, entity.createdBy)) {
      const { title, statusCode, detail } = authErrors.notUserAuthorization;
      return res.send(response.error(statusCode, source, detail, title));
    }
    next();
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

/*
  Appends userId to body (useful for enforcing ownership when creating items)
    key: key to add/modify on body
*/
//Not in use
export const appendUser = (key: string = "created_by") => (
  req: Request,
  res: Response,
  next: Function
) => {
  const source: string = uriBuilder(req);
  const user: ISession | undefined = req["session"];

  if (!user) {
    const { title, statusCode, detail } = authErrors.notUserAuthorization;
    return res.send(response.error(statusCode, source, detail, title));
  }
  req.body[key] = user.id;
  next();
};

export const appendUserName = (key: string = "user_name") => (
  req: Request,
  res: Response,
  next: Function
) => {
  const source: string = uriBuilder(req);
  const user: ISession | undefined = req["session"];

  if (!user) {
    const { title, statusCode, detail } = authErrors.notUserAuthorization;
    return res.send(response.error(statusCode, source, detail, title));
  }
  req.body[key] = user.name;
  next();
};
