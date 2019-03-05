import { v4 as uuid } from "uuid";
import { getTimeFromEpoch, getTimeFromMins } from "../utils/time";

const events = [
  {
    id: uuid(),
    event_name: "Tortas para la oficina 1",
    start_date: getTimeFromEpoch(1548000000), // epoch
    expiration_date: getTimeFromEpoch(1549000000), // epoch
    start_hour: getTimeFromMins(800),
    end_hour: getTimeFromMins(1200),
    poc_chuc_torta_unitary_price: 25,
    poc_chuc_torta_amount: 10,
    shrimp_torta_unitary_price: 30,
    shrimp_torta_amount: 12,
    finished: false,
    total: 22
  },
  {
    id: uuid(),
    event_name: "Tortas para la oficina 2",
    start_date: getTimeFromEpoch(1548500000), // epoch
    expiration_date: getTimeFromEpoch(1549500000), // epoch
    start_hour: getTimeFromMins(800),
    end_hour: getTimeFromMins(1200),
    poc_chuc_torta_unitary_price: 25,
    poc_chuc_torta_amount: 5,
    shrimp_torta_unitary_price: 30,
    shrimp_torta_amount: 5,
    finished: true,
    total: 10
  },
  {
    id: uuid(),
    event_name: "Tortas para la oficina 3",
    start_date: getTimeFromEpoch(1548500000), // epoch
    expiration_date: getTimeFromEpoch(1549500000), // epoch
    start_hour: getTimeFromMins(800),
    end_hour: getTimeFromMins(1200),
    poc_chuc_torta_unitary_price: 25,
    poc_chuc_torta_amount: 15,
    shrimp_torta_unitary_price: 30,
    shrimp_torta_amount: 5,
    finished: false,
    total: 20
  }
];

const orders = [
  {
    id: uuid(),
    total: 45,
    shrimp_tortas_total: 1,
    shrimp_torta_unitary_price: 25,
    poc_chuc_tortas_total: 1,
    poc_chuc_torta_unitary_price: 20,
    event: {
      id: "1",
      created_at: 1000000000
    },
    owner: {
      id: "1",
      name: "Juan Perez"
    },
    paid: false,
    canceled: false
  }
];

const addEvent = (event: any) => {
  event.id = uuid();
  events.push(event);
  return event;
};

const updateEvent = (event: any, id: string, index: string | number) => {
  (<any>events)[index] = { id, ...event };
  return (<any>events)[index];
};

const addOrder = (order: any) => {
  order.id = uuid();
  orders.push(order);
  return order;
};

const updateOrder = (order: any, id: string, index: string | number) => {
  (<any>orders)[index] = { id, ...order };
  return (<any>orders)[index];
};

export const ordersDataSource = { orders, addOrder, updateOrder };
export const eventsDataSource = { events, addEvent, updateEvent };
