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

const find = (query?: any): any => {
  if (query) {
    const key = Object.keys(query)[0];
    return events.filter((order: any) => order[key] === query[key]);
  } else {
    return events;
  }
};

const save = (event: any): any => {
  event.id = uuid();
  events.push(event);
  return event;
};

const update = (event: any): any => {
  const index = events.findIndex((even: any) => even.id === event.id);
  (<any>events)[index] = { ...event };
  return (<any>events)[index];
};

export const eventsDataSource = { find, save, update };
