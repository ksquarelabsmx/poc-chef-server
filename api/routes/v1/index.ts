import * as path from "path";
import { Express, static as Static } from "express";

import { pingRoutes } from "./ping";
import { orderRoutes } from "./order";
import { eventRoutes } from "./event";
import { userRoutes } from "./user";
import { authRoutes } from "./auth";

const routes = (app: Express) => {
  pingRoutes(app);
  orderRoutes(app);
  eventRoutes(app);
  userRoutes(app);
  authRoutes(app);

  // statics routes
  app.use("/apidoc", Static(path.join(__dirname, "../../../public/apidoc")));
};

export default routes;
