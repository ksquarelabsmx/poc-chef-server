import { OrderService } from "./orders";
import { orderMemoryRepository } from "../../common/repositories/order-memory-repository";
import { productMemoryRepository } from "../../common/repositories/product-memory-repository";
import { eventMemoryRepository } from "../../common/repositories/event-memory-repository";
import { EventService } from "./events";

const orderService = OrderService(
  orderMemoryRepository,
  productMemoryRepository
);
const eventService = EventService(eventMemoryRepository);

export { orderService, eventService };
