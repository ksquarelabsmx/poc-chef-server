import { IOrder, IOrderDto } from "./../models/order";
import { orderProductMapper } from "./order-product";

const toDto = (order: IOrder): IOrderDto => ({
  id: order.id,
  total: order.total,
  cancelled: order.cancelled,
  paid: order.paid,
  order_number: order.orderNumber,
  products: order.products.map(orderProductMapper.toDto),
  user_name: order.userName,
  event_id: order.eventId,
  event_name: order.eventName,
  created_by: order.createdBy,
  created_at: order.createdAt,
  updated_at: order.updatedAt
});

const toModel = (order: IOrderDto): IOrder => ({
  id: order.id,
  total: order.total,
  cancelled: order.cancelled,
  paid: order.paid,
  orderNumber: order.order_number,
  products: order.products.map(orderProductMapper.toModel),
  userName: order.user_name,
  eventId: order.event_id,
  eventName: order.event_name,
  createdBy: order.created_by,
  createdAt: order.created_at,
  updatedAt: order.updated_at
});

export const orderMapper = {
  toDto,
  toModel
};
