import chalk from "chalk";
import * as boom from "boom";
import * as Debug from "debug";
import { config } from "../../config";
import { Request, Response, NextFunction } from "express";

const debug = Debug("chef:orders:controller:orders");

function logErrors(err: any, req: Request, res: Response, next: NextFunction) {
  debug(`LogErrors: ${chalk.red(err.stack)}`);
  next(err);
}

function wrapErrors(err: any, req: Request, res: Response, next: NextFunction) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function withErrorStack(err: any, stack: any) {
  if (config.server.name.toLowerCase() !== "production") {
    return { ...err, stack };
  }
}

function clientErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    output: { statusCode, payload }
  } = err;
  // catch error for ajax request or if an error occurs while streaming
  if (!req.accepts("html") || req.xhr || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    output: { statusCode, payload }
  } = err;
  // catch error while streaming
  if (res.headersSent) {
    next(err);
  }

  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

export { logErrors, wrapErrors, clientErrorHandler, errorHandler };
