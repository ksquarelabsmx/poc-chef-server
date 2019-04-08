export const EventsController = eventsRepository => {
  const getEvents = async (req, res) => {
    if (req.query.past !== undefined) {
      const events = await eventsRepository.getPastEvents();
      return res.json({ events });
    }

    const events = await eventsRepository.getCurrentEvents();
    res.json({ events });
  };

  return {
    getEvents
  };
};
