import { IProduct, IProductDto } from "./../../common/models/product";

const toModel = (productDTO: IProductDto): IProduct => {
  return {
    id: productDTO.id,
    name: productDTO.name,
    description: productDTO.description,
    price: productDTO.price,
    createdAt: productDTO.created_at,
    updatedAt: productDTO.updated_at
  };
};

const toDTO = (productEntity: IProduct): IProductDto => {
  return {
    id: productEntity.id,
    name: productEntity.name,
    description: productEntity.description,
    price: productEntity.price,
    created_at: productEntity.createdAt,
    updated_at: productEntity.updatedAt
  };
};

export const productMapper = { toModel, toDTO };
