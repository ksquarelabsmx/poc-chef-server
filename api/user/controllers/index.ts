import { OrdersController } from "./orders";
import { EventsController } from "./events";
import { ordersDataSource } from "../data-sources";
import { ordersRepository, eventsRepository } from "../repositories";

const eventsController = EventsController(eventsRepository);
const ordersController = OrdersController(ordersDataSource, ordersRepository);

export { ordersController, eventsController };
