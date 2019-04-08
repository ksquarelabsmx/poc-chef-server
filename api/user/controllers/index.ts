import { OrdersController } from "./orders";
import { EventsController } from "./events";
import { eventsDataSource, ordersDataSource } from "../data-sources";
import { ordersRepository } from "../repositories";

const eventsController = EventsController(eventsDataSource);
const ordersController = OrdersController(ordersDataSource, ordersRepository);

export { ordersController, eventsController };
