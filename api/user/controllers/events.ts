import { IEvent } from "../../common/models/event";
import * as eventMapper from "../../common/mappers/event";

export const EventsController = eventService => {
  const getEvents = async (query: any): Promise<IEvent[]> => {
    if (query.pastEvents) {
      return eventService.getPastEvents();
    }

    return eventService.getCurrentEvents();
  };

  return {
    getEvents
  };
};
