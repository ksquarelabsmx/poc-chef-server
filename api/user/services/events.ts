import * as fp from "lodash/fp";
import * as boom from "boom";

import { IEvent } from "../../common/models/event";
import { IEventRepository } from "../../common/repositories/event-repository";

export const EventService = (eventsDataSource: IEventRepository) => {
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

  const getEventById = async (id: string): Promise<any> => {
    try {
      const event: IEvent[] = await eventsDataSource.find({ id });

      if (fp.isEmpty(event)) {
        return Promise.reject(boom.notFound("Not Found"));
      }
      return Promise.resolve(event);
    } catch (err) {
      return Promise.reject(boom.internal("Internal Server Error"));
    }
  };

  return {
    getEvents,
    getPastEvents,
    getCurrentEvents,
    getEventById
  };
};
