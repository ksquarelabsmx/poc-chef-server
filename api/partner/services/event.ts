import { IOrder } from "./../../common/models/order";
import * as fp from "lodash/fp";
import * as boom from "boom";
import * as moment from "moment";

import { error, response } from "../utils";
import { IEvent } from "../../common/models/event";
import { IEventRepository } from "../../common/repositories/event-repository";
import { IOrderRepository } from "api/common/repositories/order-repository";

const isFinished = (event: IEvent) => {
  return (
    event.markedAsFinished ||
    event.expirationDate <
      moment()
        .utc()
        .unix()
  );
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
        markedAsFinished: false
      });

      return Promise.resolve(events);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const getPastEvents = async (): Promise<any> => {
    try {
      const events: IEvent[] = await eventsDataSource.find({
        markedAsFinished: true
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
      const orders: IOrder[] = await ordersDataSource.find({
        eventId: id
      });
      const eventOrders: IEvent = { ...event[0], orders: orders };

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
      const eventFinded: IEvent[] = await eventsDataSource.find({ id });

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

  const markManyAsFinished = async (eventIds: string[]): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(
          async (id: string): Promise<string> => {
            const [event]: IEvent[] = await eventsDataSource.find({ id });

            if (fp.isEmpty(event)) {
              return Promise.resolve(`event ${id} not found`);
            }
            if (event.markedAsFinished) {
              return Promise.resolve(
                `event ${id} was already marked as finished`
              );
            }
            event.markedAsFinished = true;
            eventsDataSource.update(event);
            return Promise.resolve(`event ${id} successfully modified`);
          }
        )
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsNotFinished = async (
    eventIds: string[]
  ): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(async (id: any) => {
          const [event]: IEvent[] = await eventsDataSource.find({ id });

          if (fp.isEmpty(event)) {
            return Promise.resolve(`event ${id} not found`);
          }
          if (!event.markedAsFinished) {
            return Promise.resolve(
              `event ${id} has not been marked as finished`
            );
          }
          event.markedAsFinished = false;
          eventsDataSource.update(event);
          return Promise.resolve(`event ${id} successfully modified`);
        })
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsCancelled = async (eventIds: string[]): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(
          async (id: string): Promise<string> => {
            const [event]: IEvent[] = await eventsDataSource.find({ id });

            if (fp.isEmpty(event)) {
              return Promise.resolve(`event ${id} not found`);
            }
            if (event.cancelled) {
              return Promise.resolve(
                `event ${id} was already marked as cancelled`
              );
            }
            event.cancelled = true;
            eventsDataSource.update(event);
            return Promise.resolve(`event ${id} successfully modified`);
          }
        )
      );
      return Promise.resolve(eventStatus);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  const markManyAsNotCancelled = async (
    eventIds: string[]
  ): Promise<string[]> => {
    try {
      const eventStatus = await Promise.all(
        eventIds.map(async (id: any) => {
          const [event]: IEvent[] = await eventsDataSource.find({ id });

          if (fp.isEmpty(event)) {
            return Promise.resolve(`event ${id} not found`);
          }
          if (!event.cancelled) {
            return Promise.resolve(
              `event ${id} has not been marked as cancelled`
            );
          }
          event.cancelled = false;
          eventsDataSource.update(event);
          return Promise.resolve(`event ${id} successfully modified`);
        })
      );
      return Promise.resolve(eventStatus);
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
    updateEvent,
    markManyAsFinished,
    markManyAsNotFinished,
    markManyAsCancelled,
    markManyAsNotCancelled
  };
};
