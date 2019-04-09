import { OrdersController } from "./orders";
import { EventsController } from "./events";
import { ordersRepository, eventsRepository } from "../repositories";

const eventsController = EventsController(eventsRepository);
const ordersController = OrdersController(ordersRepository);

export { ordersController, eventsController };
