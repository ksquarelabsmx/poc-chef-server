import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uriBuilder } from "./../utils/uri";
import { response } from "./../utils/response";
import { eventService } from "../services";
import { eventMapper } from "./../mappers";
import { IEvent, IEventDTO } from "./../interfaces/event";

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
    const source: string = uriBuilder(req);
    const event = await eventService.getEventById(id);

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
    const source: string = uriBuilder(req);
    const events = await eventStrategy(eventService, query);

    res.send(response.success(events, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("getting events")}`);

    const source: string = uriBuilder(req);
    const event: IEvent = eventMapper.toEntity({
      id: req.params.id,
      ...req.body
    });
    const updatedEvent = await eventService.updateEvent(event);
    const eventDTO: IEventDTO = eventMapper.toDTO(updatedEvent);

    res.send(response.success(eventDTO, 201, source));
  } catch (err) {
    debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("creating events")}`);

    const source: string = uriBuilder(req);
    const event: IEvent = eventMapper.toEntity(req.body);
    const createdEvent = await eventService.createEvent(event);
    const eventDTO: IEventDTO = eventMapper.toDTO(createdEvent);

    res.send(response.success(eventDTO, 201, source));
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
