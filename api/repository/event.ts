import * as fp from "lodash/fp";
import * as boom from "boom";

import { IEvent, IEventDetails } from "./../interfaces/event";
import { eventsDataSource } from "./../data-source";
import { response } from "./../utils";
import { error } from "./../utils";

// TODO: Define returns
const getEvents = async (): Promise<IEventDetails[]> => {
  return Promise.resolve(eventsDataSource.find());
};

const getCurrentEvents = async (): Promise<any> => {
  try {
    const events = await eventsDataSource.find({ finished: false });
    return Promise.resolve(events);
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

const getPastEvents = async (): Promise<any> => {
  try {
    const events = await eventsDataSource.find({ finished: true });
    return Promise.resolve(events);
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

const getEventById = async (id: number): Promise<any> => {
  try {
    const event = await eventsDataSource.find({ id });

    if (fp.isEmpty(event)) {
      return Promise.reject(boom.notFound("Not Found"));
    }

    return Promise.resolve(fp.head(event));
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

const createEvent = async (event: IEvent): Promise<any> => {
  try {
    const createdEvent = await eventsDataSource.save(event);

    return Promise.resolve(createdEvent);
  } catch (err) {
    return Promise.resolve(new Error(err));
  }
};

const updateEvent = async (event: IEvent): Promise<any> => {
  try {
    const { id } = event;
    const eventFinded = eventsDataSource.find({ id });

    if (fp.isEmpty(eventFinded)) {
      return Promise.reject(boom.notFound("Not Found"));
    }
    if (eventFinded[0].finished) {
      return Promise.reject(response.badRequest(error.eventIsFinished));
    }

    return Promise.resolve(eventsDataSource.update(event));
  } catch (err) {
    return Promise.reject(new Error(err));
  }
};

export const eventRepository = {
  getEvents,
  getEventById,
  getPastEvents,
  getCurrentEvents,
  createEvent,
  updateEvent
};
