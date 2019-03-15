import * as path from "path";
import { static as Static } from "express";

import { pingRoutes } from "./ping";
import { orderRoutes } from "./order";
import { eventRoutes } from "./event";
import { userRoutes } from "./user";

const routes = (app: any) => {
  pingRoutes(app);
  orderRoutes(app);
  eventRoutes(app);
  userRoutes(app);

  // statics routes
  app.use("/apidoc", Static(path.join(__dirname, "../../../public/apidoc")));
};

export default routes;
