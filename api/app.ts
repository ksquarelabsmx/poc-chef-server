import * as boom from "boom";
import * as cors from "cors";
import * as Debug from "debug";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as express from "express";
import * as bodyParser from "body-parser";
import slash = require("express-slash");
import { Request, Response } from "express";
import swaggerJSDoc = require("swagger-jsdoc");
import * as swaggerUi from "swagger-ui-express";

import {
  logErrors,
  wrapErrors,
  clientErrorHandler,
  errorHandler
} from "./common/middlewares";
import { requestLogStream } from "./libraries/log";
import { user } from "./user/app";
import { partner } from "./partner/app";

const debug = Debug("chef:orders:app");

debug(`app loading...`);

// express application
const app = express();

app.enable("strict routing");

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());
app.use(morgan("short", { stream: requestLogStream }));

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

// Swagger definition
const swaggerDefinition = {
  info: {
    // API informations (required)
    title: "Poc Chef", // Title (required)
    version: "1.0.0", // Version (required)
    description: "App to create food events"
  },
  host: "localhost:3000",
  basePath: "/",
  securityDefinitions: {
    bearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  }
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: [
    "./api/partner/routes/v1/*.ts",
    "./api/user/routes/v1/*.ts",
    "./api/common/swagger/definitions/*.yaml"
  ]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

// Serve swagger docs the way you like
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// routes
app.use("/", partner);

app.use("/user/api/", user);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
