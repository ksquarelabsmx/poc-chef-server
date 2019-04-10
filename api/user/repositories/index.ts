import { OrdersRepository } from "./orders";
import { eventsMemoryDataSource } from "../../common/data-sources/events-memory-data-source";
import { ordersDataSource, productsDataSource } from "../data-sources";
import { EventsRepository } from "./events";

const ordersRepository = OrdersRepository(ordersDataSource, productsDataSource);
const eventsRepository = EventsRepository(eventsMemoryDataSource);

export { ordersRepository, eventsRepository };
