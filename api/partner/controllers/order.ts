import chalk from "chalk";
import * as Debug from "debug";

import { response } from "../../common/utils";
import { orderService } from "../services";
import { IOrder } from "api/common/models/order";

const debug = Debug("chef:orders:controller:orders");

const getOrders = async (): Promise<IOrder[]> => {
  debug(`OrderController: ${chalk.green("getting orders")}`);
  return orderService.getOrders();
};

const getOrderById = async (id: string): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("getting order")}`);
  return orderService.getOrderById(id);
};

const createOrder = async (data: IOrder): Promise<IOrder> => {
  debug(`OrderController: ${chalk.green("creating order")}`);
  return orderService.createOne(data);
};

const updateOrder = async (id: string, data: IOrder): Promise<IOrder> => {
  debug(`EventController: ${chalk.green("getting orders")}`);
  return orderService.updateOneById(id, data);
};

const handleAction = async (data: {
  action: string;
  ids: string[];
}): Promise<any> => {
  debug(`OrderCOntroller: ${chalk.green("paying orders")}`);
  switch (data.action) {
    case "mark_as_paid": {
      return orderService.markManyAsPaid(data.ids);
    }
    case "mark_as_not_paid": {
      return orderService.markManyAsNotPaid(data.ids);
    }
    case "mark_as_cancelled": {
      return orderService.markManyAsCancelled(data.ids);
    }
    case "mark_as_not_cancelled": {
      return orderService.markManyAsNotCancelled(data.ids);
    }
    default: {
      return response.error(
        "Bad Request",
        400,
        "http://localhost:3000/v1/orders/actions",
        "That action does not exists"
      );
    }
  }
};

const orderController = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  handleAction
};
export { orderController };
