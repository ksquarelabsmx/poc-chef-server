import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uriBuilder, response } from "./../utils";
import { orderMapper } from "./../mappers";
import { orderRepository } from "./../repository";
import { order } from "./../interfaces";

const debug = Debug("chef:orders:controller:orders");

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("getting orders")}`);

    //const query = req.query.eventId;
    const source: string = uriBuilder(req);
    const orders = await orderRepository.getOrders();

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
    const source: string = uriBuilder(req);
    const order = await orderRepository.getOrderById(orderId);

    res.send(response.success(order, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("creating order")}`);

    const source: string = uriBuilder(req);
    const order: order.IOrder = orderMapper.toEntity(req.body);
    const createOrder = await orderRepository.createOrder(order);
    const orderDTO: order.IOrderDetailsDTO = orderMapper.toDTO(createOrder);

    res.send(response.success(orderDTO, 201, source));
  } catch (err) {
    debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("getting events")}`);

    const source: string = uriBuilder(req);
    const event: order.IOrder = orderMapper.toEntity({
      id: req.params.orderId,
      ...req.body
    });
    const updatedEvent = await orderRepository.updateOrder(event);
    const orderDTO: order.IOrderDetailsDTO = orderMapper.toDTO(updatedEvent);

    res.send(response.success(orderDTO, 201, source));
  } catch (err) {
    debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
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

    const source: string = uriBuilder(req);
    const action = req.body.action;

    switch (action) {
      case "mark_as_paid": {
        const results = await orderRepository.markManyAsPaid(req.body.ids);
        res.send(response.success(results, 200, source));
        break;
      }
      case "mark_as_not_paid": {
        const results = await orderRepository.markManyAsNotPaid(req.body.ids);
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
