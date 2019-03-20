import { IOrder, IOrderDTO } from "./order";
// interfaces for update event and create event
export interface IEvent {
  id?: string;
  eventName: string;
  startDate: number;
  expirationDate: number;
  startHour: number;
  endHour: number;
  createdBy: string;
}

export interface IEventDTO {
  id?: string;
  event_name: string;
  start_date: number;
  expiration_date: number;
  start_hour: number;
  end_hour: number;
  created_by: string;
}

// interface for get all events
export interface IEventDetails extends IEvent {
  total: number;
  finished: boolean;
  cancelled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface IEventDetailsDTO extends IEventDTO {
  total: number;
  finished: boolean;
  cancelled: boolean;
  created_at: number;
  updated_at: number;
}

// interfaces for get event with orders details
export interface IEventOrdersDTO extends IEventDetailsDTO {
  orders: IOrderDTO[];
}

export interface IEventOrders extends IEventDetails {
  orders: IOrder[];
}
