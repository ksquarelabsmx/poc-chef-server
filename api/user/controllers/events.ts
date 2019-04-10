import * as eventMapper from "../../common/mappers/event";

export const EventsController = eventsRepository => {
  const getEvents = async (req, res) => {
    if (req.query.past !== undefined) {
      const events = await eventsRepository.getPastEvents();
      const eventsDto = events.map(eventMapper.toDto);
      return res.json({ events: eventsDto });
    }

    const events = await eventsRepository.getCurrentEvents();
    const eventsDto = events.map(eventMapper.toDto);
    res.json({ events: eventsDto });
  };

  return {
    getEvents
  };
};
