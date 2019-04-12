import { IOrder, IOrderDto } from "../../common/models/order";
import { orderProductMapper } from "./order-product";

const toModel = (orderDto: IOrderDto): IOrder => {
  return {
    id: orderDto.id,
    userId: orderDto.user_id,
    eventId: orderDto.event_id,
    eventName: orderDto.event_name,
    total: orderDto.total,
    createdBy: orderDto.created_by,
    products: orderDto.products.map(orderProductMapper.toModel),
    paid: orderDto.paid,
    cancelled: orderDto.cancelled,
    createdAt: orderDto.created_at,
    updatedAt: orderDto.updated_at
  };
};

const toDto = (orderEntity: IOrder): IOrderDto => {
  return {
    id: orderEntity.id,
    user_id: orderEntity.userId,
    event_id: orderEntity.eventId,
    event_name: orderEntity.eventName,
    total: orderEntity.total,
    created_by: orderEntity.createdBy,
    paid: orderEntity.paid,
    products: orderEntity.products.map(orderProductMapper.toDto),
    cancelled: orderEntity.cancelled,
    created_at: orderEntity.createdAt,
    updated_at: orderEntity.updatedAt
  };
};

export const orderMapper = {
  toModel,
  toDto
};
