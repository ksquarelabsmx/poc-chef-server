import * as boom from "boom";
import { Request, Response, NextFunction } from "express";
//TODO: validate it's use
const authorizationHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    next(boom.unauthorized());
  }
  next();
};

export { authorizationHandler };
