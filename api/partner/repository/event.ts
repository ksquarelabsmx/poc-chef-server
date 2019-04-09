import * as fp from "lodash/fp";
import * as boom from "boom";

import { error, response } from "../utils";
import { IOrder } from "../../common/models/order";
import { IEvent } from "../../common/models/event";
import { eventsDataSource, ordersDataSource } from "../data-source";

const isFinished = (event: IEvent) => {
  return event.expirationDate < Date.now() || event.markedAsFinished;
};

// TODO: Define returns
const getEvents = async (): Promise<IEvent[]> => {
  return Promise.resolve(eventsDataSource.find());
};

const getCurrentEvents = async (): Promise<any> => {
  try {
    const events: IEvent[] = await eventsDataSource.find({
      finished: false
    });

    return Promise.resolve(events);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const getPastEvents = async (): Promise<any> => {
  try {
    const events: IEvent[] = await eventsDataSource.find({
      finished: true
    });

    return Promise.resolve(events);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const getEventOrderById = async (id: string): Promise<any> => {
  try {
    const event: IEvent[] = await eventsDataSource.find({ id });

    if (fp.isEmpty(event)) {
      return Promise.reject(boom.notFound("Not Found"));
    }
    const orders: IOrder[] = ordersDataSource.find({
      eventId: id
    });
    const eventOrders = { ...event[0], orders: orders };

    return Promise.resolve(eventOrders);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const createEvent = async (event: IEvent): Promise<any> => {
  try {
    const createdEvent: IEvent = await eventsDataSource.save(event);

    return Promise.resolve(createdEvent);
  } catch (err) {
    return Promise.resolve(boom.internal("Internal Server Error"));
  }
};

const updateEvent = async (event: IEvent): Promise<any> => {
  try {
    const { id } = event;
    const eventFinded: IEvent[] = eventsDataSource.find({ id });

    if (fp.isEmpty(eventFinded)) {
      return Promise.reject(boom.notFound("Not Found"));
    }
    if (isFinished(eventFinded[0])) {
      return Promise.reject(response.badRequest(error.eventIsFinished));
    }

    return Promise.resolve(eventsDataSource.update(event));
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

export const eventRepository = {
  getEvents,
  getEventOrderById,
  getPastEvents,
  getCurrentEvents,
  createEvent,
  updateEvent
};
