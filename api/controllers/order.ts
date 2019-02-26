import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

const uri = require("../utils/uri");
const response = require("../utils/response");
const orderService = require("../services/order");

const debug = Debug("chef:orders:controller:orders");

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("getting orders")}`);

    const source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    const orders = await orderService.getOrders();

    res.send(response.success(orders, 200, source));
  } catch (err) {
    debug(`getOrders Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("creating order")}`);
    const { body: order } = req;
    let source = uri.getURI(req.protocol, req.originalUrl, req.get("host"));
    let resp = await orderService.createOrder({ order });
    res.send(response.success(resp, 200, source));
  } catch (err) {
    debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
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

module.exports = {
  getOrders,
  createOrder,
  handleAction
};
