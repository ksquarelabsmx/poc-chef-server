import { IEvent } from "../../common/models/event";
import * as eventMapper from "../../common/mappers/event";

export const EventsController = eventsRepository => {
  const getEvents = async (query: any): Promise<IEvent[]> => {
    if (query.getPastEvents) {
      return eventsRepository.getPastEvents();
    }

    return eventsRepository.getCurrentEvents();
  };

  return {
    getEvents
  };
};
