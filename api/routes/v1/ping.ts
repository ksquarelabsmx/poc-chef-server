import { pingController } from "./../../controllers/ping";

export const pingRoutes = (app: any) => {
  app.get("/v1/ping", pingController.pong);
};
