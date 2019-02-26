import { pingRoutes } from "./ping";
import { orderRoutes } from "./order";
import { eventRoutes } from "./event";

const routes = (app: any) => {
  pingRoutes(app);
  orderRoutes(app);
  eventRoutes(app);
};

export default routes;
