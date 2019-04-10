import { OrdersRepository } from "./orders";
import { ordersMemoryDataSource } from "../../common/data-sources/orders-memory-data-source";
import { productsMemoryDataSource } from "../../common/data-sources/products-memory-data-source";
import { eventsMemoryDataSource } from "../../common/data-sources/events-memory-data-source";
import { EventsRepository } from "./events";

const ordersRepository = OrdersRepository(
  ordersMemoryDataSource,
  productsMemoryDataSource
);
const eventsRepository = EventsRepository(eventsMemoryDataSource);

export { ordersRepository, eventsRepository };
