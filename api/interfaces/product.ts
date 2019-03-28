export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface IProductDTO {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface IProductDetails extends IProduct {
  createdAt: number;
  updatedAt: number;
  [key: string]: any;
}

export interface IProductDetailsDTO extends IProductDTO {
  created_at: number;
  updated_at: number;
}
