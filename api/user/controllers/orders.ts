import { errorStrategy } from "../strategies";
import * as orderMapper from "../../common/mappers/order";

export const OrdersController = ordersRepository => {
  const getAll = async (_req, res) => {
    const orders = await ordersRepository.getAll();
    const ordersDto = orders.map(orderMapper.toModel);
    res.json({ orders: ordersDto });
  };

  const createOrder = async (req, res) => {
    const order = await ordersRepository.createOne(req.body);
    const orderDto = orderMapper.toModel(order);
    res.json({
      order: orderDto
    });
  };

  const updateOrderById = async (req, res) => {
    try {
      const order = await ordersRepository.updateOneById(
        req.params.id,
        req.body
      );
      const orderDto = orderMapper.toModel(order);
      return res.json({
        order: orderDto
      });
    } catch (err) {
      return res.json(errorStrategy.handle(err));
    }
  };

  const cancelOrderById = async (req, res) => {
    try {
      const order = await ordersRepository.cancelOrderById(req.params.id);
      const orderDto = orderMapper.toModel(order);
      return res.json({
        order: orderDto
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
