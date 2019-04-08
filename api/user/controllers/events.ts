export const EventsController = eventsDataSource => {
  const getEvents = async (req, res) => {
    if (req.query.past !== undefined) {
      const events = await eventsDataSource.find({
        expirationDate: {
          comparator: "lessThan",
          value: Date.now()
        }
      });

      return res.json({ events });
    }

    const events = await eventsDataSource.find();
    res.json({ events });
  };

  return {
    getEvents
  };
};
