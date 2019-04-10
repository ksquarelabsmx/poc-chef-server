import { IEventRepository } from "api/common/repositories/event-repository";
import { IEvent } from "api/common/models/event";

export const EventService = (eventRepoistory: IEventRepository) => {
  const getCurrentEvents = (): Promise<IEvent[]> => {
    return eventRepoistory.find();
  };

  const getPastEvents = async (): Promise<IEvent[]> => {
    const events = await eventRepoistory.find();
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
