import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import { response } from "../../../common/utils/response";
import { uriBuilder } from "../../../common/utils/uri";
import { validation } from "../../../common/middlewares";

import { orderSchema } from "../../../common/utils/schemas";
import { orderMapper } from "./../../../common/mappers";
import { IOrder } from "./../../../common/models/order";
import { ordersController } from "../../controllers";
import {
  validateJWT,
  onlyOwner,
  filterRoles,
  appendUser
} from "../../../common/policies";

const ordersRouter = express.Router();

ordersRouter.get("/", async (req, res) => {
  try {
    const source: string = uriBuilder(req);
    const orders: IOrder[] = await ordersController.getAll();
    const ordersDto = orders.map(orderMapper.toDto);
    res.send(response.success(ordersDto, 200, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    res.json({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

ordersRouter.post(
  "/",
  validateJWT("access"),
  filterRoles(["partner"]),
  appendUser(),
  validation(orderSchema.order),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const data = orderMapper.toModel(req.body);
      const order = await ordersController.createOrder(data);
      const orderDto = orderMapper.toDto(order);
      res.send(response.success(orderDto, 201, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.json(err.output.payload);
    }
  }
);

ordersRouter.put("/:id", async (req, res) => {
  try {
    const source = uriBuilder(req);
    const order = await ordersController.updateOrderById(
      req.params.id,
      orderMapper.toModel(req.body)
    );
    const eventDto = orderMapper.toDto(order);
    res.send(response.success(eventDto, 201, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    res.json(err.output.payload);
  }
});

ordersRouter.post("/:id/cancel", async (req, res) => {
  try {
    const source = uriBuilder(req);
    const order = await ordersController.cancelOrderById(req.params.id);
    res.send(response.success(order, 201, source));
  } catch (err) {
    debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
    res.json({
      statusCode: 500,
      message: "Internal Server Error"
    });
  }
});

export { ordersRouter };
