import chalk from "chalk";
import * as Debug from "debug";
import { Request, Response, NextFunction } from "express";

import { uriBuilder } from "./../utils/uri";
import { response } from "./../utils/response";
import { orderService } from "./../services";
import { orderMapper } from "./../mappers";
import { IOrder, IOrderDetailsDTO } from "./../interfaces/order";

const debug = Debug("chef:orders:controller:orders");

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("getting orders")}`);

    //const query = req.query.eventId;
    const source: string = uriBuilder(req);
    const orders = await orderService.getOrders();

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
    const order = await orderService.getOrderById(orderId);

    res.send(response.success(order, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`OrderController: ${chalk.green("creating order")}`);

    const order: IOrder = orderMapper.toEntity(req.body);
    const createOrder = await orderService.createOrder(order);
    const orderDTO: IOrderDetailsDTO = orderMapper.toDTO(createOrder);

    res.status(201).json(orderDTO);
  } catch (err) {
    debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
    next(err);
  }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    debug(`EventController: ${chalk.green("getting events")}`);

    const event: IOrder = orderMapper.toEntity({
      id: req.params.orderId,
      ...req.body
    });
    const updatedEvent = await orderService.updateOrder(event);
    const orderDTO: IOrderDetailsDTO = orderMapper.toDTO(updatedEvent);

    res.status(201).json(orderDTO);
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
