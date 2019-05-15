import chalk from "chalk";
import * as Debug from "debug";

import { response } from "../../common/utils";
import { eventService } from "../services";
import { IEvent } from "api/common/models/event";

const debug = Debug("chef:events:controller:events");

const eventStrategy = (
  eventService: any,
  query: string = ""
): Promise<IEvent[]> => {
  switch (query) {
    case "current": {
      return eventService.getCurrentEvents();
    }
    case "past": {
      return eventService.getPastEvents();
    }
    case "all": {
      return eventService.getEvents();
    }
    default: {
      return eventService.getCurrentEvents();
    }
  }
};

const getEventById = async (id: string): Promise<IEvent> => {
  debug(`EventController: ${chalk.green("getting event")}`);
  return eventService.getEventOrderById(id);
};

const getEvents = async (type: string): Promise<IEvent[]> => {
  debug(`EventController: ${chalk.green("getting events")}`);
  return eventStrategy(eventService, type);
};

const updateEvent = async (id: string, data: IEvent): Promise<IEvent> => {
  debug(`EventController: ${chalk.green("getting events")}`);
  return eventService.updateEvent({
    ...data,
    id
  });
};

const createEvent = async (data: IEvent): Promise<IEvent> => {
  debug(`EventController: ${chalk.green("creating events")}`);
  return eventService.createEvent(data);
};

const handleAction = async ({ action }, id: string): Promise<any> => {
  debug(`OrderCOntroller: ${chalk.green("paying orders")}`);
  switch (action) {
    case "mark_as_cancelled": {
      return eventService.markAsCancelled(id);
    }
    case "mark_as_not_cancelled": {
      return eventService.markAsNotCancelled(id);
    }
    default: {
      return response.error(
        "Bad Request",
        400,
        "http://localhost:3000/v1/orders/actions",
        "That action does not exists"
      );
    }
  }
};

export const eventController = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  handleAction
};
