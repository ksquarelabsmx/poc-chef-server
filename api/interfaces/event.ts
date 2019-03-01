// interfaces for update event and create event
export interface IEvent {
  id?: string;
  eventName: string;
  startDate: number;
  expirationDate: number;
  startHour: number;
  endHour: number;
  pocChucTortaunitaryPrice: number;
  shrimpTortaunitaryPrice: number;
}

export interface IEventDTO {
  id?: string;
  event_name: string;
  start_date: number;
  expiration_date: number;
  start_hour: number;
  end_hour: number;
  poc_chuc_torta_unitary_price: number;
  shrimp_torta_unitary_price: number;
}

// interface for get all events
export interface IEventDetailsDTO extends IEventDTO {
  poc_chuc_torta_amount: number;
  shrimp_torta_amount: number;
  total: number;
}

// interfaces for get event with orders details

// order interface
interface IOrder {
  id: string;
  full_name: string;
  poc_chuc_torta_unitary_price: number;
  poc_chuc_torta_amount: number;
  shrimp_torta_unitary_price: number;
  shrimp_torta_amount: number;
  total: number;
  paid: boolean;
}

export interface IEventOrdersDTO extends IEventDetailsDTO {
  orders: IOrder[];
}
