import {
  IProduct,
  IProductDTO,
  IProductDetailsDTO,
  IProductDetails
} from "./../interfaces/product";

const toEntity = (productDTO: IProductDTO): IProduct => {
  return {
    id: productDTO.id,
    name: productDTO.name,
    description: productDTO.description,
    price: productDTO.price
  };
};

const toDTO = (productEntity: IProductDetails): IProductDetailsDTO => {
  return {
    id: productEntity.id,
    name: productEntity.name,
    description: productEntity.description,
    price: productEntity.price,
    created_at: productEntity.createdAt,
    updated_at: productEntity.updatedAt
  };
};

export const productMapper = { toEntity, toDTO };
