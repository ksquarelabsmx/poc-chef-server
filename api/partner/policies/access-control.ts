import * as fp from "lodash";

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
    const { title, status, detail } = authErrors.notRoleAuthorization;
    return res.send(response.error(title, status, source, detail));
  }

  const { role } = user;

  // role without privileges
  if (!fp.includes(roles, role)) {
    const { title, status, detail } = authErrors.notRoleAuthorization;
    return res.send(response.error(title, status, source, detail));
  }

  next();
};

export const onlyOwner = (dataSource: any) => (
  req: Request,
  res: Response,
  next: NextFunction
): Response | undefined => {
  const source: string = uriBuilder(req);
  const user: ISession | undefined = req["session"];
  const paramsId = req.params.id;

  if (!user) {
    const { title, status, detail } = authErrors.notUserAuthorization;
    return res.send(response.error(title, status, source, detail));
  }

  // get entity (order event, etc) and check owner
  const { id } = user;
  const entity: any = dataSource.find({ id: paramsId })[0];

  if (!fp.isEqual(id, entity.createdBy)) {
    const { title, status, detail } = authErrors.notUserAuthorization;
    return res.send(response.error(title, status, source, detail));
  }

  next();
};

/*
  Appends userId to body (useful for enforcing ownership when creating items)
    key: key to add/modify on body
*/
export const appendUser = (key: string = "created_by") => (
  req: Request,
  res: Response,
  next: Function
) => {
  const source: string = uriBuilder(req);
  const user: ISession | undefined = req["session"];

  if (!user) {
    const { title, status, detail } = authErrors.notUserAuthorization;
    return res.send(response.error(title, status, source, detail));
  }
  req.body[key] = user.id;
  next();
};
