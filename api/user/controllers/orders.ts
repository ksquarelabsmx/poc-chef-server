import chalk from "chalk";
import * as Debug from "debug";

import { IOrder } from "../../common/models/order";
import { orderService } from "../services";

const debug = Debug("chef:orders:controller:orders");

const getAll = async (): Promise<IOrder[]> => {
  debug(`OrderController: ${chalk.green("getting orders")}`);
  return orderService.getAll();
};

const createOrder = (order: IOrder): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("getting orders")}`);
  return orderService.createOne(order);
};

const updateOrderById = (id: string, order: IOrder): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("getting orders")}`);
  return orderService.updateOneById(id, order);
};

const cancelOrderById = (id: string): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("getting orders")}`);
  return orderService.cancelOrderById(id);
};

export const ordersController = {
  getAll,
  createOrder,
  updateOrderById,
  cancelOrderById
};
