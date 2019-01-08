const boom = require('boom');

function authorizationHandler(err, req, res, next) {

  if (!req.headers.authorization) {
    next(boom.unauthorized())
  }
  next();
}

module.exports = {
  authorizationHandler
}