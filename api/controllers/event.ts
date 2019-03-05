import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uri } from "./../utils/uri";
import { response } from "./../utils/response";
import { eventService } from "../services/event";

const debug = Debug("chef:events:controller:events");

const eventStrategy = (eventService: any, query: string = "") => {
  switch (query) {
    case "current":
      return eventService.getCurrentEvents();
    case "past":
      return eventService.getPastEvents();
    default:
      return eventService.getEvents();
  }
};

const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("getting event")}`);
    
    const id = req.params.eventId;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const event = await eventService.getEvent(id);

    res.send(response.success(event, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
}; 

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("getting events")}`);

    const query = req.query.type;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const events = await eventStrategy(eventService, query);

    res.send(response.success(events, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("updating events")}`);

    const { body: event } = req;
    const id = req.params.eventId;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const updatedEvent = await eventService.updateEvent({ event, id });

    res.send(response.success(updatedEvent, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("creating event")}`);

    const { body: event } = req;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const createdEvent = await eventService.createEvent({ event });

    res.send(response.success(createdEvent, 200, source));
  } catch (err) {
    debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const eventController = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent
};

export { eventController };
