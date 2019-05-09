import * as express from "express";
import * as Debug from "debug";
import chalk from "chalk";

import { response } from "../../../common/utils/response";
import { uriBuilder } from "../../../common/utils/uri";
import { validation } from "../../../common/middlewares";
import {
  validateJWT,
  onlyOwner,
  filterRoles,
  appendUser,
  appendUserName
} from "../../../common/policies";

import { ordersController } from "../../controllers";
import { orderMapper } from "./../../../common/mappers";
import { orderSchema } from "../../../common/utils/schemas";
import { IOrder, IOrderDto } from "./../../../common/models/order";
import { orderMemoryRepository } from "../../../common/repositories/order-memory-repository";

const debug = Debug("chef:events:controller:orders");

const ordersRouter = express.Router();
/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Order
 */

/**
 * @swagger
 * /user/api/v1/orders:
 *   get:
 *     summary: User finds all orders
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
  filterRoles(["user"]),
  //onlyOwner(orderMemoryRepository),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const orders: IOrder[] = await ordersController.getAll();
      const ordersDto: IOrderDto[] = orders.map(orderMapper.toDto);
      res.send(response.success(ordersDto, 200, source));
    } catch (err) {
      debug(`getOrders Controller Error: ${chalk.red()}`);
      res.json({
        statusCode: 500,
        message: "Internal Server Error"
      });
    }
  }
);

/**
 * @swagger
 * /user/api/v1/orders/{id}:
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
  filterRoles(["user"]),
  onlyOwner(orderMemoryRepository),
  validation({ id: orderSchema.orderId }, "params"),
  async (req, res) => {
    try {
      const order: IOrder = await ordersController.getOrderById(req.params.id);
      const source: string = uriBuilder(req);
      const orderDto: IOrderDto = orderMapper.toDto(order);
      res.send(response.success(orderDto, 200, source));
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
 * /user/api/v1/orders:
 *   post:
 *     summary: User creates a new order
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
 *         description: Order object that is going to be added
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
  filterRoles(["user"]),
  appendUser(),
  appendUserName(),
  validation(orderSchema.order),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const data: IOrder = orderMapper.toModel(req.body);
      const order: IOrder = await ordersController.createOrder(data);
      const orderDto: IOrderDto = orderMapper.toDto(order);
      res.send(response.success(orderDto, 201, source));
    } catch (err) {
      debug(`createOrder Controller Error: ${chalk.red(err)}`);
      res.json(err.output);
    }
  }
);

/**
 * @swagger
 * /user/api/v1/orders/{id}:
 *   put:
 *     summary: User updates a single orders
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
  filterRoles(["user"]),
  appendUser(),
  appendUserName(),
  onlyOwner(orderMemoryRepository),
  validation({ id: orderSchema.orderId }, "params"),
  validation(orderSchema.order),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const order: IOrder = await ordersController.updateOrderById(
        req.params.id,
        orderMapper.toModel(req.body)
      );
      const eventDto: IOrderDto = orderMapper.toDto(order);
      res.send(response.success(eventDto, 201, source));
    } catch (err) {
      debug(`updateOrder Controller Error: ${chalk.red(err.message)}`);
      res.json(err.output.payload);
    }
  }
);

/**
 * @swagger
 * /user/api/v1/orders/{id}/cancel:
 *   post:
 *     summary: User cancel a single orders
 *     description: The user have the posibility to cancel one of his own orders
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
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: object
 *           $ref: "#/definitions/Order"
 *       400:
 *         description: Bad Request. Order has already been cancelled
 *       401:
 *         description: Unathorized. Access token is missing or invalid.
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

ordersRouter.post(
  "/:id/cancel",
  validateJWT("access"),
  filterRoles(["user"]),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const order = await ordersController.cancelOrderById(req.params.id);
      res.send(response.success(order, 201, source));
    } catch (err) {
      debug(`actionOrder Controller Error: ${chalk.red(err)}`);
      res.json(err.output.payload);
    }
  }
);

export { ordersRouter };
