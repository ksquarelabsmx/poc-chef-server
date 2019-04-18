import { IProduct, IProductDto } from "../models/product";

const toModel = (productDto: IProductDto): IProduct => {
  return {
    id: productDto.id,
    name: productDto.name,
    description: productDto.description,
    price: productDto.price,
    createdAt: productDto.created_at,
    updatedAt: productDto.updated_at
  };
};

const toDto = (productEntity: IProduct): IProductDto => {
  return {
    id: productEntity.id,
    name: productEntity.name,
    description: productEntity.description,
    price: productEntity.price,
    created_at: productEntity.createdAt,
    updated_at: productEntity.updatedAt
  };
};

export const productMapper = { toModel, toDto };
