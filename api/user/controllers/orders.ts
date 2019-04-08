import { ordersDataSource } from "../data-sources";

export const getAll = async (_req, res) => {
  const orders = await ordersDataSource.find();
  res.json({ orders });
};
