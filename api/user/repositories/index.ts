import { OrdersRepository } from "./orders";
import {
  ordersDataSource,
  productsDataSource,
  eventsDataSource
} from "../data-sources";
import { EventsRepository } from "./events";

const ordersRepository = OrdersRepository(ordersDataSource, productsDataSource);
const eventsRepository = EventsRepository(eventsDataSource);

export { ordersRepository, eventsRepository };
