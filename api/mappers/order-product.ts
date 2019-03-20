import {
  IOrderProduct,
  IOrderProductDTO,
  IOrderProductDetails,
  IOrderProductDetailsDTO
} from "./../interfaces/order-product";

const toEntity = (orderProductDTO: IOrderProductDTO): IOrderProduct => {
  return {
    id: orderProductDTO.id,
    orderId: orderProductDTO.order_id,
    productId: orderProductDTO.product_id,
    quantity: orderProductDTO.quantity
  };
};

const toDTO = (orderEntity: IOrderProductDetails): IOrderProductDetailsDTO => {
  return {
    id: orderEntity.id,
    order_id: orderEntity.orderId,
    product_id: orderEntity.productId,
    quantity: orderEntity.quantity,
    created_at: orderEntity.createdAt,
    updated_at: orderEntity.updatedAt
  };
};

const orderProductMapper = { toEntity, toDTO };
