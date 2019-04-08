import { ordersDataSource } from "../data-sources";

export const getAll = async (_req, res) => {
  const orders = await ordersDataSource.find();
  res.json({ orders });
};

export const createOrder = async (req, res) => {
  const payload = req.body;
  const order = await ordersDataSource.save(payload);
  res.json({
    order
  });
};
