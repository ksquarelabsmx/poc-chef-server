import { EventsRepository } from "./event";
import { OrdersRepository } from "./order";
import { UserRepository } from "./user";

export const ordersRepository = OrdersRepository();
export const eventRepository = EventsRepository();
export const userRepository = UserRepository();
