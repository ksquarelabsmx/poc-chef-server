export const EventsRepository = eventsDataSource => {
  const getCurrentEvents = () => {
    return eventsDataSource.find();
  };

  const getPastEvents = () => {
    return eventsDataSource.find({
      expirationDate: {
        comparator: "lessThan",
        value: Date.now()
      }
    });
  };

  return {
    getCurrentEvents,
    getPastEvents
  };
};
