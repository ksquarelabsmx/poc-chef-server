import { EventsRepository } from "./event";
import { OrdersRepository } from "./order";
import { UserRepository } from "./user";
import { eventMemoryRepository } from "../../common/repositories/event-memory-repository";
import { orderMemoryRepository } from "../../common/repositories/order-memory-repository";

export const ordersRepository = OrdersRepository(
  orderMemoryRepository,
  eventMemoryRepository
);
export const eventRepository = EventsRepository(
  eventMemoryRepository,
  orderMemoryRepository
);
export const userRepository = UserRepository();
