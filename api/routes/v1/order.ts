import { Express } from "express";

import { orderController } from "../../controllers";
import { ordersDataSource } from "./../../data-source";
import { validation } from "../../middlewares";
import { orderSchema } from "../../utils/schemas";
import {
  validateJWT,
  onlyOwner,
  filterRoles,
  appendUser
} from "./../../policies";

// TODO: update docs according to the new model
export const orderRoutes = (app: Express) => {
  /**
   * @swagger
   * definitions:
   *   Order:
   *     required:
   *       - user_id
   *       - event_id
   *       - price
   *       - order_product_id
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
   *
   *   OrderDetails:
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
   *             $ref: "#/definitions/OrderDetails"
   *       401:
   *         description: Access token is missing or invalid
   *       500:
   *         description: Internal Server Error
   */

  app.get(
    "/v1/orders",
    validateJWT("access"),
    filterRoles(["partner"]),
    orderController.getOrders
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
   *           $ref: "#/definitions/OrderDetails"
   *       401:
   *         description: Access token is missing or invalid
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  app.get(
    "/v1/orders/:id",
    validateJWT("access"),
    onlyOwner(ordersDataSource),
    validation({ id: orderSchema.orderId }, "params"),
    orderController.getOrder
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
   *           $ref: "#/definitions/OrderDetails"
   *       400:
   *         description: Bad Request. Order name is required.
   *       401:
   *         description: Access token is missing or invalid
   *       500:
   *         description: Internal Server Error
   */

  app.post(
    "/v1/orders",
    validateJWT("access"),
    appendUser(),
    validation(orderSchema.order),
    orderController.createOrder
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
   *         description: Order action object
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

  app.post(
    "/v1/orders/actions",
    validateJWT("access"),
    filterRoles(["partner"]),
    orderController.handleAction
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
   *           $ref: "#/definitions/OrderDetails"
   *       400:
   *         description: Bad Request. Event has already finished
   *       401:
   *         description: Access token is missing or invalid
   *       404:
   *         description: Not Found
   *       500:
   *         description: Internal Server Error
   */

  app.put(
    "/v1/orders/:id",
    validateJWT("access"),
    appendUser(),
    validation({ id: orderSchema.orderId }, "params"),
    validation(orderSchema.order),
    orderController.updateOrder
  );
};
