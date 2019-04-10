import { OrdersController } from "./orders";
import { EventsController } from "./events";
import { orderService, eventService } from "../services";

const eventsController = EventsController(eventService);
const ordersController = OrdersController(orderService);

export { ordersController, eventsController };
