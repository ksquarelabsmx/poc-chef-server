import { OrderService } from "./orders";
import { ordersMemoryDataSource } from "../../common/data-sources/orders-memory-data-source";
import { productsMemoryDataSource } from "../../common/data-sources/products-memory-data-source";
import { eventsMemoryDataSource } from "../../common/data-sources/events-memory-data-source";
import { EventService } from "./events";

const orderService = OrderService(
  ordersMemoryDataSource,
  productsMemoryDataSource
);
const eventService = EventService(eventsMemoryDataSource);

export { orderService, eventService };
