import {
  IOrderProduct,
  IOrderProductDto
} from "../../common/models/order-product";

const toEntity = (orderProductDTO: IOrderProductDto): IOrderProduct => {
  return {
    id: orderProductDTO.id,
    name: orderProductDTO.name,
    quantity: orderProductDTO.quantity,
    price: orderProductDTO.price,
    subtotal: orderProductDTO.subtotal,
    createdAt: orderProductDTO.created_at,
    updatedAt: orderProductDTO.updated_at
  };
};

const toDTO = (orderEntity: IOrderProduct): IOrderProductDto => {
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

export const orderProductMapper = { toEntity, toDTO };
