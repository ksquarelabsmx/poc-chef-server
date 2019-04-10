import { EventsRepository } from "./event";
import { OrdersRepository } from "./order";
import { UserRepository } from "./user";
import { eventsMemoryDataSource } from "../../common/data-sources/events-memory-data-source";
import { ordersMemoryDataSource } from "../../common/data-sources/orders-memory-data-source";

export const ordersRepository = OrdersRepository(
  ordersMemoryDataSource,
  eventsMemoryDataSource
);
export const eventRepository = EventsRepository(
  eventsMemoryDataSource,
  ordersMemoryDataSource
);
export const userRepository = UserRepository();
