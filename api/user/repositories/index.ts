import { OrdersRepository } from "./orders";
import { ordersMemoryDataSource } from "api/common/data-sources/orders-memory-data-source";
import { productsMemoryDataSource } from "api/common/data-sources/products-memory-data-source";
import { eventsMemoryDataSource } from "api/common/data-sources/events-memory-data-source";
import { EventsRepository } from "./events";

const ordersRepository = OrdersRepository(
  ordersMemoryDataSource,
  productsMemoryDataSource
);
const eventsRepository = EventsRepository(eventsMemoryDataSource);

export { ordersRepository, eventsRepository };
