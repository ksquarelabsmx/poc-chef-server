import { IOrder, IOrderDto } from "../models/order";
import * as orderProductMapper from "./order-product";

export const toModel = (order: IOrder): IOrderDto => ({
  id: order.id,
  total: order.total,
  cancelled: order.cancelled,
  paid: order.paid,
  products: order.products.map(orderProductMapper.toDto),
  user_id: order.userId,
  event_id: order.eventId,
  created_by: order.createdBy,
  created_at: order.createdAt,
  updated_at: order.updatedAt
});
