import * as boom from "boom";
import * as cors from "cors";
import * as Debug from "debug";
import * as helmet from "helmet";
import * as express from "express";
import * as bodyParser from "body-parser";
const slash = require("express-slash");
import { Request, Response } from "express";

import {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} from "./middlewares/errorHandlers";
import routes from "./routes/v1";

const debug = Debug("chef:orders:app");

debug(`app loading...`);

// express application
const app = express();

app.enable("strict routing");

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app, this adds some http headers for security.
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
    extended: true
  })
);
app.use(bodyParser.json());

// routes
routes(app);

// v1/name/ redirect to v1/name
app.use(slash(0));

app.use((req: Request, res: Response) => {
  const {
    output: { statusCode, payload }
  } = boom.notFound();
  res.status(statusCode).json(payload);
});

// handling errors
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

export { app };
