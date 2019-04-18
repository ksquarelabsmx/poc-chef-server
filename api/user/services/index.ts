import { EventService } from "./events";
import { OrderService } from "./orders";
import { eventMemoryRepository } from "../../common/repositories/event-memory-repository";
import { orderMemoryRepository } from "../../common/repositories/order-memory-repository";
import { productMemoryRepository } from "../../common/repositories/product-memory-repository";

export const orderService = OrderService(
  orderMemoryRepository,
  productMemoryRepository,
  eventMemoryRepository
);
export const eventService = EventService(eventMemoryRepository);
export { authService } from "./auth";
