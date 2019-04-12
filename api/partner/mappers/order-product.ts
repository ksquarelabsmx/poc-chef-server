import {
  IOrderProduct,
  IOrderProductDto
} from "../../common/models/order-product";

const toModel = (orderProductDto: IOrderProductDto): IOrderProduct => {
  return {
    id: orderProductDto.id,
    name: orderProductDto.name,
    quantity: orderProductDto.quantity,
    price: orderProductDto.price,
    subtotal: orderProductDto.subtotal,
    createdAt: orderProductDto.created_at,
    updatedAt: orderProductDto.updated_at
  };
};

const toDto = (orderEntity: IOrderProduct): IOrderProductDto => {
  return {
    id: orderEntity.id,
    name: orderEntity.name,
    quantity: orderEntity.quantity,
    price: orderEntity.price,
    subtotal: orderEntity.subtotal,
    created_at: orderEntity.createdAt,
    updated_at: orderEntity.updatedAt
  };
};

export const orderProductMapper = { toModel, toDto };
