"use strict";

/**
 * author: ivan sabido
 * date: 23/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 * description: Archivo que ejecuta el servidor de express.
 */

/**
 * third party libraries
 */
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");

const cors = require("cors");
const chalk = require("chalk");
const routes = require("./routes/v1");
const debug = require("debug")("chef:orders:app");
const boom = require('boom');
const slash = require('express-slash');

debug(`app loading...`)

/**
 * Middlewares
 */

const {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} = require('./middlewares/errorHandlers')
/**
 * project libraries
 */

const utils = require("./utils");
const response = require("./utils/response");

/**
 * express application
 */
const app = express();
app.enable('strict routing');
// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false
  })
);

// parsing the request bodys
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// routes
routes(app);
app.use(slash());
app.use(function (req, res, next) {
  const {
    output: {
      statusCode,
      payload
    }
  } = boom.notFound();
  res.status(statusCode).json(payload);
})

// handling errors

app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   debug(`Error: ${chalk.red(err.message)}`);
//   let uri = utils.getURI(req.protocol, req.originalUrl, req.get("host"));
//   res.status(400).send(response.error("Internal Problem", 400, uri, err.message));
// });

module.exports = app;