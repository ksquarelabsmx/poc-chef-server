import { eventsDataSource } from "../data-sources";

export const getAll = async (_req, res) => {
  const events = await eventsDataSource.find();
  res.json({ events });
};
