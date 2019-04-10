import * as boom from "boom";

import { IDomainValidationError } from "../interfaces/error";

const success = (data: any, code: any, url: any) => {
  return {
    request: new Date().getTime(), // timestamp
    url: url,
    data: data,
    code: code
  };
};

const errors = (errors: any) => {
  return {
    errors
  };
};

const error = (title: any, status: any, url: any, message: any) => {
  return {
    request: new Date().getTime(), // timestamp
    status: status,
    source: url,
    title: title,
    detail: message
  };
};

const badRequest = (errors: IDomainValidationError) => {
  return boom.badRequest(JSON.stringify(errors));
};

export const response = { success, error, errors, badRequest };
