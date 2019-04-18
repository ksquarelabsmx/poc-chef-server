import * as express from "express";
import debug = require("debug");
import chalk from "chalk";

import { IOrder } from "./../../../common/models/order";
import { orderController } from "../../controllers";
import { orderMemoryRepository } from "../../../common/repositories/order-memory-repository";
import { validation } from "../../../common/middlewares";
import { orderSchema } from "../../../common/utils/schemas";
import { uriBuilder } from "../../../common/utils/uri";
import { orderMapper } from "./../../../common/mappers";
import { response } from "../../../common/utils/response";
import {
  validateJWT,
  onlyOwner,
  filterRoles,
  appendUser
} from "../../../common/policies";

const ordersRouter = express.Router();
/**
 * @swagger
 * definitions:
 *
 *   Order:
 *     required:
 *       - id
 *       - user_id
 *       - event_id
 *       - price
 *       - order_product_id
 *       - created_by
 *       - paid
 *       - cancelled
 *       - created_at
 *       - updated_at
 *     properties:
 *       id:
 *         type: string
 *       user_id:
 *         type: string
 *       event_id:
 *         type: string
 *       price:
 *         type: number
 *       order_product_id:
 *         type: array
 *         items:
 *           type: string
 *       created_by:
 *         type: string
 *       paid:
 *         type: boolean
 *       cancelled:
 *         type: boolean
 *       created_at:
 *         type: number
 *       updated_at:
 *         type: number
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders
 */

/**
 * @swagger
 * /v1/orders:
 *   get:
 *     description: Return all orders
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Orders
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get all orders
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: "#/definitions/Order"
 *       401:
 *         description: Access token is missing or invalid
 *       500:
 *         description: Internal Server Error
 */

ordersRouter.get(
  "/",
  validateJWT("access"),
  filterRoles(["partner"]),
  async (req, res) => {
    try {
      const orders: IOrder[] = await orderController.getOrders();
      const source: string = uriBuilder(req);
      res.send(response.success(orders, 200, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

/**
 * @swagger
 * /v1/orders/{id}:
 *   get:
 *     description: Return order
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Orders
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the order to get
 *     responses:
 *       200:
 *         description: Get order
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       401:
 *         description: Access token is missing or invalid
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

ordersRouter.get(
  "/:id",
  validateJWT("access"),
  onlyOwner(orderMemoryRepository),
  validation({ id: orderSchema.orderId }, "params"),
  async (req, res) => {
    try {
      const order: IOrder = await orderController.getOrderById(req.params.id);
      const source: string = uriBuilder(req);
      res.send(response.success(order, 200, source));
    } catch (err) {
      debug(`getEvents Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

/**
 * @swagger
 * /v1/orders:
 *   post:
 *     description: Create order
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Orders
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Order
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *         required: true
 *         description: Order object
 *     responses:
 *       200:
 *         description: Create order
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       400:
 *         description: Bad Request. Order name is required.
 *       401:
 *         description: Access token is missing or invalid
 *       500:
 *         description: Internal Server Error
 */

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
      const order = await orderController.createOrder(data);
      const eventDto = orderMapper.toDto(order);
      res.send(response.success(eventDto, 201, source));
    } catch (err) {
      debug(`createEvent Controller Error: ${chalk.red(err.message)}`);
      res.json(err.output.payload);
    }
  }
);

/**
 * @swagger
 * /v1/orders/action:
 *   post:
 *     description: Action order
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Orders
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Order
 *         schema:
 *           properties:
 *             action:
 *               type: string
 *             ids:
 *               type: array
 *               items:
 *                 type: string
 *         required: true
 *         description: mark_as_paid, mark_as_not_paid, mark_as_cancelled, mark_as_not_cancelled
 *     responses:
 *       200:
 *         description: Order Action
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *
 *       400:
 *         description: Bad Request. That action does not exists.
 *       401:
 *         description: Access token is missing or invalid
 *       500:
 *         description: Internal Server Error
 */
ordersRouter.post(
  "/actions",
  validateJWT("access"),
  filterRoles(["partner"]),
  async (req, res) => {
    try {
      const source = uriBuilder(req);
      const order = await orderController.handleAction(req.body);
      res.send(response.success(order, 201, source));
    } catch (err) {
      debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

/**
 * @swagger
 * /v1/orders/{id}:
 *   put:
 *     description: Update orders
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Orders
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: UUID of the order to get
 *       - in: body
 *         name: Order object
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *         required: true
 *         description: Order object
 *     responses:
 *       200:
 *         description: Update Order
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       400:
 *         description: Bad Request. Event has already finished
 *       401:
 *         description: Access token is missing or invalid
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

ordersRouter.put(
  "/:id",
  validateJWT("access"),
  onlyOwner(orderMemoryRepository),
  appendUser(),
  validation({ id: orderSchema.orderId }, "params"),
  validation(orderSchema.order),
  async (req, res) => {
    try {
      const source = uriBuilder(req);
      const order = await orderController.updateOrder(
        req.params.id,
        orderMapper.toModel(req.body)
      );
      const eventDto = orderMapper.toDto(order);
      res.send(response.success(eventDto, 201, source));
    } catch (err) {
      debug(`updateEvent Controller Error: ${chalk.red(err.message)}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

export { ordersRouter };
