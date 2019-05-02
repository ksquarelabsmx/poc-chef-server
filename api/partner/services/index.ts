export { authService } from "./auth";

import { EventService } from "../services/event";
import { OrderService } from "../services/order";
import { UserService } from "../services/user";
import { eventMemoryRepository } from "../../common/repositories/event-memory-repository";
import { orderMemoryRepository } from "../../common/repositories/order-memory-repository";

export const orderService = OrderService(orderMemoryRepository);
export const eventService = EventService(
  eventMemoryRepository,
  orderMemoryRepository
);
export const userService = UserService();
