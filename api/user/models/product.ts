export interface IProduct {
  id: string;
  name: string;
  price: number;
}

export interface IProductDetails extends IProduct {
  quantity: number;
  subtotal: number;
}
