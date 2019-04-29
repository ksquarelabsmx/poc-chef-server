import { IEvent, IEventDto } from "../models/event";
import { orderMapper } from "../mappers/order";
import { productMapper } from "../mappers/product";

const toDto = (event: IEvent): IEventDto => ({
  id: event.id,
  name: event.name,
  expiration_date: event.expirationDate,
  end_hour: event.endHour,
  created_by: event.createdBy,
  total: event.total,
  products: event.products.map(productMapper.toDto),
  orders: event.orders.map(orderMapper.toDto),
  marked_as_finished: event.markedAsFinished,
  cancelled: event.cancelled,
  created_at: event.createdAt,
  updated_at: event.updatedAt
});

const toModel = (event: IEventDto): IEvent => ({
  id: event.id,
  name: event.name,
  expirationDate: event.expiration_date,
  endHour: event.end_hour,
  createdBy: event.created_by,
  total: event.total,
  products: event.products.map(productMapper.toModel),
  orders: event.orders.map(orderMapper.toModel),
  markedAsFinished: event.marked_as_finished,
  cancelled: event.cancelled,
  createdAt: event.created_at,
  updatedAt: event.updated_at
});

export const eventMapper = {
  toModel,
  toDto
};
