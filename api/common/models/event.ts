import { IOrderDto, IOrder } from "./order";
import { IProduct, IProductDto } from "./product";

// interfaces for update event and create event
export interface IEvent {
  id?: string;
  name: string;
  expirationDate: number;
  endHour: number;
  createdBy: string;
  total: number;
  orders: IOrder[];
  products: IProduct[];
  markedAsFinished: boolean;
  cancelled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface IEventDto {
  id?: string;
  name: string;
  expiration_date: number;
  end_hour: number;
  created_by: string;
  total: number;
  orders: IOrderDto[];
  products: IProductDto[];
  marked_as_finished: boolean;
  cancelled: boolean;
  created_at: number;
  updated_at: number;
}

// interfaces for get event with orders details
export interface IEventOrdersDto extends IEventDto {
  orders: IOrderDto[];
}

export interface IEventOrders extends IEvent {
  orders: IOrder[];
}
