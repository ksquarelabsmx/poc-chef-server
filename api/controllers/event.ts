import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uri } from "./../utils/uri";
import { response } from "./../utils/response";
import { eventService } from "../services/event";
import { eventMapper } from "./../mappers/event";
import { IEvent, IEventDTO } from "./../interfaces/event";

const debug = Debug("chef:orders:controller:orders");

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
    debug(`EventController: ${chalk.green("getting events")}`);

    const event: IEvent = eventMapper.toEntity({
      id: req.params.id,
      ...req.body
    });
    const updatedEvent = await eventService.updateEvent(event);
    const eventDTO: IEventDTO = eventMapper.toDTO(updatedEvent);

    res.status(201).json(eventDTO);
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("creating events")}`);

    const event: IEvent = eventMapper.toEntity(req.body);
    const createdEvent = await eventService.createEvent(event);
    const eventDTO: IEventDTO = eventMapper.toDTO(createdEvent);

    res.status(201).json(eventDTO);
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
