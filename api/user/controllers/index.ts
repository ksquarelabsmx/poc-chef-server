import { OrdersController } from "./orders";
import { EventsController } from "./events";
import { eventsDataSource, ordersDataSource } from "../data-sources";

const eventsController = EventsController(eventsDataSource);
const ordersController = EventsController(ordersDataSource);

export { ordersController, eventsController };
