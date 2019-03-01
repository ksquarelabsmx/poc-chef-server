import { Request } from "express";

import { IEvent } from "./../interfaces/event";
import { eventsMock } from "./../data-source/data-source";

// TODO: implement interfaces and mappers
const getEvents = async (): Promise<any> => {
  return Promise.resolve(eventsMock.events);
};

const getCurrentEvents = async (req: Request): Promise<any> => {
  const events = eventsMock.events.filter((event: any) => {
    return event.finished === false;
  });
  return Promise.resolve(events);
};

const getPastEvents = async (req: Request): Promise<any> => {
  const events = eventsMock.events.filter((event: any) => {
    return event.finished === true;
  });
  return Promise.resolve(events);
};

const getEvent = async (id: number): Promise<any> => {
  const event = eventsMock.events.find((event: any) => event.id === id);
  if (event) {
    return Promise.resolve(event);
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const createEvent = async ({ event }: any): Promise<IEvent> => {
  return Promise.resolve(eventsMock.addEvent(event));
};

const updateEvent = async ({ event, id }: any): Promise<any> => {
  const index = eventsMock.events.findIndex((event: any) => event.id === id);

  if (index !== -1) {
    return Promise.resolve(eventsMock.updateEvent(event, id, index));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

export const eventService = {
  getEvents,
  getEvent,
  getPastEvents,
  getCurrentEvents,
  createEvent,
  updateEvent
};
