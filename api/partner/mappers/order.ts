import { IOrder, IOrderDto } from "../../common/models/order";
import { orderProductMapper } from "./order-product";

const toEntity = (orderDTO: IOrderDto): IOrder => {
  return {
    id: orderDTO.id,
    userId: orderDTO.user_id,
    eventId: orderDTO.event_id,
    total: orderDTO.total,
    createdBy: orderDTO.created_by,
    products: orderDTO.products.map(orderProductMapper.toEntity),
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
  toEntity,
  toDTO
};
