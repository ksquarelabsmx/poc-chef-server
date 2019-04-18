import { IOrderProduct, IOrderProductDto } from "../models/order-product";

const toDto = (product: IOrderProduct): IOrderProductDto => ({
  id: product.id,
  name: product.name,
  quantity: product.quantity,
  price: product.price,
  subtotal: product.subtotal,
  created_at: product.createdAt,
  updated_at: product.updatedAt
});

const toModel = (product: IOrderProductDto): IOrderProduct => ({
  id: product.id,
  name: product.name,
  quantity: product.quantity,
  price: product.price,
  subtotal: product.subtotal,
  createdAt: product.created_at,
  updatedAt: product.updated_at
});

export const orderProductMapper = {
  toDto,
  toModel
};
