import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uri } from "./../utils/uri";
import { response } from "./../utils/response";
import { orderService } from "./../services/order";

const debug = Debug("chef:orders:controller:orders");

const orderStrategy = (orderService: any, query: string = "") => {
  return query
    ? orderService.getOrdersByEventId(query)
    : orderService.getOrders();
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("getting orders")}`);

    const query = req.query.eventId;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const orders = await orderStrategy(orderService, query);

    res.send(response.success(orders, 200, source));
  } catch (err) {
    debug(`getOrders Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("getting order")}`);

    const orderId = req.params.orderId;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const order = await orderService.getOrder(orderId);

    res.send(response.success(order, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("creating order")}`);

    const { body: order } = req;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const createOrder = await orderService.createOrder({ order });

    res.send(response.success(createOrder, 200, source));
  } catch (err) {
    debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("getting events")}`);

    const { body: order } = req;
    const id = req.params.orderId;
    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const updatedOrder = await orderService.updateOrder({ order, id });

    res.send(response.success(updatedOrder, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const handleAction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    debug(`OrderCOntroller: ${chalk.green("paying orders")}`);

    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const action = req.body.action;

    switch (action) {
      case "mark_as_paid": {
        const results = await orderService.markManyAsPaid(req.body.ids);
        res.send(response.success(results, 200, source));
        break;
      }
      case "mark_as_not_paid": {
        const results = await orderService.markManyAsNotPaid(req.body.ids);
        res.send(response.success(results, 200, source));
        break;
      }
      default: {
        res.send(
          response.error(
            "Bad request",
            400,
            "http://localhost:3000/v1/orders/actions",
            "That action does not exists"
          )
        );
      }
    }
  } catch (err) {
    debug(`handleAction Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const orderController = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  handleAction
};
export { orderController };
