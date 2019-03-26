import { Express } from "express";

import { pingController } from "./../../controllers";

export const pingRoutes = (app: Express) => {
  app.get("/v1/ping", pingController.pong);
};
