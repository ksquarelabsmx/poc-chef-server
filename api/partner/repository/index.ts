import { EventsRepository } from "./event";
import { OrdersRepository } from "./order";
import { UserRepository } from "./user";
import { eventsMemoryDataSource } from "../../common/data-sources/events-memory-data-source";

export const ordersRepository = OrdersRepository();
export const eventRepository = EventsRepository(eventsMemoryDataSource);
export const userRepository = UserRepository();
