import * as boom from "boom";
import * as moment from "moment-timezone";
import { Request, Response, NextFunction } from "express";

import { eventsMock } from "./../data-source/data-source";
import { getTimeFromEpoch, getTimeFromMins } from "../utils/time";

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

const createEvent = async ({ event }: any): Promise<any> => {
  let current_date = moment()
    .tz("America/Merida")
    .format("YYYY-MM-DD");

  const start_date = getTimeFromEpoch(event.start_date);
  const expiration_date = getTimeFromEpoch(event.expiration_date);
  const start_hour = getTimeFromMins(event.start_hour);
  const end_hour = getTimeFromMins(event.end_hour);

  // TODO add these validations in JOI validation middleware
  if (start_date < current_date) {
    throw boom.badRequest("Start date must be a future date.");
  }

  if (expiration_date < start_date) {
    throw boom.badRequest("End date must be after start date.");
  }

  if (end_hour < start_hour) {
    throw boom.badRequest("End hour must be after start hour.");
  }

  return Promise.resolve(eventsMock.addEvent(event));
};

const updateEvent = async ({ event, id }: any): Promise<any> => {
  const index = eventsMock.events.findIndex((event: any) => event.id === id);

  // current date
  const current_date = moment()
    .tz("America/Merida")
    .format("YYYY-MM-DD");

  // convert epoch to date
  const start_date = getTimeFromEpoch(event.start_date);
  const expiration_date = getTimeFromEpoch(event.expiration_date);

  // convert hour to time
  const start_hour = getTimeFromMins(event.start_hour);
  const end_hour = getTimeFromMins(event.end_hour);

  // TODO: add these validations in JOI validation middleware
  // validate that start date is less than end date
  if (start_date < current_date) {
    throw boom.badRequest("Start date must be a future date.");
  }
  if (expiration_date < start_date) {
    throw boom.badRequest("End date must be after start date.");
  }
  if (end_hour < start_hour) {
    throw boom.badRequest("End hour must be after start hour.");
  }
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
