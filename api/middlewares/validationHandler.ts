import * as boom from "boom";
import * as Joi from "joi";

import { Request, Response, NextFunction } from "express";

function validate(data: any, schema: any) {
  const { error } = Joi.validate(data, schema);
  return error;
}

function validationHandler(schema: any, check: string = "body") {
  return function(req: Request, res: Response, next: NextFunction) {
    const error = validate((<any>req)[check], schema);
    error ? next(boom.badRequest(String(error))) : next();
  };
}

module.exports = validationHandler;
