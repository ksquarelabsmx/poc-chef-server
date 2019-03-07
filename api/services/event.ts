import { IEvent, IEventDTO } from "./../interfaces/event";
import { eventsDataSource } from "./../data-source";

// TODO: implement interfaces and mappers
const getEvents = async (): Promise<any> => {
  return Promise.resolve(eventsDataSource.find());
};

const getCurrentEvents = async (): Promise<any> => {
  const events = eventsDataSource.find({ finished: false });
  if (events) {
    return Promise.resolve(events);
  }
  return Promise.reject(new Error("There are no current events"));
};

const getPastEvents = async (): Promise<any> => {
  const events = eventsDataSource.find({ finished: true });
  if (events) {
    return Promise.resolve(events);
  }
  return Promise.reject(new Error("There are no past events"));
};

const getEventById = async (id: number): Promise<any> => {
  const event = eventsDataSource.find({ id });
  if (event) {
    return Promise.resolve(event);
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const createEvent = async (event: IEvent): Promise<IEvent> => {
  return Promise.resolve(eventsDataSource.save(event));
};

const updateEvent = async (event: IEvent): Promise<IEvent> => {
  const { id } = event;
  const eventFinded = eventsDataSource.find({ id });

  if (eventFinded) {
    if (eventFinded.finished) {
      return Promise.reject(new Error("Event has already finished"));
    }
    return Promise.resolve(eventsDataSource.update(event));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

export const eventService = {
  getEvents,
  getEventById,
  getPastEvents,
  getCurrentEvents,
  createEvent,
  updateEvent
};
