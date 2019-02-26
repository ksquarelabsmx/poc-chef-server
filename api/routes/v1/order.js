"use strict";

/**
 * author: ivan sabido
 * date: 27/12/2018
 * email: <ivan.sabido@ksquareinc.com>
 */

const orderController = require("../../controllers/order");
const validation = require("../../middlewares/validationHandler");
const { createOrderSchema } = require("../../utils/schemas/order");

module.exports = app => {
  app.get("/v1/orders", orderController.getOrders);
  app.post(
    "/v1/orders",
    validation(createOrderSchema),
    orderController.createOrder
  );
};
