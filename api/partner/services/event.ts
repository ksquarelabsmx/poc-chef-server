import * as fp from "lodash/fp";
import * as boom from "boom";

import { error, response } from "../utils";
import { IEvent } from "../../common/models/event";
import { IEventRepository } from "../../common/repositories/event-repository";
import { IOrderRepository } from "api/common/repositories/order-repository";

const isFinished = (event: IEvent) => {
  return event.expirationDate < Date.now() || event.markedAsFinished;
};

export const EventService = (
  eventsDataSource: IEventRepository,
  ordersDataSource: IOrderRepository
) => {
  const getEvents = async (): Promise<IEvent[]> => {
    return eventsDataSource.find();
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
      const orders = await ordersDataSource.find({
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
      const eventFinded = await eventsDataSource.find({ id });

      if (fp.isEmpty(eventFinded)) {
        return Promise.reject(boom.notFound("Not Found"));
      }

      if (isFinished(eventFinded[0])) {
        return Promise.reject(response.badRequest(error.eventIsFinished));
      }

      return eventsDataSource.update(event);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    getEvents,
    getEventOrderById,
    getPastEvents,
    getCurrentEvents,
    createEvent,
    updateEvent
  };
};
