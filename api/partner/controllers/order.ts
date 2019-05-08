import chalk from "chalk";
import * as Debug from "debug";

import { config } from "../../../config";
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

const handleAction = async (id: string, { action }): Promise<any> => {
  debug(`OrderCOntroller: ${chalk.green("paying orders")}`);
  switch (action) {
    case "mark_as_paid": {
      return orderService.markAsPaid(id);
    }
    case "mark_as_not_paid": {
      return orderService.markAsNotPaid(id);
    }
    default: {
      return response.error(
        "Bad Request",
        400,
        `http://localhost:${config.server.port}/v1/orders/actions`,
        "That action does not exists"
      );
    }
  }
};

const orderController = {
  getOrders,
  getOrderById,
  handleAction
};
export { orderController };
