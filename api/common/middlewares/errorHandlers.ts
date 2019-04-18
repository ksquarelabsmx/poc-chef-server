import chalk from "chalk";
import * as boom from "boom";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { config } from "../../../config";
import { logger } from "../../libraries/log";
import { badRequestFormated } from "./utils";

const debug = Debug("chef:orders:controller:orders");

const logErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  debug(`LogErrors: ${chalk.red(err.stack)}`);
  next(err);
};

const wrapErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
};

const withErrorStack = (err: boom.Payload, stack: any) => {
  if (config.server.name.toLowerCase() !== "production") {
    return { ...err, stack };
  }

  return err;
};

const clientErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    output: { statusCode, payload }
  } = err;
  // catch error for ajax request or if an error occurs while streaming
  if (!req.accepts("html") || req.xhr || res.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
};

const errorHandler = (
  err: boom<any>,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  const {
    output: { statusCode, payload }
  } = err;

  // catch error while streaming
  if (res.headersSent) {
    next(err);
  }
  if (statusCode === 400) {
    const data = withErrorStack(payload, err.stack);
    const dataFormatted = badRequestFormated(data);

    logger.error(dataFormatted);
    return res.status(statusCode).json(dataFormatted);
  }

  const dataFormatted = withErrorStack(payload, err.stack);
  logger.error(dataFormatted);
  return res.status(statusCode).json(dataFormatted);
};

export { logErrors, wrapErrors, clientErrorHandler, errorHandler };
