import { v4 as uuid } from "uuid";
import { IEvent, IEventDB } from "./../interfaces/event";

const events: IEventDB[] = [
  {
    id: uuid(),
    eventName: "Tortas para la oficina 1",
    startDate: 1548000000, // epoch
    expirationDate: 1549000000, // epoch
    startHour: 800,
    endHour: 1200,
    pocChucTortaUnitaryPrice: 25,
    pocChucTortaAmount: 10,
    shrimpTortaUnitaryPrice: 30,
    shrimpTortaAmount: 12,
    finished: true,
    total: 22
  },
  {
    id: uuid(),
    eventName: "Tortas para la oficina 2",
    startDate: 1548500000, // epoch
    expirationDate: 1549500000, // epoch
    startHour: 800,
    endHour: 1200,
    pocChucTortaUnitaryPrice: 25,
    pocChucTortaAmount: 5,
    shrimpTortaUnitaryPrice: 30,
    shrimpTortaAmount: 5,
    finished: true,
    total: 10
  },
  {
    id: uuid(),
    eventName: "Tortas para la oficina 3",
    startDate: 1548500000, // epoch
    expirationDate: 1549500000, // epoch
    startHour: 800,
    endHour: 1200,
    pocChucTortaUnitaryPrice: 25,
    pocChucTortaAmount: 15,
    shrimpTortaUnitaryPrice: 30,
    shrimpTortaAmount: 5,
    finished: false,
    total: 20
  }
];

const find = (query?: any): any => {
  if (query) {
    const key = Object.keys(query)[0];
    return events.filter((order: any) => order[key] === query[key]);
  }
  return events;
};

const save = (event: IEvent): IEvent => {
  event.id = uuid();
  const result: IEventDB = {
    ...event,
    pocChucTortaAmount: 0,
    shrimpTortaAmount: 0,
    total: 0,
    finished: false
  };
  events.push(result);
  return event;
};

const update = (event: IEvent): IEvent => {
  const index = events.findIndex((even: any) => even.id === event.id);
  (<any>events)[index] = { ...event };
  return (<any>events)[index];
};

export const eventsDataSource = { find, save, update };
