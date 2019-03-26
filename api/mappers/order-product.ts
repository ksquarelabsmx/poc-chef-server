import { orderProduct } from "./../interfaces";

const toEntity = (
  orderProductDTO: orderProduct.IOrderProductDTO
): orderProduct.IOrderProduct => {
  return {
    id: orderProductDTO.id,
    orderId: orderProductDTO.order_id,
    productId: orderProductDTO.product_id,
    quantity: orderProductDTO.quantity
  };
};

const toDTO = (
  orderEntity: orderProduct.IOrderProductDetails
): orderProduct.IOrderProductDetailsDTO => {
  return {
    id: orderEntity.id,
    order_id: orderEntity.orderId,
    product_id: orderEntity.productId,
    quantity: orderEntity.quantity,
    created_at: orderEntity.createdAt,
    updated_at: orderEntity.updatedAt
  };
};

export const orderProductMapper = { toEntity, toDTO };
