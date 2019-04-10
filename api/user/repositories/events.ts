import { IEventsDataSource } from "api/common/data-sources/events-data-source";
import { IEvent } from "api/common/models/event";

export const EventsRepository = (eventsDataSource: IEventsDataSource) => {
  const getCurrentEvents = (): Promise<IEvent[]> => {
    return eventsDataSource.find();
  };

  const getPastEvents = async (): Promise<IEvent[]> => {
    const events = await eventsDataSource.find();
    return Promise.resolve(
      events.filter((event: IEvent) => {
        return event.expirationDate < Date.now() || event.markedAsFinished;
      })
    );
  };

  return {
    getCurrentEvents,
    getPastEvents
  };
};
