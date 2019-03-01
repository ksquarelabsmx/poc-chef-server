import { v4 as uuid } from "uuid";
import { getTimeFromEpoch, getTimeFromMins } from "../utils/time";

const events = [
  {
    id: "1",
    event_name: "Tortastic",
    start_date: 1556733826,
    expiration_date: 1556743826,
    start_hour: 1000,
    end_hour: 1200,
    poc_chuc_torta_unitary_price: 20,
    poc_chuc_torta_amount: 10,
    shrimp_torta_unitary_price: 25,
    shrimp_torta_amount: 12,
    finished: false,
    total: 20 * 10 + 25 * 12
  },
  {
    id: "2",
    event_name: "Tortastic x2",
    start_date: 1556783800,
    expiration_date: 1556883800,
    start_hour: 8000,
    end_hour: 1000,
    poc_chuc_torta_unitary_price: 20,
    poc_chuc_torta_amount: 20,
    shrimp_torta_unitary_price: 25,
    shrimp_torta_amount: 20,
    finished: false,
    total: 20 * 20 + 25 * 20
  },
  {
    id: "3",
    event_name: "Tortastic x3",
    start_date: 1556733826,
    expiration_date: 1556743826,
    start_hour: 1000,
    end_hour: 1200,
    poc_chuc_torta_unitary_price: 20,
    poc_chuc_torta_amount: 50,
    shrimp_torta_unitary_price: 25,
    shrimp_torta_amount: 50,
    finished: true,
    total: 20 * 50 + 25 * 50
  }
];

const orders = [
  {
    id: "1",
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
    }
  }
];

const addEvent = (event: any) => {
  const newEvent = { id: uuid(), ...event };
  events.push(newEvent);
  return newEvent;
};

const updateEvent = (event: any, index: string | number) => {
  (<any>events)[index] = { ...event };
  return (<any>events)[index];
};

const addOrder = (order: any) => {
  order.id = uuid();
  orders.push(order);
  return order;
};

export const ordersMock = { orders, addOrder };
export const eventsMock = { events, addEvent, updateEvent };
