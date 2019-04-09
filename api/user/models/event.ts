import { IOrder } from "./order";

export interface IEvent {
  id: string;
  name: string;
  created_at: number;
  expiration_date: number;
  orders: IOrder[];
}

export interface IEventDetails {
  event_id: string;
  name: string;
  created_at: number;
}
