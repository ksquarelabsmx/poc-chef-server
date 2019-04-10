import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uriBuilder, response } from "../utils";
import { eventMapper } from "../mappers";
import { eventService } from "../services";
import { IEvent, IEventDto } from "../../common/models/event";

const debug = Debug("chef:events:controller:events");

const eventStrategy = (eventService: any, query: string = "") => {
  switch (query) {
    case "current": {
      return eventService.getCurrentEvents();
    }
    case "past": {
      return eventService.getPastEvents();
    }
    default: {
      return eventService.getEvents();
    }
  }
};

const getEventById = async (id: string) => {
  debug(`EventController: ${chalk.green("getting event")}`);
  return eventService.getEventOrderById(id);
};

const getEvents = async (type: string) => {
  debug(`EventController: ${chalk.green("getting events")}`);
  return eventStrategy(eventService, type);
};

const updateEvent = async (id: string, data: IEvent) => {
  debug(`EventController: ${chalk.green("getting events")}`);
  return eventService.updateEvent({
    ...data,
    id
  });
};

const createEvent = async (data: IEvent) => {
  debug(`EventController: ${chalk.green("creating events")}`);
  return eventService.createEvent(data);
};

export const eventController = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent
};
