import * as express from "express";
import * as Debug from "debug";
import chalk from "chalk";

import { IOrder, IOrderDto } from "./../../../common/models/order";
import { orderController } from "../../controllers";
import { orderMemoryRepository } from "../../../common/repositories/order-memory-repository";
import { validation } from "../../../common/middlewares";
import { orderSchema } from "../../../common/utils/schemas";
import { uriBuilder } from "../../../common/utils/uri";
import { orderMapper } from "./../../../common/mappers";
import { response } from "../../../common/utils/response";
import { validateJWT, onlyOwner, filterRoles } from "../../../common/policies";

const debug = Debug("chef:events:controller:orders");

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
      const ordersDto: IOrderDto[] = orders.map(orderMapper.toDto);
      res.send(response.success(ordersDto, 200, source));
    } catch (err) {
      debug(`getOrders Controller Error: ${chalk.red(err)}`);
      res.json(err.output.payload);
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
      const orderDto: IOrderDto = orderMapper.toDto(order);
      res.send(response.success(orderDto, 200, source));
    } catch (err) {
      debug(`getOrder Controller Error: ${chalk.red(err)}`);
      res.json(err.output.payload);
    }
  }
);

/**
 * @swagger
 * /v1/orders/actions:
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
 *             id:
 *               type: string
 *               format: UUID
 *               example:
 *               - 6f4b2f3b-7585-4004-9f3c-ca5a29f2e653
 *               description: Orders ids
 *
 *     responses:
 *       200:
 *         description: Succesful operation
 *         schema:
 *           type: array
 *           example:
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
  "/:id/actions",
  validateJWT("access"),
  filterRoles(["partner"]),
  validation({ id: orderSchema.orderId }, "params"),
  async (req, res) => {
    try {
      const source: string = uriBuilder(req);
      const order = await orderController.handleAction(req.params.id, req.body);
      res.send(response.success(order, 201, source));
    } catch (err) {
      debug(`actionOrder Controller Error: ${chalk.red(err)}`);
      res.json(err.output.payload);
    }
  }
);

export { ordersRouter };
