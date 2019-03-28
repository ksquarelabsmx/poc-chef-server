import * as fp from "lodash/fp";
import * as boom from "boom";

import { error, response } from "./../utils";
import { event, order } from "./../interfaces";
import { eventsDataSource, ordersDataSource } from "./../data-source";

// TODO: Define returns
const getEvents = async (): Promise<event.IEventDetails[]> => {
  return Promise.resolve(eventsDataSource.find());
};

const getCurrentEvents = async (): Promise<any> => {
  try {
    const events: event.IEventDetails[] = await eventsDataSource.find({
      finished: false
    });

    return Promise.resolve(events);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const getPastEvents = async (): Promise<any> => {
  try {
    const events: event.IEventDetails[] = await eventsDataSource.find({
      finished: true
    });

    return Promise.resolve(events);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const getEventOrderById = async (id: string): Promise<any> => {
  try {
    const event: event.IEventDetails[] = await eventsDataSource.find({ id });

    if (fp.isEmpty(event)) {
      return Promise.reject(boom.notFound("Not Found"));
    }
    const orders: order.IOrderDetails[] = ordersDataSource.find({
      eventId: id
    });
    const eventOrders: event.IEventOrders = { ...event[0], orders: orders };

    return Promise.resolve(eventOrders);
  } catch (err) {
    return Promise.reject(boom.internal("Internal Server Error"));
  }
};

const createEvent = async (event: event.IEvent): Promise<any> => {
  try {
    const createdEvent: event.IEventDetails = await eventsDataSource.save(
      event
    );

    return Promise.resolve(createdEvent);
  } catch (err) {
    return Promise.resolve(boom.internal("Internal Server Error"));
  }
};

const updateEvent = async (event: event.IEvent): Promise<any> => {
  try {
    const { id } = event;
    const eventFinded: event.IEventDetails[] = eventsDataSource.find({ id });

    if (fp.isEmpty(eventFinded)) {
      return Promise.reject(boom.notFound("Not Found"));
    }
    if (eventFinded[0].finished) {
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
