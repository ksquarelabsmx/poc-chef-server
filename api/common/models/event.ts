import { IOrderDto, IOrder } from "./order";

// interfaces for update event and create event
export interface IEvent {
  id?: string;
  name: string;
  startDate: number;
  expirationDate: number;
  startHour: number;
  endHour: number;
  createdBy: string;
  total: number;
  markedAsFinished: boolean;
  orders: IOrder[];
  cancelled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface IEventDTO {
  id?: string;
  name: string;
  start_date: number;
  expiration_date: number;
  start_hour: number;
  end_hour: number;
  created_by: string;
  total: number;
  orders: IOrderDto[];
  marked_as_finished: boolean;
  cancelled: boolean;
  created_at: number;
  updated_at: number;
}

// interfaces for get event with orders details
export interface IEventOrdersDTO extends IEventDTO {
  orders: IOrderDto[];
}

export interface IEventOrders extends IEvent {
  orders: IOrder[];
}
