import { IOrder, IOrderDto } from "../../common/models/order";
import { orderProductMapper } from "./order-product";

const toModel = (orderDTO: IOrderDto): IOrder => {
  return {
    id: orderDTO.id,
    userId: orderDTO.user_id,
    eventId: orderDTO.event_id,
    eventName: orderDTO.event_name,
    total: orderDTO.total,
    createdBy: orderDTO.created_by,
    products: orderDTO.products.map(orderProductMapper.toModel),
    paid: orderDTO.paid,
    cancelled: orderDTO.cancelled,
    createdAt: orderDTO.created_at,
    updatedAt: orderDTO.updated_at
  };
};

const toDTO = (orderEntity: IOrder): IOrderDto => {
  return {
    id: orderEntity.id,
    user_id: orderEntity.userId,
    event_id: orderEntity.eventId,
    event_name: orderEntity.eventName,
    total: orderEntity.total,
    created_by: orderEntity.createdBy,
    paid: orderEntity.paid,
    products: orderEntity.products.map(orderProductMapper.toDTO),
    cancelled: orderEntity.cancelled,
    created_at: orderEntity.createdAt,
    updated_at: orderEntity.updatedAt
  };
};

export const orderMapper = {
  toModel,
  toDTO
};
