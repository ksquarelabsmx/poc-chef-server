import { eventsDataSource } from "./../data-source";

// TODO: implement interfaces and mappers
const getEvents = async (): Promise<any> => {
  return Promise.resolve(eventsDataSource.find());
};

const getCurrentEvents = async (): Promise<any> => {
  const events = eventsDataSource.find().filter((event: any) => {
    return event.finished === false;
  });
  return Promise.resolve(events);
};

const getPastEvents = async (): Promise<any> => {
  const events = eventsDataSource.find().filter((event: any) => {
    return event.finished === true;
  });
  return Promise.resolve(events);
};

const getEvent = async (id: number): Promise<any> => {
  const event = eventsDataSource.find().find((event: any) => event.id === id);
  if (event) {
    return Promise.resolve(event);
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

const createEvent = async ({ event }: any): Promise<any> => {
  return Promise.resolve(eventsDataSource.addEvent(event));
};

const updateEvent = async ({ event, id }: any): Promise<any> => {
  const index = eventsDataSource.find().findIndex(
    (event: any) => event.id === id
  );
  if (index !== -1) {
    return Promise.resolve(eventsDataSource.updateEvent(event, id, index));
  }
  return Promise.reject(new Error("That event Id did not match any event"));
};

export const eventService = {
  getEvents,
  getEvent,
  getPastEvents,
  getCurrentEvents,
  createEvent,
  updateEvent
};
