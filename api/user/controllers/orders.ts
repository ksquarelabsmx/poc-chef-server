import { errorStrategy } from "../strategies";

export const OrdersController = ordersRepository => {
  const getAll = async (_req, res) => {
    const orders = await ordersRepository.getAll();
    res.json({ orders });
  };

  const createOrder = async (req, res) => {
    const order = await ordersRepository.createOne(req.body);
    res.json({
      order
    });
  };

  const updateOrderById = async (req, res) => {
    try {
      const order = await ordersRepository.updateOneById(
        req.params.id,
        req.body
      );
      return res.json({
        order
      });
    } catch (err) {
      return res.json(errorStrategy.handle(err));
    }
  };

  const cancelOrderById = async (req, res) => {
    try {
      const order = await ordersRepository.cancelOrderById(req.params.id);
      return res.json({
        order
      });
    } catch (err) {
      return res.json(errorStrategy.handle(err));
    }
  };

  return {
    getAll,
    createOrder,
    updateOrderById,
    cancelOrderById
  };
};
