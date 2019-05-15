import { IEvent, IEventDto } from "../models/event";
import { orderMapper } from "../mappers/order";
import { productMapper } from "../mappers/product";

const toDto = (event: IEvent): IEventDto => ({
  id: event.id,
  name: event.name,
  expiration_date_time: event.expirationDateTime,
  created_by: event.createdBy,
  total: event.total,
  products: event.products.map(productMapper.toDto),
  orders: event.orders.map(orderMapper.toDto),
  cancelled: event.cancelled,
  created_at: event.createdAt,
  updated_at: event.updatedAt
});

const toModel = (event: IEventDto): IEvent => ({
  id: event.id,
  name: event.name,
  expirationDateTime: event.expiration_date_time,
  createdBy: event.created_by,
  total: event.total,
  products: event.products.map(productMapper.toModel),
  orders: event.orders.map(orderMapper.toModel),
  cancelled: event.cancelled,
  createdAt: event.created_at,
  updatedAt: event.updated_at
});

export const eventMapper = {
  toModel,
  toDto
};
