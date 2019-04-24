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
import { validateJWT, onlyOwner, filterRoles } from "../../../common/policies";

const ordersRouter = express.Router();

/**
 * @swagger
 * /v1/orders:
 *   get:
 *     summary: Partner finds all orders
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             $ref: "#/definitions/Order"
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
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
 *     summary: Partner finds order by ID
 *     description: Return a single order
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *         description: ID of the order to return
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
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
 *     summary: Partner creates a new order
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
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
 *         description: Event object that is going to be added
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       400:
 *         description: Bad Request. Order name is required.
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       500:
 *         description: Internal Server Error
 */

ordersRouter.post(
  "/",
  validateJWT("access"),
  filterRoles(["partner"]),
  validation(orderSchema.order),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const data = orderMapper.toModel(req.body);
      const order = await orderController.createOrder(data);
      const orderDto = orderMapper.toDto(order);
      res.send(response.success(orderDto, 201, source));
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
 *     summary: Partner special actions that updated specifics order values
 *     description: Order Actions that updates an specific value for one or multiple orders
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
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
 *               enum:
 *               - mark_as_paid
 *               - mark_as_not_paid
 *               - mark_as_cancelled
 *               - mark_as_not_cancelled
 *               description: Name of the action that update a specific order value
 *             ids:
 *               type: array
 *               example:
 *               - 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *               - 6457a76f-b009-44dc-8e01-0895602932367
 *               - bcc53260-6912-414c-8f80-25838c1bae9c
 *               items:
 *                 type: string
 *                 format: UUID
 *                 description: Array of orders ids
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: array
 *           example:
 *           - order 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653 not found
 *           - order 6457a76f-b009-44dc-8e01-089560293236 was already marked as paid
 *           - order bcc53260-6912-414c-8f80-25838c1bae9c successfully modified
 *           items:
 *             type: string
 *             description: Array of messages for every individual order id sent
 *       400:
 *         description: Bad Request. That action does not exists.
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
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
 *     summary: Partner updates a single orders
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Order
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         example: 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *         required: true
 *         format: UUID
 *         description: ID of the order to return
 *       - in: body
 *         name: Order object
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *         required: true
 *         description: Order object that is going to be updated
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       400:
 *         description: Bad Request. Order has already finished
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

ordersRouter.put(
  "/:id",
  validateJWT("access"),
  onlyOwner(orderMemoryRepository),
  validation({ id: orderSchema.orderId }, "params"),
  validation(orderSchema.order),
  async (req, res) => {
    try {
      const source = uriBuilder(req);
      const order = await orderController.updateOrder(
        req.params.id,
        orderMapper.toModel(req.body)
      );
      const orderDto = orderMapper.toDto(order);
      res.send(response.success(orderDto, 201, source));
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
