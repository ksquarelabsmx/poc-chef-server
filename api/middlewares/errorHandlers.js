const {
  config
} = require('../../config');
const debug = require('debug')('chef:orders:controller:orders');
const chalk = require('chalk');
const boom = require('boom');

function logErrors(err, req, res, next) {
  debug(`LogErrors: ${chalk.red(err.stack)}`);
  next(err)
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function withErrorStack(err, stack) {
  if (config.server.name.toLowerCase() !== 'production') {
    return { ...err,
      stack
    }
  }
}

function clientErrorHandler(err, req, res, next) {

  const {
    output: {
      statusCode,
      payload
    }
  } = err;
  // catch error for ajax request or if an error occurs while streaming
  if (!req.accepts('html') || req.xhr || res.headersSend) {
    res.status(statusCode).json(withErrorStack(payload, err.stack));
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  const {
    output: {
      statusCode,
      payload
    }
  } = err;
  // catch error while streaming
  if (res.headersSend) {
    next(err);
  }

  res.status(statusCode).json(withErrorStack(payload, err.stack))
}

module.exports = {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
}