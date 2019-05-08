import chalk from "chalk";
import * as Debug from "debug";

import { IOrder } from "../../common/models/order";
import { orderService } from "../services";

const debug = Debug("chef:orders:controller:orders");

const getAll = async (): Promise<IOrder[]> => {
  debug(`OrderController: ${chalk.green("getting orders")}`);
  return orderService.getAll();
};

const getOrderById = async (id: string): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("getting order")}`);
  return orderService.getOrderById(id);
};

const createOrder = (order: IOrder): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("creating order")}`);
  return orderService.createOne(order);
};

const updateOrderById = (id: string, order: IOrder): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("updating order")}`);
  return orderService.updateOneById(id, order);
};

const cancelOrderById = (id: string): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("cancelling order")}`);
  return orderService.cancelOrderById(id);
};

export const ordersController = {
  getAll,
  getOrderById,
  createOrder,
  updateOrderById,
  cancelOrderById
};
