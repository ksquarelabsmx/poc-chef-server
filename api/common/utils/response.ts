import * as boom from "boom";

import { IDomainValidationError } from "../interfaces/error";

const success = (data: any, statusCode: any, url: any) => {
  return {
    request: new Date().getTime(), // timestamp
    url,
    data,
    statusCode
  };
};

const errors = (errors: any) => {
  return {
    errors
  };
};

const error = (title: any, statusCode: any, url: any, message: any) => {
  return {
    request: new Date().getTime(), // timestamp
    statusCode,
    source: url,
    title,
    message
  };
};

const badRequest = (errors: IDomainValidationError) => {
  return boom.badRequest(JSON.stringify(errors));
};

export const response = { success, error, errors, badRequest };
