import * as boom from "boom";
import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";

import { hasKey } from "../utils";

interface IError {
  field: string;
  error: string;
}

const formatErrorDetails = (error: Joi.ValidationError): IError[] => {
  const errorReducer = (errorsAcc: IError[], err: string): IError[] => {
    const errorFormated: IError = {
      field: err.split('"')[1].replace(/['"]/g, ""),
      error: err.split('" ')[1].replace(/['"]/g, "")
    };

    return [...errorsAcc, errorFormated];
  };

  return error.details.map(details => details.message).reduce(errorReducer, []);
};

const validate = (data: any, schema: any): Joi.ValidationError => {
  const validationOptions: Joi.ValidationOptions = {
    abortEarly: false, // returns all the errors found
    allowUnknown: false, // doesn't allow objects to contain unknown keys
    convert: false // doesn't try to cast values to the required types
  };

  const { error } = Joi.validate(data, schema, validationOptions);
  return error;
};

const validation = (schema: any, check: string = "body") => {
  return function(req: Request, res: Response, next: NextFunction) {
    // this "if" is necessary to avoid signature index problem
    if (hasKey(req, check)) {
      const error: Joi.ValidationError = validate(req[check], schema);

      if (error) {
        const errorDetails: string = JSON.stringify(formatErrorDetails(error));
        return next(boom.badRequest(errorDetails));
      }
      return next();
    }
  };
};

export { validation };
