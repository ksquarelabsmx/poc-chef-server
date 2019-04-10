import { IOrder, IOrderDto } from "../models/order";
import * as orderProductMapper from "./order-product";

export const toDto = (order: IOrder): IOrderDto => ({
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

export const toModel = (order: IOrderDto): IOrder => ({
  id: order.id,
  total: order.total,
  cancelled: order.cancelled,
  paid: order.paid,
  products: order.products.map(orderProductMapper.toModel),
  userId: order.user_id,
  eventId: order.event_id,
  createdBy: order.created_by,
  createdAt: order.created_at,
  updatedAt: order.updated_at
});
